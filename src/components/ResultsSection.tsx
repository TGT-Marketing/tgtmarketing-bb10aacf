import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { Building2, Clock, Globe2, Target } from "lucide-react";

const stats = [
  { icon: Building2, number: "+200", numericValue: 200, prefix: "+", suffix: "", label: "Empresas transformadas", sub: "em mais de uma década" },
  { icon: Clock, number: "+1 década", numericValue: null, prefix: "", suffix: "", label: "de experiência", sub: "desde 2012 no mercado" },
  { icon: Globe2, number: "2", numericValue: 2, prefix: "", suffix: "", label: "Continentes", sub: "Brasil e Europa" },
  { icon: Target, number: "100%", numericValue: 100, prefix: "", suffix: "%", label: "Personalizado", sub: "zero fórmulas prontas" },
];

const CountUpNumber = ({ value, prefix, suffix, isInView }: { value: number; prefix: string; suffix: string; isInView: boolean }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isInView || hasAnimated) return;
    setHasAnimated(true);

    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      const progress = current / steps;
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));

      if (current >= steps) {
        setCount(value);
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value, hasAnimated]);

  return (
    <span className="inline-flex items-center">
      {prefix}
      <span className="inline-block overflow-hidden">
        <motion.span
          className="inline-block"
          initial={{ rotateX: -90, opacity: 0 }}
          animate={isInView ? { rotateX: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ transformOrigin: "bottom", perspective: "400px" }}
        >
          {count}
        </motion.span>
      </span>
      {suffix}
    </span>
  );
};

const FlipText = ({ text, isInView }: { text: string; isInView: boolean }) => {
  return (
    <span className="inline-flex">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ rotateX: -90, opacity: 0 }}
          animate={isInView ? { rotateX: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
          style={{ transformOrigin: "bottom", perspective: "400px" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};

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
              style={{ perspective: "600px" }}
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <stat.icon className="text-accent" size={28} />
              </div>
              <div className="text-4xl font-extrabold text-accent mb-1">
                {stat.numericValue !== null ? (
                  <CountUpNumber
                    value={stat.numericValue}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    isInView={isInView}
                  />
                ) : (
                  <FlipText text={stat.number} isInView={isInView} />
                )}
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
