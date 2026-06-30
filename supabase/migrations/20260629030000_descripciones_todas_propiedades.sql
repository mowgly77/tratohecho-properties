-- ====================================================================
-- Actualizar descripciones y amenidades — todas las propiedades
-- Sin número oficial, sin mención de banco/remate, con servicios cercanos
-- ====================================================================

-- 67390 · Departamento en Real de la Loma, Querétaro
UPDATE public.properties SET
  ubicacion  = 'Real de la Loma, Querétaro',
  descripcion = 'Departamento habitacional en tercer nivel. Cuenta con cocina, estancia, '
    'dos recámaras, baño completo, patio de servicio y cajón de estacionamiento. '
    'Superficie de terreno 57 m², construcción 46 m². Con acta de adjudicación y posesión física. '
    'Zona residencial con acceso a transporte público, escuelas, supermercados y centros comerciales. '
    'Precio a tratar. Se aceptan ofertas. Solo recursos propios — no se aceptan créditos hipotecarios.',
  amenidades = ARRAY['Cajón de estacionamiento','Patio de servicio','Acceso a transporte público']
WHERE clave_control = '67390';

-- 17890 · Terreno agostadero en Vizarron, Cadereyta de Montes
UPDATE public.properties SET
  ubicacion  = 'Vizarron, Cadereyta de Montes, Querétaro',
  descripcion = 'Predio rústico de agostadero en zona semimontañosa de Vizarron. '
    'Superficie total de 30,021 m² con escritura y posesión física. '
    'Terreno con potencial para uso campestre, ecoturismo o actividad agropecuaria. '
    'A pocos kilómetros de Cadereyta de Montes y su zona arqueológica. '
    'Entorno natural con vistas panorámicas y clima templado. '
    'Precio a tratar. Se aceptan ofertas. Solo recursos propios — no se aceptan créditos hipotecarios.',
  amenidades = ARRAY['Escritura','Amplia superficie','Zona semimontañosa','Vistas panorámicas']
WHERE clave_control = '17890';

-- 63240 · Casa en Ejido San Miguel Carrillo, Querétaro
UPDATE public.properties SET
  ubicacion  = 'San Miguel Carrillo, Querétaro',
  descripcion = 'Casa habitación de un nivel con sala, comedor, cocina, patio de servicio, '
    'dos recámaras, un baño completo y cajón de estacionamiento. '
    'Terreno de 61 m², construcción de 47 m². Con escritura y posesión física. '
    'Zona con acceso a escuelas primarias, mercado local y transporte urbano. '
    'Precio a tratar. Se aceptan ofertas. Solo recursos propios — no se aceptan créditos hipotecarios.',
  amenidades = ARRAY['Cajón de estacionamiento','Patio de servicio','Escritura']
WHERE clave_control = '63240';

-- 20197 · Terreno habitacional en Texas, Querétaro
UPDATE public.properties SET
  ubicacion  = 'Colonia Texas, Querétaro',
  descripcion = 'Lote de terreno urbano habitacional de 300 m². '
    'Con escritura y posesión física. Superficie regular, apta para construcción. '
    'Zona con todos los servicios: agua, luz, drenaje y pavimento. '
    'Buena conectividad vial hacia el centro de Querétaro y principales arterias. '
    'Precio a tratar. Se aceptan ofertas. Solo recursos propios — no se aceptan créditos hipotecarios.',
  amenidades = ARRAY['Escritura','Servicios completos','Uso habitacional','Vialidad pavimentada']
WHERE clave_control = '20197';

-- 68875 · Casa en Real de San Isidro, San Juan Del Río
UPDATE public.properties SET
  ubicacion  = 'Real de San Isidro, San Juan Del Río, Querétaro',
  descripcion = 'Casa habitación con terreno de 90 m² y construcción de 66 m². '
    'Con acta de adjudicación y posesión física. '
    'Fraccionamiento residencial en San Juan del Río con acceso a escuelas, '
    'supermercados, centros de salud y transporte. '
    'Precio a tratar. Se aceptan ofertas. Solo recursos propios — no se aceptan créditos hipotecarios.',
  amenidades = ARRAY['Fraccionamiento residencial','Servicios completos','Acta de adjudicación']
