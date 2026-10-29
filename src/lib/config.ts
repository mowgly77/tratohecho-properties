/**
 * Flags del sitio.
 *
 * VITE_MOSTRAR_TODAS
 *   - "true" (default): se muestran TODAS las propiedades activas, incluidas
 *     las que aún no tienen fotos (usan /images/placeholder.jpg).
 *   - "false": solo se muestran las propiedades que ya tienen fotos.
 *
 * Se configura en Vercel → Settings → Environment Variables y requiere
 * un nuevo deploy para tomar efecto.
 */
export const MOSTRAR_TODAS =
  (import.meta.env.VITE_MOSTRAR_TODAS ?? "true").toString().toLowerCase() !== "false";
