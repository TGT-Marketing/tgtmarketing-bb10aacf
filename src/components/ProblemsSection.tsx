import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  EyeOff,
  TrendingDown,
  ThumbsDown,
  UserX,
  HelpCircle,
  ArrowRight,
} from "lucide-react";

const problems = [
  {
    icon: EyeOff,
    title: "Invisível no mercado",
    text: "Seus concorrentes aparecem mais que você? Sua empresa existe, mas ninguém encontra.",
  },
  {
    icon: TrendingDown,
    title: "Marketing sem retorno",
    text: "Você investe em marketing mas não sabe se está funcionando. Sem dados, sem direção.",
  },
  {
    icon: ThumbsDown,
    title: "Redes sociais mortas",
    text: "Posts sem curtidas, sem comentários, sem gerar um único cliente. Só trabalho perdido.",
  },
  {
    icon: UserX,
    title: "Poucos clientes novos",
    text: "O telefone não toca. O WhatsApp não apita. A empresa cresce menos do que poderia.",
  },
  {
    icon: HelpCircle,
    title: "Marca sem identidade",
    text: "Seu público não reconhece sua marca. Sem posicionamento claro, você vira commodity.",
  },
];

const ProblemsSection = ({
  onOpenContact,
}: {
  onOpenContact?: () => void;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-section-dark" ref={ref}>
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="section-label text-accent justify-center mb-4 block">
            Isso parece familiar?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-section-dark-foreground mt-3 mb-4 tracking-tight">
            Se sua empresa enfrenta esses problemas,
            <br className="hidden sm:block" />
            <span className="text-accent">você está perdendo dinheiro.</span>
          </h2>
          <div className="divider-accent mx-auto mb-6" />
          <p className="text-section-dark-foreground/50 max-w-2xl mx-auto mb-14 text-[15px]">
            A maioria das empresas que nos procura tinha pelo menos 3 desses
            problemas. Todas conseguiram resolver e escalar de forma
            direcionada.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-primary/60 border-2 border-section-dark-foreground/8 rounded-2xl p-5 sm:p-7 hover:border-accent/50 transition-all duration-500 hover:bg-primary/80"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                <problem.icon
                  className="text-accent"
                  size={24}
                />
              </div>
              <h3 className="text-section-dark-foreground font-bold text-lg mb-2">
                {problem.title}
              </h3>
              <p className="text-section-dark-foreground/50 text-sm leading-relaxed">
                {problem.text}
              </p>
            </motion.div>
          ))}

          <motion.div
            onClick={onOpenContact}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-accent/10 border-2 border-section-dark-foreground/10 rounded-2xl p-7 flex flex-col items-center justify-center gap-3 text-center cursor-pointer hover:bg-accent/20 hover:border-section-dark-foreground/50 transition-all duration-500 group"
          >
            <span className="text-accent font-extrabold text-xl">
              Chega de perder tempo.
            </span>
            <span className="text-section-dark-foreground/60 text-sm">
              Solicite seu diagnóstico gratuito agora
            </span>
            <span className="inline-flex items-center gap-2 text-accent font-bold group-hover:gap-3 transition-all">
              Começar <ArrowRight size={18} />
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemsSection;
