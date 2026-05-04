import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Star, Quote, Play, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import testimonialAndrea from "@/assets/testimonial-andrea.webp";
import testimonialFrancine from "@/assets/testimonial-francine.webp";
import testimonialVinicius from "@/assets/testimonial-vinicius.webp";

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
  },
  {
    name: "Vinicius Ribeiro",
    role: "Diretor Executivo, Max Limp Produtos de Limpeza, Higiene e Descartáveis",
    text: "As ideias que nós passamos para a TGT sempre se encaixava, casou muito essa questão das ideias e fez com que essa parceria se tornasse um sucesso. Eu agradeço muito a toda a equipe TGT, à todos os colaboradores, ao time. Toda equipe tem toda paciência para que as coisas aconteçam e espero que continuemos sendo parceiros por muitos e muitos anos...",
    rating: 5,
    initials: "VR",
    photo: testimonialVinicius,
    videoUrl: "https://www.youtube.com/embed/vUUIUwri964",
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

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
              className="card-premium p-4 sm:p-8 relative group border-2 border-border hover:border-accent/50 transition-all duration-500 flex flex-col h-full"
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
              <p className="text-muted-foreground leading-relaxed mb-6 relative z-10 text-[15px] whitespace-pre-wrap flex-grow">
                "{t.text}"
              </p>
              
              {t.videoUrl && (
                <button 
                  onClick={() => setSelectedVideo(t.videoUrl!)}
                  className="flex items-center gap-2 text-accent font-semibold text-sm mb-6 hover:text-accent/80 transition-colors group/btn"
                >
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center group-hover/btn:bg-accent/20 transition-colors">
                    <Play size={14} className="fill-accent ml-0.5" />
                  </div>
                  Assistir depoimento em vídeo
                </button>
              )}

              <div className="border-t border-border pt-5 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-border shadow-sm">
                  {t.photo ? (
                    <img
                      src={t.photo}
                      alt={t.name}
                      width={48}
                      height={48}
                      loading="lazy"
                      decoding="async"
                      className={cn(
                        "w-full h-full object-cover",
                        t.name === "Andréa Palharini" ? "scale-[1.0] object-[center_top]" : 
                        t.name === "Vinicius Ribeiro" ? "scale-[1.4] object-top" : "object-top"
                      )}
                    />
                  ) : (
                    <div className="w-full h-full bg-accent/10 flex items-center justify-center text-accent font-bold text-sm">
                      {t.initials}
                    </div>
                  )}
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

        <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
          <DialogContent className="max-w-4xl p-0 bg-black border-none overflow-hidden aspect-video">
            <DialogHeader className="sr-only">
              <DialogTitle>Depoimento em Vídeo</DialogTitle>
            </DialogHeader>
            {selectedVideo && (
              <iframe
                src={`${selectedVideo}?autoplay=1`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
            <button 
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X size={20} />
            </button>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default TestimonialsSection;
