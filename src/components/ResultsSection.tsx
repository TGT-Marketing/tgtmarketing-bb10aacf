import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { useRef, useEffect } from "react";
import { Building2, Clock, Percent, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: Building2,
    numericValue: 200,
    prefix: "+",
    suffix: "",
    label: "empresas transformadas",
    sub: "em mais de uma década",
  },
  {
    icon: Percent,
    numericValue: 30,
    prefix: "",
    suffix: "x",
    label: "ROI médio",
    sub: "em campanhas pagas",
  },
  {
    icon: TrendingUp,
    numericValue: 1200,
    prefix: "+",
    suffix: "",
    label: "campanhas gerenciadas",
    sub: "com performance de conversão",
  },
  {
    icon: Clock,
    numericValue: 15,
    prefix: "",
    suffix: "",
    label: "anos de experiência",
    sub: "desde 2011 no mercado",
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
      className="pt-20 pb-10 sm:pt-32 sm:pb-16 bg-section-dark relative overflow-hidden"
      ref={ref}
    >
      <div className="absolute -bottom-20 -left-20 text-[20vw] font-black text-white/[0.01] select-none pointer-events-none whitespace-nowrap">
        RESULTADOS
      </div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[160px] pointer-events-none" />

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
          <h2 className="text-2xl sm:text-5xl lg:text-7xl font-black text-section-dark-foreground mt-3 mb-6 leading-[1.2] sm:leading-[1.1] tracking-tight">
            Marketing Digital: Números que <span className="text-gradient">comprovam!</span>
          </h2>
          <div className="divider-accent mx-auto mb-6" />
          <p className="text-section-dark-foreground/40 max-w-xl mx-auto text-[15px]">
            Nosso histórico fala mais alto que qualquer promessa.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="text-center bg-white/[0.03] backdrop-blur-md rounded-[2rem] p-4 sm:p-8 border border-white/[0.08] transition-all duration-700 hover:border-accent/40 hover:-translate-y-2 hover:bg-white/[0.06] group"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-xl sm:rounded-2xl bg-accent/8 flex items-center justify-center mb-3 sm:mb-5 group-hover:bg-accent/15 transition-colors duration-500">
                <stat.icon className="text-accent" size={22} />
              </div>
              <h4 className="text-3xl sm:text-5xl font-black text-accent mb-1 sm:mb-2 transition-transform duration-500 group-hover:scale-110">
                <CountUpNumber
                  value={stat.numericValue}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  isInView={isInView}
                />
              </h4>
              <div className="text-section-dark-foreground font-bold text-xs sm:text-sm mb-1 uppercase tracking-wider">
                {stat.label}
              </div>
              <div className="text-section-dark-foreground/40 text-[10px] sm:text-xs font-medium italic">
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
