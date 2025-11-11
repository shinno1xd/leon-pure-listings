import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { addProperty } from "@/lib/storage";
import { toast } from "sonner";

interface AdminPanelProps {
  onPropertyAdded: () => void;
}

export const AdminPanel = ({ onPropertyAdded }: AdminPanelProps) => {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState<"Casa" | "Terreno">("Casa");
  const [preco, setPreco] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [imagemPrincipal, setImagemPrincipal] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nome || !preco || !localizacao || !imagemPrincipal || !descricao) {
      toast.error("Por favor, preencha todos os campos");
      return;
    }

    addProperty({
      nome,
      tipo,
      preco: parseFloat(preco),
      localizacao,
      imagemPrincipal,
      descricao,
      galeria: [],
    });

    toast.success("Imóvel adicionado com sucesso!");
    
    setNome("");
    setPreco("");
    setLocalizacao("");
    setImagemPrincipal("");
    setDescricao("");
    setTipo("Casa");
    
    onPropertyAdded();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Adicionar Novo Imóvel</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome do Imóvel</Label>
            <Input
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Casa no Centro"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tipo">Tipo</Label>
            <Select value={tipo} onValueChange={(value: "Casa" | "Terreno") => setTipo(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Casa">Casa</SelectItem>
                <SelectItem value="Terreno">Terreno</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="preco">Preço (R$)</Label>
            <Input
              id="preco"
              type="number"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              placeholder="350000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="localizacao">Localização</Label>
            <Input
              id="localizacao"
              value={localizacao}
              onChange={(e) => setLocalizacao(e.target.value)}
              placeholder="Ex: Centro, São Paulo - SP"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imagemPrincipal">URL da Imagem Principal</Label>
            <Input
              id="imagemPrincipal"
              type="url"
              value={imagemPrincipal}
              onChange={(e) => setImagemPrincipal(e.target.value)}
              placeholder="https://exemplo.com/imagem.jpg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descreva o imóvel..."
              rows={4}
            />
          </div>

          <Button type="submit" className="w-full">
            Adicionar Imóvel
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
