import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MOSTRAR_TODAS } from "@/lib/config";

export interface Property {
  id: string;
  titulo: string;
  tipo: string;
  operacion: string;
  precio: number;
  ubicacion: string;
  descripcion: string;
  recamaras: number | null;
  banos: number | null;
  area: number;
  imagenes: string[];
  destacada: boolean;
  activa: boolean;
  contacto_nombre: string;
  contacto_telefono: string;
  contacto_email: string;
  slug: string;
  clave_control: string | null;
  estacionamientos: number | null;
  m2_construccion: number | null;
  amenidades: string[] | null;
  con_escritura: string | null;
  posesion_fisica: string | null;
  vendida?: boolean | null;
  created_at: string;
  updated_at: string;
}

/** Aplica el flag MOSTRAR_TODAS: si está apagado, oculta las propiedades sin fotos. */
const aplicarFlagFotos = (props: Property[]) =>
  MOSTRAR_TODAS
    ? props
    : props.filter((p) => Array.isArray(p.imagenes) && p.imagenes.length > 0);

export const useProperties = () => {
  return useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("activa", true)
        .order("destacada", { ascending: false })
        .order("created_at", { ascending: false });

      if (error) throw error;
      return aplicarFlagFotos(data as Property[]);
    },
  });
};

export const useFeaturedProperties = () => {
  return useQuery({
    queryKey: ["properties", "featured"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("activa", true)
        .order("destacada", { ascending: false })
        .order("created_at", { ascending: false });

      if (error) throw error;
      // En el Home, primero las que tienen fotos (sort estable: respeta destacada/fecha)
      const tieneFotos = (p: Property) => (p.imagenes?.length ?? 0) > 0 ? 0 : 1;
      return aplicarFlagFotos(data as Property[])
        .sort((a, b) => tieneFotos(a) - tieneFotos(b))
        .slice(0, 6);
    },
  });
};

export const useProperty = (slug: string | undefined) => {
  return useQuery({
    queryKey: ["properties", slug],
    queryFn: async () => {
      if (!slug) return null;
      
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("slug", slug)
        .eq("activa", true)
        .maybeSingle();

      if (error) throw error;
      return data as Property | null;
    },
    enabled: !!slug,
  });
};

export interface PropertyFilters {
  tipo?: string;
  operacion?: string;
  ubicacion?: string;
  precioMax?: string;
}

export const useFilteredProperties = (filters: PropertyFilters) => {
  return useQuery({
    queryKey: ["properties", "filtered", filters],
    queryFn: async () => {
      let query = supabase
        .from("properties")
        .select("*")
        .eq("activa", true);

      if (filters.tipo && filters.tipo !== "todos") {
        query = query.eq("tipo", filters.tipo);
      }

      if (filters.operacion && filters.operacion !== "todos") {
        query = query.eq("operacion", filters.operacion);
      }

      if (filters.ubicacion) {
        query = query.ilike("ubicacion", `%${filters.ubicacion}%`);
      }

      if (filters.precioMax) {
        const maxPrice = parseFloat(filters.precioMax);
        query = query.lte("precio", maxPrice);
      }

      query = query.order("destacada", { ascending: false })
                   .order("created_at", { ascending: false });

      const { data, error } = await query;

      if (error) throw error;
      return aplicarFlagFotos(data as Property[]);
    },
  });
};
