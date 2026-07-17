#!/usr/bin/env python3
"""
Marca de agua + compresión para web — Grupo Inmobiliario Orquídeas.

Toma las fotos (carpeta con subcarpetas por CLAVE), les pone el logo como
marca de agua, las comprime para web, las renombra con la clave al inicio
(la que se llame 'fachada' queda de portada) y las guarda en 'listas-web'.

Uso:
    python marca_agua.py /ruta/a/la/carpeta
    # opciones:
    #   --modo banda|mosaico|esquina   (default: banda)
    #   --opacidad 0.45   --ancho 1600  --escala 0.33
    #   --pos br|bl|tr|tl   (solo para --modo esquina)

Modos:
    banda   -> logo centrado verticalmente, grande (~33%), repetido en fila horizontal
    mosaico -> logo repetido en cuadrícula sobre toda la foto (más tenue)
    esquina -> un solo logo en una esquina
"""
import sys, argparse, re
from pathlib import Path
try:
    from PIL import Image, ImageOps
except ImportError:
    sys.exit("Falta Pillow. Corre:  pip install pillow")

AQUI = Path(__file__).resolve().parent
LOGO = AQUI / "watermark-logo.png"
EXTS = {".jpg", ".jpeg", ".png", ".webp"}

ap = argparse.ArgumentParser()
ap.add_argument("carpeta")
ap.add_argument("--modo", choices=["banda", "mosaico", "esquina"], default="banda")
ap.add_argument("--opacidad", type=float, default=None)
ap.add_argument("--ancho", type=int, default=1600)
ap.add_argument("--escala", type=float, default=None, help="ancho del logo respecto a la foto")
ap.add_argument("--pos", choices=["br", "bl", "tr", "tl"], default="br")
a = ap.parse_args()

# Defaults por modo
opac = a.opacidad if a.opacidad is not None else (0.45 if a.modo == "banda" else 0.15 if a.modo == "mosaico" else 0.5)
escala = a.escala if a.escala is not None else (0.33 if a.modo == "banda" else 0.16 if a.modo == "mosaico" else 0.20)

base = Path(a.carpeta)
if not base.is_dir(): sys.exit(f"No existe la carpeta: {base}")
if not LOGO.exists(): sys.exit(f"No encuentro el logo: {LOGO}")

logo0 = Image.open(LOGO).convert("RGBA")
alpha = logo0.split()[3].point(lambda p: int(p * opac))
logo0.putalpha(alpha)

def marca(im):
    """Devuelve la imagen (RGBA) con la marca de agua según el modo."""
    W, H = im.size
    lw = max(1, int(W * escala)); lh = max(1, int(logo0.height * lw / logo0.width))
    wm = logo0.resize((lw, lh), Image.LANCZOS)
    if a.modo == "esquina":
        m = int(W * 0.02)
        x = m if a.pos in ("bl", "tl") else W - lw - m
        y = m if a.pos in ("tl", "tr") else H - lh - m
        im.alpha_composite(wm, (x, y)); return im
    if a.modo == "mosaico":
        stepx, stepy = int(lw * 1.5), int(lh * 2.2)
        for j, y in enumerate(range(0, H, stepy)):
            offset = (stepx // 2) if j % 2 else 0
            for x in range(-offset, W, stepx):
                im.alpha_composite(wm, (x, y))
        return im
    # banda: fila horizontal centrada verticalmente
    y = (H - lh) // 2
    total = ((W // lw) + 1) * lw
    startx = (W - total) // 2
    x = startx
    while x < W:
        im.alpha_composite(wm, (x, y)); x += lw
    return im

def orden(files):
    fach = [f for f in files if "fachada" in f.name.lower()]
    resto = sorted([f for f in files if "fachada" not in f.name.lower()], key=lambda f: f.name.lower())
    return fach + resto

out_root = base / "listas-web"; out_root.mkdir(exist_ok=True)
total = 0
for sub in sorted([d for d in base.iterdir() if d.is_dir() and d.name != "listas-web"]):
    clave = sub.name.strip()
    if not re.fullmatch(r"\d+", clave):
        continue
    imgs = orden([f for f in sub.iterdir() if f.suffix.lower() in EXTS])
    if not imgs:
        print(f"  {clave}: sin fotos"); continue
    dest = out_root / clave; dest.mkdir(exist_ok=True)
    for i, f in enumerate(imgs):
        im = ImageOps.exif_transpose(Image.open(f)).convert("RGB")
        if im.width > a.ancho:
            im = im.resize((a.ancho, round(im.height * a.ancho / im.width)), Image.LANCZOS)
        im = marca(im.convert("RGBA")).convert("RGB")
        nombre = f"{clave}-fachada.jpg" if i == 0 else f"{clave}-{i:02d}.jpg"
        im.save(dest / nombre, "JPEG", quality=82, optimize=True)
        total += 1
    print(f"  {clave}: {len(imgs)} fotos ({a.modo})")

print(f"\nListo. {total} fotos con marca de agua ({a.modo}) en: {out_root}")
