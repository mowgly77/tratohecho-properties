-- Update default contact info for new properties
ALTER TABLE public.properties
  ALTER COLUMN contacto_nombre SET DEFAULT 'Roberto',
  ALTER COLUMN contacto_telefono SET DEFAULT '5583672523',
  ALTER COLUMN contacto_email SET DEFAULT 'roberto@orquideasqro.com.mx';

-- Update existing properties with old contact info
UPDATE public.properties
SET contacto_telefono = '5583672523',
    contacto_email = 'roberto@orquideasqro.com.mx',
    contacto_nombre = 'Roberto'
WHERE contacto_telefono = '4421703205'
   OR contacto_email = 'jorge@ctratohecho.mx';