import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import PropertyList from "@/components/PropertyList";
import mockProperties from "@/data/mockProperties.json";

const Propiedades = () => {
  const location = useLocation();
  const [filteredProperties, setFilteredProperties] = useState(mockProperties);

  useEffect(() => {
    if (location.state?.filters) {
      handleSearch(location.state.filters);
    }
  }, [location.state]);

  const handleSearch = (filters: {
    tipo: string;
    operacion: string;
    ubicacion: string;
    precioMax: string;
  }) => {
    let filtered = [...mockProperties];

    if (filters.tipo && filters.tipo !== "todos") {
      filtered = filtered.filter((p) => p.tipo === filters.tipo);
    }

    if (filters.operacion && filters.operacion !== "todos") {
      filtered = filtered.filter((p) => p.operacion === filters.operacion);
    }

    if (filters.ubicacion) {
      filtered = filtered.filter((p) =>
        p.ubicacion.toLowerCase().includes(filters.ubicacion.toLowerCase())
      );
    }

    if (filters.precioMax) {
      const maxPrice = parseFloat(filters.precioMax);
      filtered = filtered.filter((p) => p.precio <= maxPrice);
    }

    setFilteredProperties(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Todas las propiedades</h1>
          <p className="text-xl text-muted-foreground">
            {filteredProperties.length} propiedades disponibles
          </p>
        </div>

        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        <PropertyList properties={filteredProperties} />
      </div>

      <Footer />
    </div>
  );
};

export default Propiedades;
