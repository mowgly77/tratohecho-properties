import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface BlogPost {
  id: string;
  titulo: string;
  slug: string;
  meta_descripcion: string | null;
  contenido: string;
  imagen_portada: string | null;
  categoria: string | null;
  autor: string | null;
  publicado: boolean;
  created_at: string;
  updated_at: string;
}

export const useBlogPosts = () =>
  useQuery<BlogPost[]>({
    queryKey: ["blog_posts"],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("blog_posts")
        .select("id,titulo,slug,meta_descripcion,imagen_portada,categoria,autor,created_at")
        .eq("publicado", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

export const useBlogPost = (slug: string) =>
  useQuery<BlogPost>({
    queryKey: ["blog_post", slug],
    enabled: !!slug,
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("publicado", true)
        .single();
      if (error) throw error;
      return data;
    },
  });
