import { MapPin, Phone, Instagram, Facebook } from "lucide-react";
import logoTgt from "@/assets/logo-tgt.webp";

const Footer = () => {
  return (
    <footer className="bg-[#050505] pt-24 pb-12 overflow-hidden relative border-t border-white/5">
      {/* Background Decorative element */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container-main relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20 px-4">
          {/* Brand Info */}
          <div className="md:col-span-5">
            <a href="#" className="inline-block mb-8 group">
              <img
                src={logoTgt}
                alt="TGT Marketing & Comunicação"
                width={400}
                height={160}
                loading="lazy"
                decoding="async"
                className="h-10 sm:h-12 w-auto brightness-0 invert transition-transform duration-500 group-hover:scale-105"
              />
            </a>
            <p className="text-white/40 text-lg leading-relaxed max-w-md mb-10">
              Especialistas em transformar o potencial da sua empresa em 
              <span className="text-white font-semibold"> autoridade digital </span> 
              e <span className="text-accent font-semibold"> resultados exponenciais</span>.
            </p>
            <div className="flex items-center gap-5">
              {[
                { icon: Instagram, href: "https://www.instagram.com/tgt.mkt", label: "Instagram" },
                { icon: Facebook, href: "https://www.facebook.com/tgt.mktecom", label: "Facebook" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-accent hover:border-accent hover:bg-accent/5 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
              <a
                href="https://www.tiktok.com/@acertandonoalvo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-accent hover:border-accent hover:bg-accent/5 transition-all duration-300"
                aria-label="TikTok"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52V6.84a4.84 4.84 0 0 1-1-.15z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 md:col-start-7">
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.3em] mb-8">Navegação</h4>
            <ul className="space-y-4">
              {[
                { label: "Sobre", href: "#sobre" },
                { label: "Serviços", href: "#servicos" },
                { label: "Trabalhos", href: "#trabalhos" },
                { label: "Resultados", href: "#resultados" },
                { label: "Contato", href: "#contato" }
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-white/40 hover:text-accent transition-all duration-300 text-[15px] flex items-center gap-2 group">
                    <span className="w-0 h-px bg-accent group-hover:w-3 transition-all duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-3 md:col-start-10">
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.3em] mb-8">Onde estamos</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4 text-white/40 text-[15px]">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-accent" />
                </div>
                <span>Americana – São Paulo<br />Brasil</span>
              </div>
              <div className="flex items-start gap-4 text-white/40 text-[15px]">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-accent" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] uppercase tracking-wider text-white/20 mb-1">WhatsApp</span>
                  <a href="https://wa.me/5519992795271" className="text-white/60 hover:text-accent transition-colors font-semibold">
                    +55 19 99279-5271
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6 px-4">
          <p className="text-white/20 text-xs font-medium tracking-wide text-center sm:text-left">
            © {new Date().getFullYear()} TGT Marketing & Comunicação. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-8">
            <a href="#" className="text-white/20 hover:text-white transition-colors text-xs font-medium">Privacidade</a>
            <a href="#" className="text-white/20 hover:text-white transition-colors text-xs font-medium">Termos</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
