import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, MessageCircle, Clock, Shield } from "lucide-react";

const CtaSection = ({ onOpenContact }: { onOpenContact?: () => void }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contato" className="section-padding bg-primary relative overflow-hidden" ref={ref}>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent via-marsala to-transparent" />

      <div className="container-main relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">
            Próximo passo
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-foreground mt-4 mb-6 leading-tight">
            Sua empresa merece ser vista,
            <br />
            lembrada e <span className="text-accent">escolhida.</span>
          </h2>
          <p className="text-primary-foreground/60 text-lg mb-4 leading-relaxed">
            Pare de desperdiçar tempo e dinheiro com marketing que não funciona.
            Agende um diagnóstico gratuito e descubra exatamente o que fazer
            para crescer.
          </p>

          {/* Urgency / trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-10 text-primary-foreground/50 text-sm">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-accent" />
              <span>Resposta em até 24h</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-accent" />
              <span>Diagnóstico 100% gratuito</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onOpenContact}
              className="btn-primary inline-flex items-center justify-center gap-2 text-lg flex-nowrap"
            >
              Quero meu diagnóstico gratuito <ArrowRight size={20} className="shrink-0" />
            </button>
            <a
              href="https://wa.me/5519992795271"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-light inline-flex items-center justify-center gap-2 text-lg flex-nowrap"
            >
              <MessageCircle size={20} className="shrink-0" /> Falar no WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
