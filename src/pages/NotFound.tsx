import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, Search, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <p className="text-6xl font-bold text-[#b08c32]">404</p>
      <h1 className="mt-4 text-2xl font-semibold text-gray-800">
        Página no encontrada
      </h1>
      <p className="mt-2 max-w-md text-gray-500">
        La propiedad o página que buscas no existe o fue movida. Prueba con alguno de estos enlaces:
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild>
          <Link to="/">
            <Home className="mr-2 h-4 w-4" />
            Inicio
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/propiedades">
            <Search className="mr-2 h-4 w-4" />
            Ver propiedades
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/contacto">
            <Phone className="mr-2 h-4 w-4" />
            Contacto
          </Link>
        </Button>
      </div>

      <p className="mt-10 text-sm text-gray-400">
        Grupo Inmobiliario Orquídeas &mdash; Querétaro
      </p>
    </div>
  );
};

export default NotFound;
