import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, Clock, Globe2, Target } from "lucide-react";

const stats = [
  { icon: Building2, number: "+200", label: "Empresas transformadas", sub: "em mais de uma década" },
  { icon: Clock, number: "12+", label: "Anos de experiência", sub: "desde 2012 no mercado" },
  { icon: Globe2, number: "2", label: "Continentes", sub: "Brasil e Europa" },
  { icon: Target, number: "100%", label: "Personalizado", sub: "zero fórmulas prontas" },
];

const ResultsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="resultados" className="section-padding bg-section-dark relative overflow-hidden" ref={ref}>
      {/* Decorative accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />

      <div className="container-main relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">
            Resultados
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-section-dark-foreground mt-3 mb-4">
            Números que <span className="text-accent">não mentem</span>
          </h2>
          <p className="text-section-dark-foreground/50 max-w-xl mx-auto">
            Nosso histórico fala mais alto que qualquer promessa.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center bg-primary/50 rounded-2xl p-8 border border-section-dark-foreground/5"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <stat.icon className="text-accent" size={28} />
              </div>
              <div className="text-4xl font-extrabold text-accent mb-1">
                {stat.number}
              </div>
              <div className="text-section-dark-foreground font-semibold text-sm mb-1">
                {stat.label}
              </div>
              <div className="text-section-dark-foreground/40 text-xs">
                {stat.sub}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
