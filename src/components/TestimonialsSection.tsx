import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";
import testimonialAndrea from "@/assets/testimonial-andrea.jpg";
import testimonialFrancine from "@/assets/testimonial-francine.jpg";

const testimonials = [
  {
    name: "Andréa Palharini",
    role: "Diretora e Engenheira de Alimentos, Equalisa Consultoria e Treinamentos de Alimentos",
    text: "Excelente experiência do início ao fim! Atendimento atencioso, condução super profissional durante o evento e uma entrega final impecável. As fotos, vídeos e depoimentos captaram perfeitamente a essência do evento e fortaleceram muito o posicionamento da minha marca. Recomendo sem hesitar!",
    rating: 5,
    initials: "AP",
    photo: testimonialAndrea,
  },
  {
    name: "Francine Ferreira Pessoa",
    role: "Diretora e Fonoaudióloga, Audfran Centro Auditivo",
    text: "Essa agência é a melhor! Guilherme é um profissional ímpar. Eles entendem simplesmente sobre tudo na área de marketing, além de serem seres humanos que ultrapassam limites de atenção com seus clientes. Super indico!",
    rating: 5,
    initials: "FF",
    photo: testimonialFrancine,
  {
    name: "Vinicius Ribeiro",
    role: "Diretor Executivo, Max Limp Produtos de Limpeza, Higiene e Descartáveis",
    text: "A TGT não é só uma agência, é parceira de verdade. Eles entendem o negócio, propõem solução inteligentes e acompanham tudo de perto. O nível de estratégia e execução, são outros níveis, totalmente diferenciados!",
    rating: 5,
    initials: "VR",
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
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mt-3 mb-5 tracking-tight">
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
              className="card-premium p-4 sm:p-8 relative group border-2 border-border hover:border-accent/50 transition-all duration-500"
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
                {t.photo ? (
                  <img src={t.photo} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-sm">
                    {t.initials}
                  </div>
                )}
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