WHERE clave_control = '68875';

-- 67682 · Casa en Las Canteras, Pedro Escobedo
UPDATE public.properties SET
  ubicacion  = 'Las Canteras, Pedro Escobedo, Querétaro',
  descripcion = 'Casa habitación de un nivel con terreno de 90 m² y construcción de 85 m². '
    'Con escritura y posesión física. '
    'Pedro Escobedo cuenta con mercado, escuelas, clínicas y acceso directo a la carretera '
    'federal Querétaro–San Juan del Río. '
    'Precio a tratar. Se aceptan ofertas. Solo recursos propios — no se aceptan créditos hipotecarios.',
  amenidades = ARRAY['Escritura','Un nivel','Servicios completos']
WHERE clave_control = '67682';

-- 60246 · Casa en San Miguel 2a etapa, Querétaro
UPDATE public.properties SET
  ubicacion  = 'San Miguel 2a Etapa, Querétaro',
  descripcion = 'Casa habitación de dos niveles con terreno de 72 m² y construcción de 89 m². '
    'Con escritura y posesión física. '
    'Colonia consolidada con escuelas, tiendas de conveniencia, transporte urbano '
    'y acceso rápido al centro de Querétaro. '
    'Precio a tratar. Se aceptan ofertas. Solo recursos propios — no se aceptan créditos hipotecarios.',
  amenidades = ARRAY['Escritura','Dos niveles','Transporte cercano','Servicios completos']
WHERE clave_control = '60246';

-- 66362 · Casa en Los Sauces, Querétaro
UPDATE public.properties SET
  ubicacion  = 'Los Sauces, Querétaro',
  descripcion = 'Casa habitación con local comercial. Terreno de 90 m² y construcción de 131 m². '
    'Con escritura y posesión física. Ideal para uso mixto: habitacional y negocio propio. '
    'Zona con escuelas, parques, comercios y transporte público. '
    'Precio a tratar. Se aceptan ofertas. Solo recursos propios — no se aceptan créditos hipotecarios.',
  amenidades = ARRAY['Local comercial','Escritura','Uso mixto','Transporte cercano']
WHERE clave_control = '66362';

-- 66424 · Casa en Hacienda del Bosque, Corregidora
UPDATE public.properties SET
  ubicacion  = 'Hacienda del Bosque, Corregidora, Querétaro',
  descripcion = 'Casa habitación en fraccionamiento Hacienda del Bosque, Corregidora. '
    'Con escritura y posesión física. '
    'Fraccionamiento con áreas verdes, buena infraestructura y acceso a escuelas, '
    'centros comerciales del corredor Corregidora–El Pueblito y vías rápidas hacia Querétaro. '
    'Precio a tratar. Se aceptan ofertas. Solo recursos propios — no se aceptan créditos hipotecarios.',
  amenidades = ARRAY['Escritura','Áreas verdes','Fraccionamiento consolidado','Buena vialidad']
WHERE clave_control = '66424';

-- 59931 · Casa en Colonia México, San Juan Del Río
UPDATE public.properties SET
  ubicacion  = 'Colonia México, San Juan Del Río, Querétaro',
  descripcion = 'Casa habitación de dos niveles con terreno de 200 m² y construcción de 123 m². '
    'Con acta de adjudicación y posesión física. '
    'San Juan del Río cuenta con plazas comerciales, hospitales, escuelas privadas y públicas, '
    'y excelente acceso a la autopista México–Querétaro. '
    'Precio a tratar. Se aceptan ofertas. Solo recursos propios — no se aceptan créditos hipotecarios.',
  amenidades = ARRAY['Dos niveles','Amplio terreno','Acta de adjudicación','Buena conectividad']
