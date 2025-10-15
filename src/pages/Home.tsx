import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import PropertyList from "@/components/PropertyList";
import { Button } from "@/components/ui/button";
import { useFeaturedProperties } from "@/hooks/useProperties";
import heroBackground from "@/assets/hero-background.jpg";

const Home = () => {
  const navigate = useNavigate();
  const { data: featuredProperties = [], isLoading } = useFeaturedProperties();

  const handleSearch = (filters: any) => {
    navigate("/propiedades", { state: { filters } });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section
        className="relative h-[600px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroBackground})`,
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Encuentra tu hogar ideal
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Descubre las mejores propiedades en renta y venta en Querétaro
          </p>
          <div className="max-w-4xl mx-auto">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Propiedades destacadas</h2>
          <p className="text-xl text-muted-foreground">
            Las mejores oportunidades en bienes raíces
          </p>
        </div>
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">Cargando propiedades...</p>
          </div>
        ) : (
          <PropertyList properties={featuredProperties} />
        )}
        <div className="text-center mt-8">
          <Button
            size="lg"
            onClick={() => navigate("/propiedades")}
          >
            Ver todas las propiedades
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Tienes una propiedad para vender o rentar?</h2>
          <p className="text-xl text-muted-foreground mb-6">
            Contáctanos y te ayudamos a encontrar el comprador o inquilino perfecto
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/contacto")}
          >
            Contáctanos
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
