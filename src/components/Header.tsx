import { useState, useEffect } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoTgt from "@/assets/logo-tgt.png";

const navLinks = [
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "TRABALHOS", href: "#portfolio" },
  { label: "Resultados", href: "#resultados" },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-primary/95 backdrop-blur-md shadow-lg py-2"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container-main flex items-center justify-between">
        <a href="#" className="relative z-10">
          <img
            src={logoTgt}
            alt="TGT Marketing & Comunicação"
            className={`transition-all duration-500 ${scrolled ? "h-9" : "h-11"} w-auto brightness-0 invert`}
          />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium text-primary-foreground/70 hover:text-accent transition-colors duration-300 uppercase tracking-wide"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://wa.me/5519992795271"
            target="_blank"
            rel="noopener noreferrer"
            className="shine-effect inline-flex items-center gap-2 bg-accent text-accent-foreground px-5 py-2.5 rounded-lg text-[13px] font-bold hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 uppercase tracking-wide active:scale-[0.97]"
          >
            <MessageCircle size={15} className="shrink-0" />
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
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-primary/98 backdrop-blur-md border-t border-primary-foreground/5"
          >
            <nav className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-primary-foreground/70 hover:text-accent transition-colors font-medium text-sm uppercase tracking-wide"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://wa.me/5519992795271"
                target="_blank"
                rel="noopener noreferrer"
                className="shine-effect inline-flex items-center justify-center gap-2.5 bg-accent text-accent-foreground px-5 py-3.5 rounded-lg text-sm font-bold text-center hover:shadow-lg transition-all mt-2 uppercase tracking-wide active:scale-[0.97]"
              >
                <MessageCircle size={18} className="shrink-0" />
                Falar no WhatsApp
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
