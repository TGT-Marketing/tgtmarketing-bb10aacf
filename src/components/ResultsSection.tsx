import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect } from "react";
import { Building2, Clock, Globe2, Target } from "lucide-react";

const stats = [
  { icon: Building2, numericValue: 200, prefix: "+", suffix: "", label: "Empresas transformadas", sub: "em mais de uma década" },
  { icon: Clock, numericValue: null, displayText: "+1 década", prefix: "", suffix: "", label: "de experiência", sub: "desde 2012 no mercado" },
  { icon: Globe2, numericValue: 2, prefix: "", suffix: "", label: "Continentes", sub: "Brasil e Europa" },
  { icon: Target, numericValue: 100, prefix: "", suffix: "%", label: "Personalizado", sub: "zero fórmulas prontas" },
];

const CountUpNumber = ({ value, prefix, suffix, isInView }: { value: number; prefix: string; suffix: string; isInView: boolean }) => {
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.round(v));
  const displayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(motionVal, value, {
      duration: 2.5,
      ease: "easeOut",
    });
    return controls.stop;
  }, [isInView, value, motionVal]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => {
      if (displayRef.current) {
        displayRef.current.textContent = `${prefix}${v}${suffix}`;
      }
    });
    return unsubscribe;
  }, [rounded, prefix, suffix]);

  return (
    <motion.span
      ref={displayRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      {prefix}0{suffix}
    </motion.span>
  );
};

const ResultsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="resultados" className="section-padding bg-section-dark relative overflow-hidden" ref={ref}>
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
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="text-center bg-primary/50 rounded-2xl p-8 border border-section-dark-foreground/5"
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
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                  >
                    {stat.displayText}
                  </motion.span>
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
