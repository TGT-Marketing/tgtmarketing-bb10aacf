import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Carlos Mendes",
    role: "CEO, Tech Solutions",
    text: "A TGT transformou completamente nosso posicionamento digital. Em poucos meses nossos resultados triplicaram. Profissionais sérios e comprometidos com o sucesso do cliente.",
  },
  {
    name: "Ana Paula Silva",
    role: "Diretora, Studio AP",
    text: "Trabalhar com a TGT foi a melhor decisão que tomamos. Eles entendem de estratégia e entregam resultados reais, não apenas promessas. Recomendo fortemente.",
  },
  {
    name: "Roberto Fernandes",
    role: "Fundador, RF Consultoria",
    text: "A equipe da TGT é excepcional. Criaram toda nossa identidade visual e estratégia de marketing com maestria. O retorno sobre o investimento superou todas as expectativas.",
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
            Depoimentos
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-3 mb-4">
            O que nossos clientes dizem
          </h2>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="text-accent fill-accent" size={20} />
            ))}
          </div>
          <p className="text-muted-foreground text-sm">
            Avaliação 5 estrelas no Google Business
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-card border border-border rounded-xl p-8 relative"
            >
              <Quote className="text-accent/20 absolute top-6 right-6" size={40} />
              <p className="text-muted-foreground leading-relaxed mb-6 relative z-10">
                "{t.text}"
              </p>
              <div>
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
