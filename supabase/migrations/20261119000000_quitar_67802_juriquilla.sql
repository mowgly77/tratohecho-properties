-- Retira del sitio la Casa en Lomas de Juriquilla (clave 67802).
-- No borra el registro: solo la oculta (reversible con activa = true).
UPDATE public.properties
SET activa = false, destacada = false
WHERE clave_control = '67802';
