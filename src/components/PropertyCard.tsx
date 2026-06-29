import { Link } from "react-router-dom";
import { MapPin, Bed, Bath, Maximize } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Property } from "@/hooks/useProperties";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const formatPrice = (price: number, operation: string) => {
    return operation === "Renta" 
      ? `$${price.toLocaleString()}/mes`
      : `$${price.toLocaleString()}`;
  };

  const imageUrl = property.imagenes && property.imagenes.length > 0 
    ? property.imagenes[0] 
    : "/images/placeholder.jpg";

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={imageUrl}
          alt={property.titulo}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant="secondary" className="bg-background/90">
            {property.tipo}
          </Badge>
          <Badge className="bg-primary/90">
            {property.operacion}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg line-clamp-2 text-foreground">
            {property.titulo}
          </h3>
        </div>
        
        <div className="flex items-center gap-1 text-muted-foreground mb-3">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{property.ubicacion}</span>
        </div>

        <div className="flex gap-4 mb-4 text-sm text-muted-foreground">
          {property.recamaras && (
            <div className="flex items-center gap-1">
              <Bed className="h-4 w-4" />
              <span>{property.recamaras}</span>
            </div>
          )}
          {property.banos && (
            <div className="flex items-center gap-1">
              <Bath className="h-4 w-4" />
              <span>{property.banos}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Maximize className="h-4 w-4" />
            <span>{property.area}m²</span>
          </div>
        </div>

        <p className="text-2xl font-bold text-primary">
          {formatPrice(property.precio, property.operacion)}
        </p>
        <p className="text-xs text-muted-foreground italic">Precio a evaluar en oferta</p>
      </CardContent>

      <CardFooter className="p-5 pt-0">
        <Link to={`/propiedad/${property.slug}`} className="w-full">
          <Button className="w-full" variant="outline">
            Ver detalles
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
