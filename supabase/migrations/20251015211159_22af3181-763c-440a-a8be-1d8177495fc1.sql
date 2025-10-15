-- Crear tabla de propiedades
CREATE TABLE public.properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('Casa', 'Departamento', 'Terreno')),
  operacion TEXT NOT NULL CHECK (operacion IN ('Venta', 'Renta')),
  precio DECIMAL(12, 2) NOT NULL,
  ubicacion TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  recamaras INTEGER,
  banos INTEGER,
  area DECIMAL(10, 2) NOT NULL,
  imagenes TEXT[] NOT NULL DEFAULT '{}',
  destacada BOOLEAN NOT NULL DEFAULT false,
  activa BOOLEAN NOT NULL DEFAULT true,
  contacto_nombre TEXT NOT NULL DEFAULT 'Jorge Paniagua',
  contacto_telefono TEXT NOT NULL DEFAULT '4421703205',
  contacto_email TEXT NOT NULL DEFAULT 'jorge@ctratohecho.mx',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Política: Todos pueden ver propiedades activas (para visitantes del sitio)
CREATE POLICY "Propiedades activas son visibles para todos"
ON public.properties
FOR SELECT
USING (activa = true);

-- Política: Solo administradores autenticados pueden insertar propiedades
-- (Por ahora permitimos inserción sin autenticación para facilitar la carga inicial)
CREATE POLICY "Permitir inserción de propiedades"
ON public.properties
FOR INSERT
WITH CHECK (true);

-- Política: Solo administradores autenticados pueden actualizar propiedades
CREATE POLICY "Permitir actualización de propiedades"
ON public.properties
FOR UPDATE
USING (true);

-- Política: Solo administradores autenticados pueden eliminar propiedades
CREATE POLICY "Permitir eliminación de propiedades"
ON public.properties
FOR DELETE
USING (true);

-- Crear índices para mejorar el rendimiento de búsquedas
CREATE INDEX idx_properties_tipo ON public.properties(tipo);
CREATE INDEX idx_properties_operacion ON public.properties(operacion);
CREATE INDEX idx_properties_precio ON public.properties(precio);
CREATE INDEX idx_properties_ubicacion ON public.properties(ubicacion);
CREATE INDEX idx_properties_destacada ON public.properties(destacada) WHERE destacada = true;
CREATE INDEX idx_properties_activa ON public.properties(activa) WHERE activa = true;

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION public.update_properties_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Trigger para actualizar updated_at
CREATE TRIGGER update_properties_updated_at
BEFORE UPDATE ON public.properties
FOR EACH ROW
EXECUTE FUNCTION public.update_properties_updated_at();

-- Insertar datos de ejemplo (migración de mock data)
INSERT INTO public.properties (
  id, titulo, tipo, operacion, precio, ubicacion, descripcion, 
  recamaras, banos, area, imagenes, destacada
) VALUES
  (
    '00000000-0000-0000-0000-000000000001',
    'Departamento en Las Haciendas Ciudad del Sol',
    'Departamento',
    'Renta',
    8000.00,
    'Ciudad del Sol, Querétaro',
    '2 recámaras, 1 baño con cancel, cocina integral con granito, patio trasero de lavado. Privada con alberca y vigilancia 24hrs.',
    2,
    1,
    75.00,
    ARRAY['/src/assets/departamento1.jpg'],
    true
  ),
  (
    '00000000-0000-0000-0000-000000000002',
    'Terreno en Valle de San Pedro',
    'Terreno',
    'Venta',
    380000.00,
    'Valle de San Pedro, Querétaro',
    'Terreno habitacional de 8x14m (112m2). Zona económica y en crecimiento, listo para escriturar.',
    NULL,
    NULL,
    112.00,
    ARRAY['/src/assets/terreno1.jpg'],
    true
  ),
  (
    '00000000-0000-0000-0000-000000000003',
    'Casa en Fracc. El Mirador',
    'Casa',
    'Venta',
    2500000.00,
    'El Mirador, Querétaro',
    'Hermosa casa de 2 plantas, 3 recámaras, 2.5 baños, sala, comedor, cocina integral, jardín amplio y cochera para 2 autos. Excelente ubicación cerca de escuelas y centros comerciales.',
    3,
    2,
    180.00,
    ARRAY['/src/assets/casa1.jpg'],
    true
  ),
  (
    '00000000-0000-0000-0000-000000000004',
    'Departamento Moderno en Centro Sur',
    'Departamento',
    'Renta',
    12000.00,
    'Centro Sur, Querétaro',
    'Departamento amueblado de lujo, 2 recámaras con closet, 2 baños completos, sala-comedor, cocina equipada, balcón, estacionamiento techado. Amenidades: gym, alberca, salón de eventos.',
    2,
    2,
    95.00,
    ARRAY['/src/assets/departamento2.jpg'],
    false
  ),
  (
    '00000000-0000-0000-0000-000000000005',
    'Casa Acogedora en Lomas de Querétaro',
    'Casa',
    'Venta',
    1850000.00,
    'Lomas de Querétaro',
    'Casa de una planta, 2 recámaras, 1 baño, sala, cocina integral, patio trasero. Ideal para familia pequeña, en zona tranquila y segura.',
    2,
    1,
    120.00,
    ARRAY['/src/assets/casa2.jpg'],
    false
  ),
  (
    '00000000-0000-0000-0000-000000000006',
    'Terreno Comercial en Zona Industrial',
    'Terreno',
    'Venta',
    1200000.00,
    'Zona Industrial, Querétaro',
    'Terreno comercial de 500m2, ideal para bodega o negocio. Ubicación estratégica con fácil acceso a vialidades principales.',
    NULL,
    NULL,
    500.00,
    ARRAY['/src/assets/terreno1.jpg'],
    false
  );