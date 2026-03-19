import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { useRef, useEffect } from "react";
import { Building2, Clock, Globe2, Target } from "lucide-react";

const stats = [
  {
    icon: Building2,
    numericValue: 200,
    prefix: "+",
    suffix: "",
    label: "Empresas transformadas",
    sub: "em mais de uma década",
  },
  {
    icon: Clock,
    numericValue: 14,
    prefix: "",
    suffix: "",
    label: "anos de experiência",
    sub: "desde 2012 no mercado",
  },
  {
    icon: Globe2,
    numericValue: 2,
    prefix: "",
    suffix: "",
    label: "Continentes",
    sub: "Brasil e Europa",
  },
  {
    icon: Target,
    numericValue: 100,
    prefix: "",
    suffix: "%",
    label: "Personalizado",
    sub: "zero fórmulas prontas",
  },
];

const CountUpNumber = ({
  value,
  prefix,
  suffix,
  isInView,
}: {
  value: number;
  prefix: string;
  suffix: string;
  isInView: boolean;
}) => {
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
    <section
      id="resultados"
      className="section-padding bg-section-dark relative overflow-hidden"
      ref={ref}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-accent/3 rounded-full blur-3xl" />

      <div className="container-main relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label text-accent justify-center mb-4 block">
            Resultados
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-section-dark-foreground mt-3 mb-4 tracking-tight">
            Números que <span className="text-accent">não mentem</span>
          </h2>
          <div className="divider-accent mx-auto mb-6" />
          <p className="text-section-dark-foreground/40 max-w-xl mx-auto text-[15px]">
            Nosso histórico fala mais alto que qualquer promessa.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="text-center bg-primary/50 rounded-2xl p-8 border border-section-dark-foreground/5 hover:border-accent/20 transition-all duration-500 group"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-accent/8 flex items-center justify-center mb-5 group-hover:bg-accent/15 transition-colors duration-500">
                <stat.icon className="text-accent" size={28} />
              </div>
              <div className="text-4xl font-extrabold text-accent mb-2">
                <CountUpNumber
                  value={stat.numericValue}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  isInView={isInView}
                />
              </div>
              <div className="text-section-dark-foreground font-semibold text-sm mb-1">
                {stat.label}
              </div>
              <div className="text-section-dark-foreground/35 text-xs">
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
