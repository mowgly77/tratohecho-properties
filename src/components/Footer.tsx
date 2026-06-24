import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/orquideas-logo.png.asset.json";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo y descripción */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="h-8 w-8" />
              <div>
                <h3 className="font-bold text-lg">Inmobiliaria Orquídeas</h3>
                <p className="text-sm opacity-90">Querétaro</p>
              </div>
            </div>
            <p className="text-sm opacity-80">
              Tu socio de confianza en bienes raíces en Querétaro. Encuentra la
              propiedad perfecta para ti y tu familia en la ciudad de Querétaro.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="font-semibold mb-4">Enlaces rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="opacity-80 hover:opacity-100 transition-opacity">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/propiedades" className="opacity-80 hover:opacity-100 transition-opacity">
                  Propiedades
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="opacity-80 hover:opacity-100 transition-opacity">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Información de contacto */}
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 opacity-80">
                <Phone className="h-4 w-4" />
                <span>442 170 3205</span>
              </li>
              <li className="flex items-center gap-2 opacity-80">
                <Mail className="h-4 w-4" />
                <span>jorge@ctratohecho.mx</span>
              </li>
              <li className="flex items-start gap-2 opacity-80">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>Querétaro, México</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm opacity-80">
          <p>&copy; {new Date().getFullYear()} Inmobiliaria Orquídeas Querétaro. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
