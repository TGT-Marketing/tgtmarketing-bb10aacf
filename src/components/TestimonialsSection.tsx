import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Carlos Mendes",
    role: "CEO, Tech Solutions",
    text: "A TGT transformou completamente nosso posicionamento. Durante o trabalho, nossos leads triplicaram e a receita cresceu 40%. Não é uma agência, é uma parceira de negócios.",
    rating: 5,
    initials: "CM",
  },
  {
    name: "Ana Paula Silva",
    role: "Diretora, Studio AP",
    text: "Finalmente uma agência que entende de RESULTADO. Antes gastávamos com marketing sem saber se funcionava. Com a TGT, cada real foi investido e não mais gasto, gerando retorno mensurável para nós.",
    rating: 5,
    initials: "AP",
  },
  {
    name: "Roberto Fernandes",
    role: "Fundador, RF Consultoria",
    text: "A identidade visual que criaram para nós mudou a percepção dos nossos clientes. Passamos a cobrar 60% mais caro e fechar mais contratos. O branding fez toda diferença e atingiu o sucesso da minha marca.",
    rating: 5,
    initials: "RF",
  },
];

const TestimonialsSection = () => {
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
            Prova social
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mt-3 mb-5 tracking-tight">
            Quem trabalhou com a TGT{" "}
            <span className="text-accent">recomenda.</span>
          </h2>
          <div className="flex items-center justify-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="text-accent fill-accent" size={20} />
            ))}
          </div>
          <p className="text-muted-foreground text-sm">
            Nota 5.0 no Google Business — 100% de avaliações positivas
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="card-premium p-5 sm:p-8 relative group border-2 border-border hover:border-accent/50 transition-all duration-500"
            >
              <Quote
                className="text-accent/8 absolute top-6 right-6 group-hover:text-accent/15 transition-colors duration-500"
                size={48}
              />
              <div className="flex gap-0.5 mb-5">
                {[...Array(t.rating)].map((_, j) => (
                  <Star
                    key={j}
                    className="text-accent fill-accent"
                    size={14}
                  />
                ))}
              </div>
              <p className="text-muted-foreground leading-relaxed mb-8 relative z-10 text-[15px]">
                "{t.text}"
              </p>
              <div className="border-t border-border pt-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-sm">
                  {t.initials}
                </div>
                <div>
                  <div className="font-bold text-foreground text-sm">
                    {t.name}
                  </div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
