import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BrainCircuit, BarChart3, Target, Zap } from "lucide-react";
import aiImage from "@/assets/ai-intelligence.jpg";

const highlights = [
  {
    icon: BrainCircuit,
    text: "Análise de dados em tempo real",
  },
  {
    icon: Target,
    text: "Previsão de comportamento do consumidor",
  },
  {
    icon: BarChart3,
    text: "Investimentos otimizados por evidências",
  },
  {
    icon: Zap,
    text: "Estratégias que evoluem automaticamente",
  },
];

const AiSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="section-padding"
      style={{ background: "hsl(0 0% 14%)" }}
    >
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="order-2 lg:order-1"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={aiImage}
                alt="Inteligência Artificial aplicada ao marketing"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2"
          >
            <span className="section-label mb-4 block text-accent">
              Inteligência Artificial
            </span>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-5 leading-[1.15]"
              style={{ color: "hsl(0 0% 95%)" }}
            >
              Tecnologia aliada à{" "}
              <span className="text-accent">inteligência dos resultados</span>
            </h2>
            <div className="divider-accent mb-6" />

            <p
              className="text-sm sm:text-[15px] leading-relaxed mb-4"
              style={{ color: "hsl(0 0% 65%)" }}
            >
              Utilizamos a Inteligência Artificial como o cérebro por trás de toda a operação de marketing — analisando dados em tempo real, identificando oportunidades, prevendo comportamentos e orientando decisões com precisão. Mais do que automatizar tarefas, a IA permite construir estratégias altamente inteligentes, personalizadas e orientadas a performance.
            </p>
            <p
              className="text-sm sm:text-[15px] leading-relaxed mb-4"
              style={{ color: "hsl(0 0% 65%)" }}
            >
              Isso significa campanhas mais eficientes, investimentos otimizados e ações baseadas em evidências, não em suposições. A cada interação, a tecnologia aprende, ajusta rotas e potencializa resultados, garantindo que sua marca esteja sempre um passo à frente da concorrência.
            </p>
            <p
              className="text-sm sm:text-[15px] leading-relaxed mb-8 font-semibold"
              style={{ color: "hsl(0 0% 80%)" }}
            >
              Com a combinação entre inteligência humana e capacidade analítica da IA, transformamos dados em decisões estratégicas e decisões em crescimento sustentável.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 hover:scale-[1.02]"
                  style={{ background: "hsl(0 0% 18%)", border: "1px solid hsl(0 0% 22%)" }}
                >
                  <item.icon className="text-accent shrink-0" size={20} />
                  <span
                    className="text-sm font-medium"
                    style={{ color: "hsl(0 0% 85%)" }}
                  >
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AiSection;
