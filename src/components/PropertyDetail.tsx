import { useState } from "react";
import {
  MapPin, Bed, Bath, Car, Maximize, Ruler, Phone, Mail, FileText, ShieldCheck, Check,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Property } from "@/hooks/useProperties";

interface PropertyDetailProps {
  property: Property;
}

const PropertyDetail = ({ property }: PropertyDetailProps) => {
  const images =
    property.imagenes && property.imagenes.length > 0
      ? property.imagenes
      : ["/images/placeholder.jpg"];
  const [active, setActive] = useState(0);

  const formatPrice = (price: number, operation: string) =>
    operation === "Renta"
      ? `$${price.toLocaleString()} MXN/mes`
      : `$${price.toLocaleString()} MXN`;

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hola, me interesa la propiedad: ${property.titulo}`
    );
    window.open(
      `https://wa.me/52${property.contacto_telefono}?text=${message}`,
      "_blank"
    );
  };

  const num = (v: number | null | undefined) =>
    v !== null && v !== undefined && v > 0;

  const specs = [
    num(property.area) && { icon: Maximize, label: "Terreno", value: `${property.area} m²` },
    num(property.m2_construccion) && { icon: Ruler, label: "Construcción", value: `${property.m2_construccion} m²` },
    num(property.recamaras) && { icon: Bed, label: "Recámaras", value: property.recamaras },
    num(property.banos) && { icon: Bath, label: "Baños", value: property.banos },
    num(property.estacionamientos) && { icon: Car, label: "Estacionamiento", value: property.estacionamientos },
  ].filter(Boolean) as { icon: typeof Bed; label: string; value: string | number }[];

  const detalles = [
    property.tipo && { label: "Tipo", value: property.tipo },
    property.operacion && { label: "Operación", value: property.operacion },
    property.con_escritura && { label: "Documentación", value: property.con_escritura },
    property.posesion_fisica && { label: "Posesión física", value: property.posesion_fisica },
    property.clave_control && { label: "Clave", value: property.clave_control },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div className="space-y-8">
      {/* Galería */}
      <div className="space-y-3">
        <div className="aspect-video w-full overflow-hidden rounded-xl bg-muted">
          <img
            src={images[active]}
            alt={property.titulo}
            className="w-full h-full object-cover"
          />
        </div>
        {images.length > 1 && (
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`aspect-video overflow-hidden rounded-md border-2 transition ${
                  i === active ? "border-accent" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <img src={img} alt={`Foto ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Información principal */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex gap-2 mb-3">
              <Badge variant="secondary">{property.tipo}</Badge>
              <Badge>{property.operacion}</Badge>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{property.titulo}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-5 w-5" />
              <span className="text-lg">{property.ubicacion}</span>
            </div>
          </div>

          <div>
            <div className="text-4xl font-bold text-primary">
              {formatPrice(property.precio, property.operacion)}
            </div>
            <p className="text-sm text-muted-foreground italic mt-1">Precio a evaluar en oferta</p>
          </div>

          {/* Ficha técnica: specs con íconos */}
          {specs.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {specs.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center text-center gap-1 rounded-lg border bg-card p-4"
                >
                  <s.icon className="h-6 w-6 text-accent" />
                  <p className="text-lg font-semibold leading-none">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          )}

          {/* Amenidades */}
          {property.amenidades && property.amenidades.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3">Amenidades</h2>
              <div className="flex flex-wrap gap-2">
                {property.amenidades.map((a) => (
                  <Badge key={a} variant="outline" className="gap-1 py-1.5 px-3">
                    <Check className="h-3.5 w-3.5 text-accent" />
                    {a}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Descripción */}
          <div>
            <h2 className="text-2xl font-semibold mb-3">Descripción</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {property.descripcion}
            </p>
          </div>

          {/* Detalles */}
          {detalles.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3">Detalles</h2>
              <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
                {detalles.map((d) => (
                  <div key={d.label} className="flex justify-between border-b py-2 text-sm">
                    <dt className="text-muted-foreground">{d.label}</dt>
                    <dd className="font-medium text-right">{d.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>

        {/* Tarjeta de contacto */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-xl font-semibold">Contacta al asesor</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Asesor</p>
                  <p className="font-medium">{property.contacto_nombre}</p>
                </div>
                <Button onClick={handleWhatsApp} className="w-full gap-2" size="lg">
                  <Phone className="h-4 w-4" />
                  WhatsApp
                </Button>
                <Button variant="outline" className="w-full gap-2" size="lg" asChild>
                  <a href={`mailto:${property.contacto_email}`}>
                    <Mail className="h-4 w-4" />
                    Enviar correo
                  </a>
                </Button>
                <div className="pt-4 border-t text-sm text-muted-foreground space-y-1">
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {property.contacto_telefono}
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {property.contacto_email}
                  </p>
                  {property.con_escritura && (
                    <p className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      {property.con_escritura}
                    </p>
                  )}
                  {property.posesion_fisica && (
                    <p className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4" />
                      Posesión física: {property.posesion_fisica}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
