import PropertyCard from "./PropertyCard";

interface Property {
  id: string;
  titulo: string;
  tipo: string;
  operacion: string;
  precio: number;
  ubicacion: string;
  descripcion: string;
  recamaras?: number;
  banos?: number;
  area: number;
  imagenes: string[];
}

interface PropertyListProps {
  properties: Property[];
}

const PropertyList = ({ properties }: PropertyListProps) => {
  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-muted-foreground">
          No se encontraron propiedades con los criterios seleccionados
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export default PropertyList;
