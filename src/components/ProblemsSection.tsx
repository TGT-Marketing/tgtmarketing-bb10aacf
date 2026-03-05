import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { EyeOff, TrendingDown, ThumbsDown, UserX, HelpCircle, ArrowRight } from "lucide-react";

const problems = [
  { icon: EyeOff, text: "Falta de visibilidade no mercado" },
  { icon: TrendingDown, text: "Marketing sem estratégia definida" },
  { icon: ThumbsDown, text: "Redes sociais sem resultado" },
  { icon: UserX, text: "Dificuldade de gerar clientes" },
  { icon: HelpCircle, text: "Marca sem posicionamento claro" },
];

const ProblemsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-section-dark" ref={ref}>
      <div className="container-main text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">
            Desafios
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-section-dark-foreground mt-3 mb-4">
            Sua empresa enfrenta algum desses problemas?
          </h2>
          <p className="text-section-dark-foreground/60 max-w-2xl mx-auto mb-12">
            Se você se identificou com pelo menos um desses desafios, a TGT pode
            ajudar sua empresa a superar essas barreiras com estratégia e
            inteligência.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.text}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-primary/40 border border-primary-foreground/10 rounded-xl p-6 flex items-start gap-4 text-left"
            >
              <problem.icon className="text-accent shrink-0 mt-1" size={24} />
              <span className="text-section-dark-foreground/90 font-medium">
                {problem.text}
              </span>
            </motion.div>
          ))}

          <motion.a
            href="#contato"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-accent/10 border border-accent/30 rounded-xl p-6 flex items-center justify-center gap-3 text-accent font-bold hover:bg-accent/20 transition cursor-pointer"
          >
            Descubra a solução <ArrowRight size={20} />
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default ProblemsSection;
