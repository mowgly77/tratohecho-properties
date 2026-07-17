import { useState, useEffect } from "react";
import {
  MapPin, Bed, Bath, Car, Maximize, Ruler, Phone, Mail, FileText, ShieldCheck, Check, X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Property } from "@/hooks/useProperties";
import { analytics } from "@/lib/analytics";
import OptimizedImage from "@/components/ui/OptimizedImage";

interface PropertyDetailProps {
  property: Property;
}

const PropertyDetail = ({ property }: PropertyDetailProps) => {
  const images =
    property.imagenes && property.imagenes.length > 0
      ? property.imagenes
      : ["/images/placeholder.jpg"];
  const [active, setActive] = useState(0);
  const [modal, setModal] = useState<number | null>(null);

  const formatPrice = (price: number, operation: string) =>
    operation === "Renta"
      ? `$${price.toLocaleString()} MXN/mes`
      : `$${price.toLocaleString()} MXN`;

  useEffect(() => {
    analytics.propertyView(property.titulo, property.clave_control ?? "", property.precio ?? 0, property.tipo ?? "");
  }, [property.clave_control]);

  const handleWhatsApp = () => {
    analytics.whatsappClick(property.titulo, property.clave_control ?? "");
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
      {/* Foto principal — protegida contra descarga */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted select-none">
        <OptimizedImage
          src={images[0]}
          alt={property.titulo}
          fetchPriority="high"
          className="w-full h-full object-cover pointer-events-none"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
        />
        {/* Overlay transparente bloquea clic derecho y arrastre */}
        <div className="absolute inset-0" onContextMenu={(e) => e.preventDefault()} />
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
            <p className="text-sm text-muted-foreground italic mt-1">Precio a tratar · Se aceptan ofertas</p>
            <p className="text-xs text-muted-foreground mt-1">Solo recursos propios · No se aceptan créditos hipotecarios</p>
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
                <Button variant="outline" className="w-full gap-2" size="lg" asChild onClick={() => analytics.phoneClick(property.titulo, property.clave_control ?? "")}>
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

      {/* Galería de fotos adicionales */}
      {images.length > 1 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Fotos</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {images.slice(1).map((img, i) => (
              <button
                key={i}
                onClick={() => { analytics.galleryOpen(property.titulo, property.clave_control ?? ""); setModal(i + 1); }}
                className="relative aspect-video overflow-hidden rounded-lg border hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-accent select-none"
                onContextMenu={(e) => e.preventDefault()}
              >
                <OptimizedImage src={img} alt={`${property.titulo} — foto ${i + 2}`} loading="lazy" className="w-full h-full object-cover pointer-events-none" draggable={false} />
                <div className="absolute inset-0" onContextMenu={(e) => e.preventDefault()} />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      {modal !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setModal(null)}
        >
          <button
            className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/80 transition"
            onClick={() => setModal(null)}
          >
            <X className="h-6 w-6" />
          </button>
          <div className="flex items-center gap-4 px-4 max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              className="text-white bg-black/50 rounded-full p-2 hover:bg-black/80 transition disabled:opacity-30"
              onClick={() => setModal((m) => (m! > 1 ? m! - 1 : images.length - 1))}
            >
              ‹
            </button>
            <div className="relative select-none" onContextMenu={(e) => e.preventDefault()}>
              <img
                src={images[modal]}
                alt={`Foto ${modal + 1}`}
                className="max-h-[85vh] max-w-full rounded-xl object-contain mx-auto pointer-events-none"
                draggable={false}
              />
              <div className="absolute inset-0 rounded-xl" onContextMenu={(e) => e.preventDefault()} />
            </div>
            <button
              className="text-white bg-black/50 rounded-full p-2 hover:bg-black/80 transition disabled:opacity-30"
              onClick={() => setModal((m) => (m! < images.length - 1 ? m! + 1 : 1))}
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;
