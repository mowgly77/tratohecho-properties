import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Database, Settings, FileText } from "lucide-react";

const Admin = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12 flex-1">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Panel de Administración</h1>
          <p className="text-xl text-muted-foreground mb-12">
            Próximamente: Gestión de propiedades con Supabase
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2 border-dashed">
              <CardContent className="p-8 text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Database className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Supabase</h3>
                <p className="text-muted-foreground">
                  Conexión a base de datos para gestionar propiedades en tiempo real
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-dashed">
              <CardContent className="p-8 text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">CMS Strapi</h3>
                <p className="text-muted-foreground">
                  Sistema de gestión de contenidos para administrar el catálogo
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-dashed md:col-span-2">
              <CardContent className="p-8 text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Funcionalidades futuras</h3>
                <ul className="text-muted-foreground space-y-2 max-w-md mx-auto text-left">
                  <li>• Crear, editar y eliminar propiedades</li>
                  <li>• Gestión de imágenes y galerías</li>
                  <li>• Sistema de autenticación de usuarios</li>
                  <li>• Dashboard con estadísticas</li>
                  <li>• Gestión de consultas y mensajes</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Admin;
