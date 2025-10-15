import { MapPin, Bed, Bath, Maximize, Phone, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Property } from "@/hooks/useProperties";

interface PropertyDetailProps {
  property: Property;
}

const PropertyDetail = ({ property }: PropertyDetailProps) => {
  const imageUrl = property.imagenes && property.imagenes.length > 0 
    ? property.imagenes[0] 
    : "/images/placeholder.jpg";

  const formatPrice = (price: number, operation: string) => {
    return operation === "Renta"
      ? `$${price.toLocaleString()} MXN/mes`
      : `$${price.toLocaleString()} MXN`;
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hola, me interesa la propiedad: ${property.titulo}`
    );
    window.open(
      `https://wa.me/52${property.contacto_telefono}?text=${message}`,
      "_blank"
    );
  };

  return (
    <div className="space-y-8">
      {/* Galería de imágenes */}
      <div className="aspect-video w-full overflow-hidden rounded-xl">
        <img
          src={imageUrl}
          alt={property.titulo}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Información principal */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <div className="flex gap-2 mb-3">
              <Badge variant="secondary">{property.tipo}</Badge>
              <Badge>{property.operacion}</Badge>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {property.titulo}
            </h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-5 w-5" />
              <span className="text-lg">{property.ubicacion}</span>
            </div>
          </div>

          <div className="text-4xl font-bold text-primary">
            {formatPrice(property.precio, property.operacion)}
          </div>

          <div className="flex gap-6 py-4 border-y">
            {property.recamaras && (
              <div className="flex items-center gap-2">
                <Bed className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Recámaras</p>
                  <p className="font-semibold">{property.recamaras}</p>
                </div>
              </div>
            )}
            {property.banos && (
              <div className="flex items-center gap-2">
                <Bath className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Baños</p>
                  <p className="font-semibold">{property.banos}</p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Maximize className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Área</p>
                <p className="font-semibold">{property.area}m²</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">Descripción</h2>
            <p className="text-muted-foreground leading-relaxed">
              {property.descripcion}
            </p>
          </div>
        </div>

        {/* Tarjeta de contacto */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-xl font-semibold">Contacta al agente</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Agente</p>
                  <p className="font-medium">{property.contacto_nombre}</p>
                </div>
                <Button
                  onClick={handleWhatsApp}
                  className="w-full gap-2"
                  size="lg"
                >
                  <Phone className="h-4 w-4" />
                  WhatsApp
                </Button>
                <Button
                  variant="outline"
                  className="w-full gap-2"
                  size="lg"
                  asChild
                >
                  <a href={`mailto:${property.contacto_email}`}>
                    <Mail className="h-4 w-4" />
                    Enviar correo
                  </a>
                </Button>
                <div className="pt-4 border-t text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {property.contacto_telefono}
                  </p>
                  <p className="flex items-center gap-2 mt-1">
                    <Mail className="h-4 w-4" />
                    {property.contacto_email}
                  </p>
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
