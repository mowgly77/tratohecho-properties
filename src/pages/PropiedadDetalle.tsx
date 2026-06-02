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
