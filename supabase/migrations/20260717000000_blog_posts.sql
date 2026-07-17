-- Tabla de artículos del blog
CREATE TABLE public.blog_posts (
  id           uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo       text NOT NULL,
  slug         text NOT NULL UNIQUE,
  meta_descripcion text,
  contenido    text NOT NULL,
  imagen_portada text,
  categoria    text DEFAULT 'Guías',
  autor        text DEFAULT 'Grupo Inmobiliario Orquídeas',
  publicado    boolean DEFAULT false,
  created_at   timestamptz DEFAULT now(),
  updated_at   timestamptz DEFAULT now()
);

-- Índices SEO
CREATE INDEX blog_posts_slug_idx ON public.blog_posts (slug);
CREATE INDEX blog_posts_publicado_idx ON public.blog_posts (publicado, created_at DESC);

-- RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Público lee posts publicados"
  ON public.blog_posts FOR SELECT
  USING (publicado = true);

CREATE POLICY "Admin gestiona blog"
  ON public.blog_posts FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Trigger updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
