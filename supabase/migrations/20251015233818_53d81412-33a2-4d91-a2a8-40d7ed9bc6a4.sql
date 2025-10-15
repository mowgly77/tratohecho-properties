-- Add slug column to properties table
ALTER TABLE public.properties 
ADD COLUMN slug text;

-- Create function to generate slug from title
CREATE OR REPLACE FUNCTION public.generate_slug(title text)
RETURNS text AS $$
DECLARE
  slug text;
BEGIN
  -- Convert to lowercase, replace spaces and special chars with hyphens
  slug := lower(trim(title));
  slug := regexp_replace(slug, '[^a-z0-9\s-]', '', 'g');
  slug := regexp_replace(slug, '\s+', '-', 'g');
  slug := regexp_replace(slug, '-+', '-', 'g');
  RETURN slug;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Generate slugs for existing properties
UPDATE public.properties 
SET slug = generate_slug(titulo) || '-' || substring(id::text, 1, 8)
WHERE slug IS NULL;

-- Make slug NOT NULL and UNIQUE after populating existing records
ALTER TABLE public.properties 
ALTER COLUMN slug SET NOT NULL,
ADD CONSTRAINT properties_slug_unique UNIQUE (slug);

-- Create trigger to auto-generate slug on insert
CREATE OR REPLACE FUNCTION public.set_property_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := generate_slug(NEW.titulo) || '-' || substring(NEW.id::text, 1, 8);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_property_slug_trigger
BEFORE INSERT ON public.properties
FOR EACH ROW
EXECUTE FUNCTION public.set_property_slug();