-- =====================================================================
-- 2026-10-28 · Propiedades vendidas + volver a mostrar las que no tienen fotos
-- Correr en Supabase → SQL Editor (requiere admin).
-- =====================================================================

-- 1) Nueva columna para distinguir "vendida" de "oculta por falta de fotos"
ALTER TABLE public.properties
  ADD COLUMN IF NOT EXISTS vendida boolean NOT NULL DEFAULT false;

-- 2) 67802 · Casa en Lomas de Juriquilla → VENDIDA (se oculta del sitio, no se borra)
UPDATE public.properties
SET vendida = true,
    activa  = false,
    updated_at = now()
WHERE clave_control = '67802';

-- 3) Reactivar las que se ocultaron solo por no tener fotos
--    (migración 20260714000001_desactivar_sin_imagenes). No toca vendidas.
--    El flag VITE_MOSTRAR_TODAS del sitio decide si se ven o no.
UPDATE public.properties
SET activa = true,
    updated_at = now()
WHERE activa = false
  AND vendida = false
  AND jsonb_array_length(COALESCE(imagenes, '[]'::jsonb)) = 0;

-- 4) Verificación
SELECT clave_control, titulo, activa, vendida,
       jsonb_array_length(COALESCE(imagenes, '[]'::jsonb)) AS fotos
FROM public.properties
ORDER BY vendida DESC, activa DESC, fotos DESC, clave_control;
