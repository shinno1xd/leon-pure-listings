import { MapPin, Home, Trash2 } from "lucide-react";
import { Property } from "@/types/property";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useNavigate } from "react-router-dom";
import { isAdmin, deleteProperty } from "@/lib/storage";

interface PropertyCardProps {
  property: Property;
  onDelete?: () => void;
}

export const PropertyCard = ({ property, onDelete }: PropertyCardProps) => {
  const navigate = useNavigate();
  const adminLoggedIn = isAdmin();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Tem certeza que deseja remover ${property.nome}?`)) {
      deleteProperty(property.id);
      onDelete?.();
    }
  };

  return (
    <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300">
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg aspect-[4/3]">
          <img
            src={property.imagemPrincipal}
            alt={property.nome}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
            {property.tipo}
          </div>
        </div>
        
        <div className="p-4 space-y-3">
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {property.nome}
          </h3>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{property.localizacao}</span>
          </div>
          
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-primary">
              R$ {property.preco.toLocaleString("pt-BR")}
            </span>
          </div>
          
          <div className="flex gap-2 pt-2">
            <Button
              onClick={() => navigate(`/detalhes/${property.id}`)}
              className="flex-1"
              variant="default"
            >
              Ver Detalhes
            </Button>
            {adminLoggedIn && (
              <Button
                onClick={handleDelete}
                variant="destructive"
                size="icon"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
