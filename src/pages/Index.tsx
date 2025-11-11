import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { PropertyCard } from "@/components/PropertyCard";
import { AdminPanel } from "@/components/AdminPanel";
import { LoginDialog } from "@/components/LoginDialog";
import { Button } from "@/components/ui/button";
import { getProperties, isAdmin } from "@/lib/storage";
import { Property } from "@/types/property";
import { Building2, Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";
import heroImage from "@/assets/hero-real-estate.jpg";

const Index = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const adminLoggedIn = isAdmin();

  const loadProperties = () => {
    setProperties(getProperties());
  };

  useEffect(() => {
    loadProperties();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header onAdminClick={() => setShowLoginDialog(true)} />
      <LoginDialog open={showLoginDialog} onOpenChange={setShowLoginDialog} />

      <section
        id="inicio"
        className="relative h-[600px] flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center text-white px-4 z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Encontre o Imóvel dos Seus Sonhos
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            As melhores opções de casas e terrenos para você
          </p>
          <Button size="lg" className="text-lg px-8 py-6" onClick={() => {
            document.getElementById("imoveis")?.scrollIntoView({ behavior: "smooth" });
          }}>
            Ver Imóveis
          </Button>
        </div>
      </section>

      {adminLoggedIn && (
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Painel Administrativo</h2>
            <div className="max-w-2xl mx-auto">
              <AdminPanel onPropertyAdded={loadProperties} />
            </div>
          </div>
        </section>
      )}

      <section id="imoveis" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Nossos Imóveis</h2>
          
          {properties.length === 0 ? (
            <div className="text-center py-12">
              <Building2 className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-xl text-muted-foreground">
                {adminLoggedIn
                  ? "Nenhum imóvel cadastrado. Adicione o primeiro imóvel acima!"
                  : "Nenhum imóvel disponível no momento."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onDelete={loadProperties}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="sobre" className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Sobre a Imobiliária Leon</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Há mais de 20 anos no mercado imobiliário, a Imobiliária Leon se destaca pela
              excelência no atendimento e pela qualidade dos imóveis que oferecemos. Nossa
              missão é ajudar você a encontrar o lar perfeito ou o investimento ideal.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Com uma equipe de profissionais qualificados e um portfólio diversificado,
              garantimos transparência, segurança e satisfação em cada negociação.
            </p>
          </div>
        </div>
      </section>

      <section id="contato" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Entre em Contato</h2>
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center p-6 rounded-lg bg-card border border-border">
                <Phone className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Telefone</h3>
                <p className="text-muted-foreground">(11) 98765-4321</p>
              </div>
              <div className="text-center p-6 rounded-lg bg-card border border-border">
                <Mail className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Email</h3>
                <p className="text-muted-foreground">contato@imobiliarialeon.com.br</p>
              </div>
              <div className="text-center p-6 rounded-lg bg-card border border-border">
                <MapPin className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Endereço</h3>
                <p className="text-muted-foreground">Av. Principal, 123 - Centro</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <div className="text-center p-6 rounded-lg bg-card border border-border">
                <Instagram className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Instagram</h3>
                <p className="text-muted-foreground">@imobiliarialeon</p>
              </div>
              <div className="text-center p-6 rounded-lg bg-card border border-border">
                <Facebook className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Facebook</h3>
                <p className="text-muted-foreground">/imobiliarialeon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-background py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            © 2025 Imobiliária Leon. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
