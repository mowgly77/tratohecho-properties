-- Crea el bucket property-images como público (si no existe)
insert into storage.buckets (id, name, public)
values ('property-images', 'property-images', true)
on conflict (id) do update set public = true;

-- Permite a cualquiera (anon) subir imágenes al bucket
create policy "Anon puede subir fotos" on storage.objects
  for insert to anon
  with check (bucket_id = 'property-images');

-- Permite a cualquiera ver/descargar imágenes
create policy "Fotos son públicas" on storage.objects
  for select to anon
  using (bucket_id = 'property-images');

-- Permite sobreescribir (upsert) imágenes existentes
create policy "Anon puede actualizar fotos" on storage.objects
  for update to anon
  using (bucket_id = 'property-images')
  with check (bucket_id = 'property-images');
