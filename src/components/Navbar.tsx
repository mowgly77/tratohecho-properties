import { Link, useLocation } from "react-router-dom";
import { Home, Search, Phone, LogIn, Shield, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/orquideas-logo.png";

const Navbar = () => {
  const location = useLocation();
  const { user, isAdmin } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Grupo Inmobiliario Orquídeas" className="h-14 w-auto" />
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
            <Link to="/blog">
              <Button
                variant={isActive("/blog") ? "default" : "ghost"}
                size="sm"
                className="gap-2"
              >
                <BookOpen className="h-4 w-4" />
                Blog
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
            {isAdmin && (
              <Link to="/admin">
                <Button
                  variant={isActive("/admin") ? "default" : "ghost"}
                  size="sm"
                  className="gap-2"
                >
                  <Shield className="h-4 w-4" />
                  Admin
                </Button>
              </Link>
            )}
            {!user && (
              <Link to="/auth">
                <Button variant="outline" size="sm" className="gap-2">
                  <LogIn className="h-4 w-4" />
                  Iniciar Sesión
                </Button>
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center gap-2">
            <Link to="/propiedades">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/blog">
              <Button variant="ghost" size="icon">
                <BookOpen className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
