import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, Clock, Globe2, Target } from "lucide-react";

const stats = [
  { icon: Building2, number: "+200", label: "Empresas atendidas" },
  { icon: Clock, number: "12+", label: "Anos de experiência" },
  { icon: Globe2, number: "2", label: "Continentes (Brasil e Europa)" },
  { icon: Target, number: "100%", label: "Estratégias personalizadas" },
];

const ResultsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="resultados" className="section-padding bg-section-dark" ref={ref}>
      <div className="container-main">
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
            Números que comprovam nossa entrega
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <stat.icon className="text-accent" size={28} />
              </div>
              <div className="text-4xl font-extrabold text-accent mb-2">
                {stat.number}
              </div>
              <div className="text-section-dark-foreground/70 font-medium text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
