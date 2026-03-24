import { motion } from "framer-motion";
import { CheckCircle, MessageCircle, Mouse, ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import TargetAnimation from "./TargetAnimation";

const highlights = [
  "+200 empresas atendidas",
  "Desde 2012 no mercado",
  "Clientes no Brasil e Europa",
];

const HeroSection = ({ onOpenContact }: { onOpenContact?: () => void }) => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pb-8 sm:pb-16">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/98 via-primary/90 to-primary/70" />
        <TargetAnimation />
      </div>

      <div className="container-main relative z-10 pt-20 sm:pt-32 pb-8 sm:pb-20">
        <div className="max-w-3xl">
          <motion.button
            onClick={onOpenContact}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 sm:gap-2.5 bg-accent border-2 border-accent-foreground/30 rounded-full px-4 sm:px-6 py-2 sm:py-2.5 mb-6 sm:mb-8 cursor-pointer hover:border-accent-foreground/80 hover:bg-accent/90 transition-all shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40 hover:scale-105"
          >
            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-accent-foreground animate-pulse-glow" />
            <span className="text-accent-foreground text-sm sm:text-base font-bold tracking-wide">
              Diagnóstico gratuito disponível
            </span>
          </motion.button>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[1.6rem] sm:text-5xl lg:text-7xl font-extrabold leading-[1.12] sm:leading-[1.05] text-primary-foreground mb-4 sm:mb-8 tracking-tight"
          >
            Sua agência de marketing
            <br />
            especialista em{" "}
            <span className="text-gradient bg-gradient-to-r from-accent to-marsala bg-clip-text text-transparent">
              gestão de tráfego
            </span>{" "}
            e conversão de leads
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-[14px] sm:text-lg lg:text-xl text-primary-foreground/65 mb-6 sm:mb-12 max-w-2xl leading-relaxed"
          >
            Há mais de 14 anos, a TGT transforma a comunicação de empresas em
            estratégia real de crescimento. Mais de 200 empresas no Brasil e na
            Europa já comprovaram.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-14"
          >
            <motion.a
              href="https://wa.me/5519992795271"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-3 bg-accent text-accent-foreground font-extrabold text-[15px] sm:text-lg px-8 sm:px-10 py-3.5 sm:py-5 rounded-xl w-full sm:w-auto whitespace-nowrap overflow-hidden"
              style={{
                boxShadow: "0 0 20px hsl(0 78% 48% / 0.5), 0 0 60px hsl(0 78% 48% / 0.2), 0 8px 32px hsl(0 0% 0% / 0.3)",
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px hsl(0 78% 48% / 0.7), 0 0 80px hsl(0 78% 48% / 0.3), 0 12px 40px hsl(0 0% 0% / 0.4)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              {/* Animated shine sweep */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
              {/* Pulse ring */}
              <span className="absolute inset-0 rounded-xl animate-ping opacity-20 bg-accent pointer-events-none" style={{ animationDuration: "2.5s" }} />
              <MessageCircle size={20} className="shrink-0 relative z-10" />
              <span className="relative z-10">Quero vender mais!</span>
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-2.5 sm:gap-8"
          >
            {highlights.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-primary-foreground/50"
              >
                <CheckCircle className="text-accent shrink-0" size={16} />
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10"
      >
        <a href="#sobre" className="hidden sm:flex flex-col items-center gap-1 group">
          <div className="border border-primary-foreground/20 rounded-full p-2 group-hover:border-primary-foreground/50 transition-all duration-500 cursor-pointer">
            <Mouse size={24} className="text-primary-foreground/40" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col items-center -space-y-1.5">
            <motion.div
              animate={{ y: [0, 4, 0], opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown size={16} className="text-primary-foreground/50" strokeWidth={2.5} />
            </motion.div>
            <motion.div
              animate={{ y: [0, 4, 0], opacity: [0.15, 0.5, 0.15] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
            >
              <ChevronDown size={16} className="text-primary-foreground/40" strokeWidth={2.5} />
            </motion.div>
            <motion.div
              animate={{ y: [0, 4, 0], opacity: [0.1, 0.4, 0.1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            >
              <ChevronDown size={16} className="text-primary-foreground/30" strokeWidth={2.5} />
            </motion.div>
          </div>
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
