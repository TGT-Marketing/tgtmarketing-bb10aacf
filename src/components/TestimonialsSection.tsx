import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Carlos Mendes",
    role: "CEO, Tech Solutions",
    text: "A TGT transformou completamente nosso posicionamento. Durante o trabalho, nossos leads triplicaram e a receita cresceu 40%. Não é uma agência, é uma parceira de negócios.",
    rating: 5,
  },
  {
    name: "Ana Paula Silva",
    role: "Diretora, Studio AP",
    text: "Finalmente uma agência que entende de RESULTADO. Antes gastávamos com marketing sem saber se funcionava. Com a TGT, cada real investido gera retorno mensurável.",
    rating: 5,
  },
  {
    name: "Roberto Fernandes",
    role: "Fundador, RF Consultoria",
    text: "A identidade visual que criaram para nós mudou a percepção dos nossos clientes. Passamos a cobrar 60% mais caro e fechar mais contratos. O branding fez toda diferença.",
    rating: 5,
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
          className="text-center mb-14"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">
            Prova social
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-3 mb-4">
            Quem trabalhou com a TGT <span className="text-accent">recomenda.</span>
          </h2>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="text-accent fill-accent" size={22} />
            ))}
          </div>
          <p className="text-muted-foreground text-sm">
            Nota 5.0 no Google Business — 100% de avaliações positivas
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-card border border-border rounded-xl p-8 relative hover:border-accent/30 hover:shadow-lg transition-all duration-300"
            >
              <Quote className="text-accent/15 absolute top-6 right-6" size={48} />
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="text-accent fill-accent" size={14} />
                ))}
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6 relative z-10">
                "{t.text}"
              </p>
              <div className="border-t border-border pt-4">
                <div className="font-bold text-foreground">{t.name}</div>
                <div className="text-sm text-muted-foreground">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
