-- Desactiva propiedades sin imágenes; deja activas solo las que ya tienen fotos
UPDATE public.properties
SET activa = false
WHERE jsonb_array_length(imagenes) = 0;
