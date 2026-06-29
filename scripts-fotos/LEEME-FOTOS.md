# Subir fotos de propiedades

Script: `subir_fotos.py`. Comprime las fotos para web, las renombra con la clave
de la propiedad y la `fachada` como portada, las sube a Supabase Storage y enlaza
cada propiedad por su `clave_control`.

## Requisitos (una sola vez)
1. Instala Python 3 (python.org).
2. Instala dependencias:
   ```bash
   pip install pillow supabase
   ```
3. Corre el SQL `cargar_propiedades_queretaro.sql` en Supabase ANTES (crea la columna
   `clave_control` y carga las 85 propiedades).

## Configurar credenciales
En Supabase: Settings → API. Copia:
- Project URL  →  SUPABASE_URL
- service_role key (¡secreta, NO la anon!)  →  SUPABASE_SERVICE_KEY

En la terminal (Mac):
```bash
export SUPABASE_URL="https://tcrpbreldqvuuyatnrth.supabase.co"
export SB_SERVICE_KEY="pega_aqui_tu_service_role"
```

## Preparar las fotos
1. En Google Drive, descarga la carpeta `orquideas` (clic derecho → Descargar).
2. Descomprímela. Debe quedar así (cada subcarpeta = clave de la propiedad):
   ```
   orquideas/
     67802/   fachada.jpg, IMG_1.jpg, IMG_2.jpg ...
     63242/   fachada.jpg, ...
   ```
   La imagen que se llame **fachada** será la portada.

## Ejecutar
```bash
python subir_fotos.py /ruta/a/orquideas
```
Verás, por cada clave, cuántas fotos subió y si actualizó la propiedad.
Puedes correrlo de nuevo cuando subas más carpetas; vuelve a subir/actualizar sin duplicar.

## Notas
- No subas tu `SUPABASE_SERVICE_KEY` a GitHub ni la compartas.
- Si una clave no existe en la base, el script avisa que actualizó 0 propiedades.
