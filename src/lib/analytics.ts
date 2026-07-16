// Wrapper de Google Analytics 4 — todos los eventos del sitio pasan por aquí
declare function gtag(...args: unknown[]): void;

const track = (event: string, params?: Record<string, unknown>) => {
  if (typeof gtag === "undefined") return;
  gtag("event", event, params);
};

export const analytics = {
  // Propiedad vista en listado → hizo clic para ver detalle
  propertyClick: (titulo: string, claveControl: string) =>
    track("select_content", {
      content_type: "property",
      content_id: claveControl,
      item_id: claveControl,
      item_name: titulo,
    }),

  // Página de detalle de propiedad cargada
  propertyView: (titulo: string, claveControl: string, precio: number, tipo: string) =>
    track("view_item", {
      currency: "MXN",
      value: precio,
      items: [{ item_id: claveControl, item_name: titulo, item_category: tipo, price: precio }],
    }),

  // Clic en botón de WhatsApp
  whatsappClick: (titulo: string, claveControl: string) =>
    track("contact", {
      method: "whatsapp",
      content_id: claveControl,
      item_name: titulo,
    }),

  // Clic en teléfono
  phoneClick: (titulo: string, claveControl: string) =>
    track("contact", {
      method: "phone",
      content_id: claveControl,
      item_name: titulo,
    }),

  // Formulario de contacto enviado
  contactFormSubmit: (nombre: string) =>
    track("generate_lead", {
      method: "contact_form",
      user_name: nombre,
    }),

  // Galería abierta
  galleryOpen: (titulo: string, claveControl: string) =>
    track("view_item_list", {
      item_list_name: "gallery",
      content_id: claveControl,
      item_name: titulo,
    }),

  // Búsqueda / filtro aplicado en listado
  search: (query: string) =>
    track("search", { search_term: query }),

  // CTA "Ver propiedades" en home
  heroCta: () =>
    track("select_promotion", {
      promotion_name: "hero_cta",
      creative_name: "ver_propiedades",
    }),
};
