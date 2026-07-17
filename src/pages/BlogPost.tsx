import { useParams, Link } from "react-router-dom";
import { CalendarDays, Tag, ArrowLeft, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import { useBlogPost } from "@/hooks/useBlog";
import OptimizedImage from "@/components/ui/OptimizedImage";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" });

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, isError } = useBlogPost(slug ?? "");

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center text-gray-400 animate-pulse">
          Cargando artículo…
        </div>
      </>
    );
  }

  if (isError || !post) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-700 mb-4">Artículo no encontrado</h1>
          <Link to="/blog" className="text-amber-700 underline">Volver al blog</Link>
        </div>
      </>
    );
  }

  const canonicalUrl = `https://inmobiliariaorquideas.com/blog/${post.slug}`;
  const ogImage = post.imagen_portada
    ? (post.imagen_portada.startsWith("http") ? post.imagen_portada : `https://inmobiliariaorquideas.com${post.imagen_portada}`)
    : "https://inmobiliariaorquideas.com/og-image.jpg";

  return (
    <>
      <SEO
        title={post.titulo}
        description={post.meta_descripcion ?? post.titulo}
        path={`/blog/${post.slug}`}
        image={ogImage}
        type="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": post.titulo,
          "description": post.meta_descripcion,
          "image": ogImage,
          "datePublished": post.created_at,
          "dateModified": post.updated_at,
          "url": canonicalUrl,
          "author": {
            "@type": "Person",
            "name": post.autor ?? "Grupo Inmobiliario Orquídeas",
            "url": "https://inmobiliariaorquideas.com/blog",
          },
          "publisher": {
            "@type": "Organization",
            "name": "Grupo Inmobiliario Orquídeas",
            "logo": {
              "@type": "ImageObject",
              "url": "https://inmobiliariaorquideas.com/apple-touch-icon.png",
            },
          },
          "mainEntityOfPage": { "@type": "WebPage", "@id": canonicalUrl },
        }}
      />
      <Navbar />

      {/* Breadcrumb */}
      <div className="border-b bg-gray-50">
        <div className="container mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-amber-700">Inicio</Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-amber-700">Blog</Link>
          <span>/</span>
          <span className="text-gray-700 truncate max-w-xs">{post.titulo}</span>
        </div>
      </div>

      <article className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Categoría y fecha */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
          {post.categoria && (
            <span className="flex items-center gap-1 bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-medium">
              <Tag className="h-3 w-3" /> {post.categoria}
            </span>
          )}
          <span className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4" /> {formatDate(post.created_at)}
          </span>
          {post.autor && (
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" /> {post.autor}
            </span>
          )}
        </div>

        {/* Título H1 */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
          {post.titulo}
        </h1>

        {/* Imagen portada */}
        {post.imagen_portada && (
          <OptimizedImage
            src={post.imagen_portada}
            alt={post.titulo}
            fetchPriority="high"
            className="w-full rounded-2xl mb-8 object-cover max-h-80"
          />
        )}

        {/* Contenido HTML */}
        <div
          className="prose prose-slate prose-lg max-w-none
            prose-headings:font-bold prose-headings:text-gray-800
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-gray-700 prose-p:leading-relaxed
            prose-li:text-gray-700
            prose-strong:text-gray-900
            prose-a:text-amber-700 prose-a:underline"
          dangerouslySetInnerHTML={{ __html: post.contenido }}
        />

        {/* Aviso legal si aplica */}
        <div className="mt-12 p-4 bg-gray-50 rounded-xl border text-sm text-gray-500">
          <strong>Aviso:</strong> Este contenido es informativo y no sustituye la asesoría de un abogado, notario o profesional inmobiliario respecto de su situación específica.
        </div>

        {/* Volver + CTA */}
        <div className="mt-10 flex flex-wrap gap-4 items-center justify-between border-t pt-8">
          <Link to="/blog" className="flex items-center gap-2 text-amber-700 font-medium hover:text-amber-900">
            <ArrowLeft className="h-4 w-4" /> Volver al blog
          </Link>
          <div className="flex gap-3">
            <Link
              to="/propiedades"
              className="rounded-lg bg-amber-700 px-5 py-2 text-white font-medium hover:bg-amber-800 transition-colors text-sm"
            >
              Ver propiedades
            </Link>
            <Link
              to="/contacto"
              className="rounded-lg border border-amber-700 px-5 py-2 text-amber-700 font-medium hover:bg-amber-50 transition-colors text-sm"
            >
              Contáctanos
            </Link>
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogPost;
