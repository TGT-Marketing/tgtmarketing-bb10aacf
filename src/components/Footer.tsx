import { MapPin, Phone, Instagram, Facebook } from "lucide-react";
import logoTgt from "@/assets/logo-tgt.png";

const Footer = () => {
  return (
    <footer className="bg-section-dark border-t border-section-dark-foreground/10">
      <div className="container-main section-padding pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <img src={logoTgt} alt="TGT Marketing & Comunicação" className="h-12 w-auto brightness-0 invert mb-4" />
            <p className="text-section-dark-foreground/50 text-sm leading-relaxed">
              Agência especializada em estratégia, posicionamento de marca e
              crescimento empresarial desde 2012.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-section-dark-foreground font-bold mb-4">Navegação</h4>
            <ul className="space-y-2">
              {[
              { label: "Sobre", href: "#sobre" },
              { label: "Serviços", href: "#servicos" },
              { label: "Portfólio", href: "#portfolio" },
              { label: "Resultados", href: "#resultados" },
              { label: "Contato", href: "#contato" }].
              map((link) =>
              <li key={link.label}>
                  <a
                  href={link.href}
                  className="text-section-dark-foreground/50 hover:text-accent transition-colors text-sm">
                  
                    {link.label}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-section-dark-foreground font-bold mb-4">Serviços</h4>
            <ul className="space-y-2 text-section-dark-foreground/50 text-sm">
              <li>Marketing Digital</li>
              <li>Sites e E-commerce</li>
              <li>Criação de Marca</li>
              <li>Registro de Marca</li>
              <li>Produção de Conteúdo</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-section-dark-foreground font-bold mb-4">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-section-dark-foreground/50 text-sm">
                <MapPin size={16} className="text-accent shrink-0 mt-0.5" />
                <span>Americana – São Paulo, BR</span>
              </div>
              <div className="flex items-center gap-3 text-section-dark-foreground/50 text-sm">
                <Phone size={16} className="text-accent shrink-0" />
                <a href="https://wa.me/5519992795271" className="hover:text-accent transition-colors">
                  WhatsApp
                </a>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <a href="https://www.instagram.com/tgt.mkt" target="_blank" rel="noopener noreferrer" className="text-section-dark-foreground/50 hover:text-accent transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="https://www.facebook.com/tgt.mktecom" target="_blank" rel="noopener noreferrer" className="text-section-dark-foreground/50 hover:text-accent transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-section-dark-foreground/50 hover:text-accent transition-colors">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-section-dark-foreground/10 pt-8 text-center text-section-dark-foreground/30 text-sm">
          © TGT Marketing & Comunicação. Todos os direitos reservados.
        </div>
      </div>
    </footer>);

};

export default Footer;