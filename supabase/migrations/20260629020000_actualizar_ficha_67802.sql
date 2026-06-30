-- ====================================================================
-- Actualizar ficha 67802 — Lomas de Juriquilla
-- Cambios: descripción sin número oficial, sin mención de banco,
--          amenidades del fraccionamiento y servicios cercanos,
--          nota de precio a tratar
-- ====================================================================

UPDATE public.properties
SET
  -- Dirección sin número oficial
  ubicacion = 'Lomas de Juriquilla, Querétaro',

  -- Descripción limpia, sin datos bancarios ni número de calle
  descripcion = 'Amplia casa habitación de dos niveles en Lomas de Juriquilla. '
    'Planta baja: sala, comedor, cocina equipada, medio baño y acceso a cochera. '
    'Planta alta: recámaras amplias con baños completos. '
    'Terreno de 278 m² con construcción de 251 m². '
    'Cuenta con escritura y posesión física inmediata. '
    'Fraccionamiento privado con vigilancia, áreas verdes y acceso controlado. '
    'Zona con excelente conectividad: a minutos de Plaza Antea, Costco, escuelas privadas '
    '(Tec de Monterrey Campus Juriquilla, UNAM), hospitales y vías rápidas. '
    'Precio a tratar. Se aceptan ofertas. '
    'Solo recursos propios — no se aceptan créditos hipotecarios.',

  -- Amenidades del fraccionamiento
  amenidades = ARRAY[
    'Vigilancia 24 hrs',
    'Acceso controlado',
    'Áreas verdes',
    'Cochera techada',
    'Cocina integral',
    'Área de lavado'
  ]

WHERE clave_control = '67802';
