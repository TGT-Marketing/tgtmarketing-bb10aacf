import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, MessageCircle, Clock, Shield, Sparkles } from "lucide-react";

const CtaSection = ({ onOpenContact }: { onOpenContact?: () => void }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="contato"
      className="section-padding bg-primary relative overflow-hidden"
      ref={ref}
    >
      {/* Premium decorative elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent via-marsala to-transparent" />
      <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-marsala to-accent" />

      <div className="container-main relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-5 py-2 mb-8"
          >
            <Sparkles size={14} className="text-accent" />
            <span className="text-accent text-xs font-bold uppercase tracking-[0.15em]">
              Próximo passo
            </span>
          </motion.div>

          <h2 className="text-[1.4rem] sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-primary-foreground mt-2 mb-6 sm:mb-8 leading-tight tracking-tight">
            Sua empresa merece ser vista,
            <br />
            lembrada e <span className="text-accent">escolhida.</span>
          </h2>
          <p className="text-primary-foreground/50 text-[14px] sm:text-lg mb-5 sm:mb-6 leading-relaxed max-w-2xl mx-auto">
            Pare de desperdiçar tempo e dinheiro com marketing que não funciona.
            Agende um diagnóstico gratuito e descubra exatamente o que fazer
            para crescer.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mb-8 sm:mb-12 text-primary-foreground/40 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-accent" />
              <span>Resposta em até 24h</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-accent" />
              <span>Diagnóstico 100% gratuito</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button
              onClick={onOpenContact}
              className="btn-primary inline-flex items-center justify-center gap-2.5 text-[14px] sm:text-lg flex-nowrap w-full sm:w-auto py-3 sm:py-4"
            >
              <span>Quero meu diagnóstico gratuito</span>
              <ArrowRight size={20} className="shrink-0" />
            </button>
            <a
              href="https://wa.me/5519992795271"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-light inline-flex items-center justify-center gap-2.5 text-base sm:text-lg flex-nowrap w-full sm:w-auto"
            >
              <MessageCircle size={20} className="shrink-0" />
              <span>Falar no WhatsApp</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
