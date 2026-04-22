import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MessageCircle, CheckCircle2 } from "lucide-react";
import portfolioBranding from "@/assets/portfolio-branding.webp";
import portfolioTraffic from "@/assets/portfolio-traffic-cover.jpg";
import portfolioContent from "@/assets/portfolio-content-cover.png";
import portfolioWeb from "@/assets/portfolio-webdesign.webp";

type PortfolioProject = {
  client: string;
  description: string;
  results: string[];
  gallery: string[];
  videoUrl?: string; // YouTube or Vimeo embed URL (single, legacy)
  videoUrls?: string[]; // Multiple YouTube or Vimeo embed URLs
};

type PortfolioItem = {
  title: string;
  category: string;
  image: string;
  intro: string;
  projects: PortfolioProject[];
};

const portfolioItems: PortfolioItem[] = [
  {
    title: "Criação de Marca [Branding]",
    category: "Identidade",
    image: portfolioBranding,
    intro:
      "Construímos marcas memoráveis, com identidade visual coerente e posicionamento que vende.",
    projects: [
      {
        client: "Projeto exemplo — substitua pelo nome do cliente",
        description:
          "Reposicionamento de marca completo, com nova identidade visual, manual de marca e aplicações em todos os pontos de contato.",
        results: [
          "Aumento de 80% no reconhecimento de marca",
          "Padronização visual em todos os canais",
          "Manual de marca completo entregue",
        ],
        gallery: [portfolioBranding, portfolioBranding, portfolioBranding],
      },
    ],
  },
  {
    title: "Gestão de Tráfego",
    category: "Performance",
    image: portfolioTraffic,
    intro:
      "Campanhas pagas com foco em ROI e conversão real, não em métricas de vaidade.",
    projects: [
      {
        client: "Projeto exemplo — substitua pelo nome do cliente",
        description:
          "Estruturação completa de campanhas no Meta Ads e Google Ads, com pixel, públicos personalizados e funil de conversão.",
        results: [
          "ROI de 12x em 90 dias",
          "Custo por lead reduzido em 65%",
          "+1.200 leads qualificados/mês",
        ],
        gallery: [portfolioTraffic, portfolioTraffic, portfolioTraffic],
      },
    ],
  },
  {
    title: "Produção de Conteúdo",
    category: "Conteúdo",
    image: portfolioContent,
    intro:
      "Conteúdo estratégico que educa, engaja e converte seguidores em clientes.",
    projects: [
      {
        client: "Projeto exemplo — substitua pelo nome do cliente",
        description:
          "Planejamento editorial mensal, produção de fotos, vídeos curtos e copywriting estratégico para redes sociais.",
        results: [
          "Crescimento de 220% em alcance orgânico",
          "Engajamento médio acima de 8%",
          "+15 mil novos seguidores qualificados",
        ],
        gallery: [portfolioContent, portfolioContent, portfolioContent],
        videoUrls: [
          "https://www.youtube.com/embed/-O33RMVZN6k",
          "https://www.youtube.com/embed/Sen_t5TeVLU",
        ],
      },
    ],
  },
  {
    title: "Site e E-commerce",
    category: "Digital",
    image: portfolioWeb,
    intro:
      "Sites e landing pages que convertem visitantes em clientes — rápidos, responsivos e otimizados.",
    projects: [
      {
        client: "Projeto exemplo — substitua pelo nome do cliente",
        description:
          "Site institucional completo com foco em conversão, performance e SEO técnico.",
        results: [
          "Taxa de conversão de 6,8%",
          "Tempo de carregamento abaixo de 2s",
          "Primeiras posições no Google em palavras-chave estratégicas",
        ],
        gallery: [portfolioWeb, portfolioWeb, portfolioWeb],
      },
    ],
  },
];

const WHATSAPP_URL =
  "https://wa.me/5511999999999?text=Quero%20um%20trabalho%20assim%20para%20minha%20empresa!";

const PortfolioSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);

  return (
    <section id="portfolio" className="section-padding bg-background" ref={ref}>
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-20"
        >
          <span className="section-label justify-center mb-4 block">
            Portfólio
          </span>
          <h2 className="text-[1.4rem] sm:text-4xl lg:text-5xl font-extrabold text-foreground mt-3 mb-4 tracking-tight">
            Nossos <span className="text-accent">TRABALHOS</span>
          </h2>
          <div className="divider-accent mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolioItems.map((item, i) => (
            <motion.button
              type="button"
              onClick={() => setActiveItem(item)}
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label={`Ver trabalhos de ${item.title}`}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  width={800}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 p-6">
                <span className="text-accent text-xs font-bold uppercase tracking-widest mb-2 block">
                  {item.category}
                </span>
                <h3 className="text-white font-bold text-xl">{item.title}</h3>
                <span className="mt-3 inline-block text-white/80 text-xs font-medium underline-offset-4 group-hover:underline">
                  Ver trabalhos →
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <Dialog open={!!activeItem} onOpenChange={(open) => !open && setActiveItem(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {activeItem && (
            <>
              <DialogHeader>
                <span className="text-accent text-xs font-bold uppercase tracking-widest">
                  {activeItem.category}
                </span>
                <DialogTitle className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {activeItem.title}
                </DialogTitle>
                <DialogDescription className="text-base">
                  {activeItem.intro}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-10 mt-4">
                {activeItem.projects.map((project, idx) => (
                  <article
                    key={idx}
                    className="border-t border-border pt-6 first:border-t-0 first:pt-0"
                  >
                    <h4 className="text-lg font-bold text-foreground mb-2">
                      {project.client}
                    </h4>
                    <p className="text-muted-foreground mb-5">
                      {project.description}
                    </p>

                    {project.gallery.length > 0 && (
                      <Carousel className="w-full mb-5">
                        <CarouselContent>
                          {project.gallery.map((src, gIdx) => (
                            <CarouselItem key={gIdx}>
                              <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                                <img
                                  src={src}
                                  alt={`${project.client} - imagem ${gIdx + 1}`}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        {project.gallery.length > 1 && (
                          <>
                            <CarouselPrevious />
                            <CarouselNext />
                          </>
                        )}
                      </Carousel>
                    )}

                    {(project.videoUrl || project.videoUrls) && (
                      <div className="space-y-4 mb-5">
                        {project.videoUrl && (
                          <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                            <iframe
                              src={project.videoUrl}
                              title={`${project.client} - vídeo`}
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                        )}
                        {project.videoUrls?.map((url, vIdx) => (
                          <div key={vIdx} className="aspect-video overflow-hidden rounded-lg bg-muted">
                            <iframe
                              src={url}
                              title={`${project.client} - vídeo ${vIdx + 1}`}
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {project.results.length > 0 && (
                      <div className="bg-muted/40 rounded-lg p-4 mb-5">
                        <p className="text-sm font-bold text-foreground mb-2">
                          Resultados:
                        </p>
                        <ul className="space-y-2">
                          {project.results.map((r, rIdx) => (
                            <li key={rIdx} className="flex items-start gap-2 text-sm text-foreground">
                              <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                              <span>{r}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </article>
                ))}

                <div className="flex justify-center pt-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold"
                  >
                    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-5 h-5" />
                      Quero algo assim para minha empresa
                    </a>
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PortfolioSection;
