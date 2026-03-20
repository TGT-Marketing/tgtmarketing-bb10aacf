import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Search, FileText, Rocket, LineChart } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Diagnóstico",
    desc: "Entendemos seu negócio, mercado e concorrência. Sem achismo — dados e análise real.",
  },
  {
    icon: FileText,
    step: "02",
    title: "Estratégia",
    desc: "Criamos um plano sob medida com metas claras, prazos e indicadores de sucesso.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Execução",
    desc: "Colocamos a estratégia em prática com qualidade, velocidade e foco total em resultado.",
  },
  {
    icon: LineChart,
    step: "04",
    title: "Otimização",
    desc: "Acompanhamos os números e otimizamos continuamente. Seu investimento rende cada vez mais e com performance.",
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
          className="text-center mb-16"
        >
          <span className="section-label justify-center mb-4 block">
            Método TGT
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mt-3 mb-4 tracking-tight">
            Do diagnóstico ao{" "}
            <span className="text-accent">resultado</span>
          </h2>
          <div className="divider-accent mx-auto mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-[15px]">
            Nosso processo é simples, transparente e focado em uma coisa: fazer
            sua empresa crescer e se desenvolver, com escala e performance.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative group"
            >
              <div className="text-8xl font-extrabold text-accent/5 absolute -top-8 -left-2 select-none group-hover:text-accent/10 transition-colors duration-500">
                {step.step}
              </div>
              <div className="relative pt-12 pl-1">
                <div className="w-12 h-12 rounded-xl bg-accent/8 flex items-center justify-center mb-4 group-hover:bg-accent group-hover:shadow-lg group-hover:shadow-accent/20 transition-all duration-500">
                  <step.icon
                    className="text-accent group-hover:text-accent-foreground transition-colors duration-300"
                    size={24}
                  />
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

        {/* CTA after process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-5 text-[15px]">
            O primeiro passo é simples — e gratuito.
          </p>
          <a href="#contato" className="btn-primary inline-block">
            Agendar meu diagnóstico
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
