import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";
import logoTgt from "@/assets/logo-tgt.webp";

const WHATSAPP_BR = "https://wa.me/5519992795271?text=Olá! Gostaria de agendar um diagnóstico gratuito para minha empresa.";

const ESCRITORIOS = [
  {
    pais: "Brasil",
    cidade: "AMERICANA, SP • BRA",
    endereco: ["Rua das Poncianas, 669 – CEP: 13468-180", "Americana/SP"],
    telefone: "(19) 99279-5271",
    telefoneHref: WHATSAPP_BR,
    email: "contato@tgtmarketing.com.br",
  },
  {
    pais: "Argentina",
    cidade: "BUENOS AIRES, BA • ARG",
    endereco: ["Calle Pichincha, 765 – San Cristóbal", "Comuna 3, Buenos Aires"],
    telefone: "+54 9 11 6477-7066",
    telefoneHref: "tel:+5491164777066",
    email: "contactoarg@tgtmarketing.com.br",
  },
  {
    pais: "Estados Unidos",
    cidade: "MEDFORD, MA • USA",
    endereco: ["236 Main St – ZIP Code: 02155", "Medford, Massachusetts"],
    telefone: "+1 (781) 333-0708",
    telefoneHref: "tel:+17813330708",
    email: "contactoeua@tgtmarketing.com.br",
  },
  {
    pais: "Reino Unido - Inglaterra",
    cidade: "LONDON, UK • GBR",
    endereco: ["42 Baker Street – Postcode: NW1 6XE", "London, Greater London – England"],
    telefone: "+44 7375 858464",
    telefoneHref: "tel:+447375858464",
    email: "contactouk@tgtmarketing.com.br",
  },
];

const Footer = () => {
  return (
    <footer className="bg-[#050505] pt-16 sm:pt-24 pb-12 overflow-hidden relative border-t border-white/5">
      {/* Background Decorative element */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container-main relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20 px-4">
          {/* Brand Info */}
          <div className="md:col-span-6">
            <a href="#" className="inline-block mb-8 group">
              <img
                src={logoTgt}
                alt="Logo TGT Marketing Digital Americana SP"
                width={160}
                height={40}
                loading="lazy"
                decoding="async"
                className="h-10 sm:h-12 w-auto brightness-0 invert transition-transform duration-500 group-hover:scale-105"
              />
            </a>
            <p className="text-white/40 text-lg leading-relaxed max-w-md mb-10">
              Especialistas em transformar o potencial da sua empresa em 
              <span className="text-white font-bold tracking-tight"> autoridade digital </span> 
              e <span className="text-gradient font-bold tracking-tight text-xl"> resultados exponenciais</span>.
            </p>
            <div className="flex items-center gap-5">
              {[
                { icon: Instagram, href: "https://www.instagram.com/tgt.mkt", label: "Visitar Instagram TGT", event: "social_click_instagram" },
                { icon: Facebook, href: "https://www.facebook.com/tgt.mktecom", label: "Visitar Facebook TGT", event: "social_click_facebook" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    if (window.dataLayer) {
                      window.dataLayer.push({
                        event: social.event,
                        button_location: "footer"
                      });
                    }
                  }}
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
                onClick={() => {
                  if (window.dataLayer) {
                    window.dataLayer.push({
                      event: "social_click_tiktok",
                      button_location: "footer"
                    });
                  }
                }}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-accent hover:border-accent hover:bg-accent/5 transition-all duration-300"
                aria-label="Visitar TikTok TGT"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52V6.84a4.84 4.84 0 0 1-1-.15z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 md:col-start-10">
            <h3 className="text-white font-bold text-xs uppercase tracking-[0.3em] mb-8">Navegação</h3>
            <ul className="space-y-4">
              {[
                { label: "Sobre", href: "#sobre" },
                { label: "Serviços", href: "#servicos" },
                { label: "Trabalhos", href: "#trabalhos" },
                { label: "Resultados", href: "#resultados" },
                { label: "FAQ", href: "#faq" },
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

        </div>

        {/* Onde estamos */}
        <div className="mb-20 px-4">
          <h3 className="text-white font-bold text-xs uppercase tracking-[0.3em] mb-8">Onde estamos</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {ESCRITORIOS.map((e) => (
              <div
                key={e.pais}
                className="group/escritorio relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-6 flex flex-col gap-4 min-w-0 transition-all duration-500 ease-out hover:-translate-y-2 hover:border-accent/40 hover:bg-white/[0.05] hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6),0_0_40px_-12px_hsl(0_78%_48%/0.35)] focus-within:border-accent/40 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                {/* Linha vermelha que se desenha no topo e brilho no canto ao passar o mouse */}
                <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-accent via-accent to-transparent origin-left scale-x-0 transition-transform duration-700 ease-out group-hover/escritorio:scale-x-100 group-focus-within/escritorio:scale-x-100" />
                <span aria-hidden="true" className="pointer-events-none absolute -top-20 -right-20 w-48 h-48 rounded-full bg-accent/0 blur-3xl transition-colors duration-700 group-hover/escritorio:bg-accent/15" />
                <span className="relative block text-[11px] uppercase tracking-[0.18em] text-accent font-bold whitespace-nowrap">{e.pais}</span>
                <div className="relative flex items-center gap-3 -mt-1">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 transition-all duration-500 group-hover/escritorio:bg-accent group-hover/escritorio:-rotate-3 group-hover/escritorio:scale-110 group-hover/escritorio:shadow-lg group-hover/escritorio:shadow-accent/40 motion-reduce:transition-none">
                    <MapPin size={18} className="text-accent transition-colors duration-300 group-hover/escritorio:text-accent-foreground" />
                  </div>
                  <span className="block min-w-0 text-white font-bold text-[15px] tracking-wide">{e.cidade}</span>
                </div>
                <p className="relative text-white/40 text-sm leading-relaxed transition-colors duration-500 group-hover/escritorio:text-white/65">
                  {e.endereco.map((linha) => (
                    <span key={linha} className="block">{linha}</span>
                  ))}
                </p>
                <div className="relative flex flex-col gap-2.5 text-sm">
                  <a
                    href={e.telefoneHref}
                    {...(e.telefoneHref.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    onClick={() => {
                      if (window.dataLayer && e.telefoneHref === WHATSAPP_BR) {
                        window.dataLayer.push({ event: "whatsapp_click", button_location: "footer" });
                      }
                    }}
                    className="inline-flex items-center gap-2.5 text-white/60 hover:text-accent transition-colors font-semibold"
                  >
                    <Phone size={15} className="text-accent shrink-0" />
                    {e.telefone}
                  </a>
                  <a href={`mailto:${e.email}`} className="inline-flex items-center gap-2.5 text-[13px] text-white/60 hover:text-accent transition-colors">
                    <Mail size={15} className="text-accent shrink-0" />
                    <span className="min-w-0">
                      {e.email.split("@")[0]}
                      <wbr />@{e.email.split("@")[1]}
                    </span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex justify-center items-center px-4">
          <p className="text-white/20 text-xs font-medium tracking-wide text-center">
            © TGT Marketing & Comunicação. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
