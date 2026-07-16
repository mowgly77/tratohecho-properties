import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import PropertyDetail from "@/components/PropertyDetail";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useProperty } from "@/hooks/useProperties";

const PropiedadDetalle = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data: property, isLoading } = useProperty(slug);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-xl text-muted-foreground">Cargando propiedad...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Propiedad no encontrada</h1>
            <Button onClick={() => navigate("/propiedades")}>
              Ver todas las propiedades
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={`${property.titulo} en ${property.ubicacion}`}
        description={property.descripcion?.slice(0, 155) || `${property.titulo} en ${property.ubicacion}, Querétaro. ${property.operacion} con Grupo Inmobiliario Orquídeas.`}
        path={`/propiedad/${property.slug}`}
        image={property.imagenes?.[0]}
        type="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "RealEstateListing",
          "name": property.titulo,
          "description": property.descripcion,
          "url": `https://inmobiliariaorquideas.com/propiedad/${property.slug}`,
          "image": property.imagenes?.map((img: string) =>
            img.startsWith("http") ? img : `https://inmobiliariaorquideas.com${img}`
          ) ?? [],
          "offers": {
            "@type": "Offer",
            "price": property.precio,
            "priceCurrency": "MXN",
            "availability": "https://schema.org/InStock",
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": property.ubicacion,
            "addressLocality": "Querétaro",
            "addressRegion": "Querétaro",
            "addressCountry": "MX",
          },
          ...(property.recamaras && { "numberOfRooms": property.recamaras }),
          ...(property.banos && { "numberOfBathroomsTotal": property.banos }),
          ...(property.m2_construccion && {
            "floorSize": {
              "@type": "QuantitativeValue",
              "value": property.m2_construccion,
              "unitCode": "MTK",
            },
          }),
          "seller": {
            "@type": "RealEstateAgent",
            "name": "Grupo Inmobiliario Orquídeas",
            "telephone": `+52${property.contacto_telefono}`,
            "url": "https://inmobiliariaorquideas.com",
          },
        }}
      />
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6 gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Button>
        
        <PropertyDetail property={property} />
      </div>

      <Footer />
    </div>
  );
};

export default PropiedadDetalle;
