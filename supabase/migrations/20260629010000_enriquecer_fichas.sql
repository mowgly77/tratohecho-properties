-- ====================================================================
-- Enriquecer fichas técnicas (incremental, NO borra fotos)
-- Grupo Inmobiliario Orquídeas — ejecutar en Supabase > SQL Editor
-- ====================================================================

ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS estacionamientos  integer;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS m2_construccion   numeric(10,2);
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS amenidades        text[];
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS con_escritura     text;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS posesion_fisica   text;

UPDATE public.properties SET m2_construccion=46.17, con_escritura='Con Acta de Adjudicación', posesion_fisica='Sí' WHERE clave_control='67390';
UPDATE public.properties SET m2_construccion=0.0, con_escritura='Con Escritura', posesion_fisica='Sí' WHERE clave_control='17890';
UPDATE public.properties SET m2_construccion=47.43, con_escritura='Con Escritura', posesion_fisica='Sí' WHERE clave_control='63240';
UPDATE public.properties SET m2_construccion=0.0, con_escritura='Con Escritura', posesion_fisica='Sí' WHERE clave_control='20197';
UPDATE public.properties SET m2_construccion=65.7, con_escritura='Con Acta de Adjudicación', posesion_fisica='Sí' WHERE clave_control='68875';
UPDATE public.properties SET m2_construccion=84.95, con_escritura='Con Escritura', posesion_fisica='Sí' WHERE clave_control='67682';
UPDATE public.properties SET m2_construccion=88.87, con_escritura='Con Escritura', posesion_fisica='Sí' WHERE clave_control='60246';
UPDATE public.properties SET m2_construccion=130.84, con_escritura='Con Escritura', posesion_fisica='Sí' WHERE clave_control='66362';
UPDATE public.properties SET m2_construccion=79.75, con_escritura='Con Escritura', posesion_fisica='Sí' WHERE clave_control='66424';
UPDATE public.properties SET m2_construccion=122.93, con_escritura='Con Acta de Adjudicación', posesion_fisica='Sí' WHERE clave_control='59931';
UPDATE public.properties SET m2_construccion=134.97, con_escritura='Con Acta de Adjudicación', posesion_fisica='Sí' WHERE clave_control='67008';
UPDATE public.properties SET m2_construccion=132.65, con_escritura='Con Escritura', posesion_fisica='Sí' WHERE clave_control='63684';
UPDATE public.properties SET m2_construccion=136.96, con_escritura='Con Escritura', posesion_fisica='Sí' WHERE clave_control='65038';
UPDATE public.properties SET m2_construccion=115.88, con_escritura='Con Acta de Adjudicación', posesion_fisica='Sí' WHERE clave_control='66716';
UPDATE public.properties SET m2_construccion=222.2, con_escritura='Con Escritura', posesion_fisica='Sí' WHERE clave_control='60752';
UPDATE public.properties SET m2_construccion=135.05, con_escritura='Con Escritura', posesion_fisica='Sí' WHERE clave_control='61984';
UPDATE public.properties SET m2_construccion=0.0, con_escritura='Con Escritura', posesion_fisica='Sí' WHERE clave_control='64262';
UPDATE public.properties SET m2_construccion=0.0, con_escritura='Con Escritura', posesion_fisica='Sí' WHERE clave_control='65435';
UPDATE public.properties SET m2_construccion=152.54, con_escritura='Con Acta de Adjudicación', posesion_fisica='Sí' WHERE clave_control='68740';
UPDATE public.properties SET m2_construccion=212.28, con_escritura='Con Acta de Adjudicación', posesion_fisica='Sí' WHERE clave_control='68654';
UPDATE public.properties SET m2_construccion=251.77, con_escritura='Con Escritura', posesion_fisica='Sí' WHERE clave_control='67802';
UPDATE public.properties SET m2_construccion=362.36, con_escritura='Con Escritura', posesion_fisica='Sí' WHERE clave_control='63242';
UPDATE public.properties SET m2_construccion=547.04, con_escritura='Con Escritura', posesion_fisica='Sí' WHERE clave_control='64436';
UPDATE public.properties SET m2_construccion=668.71, con_escritura='Con Escritura', posesion_fisica='Sí' WHERE clave_control='65259';
UPDATE public.properties SET m2_construccion=0.0, con_escritura='Con Escritura', posesion_fisica='Sí' WHERE clave_control='60474';

-- Ficha técnica detallada de la 67802 (Lomas de Juriquilla)
UPDATE public.properties
SET recamaras=5, banos=5, estacionamientos=3, m2_construccion=251.77, area=278.37,
    amenidades=ARRAY['Cocina integral','Área de lavado']
WHERE clave_control='67802';
