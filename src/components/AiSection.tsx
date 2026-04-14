import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BrainCircuit, BarChart3, Target, Zap, MessageCircle } from "lucide-react";
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
      style={{ background: "hsl(0 0% 8%)" }}
    >
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="order-2 lg:order-1"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl max-h-[280px] sm:max-h-[360px] lg:max-h-none">
              <motion.img
                src={aiImage}
                alt="Inteligência Artificial aplicada ao marketing"
                className="w-full h-full object-cover"
                loading="lazy"
                width={1024}
                height={768}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
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
            <h2 className="text-lg sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4 sm:mb-5 leading-[1.15]"
              style={{ color: "hsl(0 0% 95%)" }}
            >
              Tecnologia aliada à{" "}
              <span className="text-accent">inteligência dos resultados</span>
            </h2>
            <div className="divider-accent mb-4 sm:mb-6" />

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
              className="text-sm sm:text-[15px] leading-relaxed mb-6 sm:mb-8 font-semibold"
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
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 cursor-pointer group/card transition-all duration-300"
                  style={{ background: "hsl(0 0% 18%)", border: "1px solid hsl(0 0% 22%)" }}
                >
                  <motion.div
                    className="shrink-0 flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300 group-hover/card:bg-accent/15 group-hover/card:shadow-[0_0_12px_hsl(var(--accent)/0.3)]"
                  >
                    <item.icon className="text-accent shrink-0 transition-transform duration-300 group-hover/card:scale-110" size={20} />
                  </motion.div>
                  <span
                    className="text-sm font-medium transition-colors duration-300 group-hover/card:text-white"
                    style={{ color: "hsl(0 0% 85%)" }}
                  >
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>

            <a
              href="https://wa.me/5519992795271"
              target="_blank"
              rel="noopener noreferrer"
              className="shine-effect inline-flex items-center justify-center gap-2.5 bg-accent text-accent-foreground font-bold text-[14px] sm:text-base px-6 sm:px-8 py-3 sm:py-4 rounded-lg shadow-lg hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5 transition-all duration-300 mt-8 w-full sm:w-auto whitespace-nowrap"
            >
              <MessageCircle size={18} className="shrink-0" />
              Quero vender mais!
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AiSection;
