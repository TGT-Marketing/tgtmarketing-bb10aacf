import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const CtaSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contato" className="section-padding bg-primary relative overflow-hidden" ref={ref}>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container-main relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-6 leading-tight">
            Sua empresa está pronta para{" "}
            <span className="text-accent">crescer?</span>
          </h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto text-lg mb-10 leading-relaxed">
            Fale com a TGT e descubra como transformar seu marketing em resultados
            reais. Agende um diagnóstico gratuito e personalizado para o seu negócio.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/5519999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent text-accent-foreground px-10 py-4 rounded-lg font-bold text-lg hover:brightness-110 transition"
            >
              Solicitar diagnóstico
            </a>
            <a
              href="https://wa.me/5519999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-primary-foreground/30 text-primary-foreground px-10 py-4 rounded-lg font-bold text-lg hover:border-accent hover:text-accent transition"
            >
              Falar no WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
