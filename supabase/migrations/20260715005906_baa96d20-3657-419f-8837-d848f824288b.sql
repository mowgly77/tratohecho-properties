DROP POLICY IF EXISTS "Anon puede actualizar imagenes" ON public.properties;
DROP POLICY IF EXISTS "Anon puede subir fotos" ON storage.objects;
DROP POLICY IF EXISTS "Anon puede actualizar fotos" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view property images" ON storage.objects;