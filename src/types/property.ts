export interface Property {
  id: string;
  nome: string;
  tipo: "Casa" | "Terreno";
  preco: number;
  localizacao: string;
  imagemPrincipal: string;
  descricao: string;
  galeria: string[];
}
