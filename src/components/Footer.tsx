import { MapPin, Phone, Instagram, Facebook, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-section-dark border-t border-primary-foreground/10">
      <div className="container-main section-padding pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="text-2xl font-extrabold text-section-dark-foreground mb-4">
              TGT <span className="text-accent font-light">Marketing</span>
            </div>
            <p className="text-section-dark-foreground/60 text-sm leading-relaxed">
              Agência especializada em estratégia, posicionamento de marca e
              crescimento empresarial desde 2012.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-section-dark-foreground font-bold mb-4">Navegação</h4>
            <ul className="space-y-2">
              {["Sobre", "Serviços", "Portfólio", "Resultados", "Contato"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
                    className="text-section-dark-foreground/60 hover:text-accent transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-section-dark-foreground font-bold mb-4">Serviços</h4>
            <ul className="space-y-2 text-section-dark-foreground/60 text-sm">
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
              <div className="flex items-start gap-3 text-section-dark-foreground/60 text-sm">
                <MapPin size={16} className="text-accent shrink-0 mt-0.5" />
                <span>Americana – São Paulo, Brasil</span>
              </div>
              <div className="flex items-center gap-3 text-section-dark-foreground/60 text-sm">
                <Phone size={16} className="text-accent shrink-0" />
                <a href="https://wa.me/5519999999999" className="hover:text-accent transition-colors">
                  WhatsApp
                </a>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <a href="#" className="text-section-dark-foreground/60 hover:text-accent transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-section-dark-foreground/60 hover:text-accent transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-section-dark-foreground/60 hover:text-accent transition-colors">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 text-center text-section-dark-foreground/40 text-sm">
          © {new Date().getFullYear()} TGT Marketing & Comunicação. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
