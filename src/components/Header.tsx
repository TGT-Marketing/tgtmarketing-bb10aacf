import { useState, useEffect } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoTgt from "@/assets/logo-tgt.webp";

const navLinks = [
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "TRABALHOS", href: "#trabalhos" },
  { label: "Resultados", href: "#resultados" },
  { label: "FAQ", href: "#faq" },
  { label: "Contato", href: "#contato" },
];

const Header = ({ onOpenContact }: { onOpenContact?: () => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-primary/80 backdrop-blur-xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)] border-b border-white/5 py-2.5"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container-main px-4 sm:px-6 flex items-center justify-between">
        <a href="#" className="relative z-10 group/logo">
          <img
            src={logoTgt}
            alt="TGT Marketing Digital Americana SP"
            width={180}
            height={45}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className={`transition-all duration-700 ${scrolled ? "h-7 sm:h-8" : "h-9 sm:h-10"} w-auto brightness-0 invert group-hover/logo:scale-105`}
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[11px] font-bold text-primary-foreground/50 hover:text-accent transition-all duration-300 uppercase tracking-[0.2em] relative group/nav"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover/nav:w-full" />
            </a>
          ))}
          <a
            href="https://wa.me/5519992795271?text=Olá! Gostaria de agendar um diagnóstico gratuito para minha empresa."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              if (window.dataLayer) {
                window.dataLayer.push({
                  event: "whatsapp_click",
                  button_location: "header_desktop"
                });
              }
            }}
            className="shine-effect inline-flex items-center gap-2.5 bg-accent text-accent-foreground px-6 py-2.5 rounded-full text-[11px] font-black hover:shadow-[0_0_30px_hsl(var(--accent)/0.4)] hover:scale-105 transition-all duration-500 uppercase tracking-[0.15em] active:scale-[0.97]"
          >
            <MessageCircle size={14} className="shrink-0" />
            Falar no WhatsApp
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-primary-foreground relative z-10"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="md:hidden bg-primary/95 backdrop-blur-2xl border-t border-white/5 overflow-hidden"
          >
            <nav className="flex flex-col p-8 gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setMobileOpen(false)}
                  className="text-primary-foreground/60 hover:text-accent transition-colors font-bold text-lg uppercase tracking-[0.2em]"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="https://wa.me/5519992795271?text=Olá! Gostaria de agendar um diagnóstico gratuito para minha empresa."
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                onClick={() => {
                  if (window.dataLayer) {
                    window.dataLayer.push({
                      event: "whatsapp_click",
                      button_location: "header_mobile"
                    });
                  }
                  setMobileOpen(false);
                }}
                className="shine-effect inline-flex items-center justify-center gap-3 bg-accent text-accent-foreground px-6 py-5 rounded-2xl text-base font-black hover:shadow-[0_0_40px_hsl(var(--accent)/0.5)] transition-all mt-4 uppercase tracking-[0.15em] active:scale-[0.95]"
              >
                <MessageCircle size={22} className="shrink-0" />
                Falar no WhatsApp
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