WHERE clave_control = '59931';

-- 67008 · Casa en Barrio de San Isidro, San Juan Del Río
UPDATE public.properties SET
  ubicacion  = 'Barrio de San Isidro, San Juan Del Río, Querétaro',
  descripcion = 'Casa habitación en barrio tradicional de San Juan del Río. '
    'Con acta de adjudicación y posesión física. '
    'Zona con acceso a mercados, escuelas, iglesia y transporte. '
    'San Juan del Río ofrece plazas comerciales, hospitales y acceso a autopista federal. '
    'Precio a tratar. Se aceptan ofertas. Solo recursos propios — no se aceptan créditos hipotecarios.',
  amenidades = ARRAY['Barrio consolidado','Acta de adjudicación','Servicios completos']
WHERE clave_control = '67008';

-- 63684 · Casa en Pueblito Colonial, Corregidora
UPDATE public.properties SET
  ubicacion  = 'Pueblito Colonial, Corregidora, Querétaro',
  descripcion = 'Casa habitación de dos niveles con terreno de 119 m² y construcción de 133 m². '
    'Con escritura y posesión física. '
    'El Pueblito es una zona de gran crecimiento en Corregidora, con centros comerciales '
    '(Antea, Plaza Boulevares), escuelas privadas, hospitales y fácil acceso a Querétaro. '
    'Precio a tratar. Se aceptan ofertas. Solo recursos propios — no se aceptan créditos hipotecarios.',
  amenidades = ARRAY['Escritura','Dos niveles','Cerca de Antea','Escuelas y hospitales cercanos']
WHERE clave_control = '63684';

-- 65038 · Casa en Los Candiles, Corregidora
UPDATE public.properties SET
  ubicacion  = 'Los Candiles, Corregidora, Querétaro',
  descripcion = 'Casa habitación de dos niveles con terreno de 105 m² y construcción de 137 m². '
    'Con escritura y posesión física. '
    'Los Candiles es un fraccionamiento residencial en Corregidora con áreas verdes, '
    'vigilancia, acceso a escuelas, centros comerciales y hospital. '
    'Precio a tratar. Se aceptan ofertas. Solo recursos propios — no se aceptan créditos hipotecarios.',
  amenidades = ARRAY['Escritura','Fraccionamiento residencial','Áreas verdes','Vigilancia']
WHERE clave_control = '65038';

-- 66716 · Casa en La Guitarrilla, San Juan Del Río
UPDATE public.properties SET
  ubicacion  = 'La Guitarrilla, San Juan Del Río, Querétaro',
  descripcion = 'Casa habitación de un nivel con terreno de 119 m² y construcción de 116 m². '
    'Con acta de adjudicación y posesión física. '
    'Zona residencial en San Juan del Río con acceso a escuelas, mercados, '
    'centros de salud y vías de comunicación hacia la autopista federal. '
    'Precio a tratar. Se aceptan ofertas. Solo recursos propios — no se aceptan créditos hipotecarios.',
  amenidades = ARRAY['Acta de adjudicación','Un nivel','Servicios completos']
WHERE clave_control = '66716';

-- 60752 · Casa en La Uca, Ezequiel Montes
UPDATE public.properties SET
  ubicacion  = 'La Uca, Ezequiel Montes, Querétaro',
  descripcion = 'Casa habitación de dos niveles: estancia, comedor, cocina, baños y 3 recámaras. '
    'Terreno de 287 m² y construcción de 222 m². Con escritura y posesión física. '
    'Ezequiel Montes cuenta con mercado, escuelas, clínica IMSS y acceso '
    'a la carretera estatal Querétaro–Jalpan. Entorno tranquilo y familiar. '
    'Precio a tratar. Se aceptan ofertas. Solo recursos propios — no se aceptan créditos hipotecarios.',
  amenidades = ARRAY['Escritura','Dos niveles','3 recámaras','Amplio terreno']
