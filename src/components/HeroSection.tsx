import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, MessageCircle } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import TargetAnimation from "./TargetAnimation";

const highlights = [
"+200 empresas atendidas",
"Desde 2012 no mercado",
"Clientes no Brasil e Europa"];


const HeroSection = ({ onOpenContact }: {onOpenContact?: () => void;}) => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/98 via-primary/90 to-primary/70" />
        <TargetAnimation />
      </div>

      {/* Decorative red accent line */}
      

      <div className="container-main relative z-10 pt-32 pb-20">
        <div className="max-w-3xl">
          <motion.button
            onClick={onOpenContact}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-accent/15 border border-accent/30 rounded-full px-4 py-1.5 mb-8 cursor-pointer hover:bg-accent/25 transition-colors">
            
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
            <span className="text-accent text-sm font-semibold">Diagnóstico gratuito disponível</span>
          </motion.button>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-primary-foreground mb-6">
            
            Sua empresa não precisa de mais marketing.
            <br />
            <span className="text-accent">Precisa do marketing certo.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg sm:text-xl text-primary-foreground/75 mb-10 max-w-2xl leading-relaxed">Há mais de 14 anos, a TGT transforma a comunicação de empresas em estratégia real de crescimento. Mais de 200 empresas no Brasil e na Europa já comprovaram.




          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 mb-12">
            
            <button onClick={onOpenContact} className="btn-primary flex items-center justify-center gap-2">
              Quero um diagnóstico gratuito <ArrowRight size={20} />
            </button>
            <a
              href="https://wa.me/5519992795271"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-light flex items-center justify-center gap-2">
              
              <MessageCircle size={20} /> Falar no WhatsApp
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            
            {highlights.map((item) =>
            <div key={item} className="flex items-center gap-2 text-primary-foreground/60">
                <CheckCircle className="text-accent shrink-0" size={18} />
                <span className="text-sm font-medium">{item}</span>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      
    </section>);

};

export default HeroSection;