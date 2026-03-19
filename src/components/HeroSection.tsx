import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import logoTgt from "@/assets/logo-tgt.png";
import TargetAnimation from "./TargetAnimation";

const HeroSection = ({ onOpenContact }: { onOpenContact?: () => void }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/98 via-primary/90 to-primary/70" />
        <TargetAnimation />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <img
            src={logoTgt}
            alt="TGT Marketing & Comunicação"
            className="h-20 sm:h-24 w-auto mx-auto brightness-0 invert"
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-primary-foreground/50 text-xs sm:text-sm tracking-[0.3em] uppercase font-medium mb-6"
        >
          "Desenvolvendo ideias que se transformam em resultados!"
        </motion.p>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-extrabold leading-[1.1] text-primary-foreground mb-6"
        >
          Marketing que <span className="text-accent">posiciona.</span>
          <br />
          Estratégia que gera
          <br />
          <span className="text-accent">resultados.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="text-primary-foreground/50 text-base sm:text-lg mb-10"
        >
          Apresentação Institucional
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="flex items-center justify-center gap-4 sm:gap-8 text-primary-foreground/60 text-sm sm:text-base"
        >
          <span>Desde 2012</span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span>+200 empresas</span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span>Brasil & Europa</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-primary-foreground/20 rounded-full flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-accent"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
