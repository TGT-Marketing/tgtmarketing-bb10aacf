import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { X, ArrowRight, CheckCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

import portfolioBranding from "@/assets/portfolio-branding.jpg";
import portfolioWebdesign from "@/assets/portfolio-webdesign.jpg";
import portfolioPerformance from "@/assets/portfolio-performance.jpg";
import portfolioSocial from "@/assets/portfolio-social.jpg";
import portfolioEcommerce from "@/assets/portfolio-ecommerce.jpg";
import portfolioContent from "@/assets/portfolio-content.jpg";

const portfolioItems = [
  {
    title: "Identidade Visual Completa",
    category: "Identidade Visual",
    color: "from-accent to-marsala",
    image: portfolioBranding,
    description: "Desenvolvemos identidades visuais que comunicam a essência da sua marca. Do logotipo ao manual de marca completo, cada detalhe é pensado para diferenciar seu negócio no mercado.",
    deliverables: [
      "Logotipo e variações",
      "Paleta de cores e tipografia",
      "Manual de identidade visual",
      "Papelaria completa",
      "Aplicações em materiais digitais e impressos",
    ],
  },
  {
    title: "Site Institucional",
    category: "Criação de Sites",
    color: "from-primary to-gray-700",
    image: portfolioWebdesign,
    description: "Sites modernos, responsivos e otimizados para conversão. Criamos experiências digitais que representam sua marca com excelência e transformam visitantes em clientes.",
    deliverables: [
      "Design personalizado de interface e experiência",
      "Desenvolvimento responsivo",
      "Otimização para mecanismos de busca",
      "Integração com redes sociais",
      "Painel administrativo intuitivo",
    ],
  },
  {
    title: "Campanha de Performance",
    category: "Tráfego Pago",
    color: "from-marsala to-red-900",
    image: portfolioPerformance,
    description: "Campanhas estratégicas no Google Ads e Meta Ads que geram leads qualificados e vendas reais. Monitoramento constante e otimização para maximizar seu retorno sobre investimento.",
    deliverables: [
      "Estratégia de tráfego pago",
      "Criação de anúncios otimizados",
      "Segmentação de público-alvo",
      "Relatórios de desempenho",
      "Otimização contínua de campanhas",
    ],
  },
  {
    title: "Gestão de Redes Sociais",
    category: "Redes Sociais",
    color: "from-gray-800 to-gray-600",
    image: portfolioSocial,
    description: "Gestão completa das suas redes sociais com conteúdo estratégico, calendário editorial e interação com o público. Posicionamos sua marca como autoridade no seu segmento.",
    deliverables: [
      "Planejamento estratégico mensal",
      "Criação de conteúdo visual",
      "Redação publicitária persuasiva",
      "Gestão de comunidade",
      "Relatórios de engajamento",
    ],
  },
  {
    title: "Loja Virtual",
    category: "Comércio Digital",
    color: "from-accent/90 to-primary",
    image: portfolioEcommerce,
    description: "Lojas virtuais completas e otimizadas para vender. Do layout à integração com meios de pagamento e logística, cuidamos de tudo para seu comércio digital decolar.",
    deliverables: [
      "Design de loja personalizado",
      "Cadastro de produtos",
      "Integração com pagamentos",
      "Configuração de frete e logística",
      "Treinamento para gestão da loja",
    ],
  },
  {
    title: "Produção Audiovisual",
    category: "Conteúdo",
    color: "from-marsala to-gray-800",
    image: portfolioContent,
    description: "Produção profissional de vídeos, fotos e materiais visuais que fortalecem sua marca. Conteúdos com qualidade cinematográfica para redes sociais, sites e campanhas.",
    deliverables: [
      "Vídeos institucionais",
      "Ensaios fotográficos",
      "Edição e pós-produção",
      "Conteúdo para redes sociais",
      "Animações e vinhetas em movimento",
    ],
  },
];

const PortfolioSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedItem, setSelectedItem] = useState<typeof portfolioItems[0] | null>(null);

  return (
    <section id="portfolio" className="section-padding bg-secondary" ref={ref}>
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">
            Portfólio
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-3 mb-4">
            Projetos que <span className="text-accent">falam por si</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Mais de uma década de projetos entregues com excelência.
            Cada trabalho é uma prova de que estratégia e criatividade geram resultados.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => setSelectedItem(item)}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent group-hover:from-primary/95 transition-all" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-accent mb-1">
                  {item.category}
                </span>
                <h3 className="text-xl font-bold text-primary-foreground group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <span className="inline-flex items-center gap-1 text-primary-foreground/60 text-sm mt-2 group-hover:text-accent/80 transition-colors">
                  Ver detalhes <ArrowRight size={14} />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Service Detail Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent className="max-w-2xl bg-card border-border p-0 overflow-hidden">
          {selectedItem && (
            <>
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-accent">
                    {selectedItem.category}
                  </span>
                  <h3 className="text-2xl font-extrabold text-foreground">
                    {selectedItem.title}
                  </h3>
                </div>
              </div>

              <div className="px-6 pb-6 space-y-5">
                <DialogHeader className="space-y-0">
                  <DialogTitle className="sr-only">{selectedItem.title}</DialogTitle>
                  <DialogDescription className="text-muted-foreground text-sm leading-relaxed">
                    {selectedItem.description}
                  </DialogDescription>
                </DialogHeader>

                <div>
                  <h4 className="text-sm font-bold text-foreground uppercase tracking-wider mb-3">
                    O que entregamos
                  </h4>
                  <ul className="space-y-2">
                    {selectedItem.deliverables.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="text-accent shrink-0" size={16} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#contato"
                  onClick={() => setSelectedItem(null)}
                  className="btn-primary inline-flex items-center justify-center gap-2 w-full text-center"
                >
                  Solicitar orçamento <ArrowRight size={18} />
                </a>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PortfolioSection;
