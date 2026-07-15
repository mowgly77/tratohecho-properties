-- Marcar como destacadas las 5 propiedades de Ola 1 (salen primero en el sitio)
UPDATE public.properties SET destacada = false;
UPDATE public.properties SET destacada = true
WHERE clave_control IN ('67390','66362','65038','20197','67802');
