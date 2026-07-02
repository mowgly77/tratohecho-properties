#!/usr/bin/env python3
"""
Sube fotos de propiedades a Supabase Storage y enlaza por clave_control.
Grupo Inmobiliario Orquídeas.

Flujo:
  1) Descarga de Google Drive la carpeta 'orquideas' a tu compu (clic derecho > Descargar).
     Debe quedar una carpeta con subcarpetas nombradas por la CLAVE de cada propiedad:
        orquideas/
          67802/  fachada.jpg, foto1.jpg, ...
          63242/  fachada.jpg, ...
  2) Configura las variables de entorno (ver LEEME-FOTOS.md).
  3) Corre:  python subir_fotos.py /ruta/a/orquideas

Qué hace por cada subcarpeta (clave):
  - Comprime cada imagen para web (máx 1600px de ancho, JPG calidad 82).
  - Renombra con la clave al inicio: {clave}-fachada.jpg (portada) y {clave}-01.jpg, etc.
  - Sube a Supabase Storage (bucket 'property-images', carpeta por clave).
  - Actualiza properties.imagenes con las URLs (la fachada va primero).
"""
import os, sys, io, re
from pathlib import Path

try:
    from PIL import Image, ImageOps
    from supabase import create_client
except ImportError:
    sys.exit("Faltan dependencias. Corre:  pip install pillow supabase")

# Logo para marca de agua — relativo al script
LOGO_PATH = Path(__file__).parent.parent / "src" / "assets" / "orquideas-logo.png"

SUPABASE_URL = os.environ.get("SUPABASE_URL", "https://tcrpbreldqvuuyatnrth.supabase.co")
SUPABASE_KEY = os.environ.get("SB_SERVICE_KEY") or os.environ.get("SB_ANON_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjcnBicmVsZHF2dXV5YXRucnRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0OTkxMjMsImV4cCI6MjA3NjA3NTEyM30.oaWGtU4NW08HdfvMmUtwn4V5eQqMmIRyWF5uNjQCDYQ")
BUCKET = os.environ.get("SUPABASE_BUCKET", "property-images")
MAX_W = 1600
QUALITY = 82
EXTS = {".jpg", ".jpeg", ".png", ".webp"}

if not SUPABASE_URL or not SUPABASE_KEY:
    sys.exit("Define SUPABASE_URL y SUPABASE_SERVICE_KEY (ver LEEME-FOTOS.md).")
if len(sys.argv) < 2:
    sys.exit("Uso: python subir_fotos.py /ruta/a/la/carpeta/orquideas")

base = Path(sys.argv[1])
if not base.is_dir():
    sys.exit(f"No existe la carpeta: {base}")

sb = create_client(SUPABASE_URL, SUPABASE_KEY)

# Asegura el bucket (público)
try:
    sb.storage.create_bucket(BUCKET, options={"public": True})
    print(f"Bucket '{BUCKET}' creado.")
except Exception:
    pass  # ya existe

def add_watermark(im: Image.Image) -> Image.Image:
    if not LOGO_PATH.exists():
        return im
    logo = Image.open(LOGO_PATH).convert("RGBA")
    # Escala el logo a 30% del ancho — tamaño razonable para repetir en fila
    tile_w = int(im.width * 0.30)
    ratio = tile_w / logo.width
    logo = logo.resize((tile_w, int(logo.height * ratio)), Image.LANCZOS)
    # Opacidad al 35%
    r, g, b, a = logo.split()
    a = a.point(lambda x: int(x * 0.35))
    logo.putalpha(a)

    base = im.convert("RGBA")
    gap = int(im.width * 0.05)           # espacio entre repeticiones
    step = logo.width + gap
    # Calcula cuántas repeticiones caben + una extra para cubrir los bordes
    cols = (im.width // step) + 2
    # Centra verticalmente la fila
    y = (im.height - logo.height) // 2
    # Pega las repeticiones horizontales
    start_x = -((step - (im.width % step)) // 2)  # centra la fila
    for col in range(cols):
        x = start_x + col * step
        base.paste(logo, (x, y), logo)

    return base.convert("RGB")


def compress(path: Path) -> bytes:
    im = Image.open(path)
    im = ImageOps.exif_transpose(im)
    im = im.convert("RGB")
    if im.width > MAX_W:
        im = im.resize((MAX_W, round(im.height * MAX_W / im.width)), Image.LANCZOS)
    im = add_watermark(im)
    buf = io.BytesIO()
    im.save(buf, "JPEG", quality=QUALITY, optimize=True)
    return buf.getvalue()

def order_files(files):
    """Pone la 'fachada' primero, el resto por nombre."""
    fachada = [f for f in files if "fachada" in f.name.lower()]
    resto = sorted([f for f in files if "fachada" not in f.name.lower()], key=lambda f: f.name.lower())
    return fachada + resto

total = 0
for sub in sorted([d for d in base.iterdir() if d.is_dir()]):
    clave = sub.name.strip()
    if not re.fullmatch(r"\d+", clave):
        print(f"  (omito '{sub.name}': no parece una clave numérica)"); continue
    imgs = [f for f in sub.iterdir() if f.suffix.lower() in EXTS]
    if not imgs:
        print(f"  {clave}: sin imágenes, omito"); continue
    imgs = order_files(imgs)
    urls = []
    for i, f in enumerate(imgs):
        is_fachada = "fachada" in f.name.lower() and not any("fachada" in u for u in urls)
        name = f"{clave}-fachada.jpg" if is_fachada else f"{clave}-{i:02d}.jpg"
        data = compress(f)
        path = f"{clave}/{name}"
        try:
            sb.storage.from_(BUCKET).upload(path, data, {"content-type": "image/jpeg", "upsert": "true"})
        except Exception as e:
            print(f"    error subiendo {path}: {e}"); continue
        urls.append(sb.storage.from_(BUCKET).get_public_url(path))
    # fachada primero
    urls.sort(key=lambda u: (0 if "fachada" in u else 1, u))
    res = sb.table("properties").update({"imagenes": urls}).eq("clave_control", clave).execute()
    n = len(res.data) if getattr(res, "data", None) else 0
    print(f"  {clave}: {len(urls)} fotos subidas, {n} propiedad(es) actualizada(s)")
    total += 1

print(f"\nListo. Carpetas procesadas: {total}")
