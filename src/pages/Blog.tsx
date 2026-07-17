import { Link } from "react-router-dom";
import { CalendarDays, Tag, ArrowRight, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import SEO from "@/components/SEO";
import { useBlogPosts } from "@/hooks/useBlog";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" });

const Blog = () => {
  const { data: posts, isLoading } = useBlogPosts();

  return (
    <>
      <SEO
        title="Blog Inmobiliario Querétaro | Guías y Consejos"
        description="Guías, consejos y artículos sobre compra, venta y renta de propiedades en Querétaro. Aprende a tomar mejores decisiones inmobiliarias con Orquídeas."
        path="/blog"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Blog Inmobiliario Orquídeas",
          "description": "Guías y consejos sobre el mercado inmobiliario en Querétaro.",
          "url": "https://inmobiliariaorquideas.com/blog",
          "publisher": {
            "@type": "Organization",
            "name": "Grupo Inmobiliario Orquídeas",
            "url": "https://inmobiliariaorquideas.com",
          },
        }}
      />
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-700 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <BookOpen className="h-10 w-10 text-amber-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Blog Inmobiliario
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Guías, consejos y artículos para tomar mejores decisiones al comprar,
            vender o rentar una propiedad en Querétaro.
          </p>
        </div>
      </section>

      {/* Artículos */}
      <section className="container mx-auto px-4 py-14">
        {isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-2xl bg-gray-100 h-64 animate-pulse" />
            ))}
          </div>
        )}

        {!isLoading && (!posts || posts.length === 0) && (
          <p className="text-center text-gray-500 py-20">Próximamente nuevos artículos.</p>
        )}

        {!isLoading && posts && posts.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group flex flex-col rounded-2xl border bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                {post.imagen_portada ? (
                  <Link to={`/blog/${post.slug}`}>
                    <img
                      src={post.imagen_portada}
                      alt={post.titulo}
                      loading="lazy"
                      className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-amber-400" />
                  </div>
                )}

                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                    {post.categoria && (
                      <span className="flex items-center gap-1">
                        <Tag className="h-3 w-3" /> {post.categoria}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <CalendarDays className="h-3 w-3" />
                      {formatDate(post.created_at)}
                    </span>
                  </div>

                  <h2 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-amber-700 transition-colors">
                    <Link to={`/blog/${post.slug}`}>{post.titulo}</Link>
                  </h2>

                  {post.meta_descripcion && (
                    <p className="text-sm text-gray-500 flex-1 line-clamp-3">
                      {post.meta_descripcion}
                    </p>
                  )}

                  <Link
                    to={`/blog/${post.slug}`}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-amber-700 hover:text-amber-900"
                  >
                    Leer artículo <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="bg-amber-50 border-t py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          ¿Listo para encontrar tu propiedad?
        </h2>
        <p className="text-gray-500 mb-6">
          Explora nuestras propiedades disponibles en Querétaro.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/propiedades"
            className="rounded-lg bg-amber-700 px-6 py-3 text-white font-medium hover:bg-amber-800 transition-colors"
          >
            Ver propiedades
          </Link>
          <Link
            to="/contacto"
            className="rounded-lg border border-amber-700 px-6 py-3 text-amber-700 font-medium hover:bg-amber-50 transition-colors"
          >
            Contáctanos
          </Link>
        </div>
      </section>
    </>
  );
};

export default Blog;