WHERE clave_control = '60752';

-- 61984 · Casa en Cerrada de Santa Anita, Corregidora
UPDATE public.properties SET
  ubicacion  = 'Cerrada Santa Anita, Corregidora, Querétaro',
  descripcion = 'Casa habitación en cerrada privada en Corregidora. '
    'Con escritura y posesión física. '
    'Corregidora ofrece excelente calidad de vida: centros comerciales, escuelas privadas, '
    'hospitales, áreas deportivas y acceso directo a Querétaro. '
    'Precio a tratar. Se aceptan ofertas. Solo recursos propios — no se aceptan créditos hipotecarios.',
  amenidades = ARRAY['Escritura','Cerrada privada','Zona residencial','Servicios completos']
WHERE clave_control = '61984';

-- 64262 · Terreno agrícola en Ex hacienda de Jofre, Querétaro
UPDATE public.properties SET
  ubicacion  = 'Ex hacienda de Jofre, Querétaro',
  descripcion = 'Terreno de uso agrícola con amplia superficie en Ex hacienda de Jofre. '
    'Con escritura y posesión física. Zona periurbana con potencial para desarrollo '
    'agropecuario, industrial o habitacional sujeto a cambio de uso de suelo. '
    'Acceso por carretera pavimentada. A pocos minutos del centro de Querétaro. '
    'Precio a tratar. Se aceptan ofertas. Solo recursos propios — no se aceptan créditos hipotecarios.',
  amenidades = ARRAY['Escritura','Amplia superficie','Acceso pavimentado','Uso agrícola']
WHERE clave_control = '64262';

-- 65435 · Terreno campestre en Ex hacienda de Jofre, Querétaro
UPDATE public.properties SET
  ubicacion  = 'Ex hacienda de Jofre, Querétaro',
  descripcion = 'Terreno campestre de 1,155 m² en zona de Ex hacienda de Jofre. '
    'Con escritura y posesión física. Ideal para construcción de casa de campo, '
    'rancho pequeño o retiro privado. Entorno natural tranquilo a pocos minutos de Querétaro. '
    'Precio a tratar. Se aceptan ofertas. Solo recursos propios — no se aceptan créditos hipotecarios.',
  amenidades = ARRAY['Escritura','Uso campestre','Entorno natural','Acceso pavimentado']
WHERE clave_control = '65435';

-- 68740 · Casa en Fracc Puerta Real, Corregidora
UPDATE public.properties SET
  ubicacion  = 'Fracc. Puerta Real, Corregidora, Querétaro',
  descripcion = 'Casa habitación en circuito cerrado dentro de fraccionamiento Puerta Real. '
    'Terreno de 187 m² y construcción de 153 m². Con acta de adjudicación y posesión física. '
    'Puerta Real es un fraccionamiento residencial con acceso controlado, áreas verdes, '
    'cerca de escuelas privadas, centros comerciales, hospital y vías rápidas. '
    'Precio a tratar. Se aceptan ofertas. Solo recursos propios — no se aceptan créditos hipotecarios.',
  amenidades = ARRAY['Acceso controlado','Áreas verdes','Circuito cerrado','Acta de adjudicación']
WHERE clave_control = '68740';

-- 68654 · Casa en Fracc. Zibata, El Marqués
UPDATE public.properties SET
  ubicacion  = 'Fracc. Zibata, El Marqués, Querétaro',
  descripcion = 'Casa habitación en el exclusivo fraccionamiento Zibata, El Marqués. '
    'Terreno de 170 m² y construcción de 212 m². Con acta de adjudicación y posesión física. '
    'Zibata es un desarrollo maestro con áreas verdes, lago artificial, club de golf, '
    'centros comerciales, escuelas, hospital y acceso controlado las 24 hrs. '
    'Precio a tratar. Se aceptan ofertas. Solo recursos propios — no se aceptan créditos hipotecarios.',
  amenidades = ARRAY['Acceso controlado 24 hrs','Lago artificial','Club de golf','Áreas verdes','Escuelas y hospital cercanos']
