import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Search, FileText, Rocket, LineChart } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Diagnóstico Estratégico",
    desc: "Analisamos sua empresa, mercado, concorrência e público para entender o cenário completo.",
  },
  {
    icon: FileText,
    step: "02",
    title: "Planejamento",
    desc: "Criamos um plano de ação personalizado com metas, estratégias e cronograma definidos.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Execução",
    desc: "Colocamos o plano em prática com qualidade, criatividade e foco total em resultados.",
  },
  {
    icon: LineChart,
    step: "04",
    title: "Acompanhamento",
    desc: "Monitoramos os resultados e otimizamos as estratégias continuamente para maximizar o ROI.",
  },
];

const ProcessSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-background" ref={ref}>
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">
            Processo
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-3 mb-4">
            Como trabalhamos
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Um processo claro e estruturado para garantir que cada projeto alcance
            o máximo de resultados.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative"
            >
              <div className="text-6xl font-extrabold text-accent/10 absolute -top-4 -left-2">
                {step.step}
              </div>
              <div className="relative pt-8">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <step.icon className="text-accent" size={24} />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
