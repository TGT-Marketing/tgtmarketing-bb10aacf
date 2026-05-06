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
import { MessageCircle, CheckCircle2, Sparkles as SparklesIcon, ArrowRight } from "lucide-react";
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
  directVideoUrl?: string;
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
        results: [],
        gallery: ["https://cvbgrjauqjawrsyknhyj.supabase.co/storage/v1/object/public/files/uploads/2yyDFbv3SZYCVOKzHfDhTmjpljf2/1777928466120-l5onc-ChatGPT_Image_30_de_abr._de_2026__08_51_04.png"],
      },
      {
        client: "Cliente: Alma & Afeto Semijoias | Criação de Identidade Visual da Marca",
        description:
          "A marca Alma & Afeto Semijoias apresenta uma identidade visual sofisticada, elegante e muito bem posicionada para o mercado de acessórios premium.\n\nCom uma paleta refinada, acabamento em dourado e comunicação delicada, a marca transmite exclusividade, cuidado e valorização pessoal, criando uma percepção de desejo, beleza e alto valor.",
        results: [
          "Identidade visual alinhada aos conceitos do negócio",
          "Conexão imediata com o público",
          "Fortalecimento da percepção de valor do produto",
          "Padronização visual completa (on e offline)",
          "Manual de marca completo entregue",
        ],
        gallery: ["https://cvbgrjauqjawrsyknhyj.supabase.co/storage/v1/object/public/files/uploads/2yyDFbv3SZYCVOKzHfDhTmjpljf2/1778010820224-gzh50-ChatGPT_Image_30_de_abr._de_2026__16_24_13.png"],
      },
      {
        client: "Cliente: Studio Evolua | Criação de Nome e Identidade Visual da Marca",
        description:
          "A marca Studio Evolua by Lu Longo apresenta uma identidade visual leve, moderna e muito bem conectada ao universo fitness feminino.\n\nCom cores vibrantes, símbolo em movimento e comunicação acolhedora, a marca transmite energia, evolução e bem-estar, criando uma percepção de cuidado, motivação e transformação pessoal.",
        results: [
          "Identidade visual alinhada aos conceitos do negócio",
          "Conexão imediata com o público",
          "Fortalecimento da percepção de valor do produto",
          "Padronização visual completa (on e offline)",
          "Manual de marca completo entregue",
        ],
        gallery: ["https://cvbgrjauqjawrsyknhyj.supabase.co/storage/v1/object/public/files/uploads/2yyDFbv3SZYCVOKzHfDhTmjpljf2/1778072361401-4uxi6-ChatGPT_Image_5_de_mai._de_2026__17_09_29.png"],
      },
      {
        client: "Cliente: Lumarchi Embalagens | Rebranding da Marca - 40 anos de Mercado",
        description:
          "A marca Lumarchi Embalagens apresenta uma identidade visual sólida, profissional e muito bem alinhada ao segmento industrial.\n\nCom símbolo marcante, tipografia forte e paleta em azul, a marca transmite confiança, organização e credibilidade, criando uma percepção de empresa estruturada, segura e preparada para atender o mercado de embalagens.",
        results: [
          "Identidade visual alinhada aos conceitos do negócio",
          "Conexão imediata com o público",
          "Fortalecimento da percepção de valor do produto",
          "Padronização visual completa (on e offline)",
          "Manual de marca completo entregue",
        ],
        gallery: ["https://cvbgrjauqjawrsyknhyj.supabase.co/storage/v1/object/public/files/uploads/2yyDFbv3SZYCVOKzHfDhTmjpljf2/1778072883028-vccsp-ChatGPT_Image_6_de_mai._de_2026__10_07_29.png"],
      },
      {
        client: "Cliente: Rocha Assessoria de Contabilidade | Rebranding da Marca - 40 anos de Mercado",
        description:
          "A marca Rocha Contábil apresenta uma identidade visual elegante, sólida e muito bem alinhada ao mercado contábil.\n\nCom monograma sofisticado, tipografia forte e paleta em azul e cinza, a marca transmite confiança, credibilidade e profissionalismo, criando uma percepção de empresa séria, estruturada e preparada para atender com segurança.",
        results: [
          "Identidade visual alinhada aos conceitos do negócio",
          "Conexão imediata com o público",
          "Fortalecimento da percepção de valor do produto",
          "Padronização visual completa (on e offline)",
          "Manual de marca completo entregue",
        ],
        gallery: ["https://cvbgrjauqjawrsyknhyj.supabase.co/storage/v1/object/public/files/uploads/2yyDFbv3SZYCVOKzHfDhTmjpljf2/1778073471739-ng3x5-ChatGPT_Image_6_de_mai._de_2026__10_14_39.png"],
      },
      {
        client: "Cliente: Vision Merchandising | Criação de Nome e Identidade Visual de Marca",
        description:
          "A marca Vision Merchandising apresenta uma identidade visual forte, moderna e altamente conectada ao universo do varejo.\n\nCom cores marcantes, ícone de carrinho e composição direta, a marca transmite organização, presença e eficiência, criando uma percepção de empresa estratégica, preparada para destacar produtos e potencializar resultados dentro dos supermercados.",
        results: [
          "Identidade visual alinhada aos conceitos do negócio",
          "Conexão imediata com o público",
          "Fortalecimento da percepção de valor do produto",
          "Padronização visual completa (on e offline)",
          "Manual de marca completo entregue",
        ],
        gallery: ["https://cvbgrjauqjawrsyknhyj.supabase.co/storage/v1/object/public/files/uploads/2yyDFbv3SZYCVOKzHfDhTmjpljf2/1778079403849-f1lbk-ChatGPT_Image_6_de_mai._de_2026__11_55_16.png"],
      },
      {
        client: "Cliente: Global Serviços | Criação de Identidade Visual de Marca",
        description:
          "A marca Global Serviços apresenta uma identidade visual forte, tecnológica e muito bem alinhada ao segmento de segurança.\n\nCom símbolo marcante, paleta em azul e presença corporativa, a marca transmite proteção, confiança e monitoramento, criando uma percepção de empresa moderna, preparada e eficiente para atender condomínios com vigilância e portaria remota.",
        results: [
          "Identidade visual alinhada aos conceitos do negócio",
          "Conexão imediata com o público",
          "Fortalecimento da percepção de valor do produto",
          "Padronização visual completa (on e offline)",
          "Manual de marca completo entregue",
        ],
        gallery: ["https://cvbgrjauqjawrsyknhyj.supabase.co/storage/v1/object/public/files/uploads/2yyDFbv3SZYCVOKzHfDhTmjpljf2/1778079694917-ni8wo-ChatGPT_Image_6_de_mai._de_2026__12_01_18.png"],
      },
      {
        client: "Cliente: Gigi´s House - Recreação Bilíngue e Inglês para Crianças | Criação de Identidade Visual de Marca",
        description:
          "A marca Gigi’s House apresenta uma identidade visual lúdica, acolhedora e muito bem alinhada ao universo infantil.\n\nCom cores vibrantes, personagem carismático e comunicação educativa, a marca transmite alegria, confiança e aprendizado, criando uma percepção de escola divertida, segura e preparada para ensinar inglês de forma leve e envolvente.",
        results: [
          "Identidade visual alinhada aos conceitos do negócio",
          "Conexão imediata com o público",
          "Fortalecimento da percepção de valor do produto",
          "Padronização visual completa (on e offline)",
          "Manual de marca completo entregue",
        ],
        gallery: ["https://cvbgrjauqjawrsyknhyj.supabase.co/storage/v1/object/public/files/uploads/2yyDFbv3SZYCVOKzHfDhTmjpljf2/1778086334651-ke64u-ChatGPT_Image_6_de_mai._de_2026__13_50_43.png"],
      },
      {
        client: "Cliente: Anjos de Patas | Criação de Identidade Visual de Marca",
        description:
          "A marca Anjos de Patas apresenta uma identidade visual sensível, acolhedora e muito bem alinhada ao universo da equoterapia.\n\nCom ilustração do cavalo, cores suaves e proposta humanizada, a marca transmite cuidado, inclusão e desenvolvimento, criando uma percepção de instituição afetiva, confiável e preparada para transformar vidas por meio da equitação.",
        results: [
          "Identidade visual alinhada aos conceitos do negócio",
          "Conexão imediata com o público",
          "Fortalecimento da percepção de valor do produto",
          "Padronização visual completa (on e offline)",
          "Manual de marca completo entregue",
        ],
        gallery: ["https://cvbgrjauqjawrsyknhyj.supabase.co/storage/v1/object/public/files/uploads/2yyDFbv3SZYCVOKzHfDhTmjpljf2/1778086865463-ppowz-ChatGPT_Image_6_de_mai._de_2026__13_58_43.png"],
      },
      {
        client: "Cliente: SS Assessoria de Seguros | Criação de Identidade Visual de Marca",
        description:
          "A marca SS Assessoria de Seguros apresenta uma identidade visual elegante, séria e muito bem alinhada ao mercado de seguros.\n\nCom monograma sofisticado, paleta sóbria e composição minimalista, a marca transmite segurança, confiança e credibilidade, criando uma percepção de empresa profissional, estratégica e preparada para proteger seus clientes.",
        results: [
          "Identidade visual alinhada aos conceitos do negócio",
          "Conexão imediata com o público",
          "Fortalecimento da percepção de valor do produto",
          "Padronização visual completa (on e offline)",
          "Manual de marca completo entregue",
        ],
        gallery: ["https://cvbgrjauqjawrsyknhyj.supabase.co/storage/v1/object/public/files/uploads/2yyDFbv3SZYCVOKzHfDhTmjpljf2/1778087117829-trgud-ChatGPT_Image_6_de_mai._de_2026__14_03_57.png"],
      },
      {
        client: "Cliente: STT Segurança Tática | Criação de Identidade Visual de Marca",
        description:
          "A marca STT Segurança Tática apresenta uma identidade visual forte, imponente e muito bem alinhada ao segmento de segurança patrimonial.\n\nCom símbolo tático, cores intensas e presença visual robusta, a marca transmite proteção, autoridade e confiança, criando uma percepção de empresa preparada, estratégica e altamente capacitada para atuar com vigilância armada.",
        results: [
          "Identidade visual alinhada aos conceitos do negócio",
          "Conexão imediata com o público",
          "Fortalecimento da percepção de valor do produto",
          "Padronização visual completa (on e offline)",
          "Manual de marca completo entregue",
        ],
        gallery: ["https://cvbgrjauqjawrsyknhyj.supabase.co/storage/v1/object/public/files/uploads/2yyDFbv3SZYCVOKzHfDhTmjpljf2/1778087627621-9dmzl-ChatGPT_Image_6_de_mai._de_2026__14_13_25.png"],
      },
      {
        client: "Cliente: Prime Montagens & Planejados | Criação de Nome e Identidade Visual de Marca",
        description:
          "A marca Prime Montagens apresenta uma identidade visual forte, sofisticada e muito bem alinhada ao segmento de móveis planejados.\n\nCom símbolo marcante, coroa em destaque e paleta em vermelho, preto e dourado, a marca transmite qualidade, precisão e exclusividade, criando uma percepção de empresa premium, profissional e preparada para entregar montagens com alto padrão.",
        results: [
          "Identidade visual alinhada aos conceitos do negócio",
          "Conexão imediata com o público",
          "Fortalecimento da percepção de valor do produto",
          "Padronização visual completa (on e offline)",
          "Manual de marca completo entregue",
        ],
        gallery: ["https://cvbgrjauqjawrsyknhyj.supabase.co/storage/v1/object/public/files/uploads/2yyDFbv3SZYCVOKzHfDhTmjpljf2/1778087978969-c1e4v-ChatGPT_Image_6_de_mai._de_2026__14_19_21.png"],
      },
      {
        client: "Cliente: Contabilidade a 1 Clique | Criação de Identidade Visual de Marca",
        description:
          "A marca Contabilidade a 1 Clique apresenta uma identidade visual moderna, limpa e muito bem alinhada ao universo digital.\n\nCom símbolo minimalista, formas conectadas e paleta em azul e cinza, a marca transmite tecnologia, praticidade e confiança, criando uma percepção de assessoria contábil online, ágil e preparada para atender empresas de forma simples e eficiente.",
        results: [
          "Identidade visual alinhada aos conceitos do negócio",
          "Conexão imediata com o público",
          "Fortalecimento da percepção de valor do produto",
          "Padronização visual completa (on e offline)",
          "Manual de marca completo entregue",
        ],
        gallery: ["https://cvbgrjauqjawrsyknhyj.supabase.co/storage/v1/object/public/files/uploads/2yyDFbv3SZYCVOKzHfDhTmjpljf2/1778088236968-ga30o-ChatGPT_Image_6_de_mai._de_2026__14_22_33.png"],
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
        client: "TGT Marketing — Produção de Conteúdo",
        description: "Planejamento editorial, produção de fotos e vídeos curtos com copywriting estratégico para redes sociais.",
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
        gallery: [],
        directVideoUrl: "https://cvbgrjauqjawrsyknhyj.supabase.co/storage/v1/object/public/files/uploads/2yyDFbv3SZYCVOKzHfDhTmjpljf2/1778006473251-gx70g-esse_aqui.mp4",
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
        gallery: [],
        directVideoUrl: "https://cvbgrjauqjawrsyknhyj.supabase.co/storage/v1/object/public/files/uploads/2yyDFbv3SZYCVOKzHfDhTmjpljf2/1778001726442-quuxq-download.mp4",
        link: "https://claudiopocosartesianos.com.br/",
      },
      {
        client: "Cliente: Rick Medicina Ocupacional | https://www.ricksocupacional.com.br/",
        description:
          "O site da Rick Medicina Ocupacional apresenta uma construção moderna, objetiva e profissional, transmitindo credibilidade, organização e confiança para empresas que buscam serviços de medicina ocupacional e segurança do trabalho.\n\nDo ponto de vista de desenvolvimento, o site se destaca pela navegação simples, layout limpo, boa hierarquia visual e estrutura comercial, facilitando o acesso às informações e conduzindo o visitante ao contato.\n\nResumo final:\nUm site bem estruturado, estratégico e funcional, pensado para fortalecer a autoridade da marca e transformar visitantes em potenciais clientes.",
        results: [
          "Sua empresa aberta 24 horas por dia na internet",
          "Mais credibilidade e confiança para o cliente comprar",
          "Mais chances de aparecer no Google e ser encontrado",
          "Alcance além da sua região",
          "Mais contatos e pedidos"
        ],
        gallery: [],
        directVideoUrl: "https://cvbgrjauqjawrsyknhyj.supabase.co/storage/v1/object/public/files/uploads/2yyDFbv3SZYCVOKzHfDhTmjpljf2/1778005777476-4788w-ESSE.mp4",
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
          className="text-center mb-16 sm:mb-24"
        >
          <span className="section-label justify-center mb-6 block">
            Nossa Expertise
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-7xl font-[900] text-foreground mt-3 mb-8 tracking-tighter leading-none">
            Projetos que <br className="hidden sm:block" /><span className="text-gradient">fazem história</span>
          </h2>
          <div className="divider-accent mx-auto mb-10" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed px-4">
            Cada trabalho é uma união entre criatividade e estratégia de alto nível para gerar resultados exponenciais.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6">
          {portfolioItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <motion.button
                type="button"
                onClick={() => setActiveItem(item)}
                whileHover={{ y: -10 }}
                className="group relative w-full aspect-[3/4.5] overflow-hidden rounded-[2rem] cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-accent shadow-2xl transition-all duration-500 hover:shadow-premium-accent"
                aria-label={`Ver trabalhos de ${item.title}`}
              >
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    width={800}
                    height={800}
                    loading="lazy"
                    decoding="async"
                    className={cn(
                      "w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-110",
                      item.imageClassName
                    )}
                  />
                </div>
                
                {/* Overlay with glass effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <span className="text-accent text-[10px] font-black uppercase tracking-[0.3em] mb-3 block transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    {item.category}
                  </span>
                  <h3 className="text-white font-extrabold text-2xl mb-4 leading-tight transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {item.title}
                  </h3>
                  <div className="h-px w-0 bg-accent group-hover:w-full transition-all duration-700 delay-100" />
                  <span className="mt-4 inline-flex items-center gap-2 text-white/60 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                    Ver detalhes <ArrowRight size={14} className="text-accent" />
                  </span>
                </div>
              </motion.button>
            </motion.div>
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
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" data-lenis-prevent>
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

                    {project.directVideoUrl && (
                      <div className="mb-5 aspect-video overflow-hidden rounded-xl bg-muted border-2 border-border/50 shadow-inner group/video">
                        {project.link ? (
                          <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block w-full h-full relative"
                          >
                            <video
                              src={project.directVideoUrl}
                              autoPlay
                              loop
                              muted
                              playsInline
                              preload="metadata"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover/video:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/0 sm:group-hover/video:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 sm:group-hover/video:opacity-100">
                              <span className="bg-accent text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg transform translate-y-4 sm:group-hover/video:translate-y-0 transition-transform duration-300">
                                Visitar Site →
                              </span>
                            </div>
                            {/* Mobile-only indicator */}
                            <div className="absolute bottom-3 right-3 sm:hidden bg-accent/90 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-md animate-pulse">
                              TOQUE PARA VER SITE
                            </div>
                          </a>
                        ) : (
                          <video
                            src={project.directVideoUrl}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="metadata"
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    )}

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
