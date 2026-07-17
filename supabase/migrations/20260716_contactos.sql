-- Tabla para capturar leads del formulario de contacto
create table if not exists public.contactos (
  id          uuid default gen_random_uuid() primary key,
  nombre      text not null,
  email       text not null,
  telefono    text not null,
  mensaje     text not null,
  created_at  timestamptz default now() not null
);

-- Solo el service role puede leer; cualquiera puede insertar (anon key)
alter table public.contactos enable row level security;

create policy "insert_contactos" on public.contactos
  for insert with check (true);

create policy "select_contactos" on public.contactos
  for select using (auth.role() = 'service_role');
