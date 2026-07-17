import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import SearchBar from "@/components/SearchBar";
import PropertyList from "@/components/PropertyList";
import { useFilteredProperties, PropertyFilters } from "@/hooks/useProperties";

const Propiedades = () => {
  const location = useLocation();
  const [filters, setFilters] = useState<PropertyFilters>({
    tipo: "todos",
    operacion: "todos",
    ubicacion: "",
    precioMax: "",
  });

  const { data: properties = [], isLoading } = useFilteredProperties(filters);

  useEffect(() => {
    if (location.state?.filters) {
      setFilters(location.state.filters);
    }
  }, [location.state]);

  const handleSearch = (newFilters: PropertyFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Propiedades en Venta en Querétaro | Orquídeas"
        description="Casas, departamentos y terrenos en venta en Querétaro. Encuentra tu propiedad ideal con Inmobiliaria Orquídeas. Trato directo, asesoría experta."
        path="/propiedades"
      />
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Todas las propiedades</h1>
          <p className="text-xl text-muted-foreground">
            {isLoading ? "Cargando..." : `${properties.length} propiedades disponibles`}
          </p>
        </div>

        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">Cargando propiedades...</p>
          </div>
        ) : (
          <PropertyList properties={properties} />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Propiedades;
