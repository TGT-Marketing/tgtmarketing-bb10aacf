import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ContactFormDialog from "@/components/ContactFormDialog";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MessageCircle, CheckCircle2, Sparkles as SparklesIcon } from "lucide-react";
import portfolioBranding from "/portfolio-branding-new.png";
import portfolioTraffic from "@/assets/portfolio-traffic-cover.jpg";
import portfolioContent from "@/assets/portfolio-content-cover.png";
import portfolioWeb from "/portfolio-web-new.png";

type PortfolioProject = {
  client: string;
  description: string;
  results: string[];
  gallery: string[];
  link?: string;
  videoUrl?: string; // YouTube or Vimeo embed URL (single, legacy)
  videoUrls?: string[]; // Multiple YouTube or Vimeo embed URLs
};

type PortfolioItem = {
  title: string;
  category: string;
  image: string;
  intro: string;
  projects: PortfolioProject[];
  imageClassName?: string;
};

const portfolioItems: PortfolioItem[] = [
  {
    title: "Criação de Marca [Branding]",
    category: "Identidade",
    image: portfolioBranding,
    imageClassName: "scale-[1.2] group-hover:scale-[1.3]",
    intro:
      "Construímos marcas memoráveis, com identidade visual estratégica, comunicação direcionada e posicionamento forte para gerar reconhecimento, autoridade e vendas.",
    projects: [
      {
        client: "Cliente: Multi Malte Chopp | Criação de Nome e Identidade Visual da Marca",
        description:
          "A marca Multi Malte apresenta uma identidade visual forte, marcante e autêntica, construída para se destacar no mercado cervejeiro.\n\nCom uma comunicação visual alinhada ao universo da cerveja artesanal, a marca transmite qualidade, tradição e experiência, criando conexão imediata com o público e fortalecendo seu posicionamento comercial.",
        results: [],
        gallery: ["https://cvbgrjauqjawrsyknhyj.supabase.co/storage/v1/object/public/files/uploads/2yyDFbv3SZYCVOKzHfDhTmjpljf2/1777925637700-sefsq-ChatGPT_Image_30_de_abr._de_2026__08_13_55.png"],
      },
      {
        client: "Cliente: Queijaria Três Saltos | Criação de Identidade Visual da Marca",
        description:
          "A marca Queijaria Três Saltos apresenta uma identidade visual acolhedora, artesanal e muito bem conectada ao universo rural.\n\nCom elementos que remetem à fazenda, natureza e produção caseira, a marca transmite tradição, qualidade e origem, criando uma percepção de produto autêntico, regional e de alto valor.",
        results: [],
        gallery: ["https://cvbgrjauqjawrsyknhyj.supabase.co/storage/v1/object/public/files/uploads/2yyDFbv3SZYCVOKzHfDhTmjpljf2/1777927952222-jbi04-ChatGPT_Image_30_de_abr._de_2026__08_23_48.png"],
      },
      {
        client: "Cliente: Droga Única Popular | Criação de Identidade Visual da Marca",
        description:
          "A marca Droga Única Popular apresenta uma identidade visual forte, direta e altamente comercial, muito bem alinhada ao segmento farmacêutico popular.\nCom cores de alto impacto, comunicação objetiva e elementos ligados à saúde e economia, a marca transmite confiança, acessibilidade e conveniência, criando uma presença visual marcante e fácil de reconhecer.",
        results: [
          "Identidade visual artesanal e acolhedora",
          "Conexão imediata com o universo rural e de fazenda",
          "Fortalecimento da percepção de valor do produto",
          "Padronização visual completa (on e offline)",
          "Manual de marca completo entregue",
        ],
        gallery: ["https://cvbgrjauqjawrsyknhyj.supabase.co/storage/v1/object/public/files/uploads/2yyDFbv3SZYCVOKzHfDhTmjpljf2/1777928466120-l5onc-ChatGPT_Image_30_de_abr._de_2026__08_51_04.png"],
      },
    ],
  },
  {
    title: "Gestão de Tráfego Estratégica",
    category: "Performance",
    image: portfolioTraffic,
    intro:
      "Campanhas pagas com foco em ROI e conversão real, não em métricas de vaidade.",
    projects: [
      {
        client: "",
        description:
          "A Gestão de Tráfego Pago da TGT Marketing posiciona sua empresa na frente das pessoas certas, no momento certo, com campanhas estratégicas para gerar mais visibilidade, leads, mensagens e vendas.\n\nCom análise de público, criação de campanhas, segmentação, otimização constante e acompanhamento de métricas, transformamos investimento em mídia em oportunidades reais de negócio.",
        results: [
          "Mais pessoas qualificadas conhecendo sua empresa",
          "Aumento no volume de leads, mensagens e orçamentos",
          "Campanhas direcionadas para o público certo",
          "Melhor aproveitamento do investimento em anúncios",
          "Mais visibilidade para produtos, serviços e ofertas",
          "Dados claros para decisões mais estratégicas",
          "Fortalecimento da presença digital da marca",
          "Maior potencial de conversão e vendas",
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
      "Conteúdo estratégico que educa, engaja e converte seguidores em clientes.\n\nA Produção de Conteúdo da TGT Marketing transforma ideias em materiais profissionais para redes sociais, campanhas e posicionamento de marca.\n\nCom equipamentos de alta qualidade, equipe experiente, direção criativa e olhar estratégico, criamos fotos, vídeos e conteúdos que geram mais autoridade, conexão e valor para o público.\n\nMais do que produzir, entregamos conteúdo pensado para destacar sua marca e vender melhor.",
    projects: [
      {
        client: "Projeto exemplo — substitua pelo nome do cliente",
        description:
          "Planejamento editorial mensal, produção de fotos, vídeos curtos e copywriting estratégico para redes sociais.",
        results: [
          "Conteúdos com mais qualidade visual e credibilidade",
          "Vídeos mais atrativos para redes sociais, anúncios e campanhas",
          "Fortalecimento da imagem profissional da empresa",
          "Maior potencial de alcance, engajamento e conversão",
          "Mais autoridade para a marca no digital",
          "Melhor apresentação de produtos, serviços, equipe e estrutura",
          "Conteúdos prontos para usar em Instagram, Reels, TikTok, YouTube e Tráfego Pago",
          "Aumento da percepção de valor do público sobre a empresa"
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
    imageClassName: "scale-[1.2] -translate-y-[8%] origin-top group-hover:scale-[1.25]",
    intro:
      "Sites e landing pages que convertem visitantes em clientes — rápidos, responsivos e otimizados.",
    projects: [
      {
        client: "Cliente: Rocha Assessoria Contábil | https://www.rochacontabil.com.br/",
        description:
          "O site da Rocha Assessoria Contábil apresenta uma construção institucional, clara e estratégica, transmitindo confiança, tradição e profissionalismo.\n\nDo ponto de vista de desenvolvimento, destaca-se pela estrutura objetiva, navegação simples, boa organização dos serviços e chamadas comerciais bem posicionadas, facilitando a experiência do usuário e conduzindo o visitante ao contato.\n\nResumo final:\nUm site bem estruturado e profissional, pensado para fortalecer a autoridade da marca, gerar credibilidade e atrair novos clientes.",
        results: [
          "Destaque para os 40 anos de experiência",
          "Navegação clara e estratégica dos serviços",
          "Foco total em autoridade e conversão"
        ],
        gallery: ["/branding-project-1.png"],
        link: "https://www.rochacontabil.com.br/",
      },
      {
        client: "Cliente: Claudio Poços Artesianos | https://claudiopocosartesianos.com.br/",
        description:
          "O site da Claudio Poços Artesianos apresenta uma construção objetiva, funcional e voltada para captação de clientes, com layout limpo, navegação simples e foco em conversão.\n\nDo ponto de vista de desenvolvimento, destaca-se pela estrutura direta, botões de contato visíveis, boa organização visual e adaptação para mobile, facilitando a experiência do usuário e o acesso rápido aos canais de orçamento.\n\nResumo final:\nUm site estratégico e comercial, pensado para gerar confiança, facilitar o contato e transformar visitantes em potenciais clientes.",
        results: [
          "Foco total em conversão e captação de leads",
          "Layout objetivo e navegação simplificada",
          "Estrutura otimizada para dispositivos móveis",
          "Fácil acesso aos canais de contato"
        ],
        gallery: ["/branding-project-2.png"],
        link: "https://claudiopocosartesianos.com.br/",
      },
      {
        client: "Cliente: Ricks Medicina Ocupacional | https://www.ricksocupacional.com.br/",
        description:
          "O site da Ricks Ocupacional apresenta uma construção moderna, objetiva e profissional, transmitindo credibilidade, organização e confiança para empresas que buscam serviços de medicina ocupacional e segurança do trabalho.\n\nDo ponto de vista de desenvolvimento, o site se destaca pela navegação simples, layout limpo, boa hierarquia visual e estrutura comercial, facilitando o acesso às informações e conduzindo o visitante ao contato.\n\nResumo final:\nUm site bem estruturado, estratégico e funcional, pensado para fortalecer a autoridade da marca e transformar visitantes em potenciais clientes.",
        results: [
          "Construção moderna e estratégica",
          "Hierarquia visual focada em conversão",
          "Comunicação humanizada e profissional",
          "Fortalecimento da autoridade digital"
        ],
        gallery: ["/branding-project-3.png"],
        link: "https://www.ricksocupacional.com.br/",
      },
    ],
  },
];

const WHATSAPP_URL =
  "https://wa.me/5519992795271?text=Quero%20um%20trabalho%20assim%20para%20minha%20empresa!";

const PortfolioSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);
  const [contactOpen, setContactOpen] = useState(false);

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
            Nossos <span className="text-accent">trabalhos</span>
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
                  className={cn(
                    "w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110 aspect-[3/4]",
                    item.imageClassName
                  )}
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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 sm:mt-20 max-w-3xl mx-auto text-center bg-card/40 backdrop-blur-sm border border-border rounded-2xl p-8 sm:p-10"
        >
          <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-3 tracking-tight">
            Quer resultados como esses na <span className="text-accent">sua empresa</span>?
          </h3>
          <p className="text-muted-foreground text-base sm:text-lg mb-6">
            Fale com a gente agora ou solicite um diagnóstico gratuito do seu negócio.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
            <Button
              asChild
              size="lg"
              className="shine-effect font-bold text-base"
              style={{
                backgroundColor: "hsl(var(--whatsapp))",
                color: "hsl(var(--whatsapp-foreground))",
              }}
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5" />
                Falar no WhatsApp
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setContactOpen(true)}
              className="font-bold text-base border-accent text-accent hover:bg-accent hover:text-accent-foreground"
            >
              <SparklesIcon className="w-5 h-5" />
              Solicitar diagnóstico gratuito
            </Button>
          </div>
        </motion.div>
      </div>

      <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} />

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
                <DialogDescription className="text-base whitespace-pre-line">
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
                      {project.link ? (
                        <>
                          {project.client.split('|')[0]}
                          {project.client.includes('|') && ' | '}
                          <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-accent hover:underline break-all"
                          >
                            {project.link}
                          </a>
                        </>
                      ) : (
                        project.client
                      )}
                    </h4>
                    <p className="text-muted-foreground mb-5 whitespace-pre-line">
                      {project.description}
                    </p>

                    {project.gallery.length > 0 && (
                      <div className="mb-5">
                        {activeItem.title === "Produção de Conteúdo" && (
                          <p className="text-sm font-medium text-foreground mb-3 italic">
                            Equipe TGT realizando captação de conteúdos em evento com gravação em tempo real LIVE AO VIVO
                          </p>
                        )}
                        <Carousel className="w-full">
                          <CarouselContent>
                            {project.gallery.map((src, gIdx) => (
                              <CarouselItem key={gIdx}>
                                <div className={cn(
                                  "aspect-video overflow-hidden rounded-xl bg-muted border-2 border-border/50 shadow-inner group/img",
                                  project.link && "cursor-pointer"
                                )}>
                                  {project.link ? (
                                    <a 
                                      href={project.link} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="block w-full h-full"
                                    >
                                      <img
                                        src={src}
                                        alt={`${project.client} - imagem ${gIdx + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105 aspect-video"
                                        loading="lazy"
                                      />
                                    </a>
                                  ) : (
                                    <img
                                      src={src}
                                      alt={`${project.client} - imagem ${gIdx + 1}`}
                                      className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105 aspect-video"
                                      loading="lazy"
                                    />
                                  )}
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
                        
                        {activeItem.title === "Produção de Conteúdo" && (
                          <div className="mt-6 p-5 bg-accent/5 rounded-xl border border-accent/10">
                            <p className="text-sm sm:text-base text-foreground leading-relaxed">
                              <span className="font-bold text-accent">Nossos Projetos:</span> Explore abaixo uma seleção de nossos conteúdos finalizados. 
                              Cada material reflete nosso compromisso com a <span className="font-semibold text-accent">alta qualidade cinematográfica</span> e direção criativa estratégica.
                            </p>
                            <p className="text-sm font-bold text-accent mt-3 flex items-center gap-2">
                              <SparklesIcon className="w-4 h-4" />
                              Clique nos vídeos abaixo para dar o play e conferir a qualidade premium do nosso trabalho.
                            </p>
                          </div>
                        )}
                      </div>
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

                    {project.results.length > 0 && idx === activeItem.projects.length - 1 && (
                      <div className="bg-muted/40 rounded-lg p-4 mb-5">
                        <p className="text-sm font-bold text-foreground mb-2">
                          {activeItem.title === "Produção de Conteúdo" 
                            ? "Resultados que uma captação profissional pode gerar:" 
                            : activeItem.title === "Gestão de Tráfego Estratégica"
                            ? "Resultados que podem ser alcançados:"
                            : "Resultados:"}
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
