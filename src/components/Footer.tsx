import { MapPin, Phone, Instagram, Facebook } from "lucide-react";
import logoTgt from "@/assets/logo-tgt.png";

const Footer = () => {
  return (
    <footer className="bg-section-dark border-t border-section-dark-foreground/5">
      <div className="container-main section-padding pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div>
            <a href="#">
              <img
                src={logoTgt}
                alt="TGT Marketing & Comunicação"
                className="h-12 w-auto brightness-0 invert mb-5" />
              
            </a>
            <p className="text-section-dark-foreground/40 text-sm leading-relaxed">
              Agência especializada em estratégia, posicionamento de marca e
              crescimento empresarial desde 2012.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-section-dark-foreground font-bold mb-5 text-sm uppercase tracking-wider">NAVEGAÇÃO

            </h4>
            <ul className="space-y-3">
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
                  className="text-section-dark-foreground/40 hover:text-accent transition-colors text-sm">
                  
                    {link.label}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-section-dark-foreground font-bold mb-5 text-sm uppercase tracking-wider">
              Serviços
            </h4>
            <ul className="space-y-3 text-section-dark-foreground/40 text-sm">
              <li>Marketing Digital</li>
              <li>Sites e E-commerce</li>
              <li>Criação de Marca</li>
              <li>Registro de Marca</li>
              <li>Produção de Conteúdo</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-section-dark-foreground font-bold mb-5 text-sm uppercase tracking-wider">
              Contato
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-section-dark-foreground/40 text-sm">
                <MapPin size={16} className="text-accent shrink-0 mt-0.5" />
                <span>Americana – São Paulo, BR</span>
              </div>
              <div className="flex items-center gap-3 text-section-dark-foreground/40 text-sm">
                <Phone size={16} className="text-accent shrink-0" />
                <a
                  href="https://wa.me/5519992795271"
                  className="hover:text-accent transition-colors">
                  
                  WhatsApp
                </a>
              </div>
              <div className="flex items-center gap-4 mt-5">
                <a
                  href="https://www.instagram.com/tgt.mkt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-section-dark-foreground/40 hover:text-accent transition-colors duration-300">
                  
                  <Instagram size={20} />
                </a>
                <a
                  href="https://www.facebook.com/tgt.mktecom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-section-dark-foreground/40 hover:text-accent transition-colors duration-300">
                  
                  <Facebook size={20} />
                </a>
                <a
                  href="https://www.tiktok.com/@acertandonoalvo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-section-dark-foreground/40 hover:text-accent transition-colors duration-300">
                  
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor">
                    
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52V6.84a4.84 4.84 0 0 1-1-.15z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-section-dark-foreground/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-section-dark-foreground/25 text-sm">
            © TGT Marketing & Comunicação. Todos os direitos reservados.
          </span>
          <span className="text-section-dark-foreground/20 text-xs">
            Feito com estratégia e performance.
          </span>
        </div>
      </div>
    </footer>);

};

export default Footer;