WHERE clave_control = '68654';

-- 63242 · Casa en Bosques del Acueducto, Querétaro
UPDATE public.properties SET
  ubicacion  = 'Bosques del Acueducto, Querétaro',
  descripcion = 'Amplia casa habitación de dos niveles en el exclusivo fraccionamiento Bosques del Acueducto. '
    'Terreno de 232 m² y construcción de 362 m². Con escritura y posesión física. '
    'Zona residencial de alto nivel cerca del Acueducto histórico de Querétaro, '
    'con centros comerciales premium, colegios bilingües, hospitales privados '
    'y parques. Excelente plusvalía. '
    'Precio a tratar. Se aceptan ofertas. Solo recursos propios — no se aceptan créditos hipotecarios.',
  amenidades = ARRAY['Escritura','Fraccionamiento exclusivo','Cerca del Acueducto','Colegios y hospitales cercanos','Alta plusvalía']
WHERE clave_control = '63242';

-- 64436 · Casa en Fracc. Villas del Mesón, Querétaro
UPDATE public.properties SET
  ubicacion  = 'Fracc. Villas del Mesón, Querétaro',
  descripcion = 'Casa habitación en el prestigioso fraccionamiento Villas del Mesón. '
    'Con escritura y posesión física. Desarrollo de alto standing con acceso controlado, '
    'vigilancia privada, amplias áreas verdes y alberca. '
    'A minutos de centros comerciales, escuelas bilingües y hospitales privados. '
    'Precio a tratar. Se aceptan ofertas. Solo recursos propios — no se aceptan créditos hipotecarios.',
  amenidades = ARRAY['Escritura','Acceso controlado','Vigilancia privada','Alberca','Áreas verdes']
WHERE clave_control = '64436';

-- 65259 · Casa en Residencial Balvanera, Corregidora
UPDATE public.properties SET
  ubicacion  = 'Residencial Balvanera, Corregidora, Querétaro',
  descripcion = 'Majestuosa casa habitación en el exclusivo Residencial Balvanera. '
    'Terreno de 1,137 m² y construcción de 669 m². Con escritura y posesión física. '
    'Balvanera es uno de los fraccionamientos más exclusivos de Querétaro, con campo de golf, '
    'club house, vigilancia 24 hrs, lago, áreas deportivas y acceso controlado. '
    'Próximo a escuelas privadas de alto nivel, hospitales y centros comerciales. '
    'Precio a tratar. Se aceptan ofertas. Solo recursos propios — no se aceptan créditos hipotecarios.',
  amenidades = ARRAY['Campo de golf','Club house','Vigilancia 24 hrs','Lago','Áreas deportivas','Acceso controlado','Alta plusvalía']
WHERE clave_control = '65259';

-- 60474 · Terreno en Desarrollo Centro Sur, Querétaro
UPDATE public.properties SET
  ubicacion  = 'Desarrollo Centro Sur, Querétaro',
  descripcion = 'Terreno urbano habitacional de gran superficie: 4,230 m² en la zona de Desarrollo Centro Sur. '
    'Con escritura y posesión física. Ubicado en una de las zonas de mayor crecimiento '
    'e inversión de Querétaro, con excelente acceso vial, cerca de Periferico Sur, '
    'centros logísticos, comerciales y habitacionales. '
    'Ideal para desarrollo inmobiliario o inversión. '
    'Precio a tratar. Se aceptan ofertas. Solo recursos propios — no se aceptan créditos hipotecarios.',
  amenidades = ARRAY['Escritura','Gran superficie','Uso habitacional','Zona de alta inversión','Acceso vial superior']
WHERE clave_control = '60474';
