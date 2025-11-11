import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, MapPin, Home, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getPropertyById, updateProperty, isAdmin } from "@/lib/storage";
import { Property } from "@/types/property";
import { toast } from "sonner";

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const adminLoggedIn = isAdmin();

  useEffect(() => {
    if (id) {
      const prop = getPropertyById(id);
      if (prop) {
        setProperty(prop);
        setSelectedImage(prop.imagemPrincipal);
      }
    }
  }, [id]);

  const handleAddImage = () => {
    if (!newImageUrl || !property) return;
    
    const updatedGallery = [...property.galeria, newImageUrl];
    updateProperty(property.id, { galeria: updatedGallery });
    
    setProperty({ ...property, galeria: updatedGallery });
    setNewImageUrl("");
    toast.success("Foto adicionada com sucesso!");
  };

  const handleRemoveImage = (imageUrl: string) => {
    if (!property) return;
    
    const updatedGallery = property.galeria.filter((img) => img !== imageUrl);
    updateProperty(property.id, { galeria: updatedGallery });
    
    setProperty({ ...property, galeria: updatedGallery });
    if (selectedImage === imageUrl) {
      setSelectedImage(property.imagemPrincipal);
    }
    toast.success("Foto removida com sucesso!");
  };

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Imóvel não encontrado</h2>
          <Button onClick={() => navigate("/")}>Voltar aos imóveis</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4">
        <Button
          onClick={() => navigate("/")}
          variant="outline"
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar aos imóveis
        </Button>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted">
              <img
                src={selectedImage}
                alt={property.nome}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {property.galeria.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img}
                    alt={`${property.nome} - ${index + 1}`}
                    onClick={() => setSelectedImage(img)}
                    className={`w-full aspect-square object-cover rounded cursor-pointer transition-all ${
                      selectedImage === img ? "ring-2 ring-primary" : "hover:opacity-80"
                    }`}
                  />
                  {adminLoggedIn && img !== property.imagemPrincipal && (
                    <button
                      onClick={() => handleRemoveImage(img)}
                      className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {adminLoggedIn && (
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-4">Adicionar Nova Foto</h3>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Label htmlFor="newImage" className="sr-only">URL da imagem</Label>
                      <Input
                        id="newImage"
                        placeholder="URL da nova foto"
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                      />
                    </div>
                    <Button onClick={handleAddImage}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                  {property.tipo}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-4">{property.nome}</h1>
              
              <div className="flex items-center gap-2 text-muted-foreground mb-6">
                <MapPin className="h-5 w-5" />
                <span className="text-lg">{property.localizacao}</span>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-primary">
                  R$ {property.preco.toLocaleString("pt-BR")}
                </span>
              </div>
            </div>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-3">Descrição</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {property.descricao}
                </p>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
