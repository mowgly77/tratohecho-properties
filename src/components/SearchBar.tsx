import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchBarProps {
  onSearch: (filters: {
    tipo: string;
    operacion: string;
    ubicacion: string;
    precioMax: string;
  }) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [tipo, setTipo] = useState("todos");
  const [operacion, setOperacion] = useState("todos");
  const [ubicacion, setUbicacion] = useState("");
  const [precioMax, setPrecioMax] = useState("");

  const handleSearch = () => {
    onSearch({ tipo, operacion, ubicacion, precioMax });
  };

  return (
    <div className="bg-card rounded-xl shadow-lg p-6 border">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Select value={tipo} onValueChange={setTipo}>
          <SelectTrigger>
            <SelectValue placeholder="Tipo de propiedad" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="Casa">Casa</SelectItem>
            <SelectItem value="Departamento">Departamento</SelectItem>
            <SelectItem value="Terreno">Terreno</SelectItem>
          </SelectContent>
        </Select>

        <Select value={operacion} onValueChange={setOperacion}>
          <SelectTrigger>
            <SelectValue placeholder="Operación" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todas</SelectItem>
            <SelectItem value="Venta">Venta</SelectItem>
            <SelectItem value="Renta">Renta</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="Ubicación"
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
          className="col-span-1"
        />

        <Input
          type="number"
          placeholder="Precio máximo"
          value={precioMax}
          onChange={(e) => setPrecioMax(e.target.value)}
          className="col-span-1"
        />

        <Button onClick={handleSearch} className="gap-2">
          <Search className="h-4 w-4" />
          Buscar
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
