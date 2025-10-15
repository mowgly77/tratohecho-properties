# C Trato Hecho Bienes Raíces

## 🏠 Propósito
Catálogo moderno de propiedades en renta y venta en Querétaro, México. Plataforma escalable y profesional diseñada para conectar a compradores e inquilinos con las mejores oportunidades inmobiliarias.

## 🚀 Stack Tecnológico
- **Frontend**: React 18 + Vite + TypeScript
- **Estilos**: TailwindCSS + shadcn/ui
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod
- **Base de datos** (futuro): Supabase
- **CMS** (futuro): Strapi
- **Hosting**: Lovable / Vercel

## ✨ Características
- ✅ Catálogo de propiedades con imágenes profesionales
- ✅ Buscador avanzado con filtros (tipo, operación, ubicación, precio)
- ✅ Páginas de detalle completas con galería
- ✅ Formulario de contacto validado
- ✅ Diseño responsive y moderno
- ✅ SEO optimizado
- ✅ Integración con WhatsApp para contacto directo
- ⏳ Panel de administración (en desarrollo)
- ⏳ Conexión con Supabase (pendiente)
- ⏳ Integración con Strapi CMS (pendiente)

## 📦 Instalación

```sh
# Clonar el repositorio
git clone <YOUR_GIT_URL>

# Navegar al directorio
cd c-trato-hecho

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

## 🔐 Variables de entorno
Crea un archivo `.env` en la raíz del proyecto (cuando conectes Supabase):

```env
VITE_SUPABASE_URL=tu_supabase_url
VITE_SUPABASE_ANON_KEY=tu_supabase_anon_key
```

## 📂 Estructura del proyecto

```
src/
├─ components/
│   ├─ Navbar.tsx              # Navegación principal
│   ├─ SearchBar.tsx           # Buscador de propiedades
│   ├─ PropertyCard.tsx        # Tarjeta de propiedad
│   ├─ PropertyList.tsx        # Lista de propiedades
│   ├─ PropertyDetail.tsx      # Detalle de propiedad
│   ├─ ContactForm.tsx         # Formulario de contacto
│   └─ Footer.tsx              # Pie de página
├─ pages/
│   ├─ Home.tsx                # Página principal
│   ├─ Propiedades.tsx         # Catálogo completo
│   ├─ PropiedadDetalle.tsx    # Detalle individual
│   ├─ Contacto.tsx            # Página de contacto
│   └─ Admin.tsx               # Panel admin (placeholder)
├─ lib/
│   └─ supabaseClient.ts       # Cliente de Supabase
├─ data/
│   └─ mockProperties.json     # Datos de ejemplo
└─ assets/                     # Imágenes generadas
```

## 🎨 Personalización
El diseño utiliza un sistema de tokens semánticos definido en:
- `src/index.css` - Variables CSS personalizadas
- `tailwind.config.ts` - Configuración de Tailwind

Colores principales:
- Primary: Verde esmeralda profesional
- Secondary: Verde suave
- Accent: Verde vibrante

## 🗺️ Roadmap
- [x] Diseño y estructura base
- [x] Catálogo inicial con mock data
- [x] Sistema de búsqueda y filtros
- [x] Páginas de detalle
- [x] Formulario de contacto
- [ ] Integración con Supabase
- [ ] Autenticación de usuarios
- [ ] Panel de administración funcional
- [ ] Conexión con Strapi CMS
- [ ] Sistema de favoritos
- [ ] Comparador de propiedades
- [ ] Deploy en producción

## 📱 Contacto
- **Teléfono**: 442 170 3205
- **Email**: jorge@ctratohecho.mx
- **Ubicación**: Querétaro, México

## 📄 Licencia
© 2025 C Trato Hecho Bienes Raíces. Todos los derechos reservados.

---

**Desarrollado con ❤️ usando Lovable**
