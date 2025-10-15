import { Link, useLocation } from "react-router-dom";
import { Home, Search, Phone, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-primary" />
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-none text-foreground">C Trato Hecho</span>
              <span className="text-xs text-muted-foreground">Bienes Raíces</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/">
              <Button
                variant={isActive("/") ? "default" : "ghost"}
                size="sm"
                className="gap-2"
              >
                <Home className="h-4 w-4" />
                Inicio
              </Button>
            </Link>
            <Link to="/propiedades">
              <Button
                variant={isActive("/propiedades") ? "default" : "ghost"}
                size="sm"
                className="gap-2"
              >
                <Search className="h-4 w-4" />
                Propiedades
              </Button>
            </Link>
            <Link to="/contacto">
              <Button
                variant={isActive("/contacto") ? "default" : "ghost"}
                size="sm"
                className="gap-2"
              >
                <Phone className="h-4 w-4" />
                Contacto
              </Button>
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <Link to="/propiedades">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
