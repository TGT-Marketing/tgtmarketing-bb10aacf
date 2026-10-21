import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
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
import { MessageCircle, CheckCircle2, Sparkles as SparklesIcon, ArrowRight, X, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";
import portfolioBranding from "/portfolio-branding-new.png";
import portfolioContent from "@/assets/portfolio-content-cover.png";
import portfolioWeb from "/portfolio-web-new.png";
import portfolioTraffic from "@/assets/portfolio-traffic-cover.jpg";

// Preload critical images
if (typeof window !== 'undefined') {
  [portfolioBranding, portfolioContent, portfolioWeb, portfolioTraffic].forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

type PortfolioProject = {
  client: string;
  description: string;
  results: string[];
  gallery: string[];
  link?: string;
  videoUrl?: string; // YouTube or Vimeo embed URL (single, legacy)
  videoUrls?: string[]; // Multiple YouTube or Vimeo embed URLs
  directVideoUrl?: string;
  oculto?: boolean; // esconde o projeto enquanto a mídia não for reposta
};

type PortfolioItem = {
  title: string;
  category: string;
  image: string;
  intro: string;
  projects: PortfolioProject[];
  imageClassName?: string;
  oculto?: boolean; // esconde o card enquanto a mídia não for reposta
};

const portfolioItems: PortfolioItem[] = [
  {
    title: "Gestão de Mídias Sociais [Posts e Estratégias]",
    category: "Social",
    image: "/midia/Beige-Tan-Elegant-Neutral-Brand-Feature-Instagram-Post.webp",
    intro:
      "Gestão profissional de redes sociais com foco em posicionamento, engajamento e conversão de seguidores em clientes. A TGT Marketing cuida de tudo: do planejamento estratégico à criação de conteúdos que conectam sua marca ao público certo.",
    projects: [
      {
        client: "CLIENTE: GRUPO GERBELLI - INDÚSTRIA",
        description:
          "Estratégia de mídias sociais focada em autoridade industrial, apresentando processos, tecnologia e precisão técnica.\n\nA gestão de conteúdo para indústrias exige uma abordagem que transmita confiança e expertise, destacando diferenciais competitivos e a qualidade impecável de cada peça produzida.",
        results: [
          "Fortalecimento da autoridade no setor industrial",
          "Destaque para a precisão técnica e qualidade das peças",
          "Comunicação direta com oportunidades reais no mercado B2B",
          "Mais visibilidade para a infraestrutura e tecnologia",
          "Posicionamento profissional e moderno no Facebook e Instagram",
          "Mais visibilidade e destaque para a marca",
          "Postura profissional com posicionamento estratégico",
        ],
        gallery: [
          "/midia/Pe-as-prontas--brilho-impec-vel-e-entrega-garantidaFeed.webp",
          "/midia/691745657-122140277919117447-7687120502705712289-n.webp",
          "/midia/679170175-122138262801117447-8229563020474506300-n.webp",
          "/midia/Por-que-o-corte-perde-precis-o-mesmo-com-l-mina-novaFEED.webp",
          "/midia/641634784-122127880917117447-9071547022214512582-n.webp",
          "/midia/627678523-122123943117117447-3270420552538723139-n.webp"
        ],
      },
      {
        client: "CLIENTE: CLAUDIO POÇOS ARTESIANOS",
        description:
          "Estratégia de mídias sociais desenvolvida para Claudio Poços Artesianos, focada em transformar a presença digital de uma empresa de perfuração em uma referência de autoridade e confiança.\n\nCom conteúdos que demonstram a complexidade técnica, o uso de maquinário moderno e a garantia de água de qualidade, conseguimos conectar a marca a proprietários rurais e empresas que buscam soluções definitivas, impulsionando a conversão de orçamentos e fechamento de novos projetos.",
        results: [
          "Destaque absoluto na conversão de novos orçamentos via canais digitais",
          "Aumento significativo no fechamento de vendas através de leads qualificados",
          "Fortalecimento da autoridade e confiança no setor de perfuração",
          "Mais visibilidade para a tecnologia e precisão das perfurações",
          "Comunicação direta com proprietários rurais e mercado B2B",
          "Posicionamento profissional e moderno que gera valor à marca",
          "Geração constante de oportunidades reais de negócio",
        ],
        gallery: [
          "/midia/658775806-1351949186953319-161827266595207215-n.webp",
          "/midia/649556301-1333256088822629-5154231053455871792-n.webp",
          "/midia/feed01.webp",
          "/midia/631361658-1309686674512904-173969759776589160-n.webp",
          "/midia/641493569-1321506236664281-8839569345727818433-n.webp",
          "/midia/626799498-1303474051800833-3396260069711442477-n.webp"
        ],
      },
      {
        client: "CLIENTE: VIVA LEVE - EVENTO VIDA SAUDÁVEL",
        description:
          "Estratégia de comunicação e marketing para o evento Viva Leve, focada em promover saúde, bem-estar e qualidade de vida.\n\nCom uma abordagem vibrante e inspiradora, desenvolvemos conteúdos que conectam pessoas a um estilo de vida mais saudável, destacando cronogramas oficiais, sorteios exclusivos e momentos de interação. O resultado foi uma presença digital engajadora que transformou o interesse pelo evento em participação ativa e conversão de vendas de ingressos e produtos parceiros.",
        results: [
          "Conversão recorde de inscrições e vendas de ingressos para o evento",
          "Engajamento massivo em sorteios estratégicos de itens exclusivos",
          "Aumento significativo na visibilidade das marcas parceiras e patrocinadores",
          "Comunicação clara e eficiente do cronograma oficial das atividades",
          "Fortalecimento da comunidade interessada em vida saudável e bem-estar",
          "Geração de autoridade e reconhecimento para o evento Viva Leve",
          "Transformação de seguidores em participantes ativos e promotores da marca",
        ],
        gallery: [
          "/midia/CRONOGRAMA-OFICALFEED04.webp",
          "/midia/SORTEIO-TENIS---FEED.webp",
          "/midia/SORTEIO-ITENS-EXCLUSIVOS---FEED.webp",
          "/midia/POSTS-DO-VIVA-LEVESORTEIO-ESTETICA---FEED.webp",
          "/midia/SORTEIO-CESTA--FEED.webp",
          "/midia/POSTS-VIVA-LEVEPRESSAO-FEED.webp"
        ],
      },
      {
        client: "CLIENTE: BRAZA BAR & RESTAURANTE",
        description:
          "Elaboração de posts com aspecto visual forte, ofertas diretas, frases que geram identificação e CTA para pedidos no WhatsApp.\n\nCom essa estratégia somada ao tráfego pago, o restaurante pode atrair mais clientes, aumentar pedidos e vender mais todos os dias.",
        results: [
          "Transformação de seguidores em leads qualificados",
          "Aumento significativo no engajamento e alcance",
          "Mais visibilidade e destaque para a marca",
          "Mais engajamentos e seguidores qualificados",
          "Relacionamento constante e direto com os clientes",
          "Crescimento previsível da presença digital",
          "Postura profissional com posicionamento estratégico",
        ],
        gallery: [
          "/midia/O-verdadeiro-significado-de-amizade-verdadeiraFeed.webp",
          "/midia/690747193-122181512162834302-7014447445182412673-n.webp"
        ],
      },
      {
        client: "CLIENTE: QUINTAL 019 BAR E RESTAURANTE",
        description:
          "Estratégia de marketing digital focada em gastronomia e entretenimento, transformando a presença online do Quintal 019 em um convite irresistível para o público.\n\nCom conteúdos que exploram o visual apetitoso dos pratos, a atmosfera vibrante do bar e a experiência única de lazer, conseguimos criar um desejo imediato nos seguidores, resultando em um fluxo constante de novos clientes e fidelização dos frequentadores.",
        results: [
          "Recorde absoluto de reservas e pedidos via direct e WhatsApp",
          "Aumento significativo no fluxo de clientes presenciais durante a semana",
          "Fortalecimento da marca como referência em lazer e gastronomia regional",
          "Mais visibilidade para promoções estratégicas de happy hour e eventos",
          "Engajamento qualificado com público local interessado em experiências gastronômicas",
          "Transformação de posts em ferramentas diretas de conversão de vendas diárias",
          "Posicionamento digital profissional que destaca a qualidade e o ambiente único",
        ],
        gallery: [
          "/midia/660128867-122126511615027172-7181486853950673380-n.webp",
          "/midia/645224562-122123398125027172-7758422421863180841-n.webp",
          "/midia/630408837-122121400617027172-7855154179457873359-n.webp",
          "/midia/650272318-122124526527027172-7918758654754351238-n.webp",
          "/midia/649965760-122124102489027172-693835564554407905-n.webp",
          "/midia/641515891-122122637571027172-1083553411909082118-n.webp"
        ],
      },
      {
        client: "CLIENTE: MOVOTEC MÓVEIS PARA ESCRITÓRIO",
        description:
          "Estratégia de marketing digital focada em móveis corporativos, destacando design, ergonomia e funcionalidade para ambientes de trabalho modernos.\n\nA presença digital da Movotec foi estruturada para atrair empresas e profissionais que buscam transformar seus escritórios, unindo estética e produtividade por meio de soluções inteligentes em mobiliário.",
        results: [
          "Aumento expressivo na conversão de orçamentos via canais digitais",
          "Fortalecimento do posicionamento como referência em móveis corporativos",
          "Destaque visual para a ergonomia e durabilidade dos produtos",
          "Comunicação estratégica direcionada ao público B2B e arquitetos",
          "Mais visibilidade para soluções de reforma e renovação de ambientes",
          "Crescimento constante do engajamento com profissionais do setor",
          "Geração de leads qualificados com alto potencial de fechamento",
        ],
        gallery: [
          "/midia/616805785-1469535471844131-6141252066559969670-n.webp",
          "/midia/649746563-1519685110162500-2559229668752246722-n.webp",
          "/midia/657262324-1532092848921726-3648576694463748583-n.webp",
          "/midia/683400859-1563232529141091-3421082289211447923-n.webp",
          "/midia/Prateleira-de-a-o-resist-ncia-e-robustezFeed.webp",
          "/midia/Quando-reformar-compensa-mais-do-que-trocar-e-comprar-uma-cadeira-novaaFeed.webp"
        ],
      },
      {
        client: "CLIENTE: MAX LIMP - LOJA E DISTRIBUIDORA DE PRODUTOS DE LIMPEZA",
        description:
          "Estratégia completa de mídias sociais para a Max Limp, focada em transformar a presença digital de uma distribuidora de produtos de limpeza em uma máquina de vendas.\n\nCom conteúdos que educam o consumidor, demonstram a eficiência dos produtos e destacam a conveniência de encontrar tudo em um só lugar, conseguimos aproximar a marca tanto do público doméstico quanto do corporativo, gerando um fluxo constante de orçamentos e pedidos diretos.",
        results: [
          "Aumento expressivo na conversão direta de vendas via direct e WhatsApp",
          "Geração constante de orçamentos qualificados para o setor B2B",
          "Posicionamento estratégico como autoridade em higiene e limpeza",
          "Destaque visual para a variedade e qualidade dos produtos em estoque",
          "Redução no custo de aquisição de clientes através de conteúdo orgânico de valor",
          "Mais visibilidade e alcance para as ofertas e promoções semanais",
          "Fortalecimento da marca no mercado regional como distribuidora de confiança",
        ],
        gallery: [
          "/midia/682374950-122177598974868384-2429669155329707505-n.webp",
          "/midia/628907704-122166324260868384-7537452365478158545-n.webp",
          "/midia/653712442-122171516978868384-6280650583696313743-n.webp",
          "/midia/Pare-de-comprar-em-v-rios-lugaresFEED.webp",
          "/midia/645706279-122169593912868384-3007976163592112103-n.webp",
          "/midia/653926315-122172405860868384-6093467671984733436-n.webp"
        ],
      },
      {
        client: "CLIENTE: BMV ESTÉTICA AUTOMOTIVA PREMIUM",
        description:
          "Estratégia de mídias sociais desenvolvida para a BMV Estética Automotiva, focada em transformar a presença digital de um centro de estética automotiva premium em uma vitrine de luxo e desejo.\n\nCom conteúdos que destacam o brilho impecável, o cuidado minucioso em cada detalhe e o uso de produtos de alta performance, conseguimos elevar a percepção de valor dos serviços, atraindo proprietários de veículos que não abrem mão do melhor tratamento para suas máquinas.",
        results: [
          "Recorde de conversão de agendamentos via direct e WhatsApp",
          "Aumento significativo no ticket médio através da venda de pacotes premium",
          "Fortalecimento da autoridade como referência em estética automotiva de luxo",
          "Mais visibilidade para processos exclusivos de polimento e proteção",
          "Engajamento qualificado com proprietários de veículos de alto padrão",
          "Posicionamento visual impecável que reflete o cuidado e a qualidade BMV",
          "Transformação de seguidores em clientes fiéis e promotores da marca",
        ],
        gallery: [
          "/midia/653876049-122153539118971914-1127253856516598276-n.webp",
          "/midia/653883713-122154118952971914-1204500173646539272-n.webp",
          "/midia/677608012-122158746578971914-1890888369597635411-n.webp",
          "/midia/683762100-122159714330971914-8541895814565481454-n.webp",
          "/midia/Conhe-a-nossos-servi-os-que-v-o-al-m-da-lavagemFeed01.webp",
          "/midia/Quem-confia-na-BMVFeed.webp"
        ],
      },
      {
        client: "CLIENTE: INOVA CAR CENTRO AUTOMOTIVO",
        description:
          "Estratégia de posicionamento digital para a Inova Car Centro Automotivo, transformando a percepção de uma oficina mecânica em um centro de soluções automotivas de confiança e tecnologia.\n\nCom conteúdos educativos sobre manutenção preventiva, demonstração de diagnósticos precisos e transparência nos processos, conseguimos quebrar objeções comuns do setor e gerar um fluxo constante de orçamentos qualificados, posicionando a marca como a primeira escolha de quem busca segurança e cuidado para seu veículo.",
        results: [
          "Aumento expressivo na conversão de orçamentos via WhatsApp e Direct",
          "Geração constante de agendamentos para manutenção preventiva e corretiva",
          "Fortalecimento da autoridade como centro automotivo especializado e confiável",
          "Mais visibilidade para serviços de diagnóstico computadorizado e precisão técnica",
          "Engajamento estratégico com conteúdos educativos que geram necessidade de serviço",
          "Redução drástica no ciclo de venda através de provas sociais e transparência",
          "Posicionamento digital profissional que transmite segurança e alta tecnologia",
        ],
        gallery: [
          "/midia/625411031-122120678901074388-4638513374126777075-n.webp",
          "/midia/649263441-122124853209074388-2134566509739938299-n.webp",
          "/midia/Se-os-seus-pneus-est-o-carecasFeed.webp",
          "/midia/673596735-122129280765074388-5055005283054981723-n.webp",
          "/midia/Se-voc--s--pudesse-escolher-um--qual-seriaFeed.webp",
          "/midia/A-manuten-o-que-voc--evitaFeed.webp"
        ],
      },
      {
        client: "CLIENTE: BARBEARIA PIEMONTE",
        description:
          "Estratégia de mídias sociais para a Barbearia Piemonte, focada em elevar o posicionamento da marca e transformar o perfil em uma vitrine de estilo e lifestyle masculino.\n\nCom conteúdos que destacam a técnica impecável dos cortes, o ambiente premium e a experiência exclusiva de cuidado, conseguimos atrair o público que valoriza a autoimagem, resultando em uma agenda lotada e um aumento significativo no ticket médio através de serviços agregados.",
        results: [
          "Recorde de agendamentos diretos via link na bio e WhatsApp",
          "Aumento significativo na conversão de novos clientes e fidelização",
          "Fortalecimento do posicionamento como barbearia referência em estilo",
          "Destaque visual para a excelência técnica em cortes e barbas",
          "Engajamento massivo com conteúdos de lifestyle e dicas de autocuidado",
          "Crescimento constante da autoridade e desejo pela experiência Piemonte",
          "Transformação da presença digital em uma ferramenta poderosa de vendas diárias",
        ],
        gallery: [
          "/midia/592534881-1436331228501640-3701314169288317674-n.webp",
          "/midia/670640606-1555655623235866-4519767485197009256-n.webp",
          "/midia/690783234-1573356691465759-8879674165552660891-n.webp",
          "/midia/Seu-compromisso-com-a-apar-ncia-come-a-por-aquifeed.webp",
          "/midia/601031075-1448813700586726-6987031387439350393-n.webp",
          "/midia/666233146-1549509060517189-5719883050776475607-n.webp"
        ],
      },
      {
        client: "CLIENTE: MED.KAL PET - CLÍNICA VETERINÁRIA E PETSHOP",
        description:
          "Estratégia de mídias sociais desenvolvida para a Med.Kal Pet, focada em humanizar a marca e destacar a excelência no cuidado animal.\n\nCom conteúdos que unem informação técnica veterinária, demonstração de carinho no petshop e transparência nos procedimentos clínicos, conseguimos construir uma relação de profunda confiança com os tutores. O resultado foi uma presença digital que não apenas educa, mas converte o amor pelos pets em agendamentos constantes de consultas, vacinas e serviços de estética.",
        results: [
          "Aumento significativo no volume de agendamentos via direct e WhatsApp",
          "Conversão recorde de novos clientes para serviços de petshop e estética",
          "Fortalecimento da autoridade clínica e confiança junto aos tutores",
          "Mais visibilidade para pacotes de saúde preventiva e vacinação",
          "Engajamento qualificado com dicas de cuidados e bem-estar animal",
          "Fidelização de clientes através de uma comunicação humanizada e próxima",
          "Posicionamento digital como referência em medicina veterinária regional",
        ],
        gallery: [
          "/midia/FEED-01.webp",
          "/midia/Tudo-que-o-seu-pet-precisaFeed.webp",
          "/midia/679394154-1794481971946977-2144743752380283482-n.webp",
          "/midia/688789617-1803615867700254-7001099313163050659-n.webp",
          "/midia/690806351-1800714904657017-4202914202453555253-n.webp",
          "/midia/Feliz-PascoaFEED.webp"
        ],
      },
      {
        client: "CLIENTE: UNI CLÍNICA DE PSICOLOGIA INTEGRADA",
        description:
          "Estratégia de posicionamento e marketing digital para a Uni Clínica, focada em humanizar o atendimento psicológico e destacar a abordagem integrada de saúde mental.\n\nCom conteúdos que abordam temas sensíveis com profissionalismo e acolhimento, conseguimos quebrar o estigma em torno da terapia e aproximar a clínica de pessoas que buscam equilíbrio e bem-estar. O resultado foi uma presença digital que gera autoridade, confiança e um fluxo constante de novos agendamentos e pacientes.",
        results: [
          "Recorde absoluto de agendamentos e novos pacientes via direct e WhatsApp",
          "Conversão de seguidores em agendamentos recorrentes de terapia e avaliações",
          "Fortalecimento da autoridade como clínica referência em psicologia integrada",
          "Mais visibilidade para a equipe multidisciplinar e áreas de especialização",
          "Engajamento qualificado com conteúdos sobre saúde mental e autocuidado",
          "Aumento significativo na busca por consultas e acompanhamentos especializados",
          "Posicionamento digital humanizado que transmite segurança e acolhimento",
        ],
        gallery: [
          "/midia/652787626-122173779788875994-5604786247441520785-n.webp",
          "/midia/625963460-122166992642875994-7603116155984567083-n.webp",
          "/midia/656100364-122175198950875994-3514353214040532152-n.webp",
          "/midia/663254576-122176192778875994-3045299159000078796-n.webp",
          "/midia/673643612-122178037364875994-7141081123530115360-n.webp",
          "/midia/652787626-122173779788875994-5604786247441520785-n.webp"
        ],
      },
    ],
  },
  {
    title: "Gestão de Tráfego Pago",
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
        gallery: [portfolioTraffic],
      },
    ],
  },
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
        gallery: ["/midia/ChatGPT-Image-30-de-abr-de-2026-08-13-55.webp"],
      },
      {
        client: "Cliente: Queijaria Três Saltos | Criação de Identidade Visual da Marca",
        description:
          "A marca Queijaria Três Saltos apresenta uma identidade visual acolhedora, artesanal e muito bem conectada ao universo rural.\n\nCom elementos que remetem à fazenda, natureza e produção caseira, a marca transmite tradição, qualidade e origem, criando uma percepção de produto autêntico, regional e de alto valor.",
        results: [],
        gallery: ["/midia/ChatGPT-Image-30-de-abr-de-2026-08-23-48.webp"],
      },
      {
        client: "Cliente: Droga Única Popular | Criação de Identidade Visual da Marca",
        description:
          "A marca Droga Única Popular apresenta uma identidade visual forte, direta e altamente comercial, muito bem alinhada ao segmento farmacêutico popular.\nCom cores de alto impacto, comunicação objetiva e elementos ligados à saúde e economia, a marca transmite confiança, acessibilidade e conveniência, criando uma presença visual marcante e fácil de reconhecer.",
        results: [],
        gallery: ["/midia/ChatGPT-Image-30-de-abr-de-2026-08-51-04.webp"],
      },
      {
        client: "Cliente: Alma & Afeto Semijoias | Criação de Identidade Visual da Marca",
        description:
          "A marca Alma & Afeto Semijoias apresenta uma identidade visual sofisticada, elegante e muito bem posicionada para o mercado de acessórios premium.\n\nCom uma paleta refinada, acabamento em dourado e comunicação delicada, a marca transmite exclusividade, cuidado e valorização pessoal, criando uma percepção de desejo, beleza e alto valor.",
        results: [],
        gallery: ["/midia/ChatGPT-Image-30-de-abr-de-2026-16-24-13.webp"],
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
        gallery: ["/midia/ChatGPT-Image-5-de-mai-de-2026-17-09-29.webp"],
      },
      {
        client: "Cliente: Lumarchi Embalagens | Rebranding da Marca - 40 anos de Mercado",
        description:
          "A marca Lumarchi Embalagens apresenta uma identidade visual sólida, profissional e muito bem alinhada ao segmento industrial.\n\nCom símbolo marcante, tipografia forte e paleta em azul, a marca transmite confiança, organização e credibilidade, criando uma percepção de empresa estruturada, segura e preparada para atender o mercado de embalagens.",
        results: [],
        gallery: ["/midia/ChatGPT-Image-6-de-mai-de-2026-10-07-29.webp"],
      },
      {
        client: "Cliente: Rocha Assessoria de Contabilidade | Rebranding da Marca - 40 anos de Mercado",
        description:
          "A marca Rocha Contábil apresenta uma identidade visual elegante, sólida e muito bem alinhada ao mercado contábil.\n\nCom monograma sofisticado, tipografia forte e paleta em azul e cinza, a marca transmite confiança, credibilidade e profissionalismo, criando uma percepção de empresa séria, estruturada e preparada para atender com segurança.",
        results: [],
        gallery: ["/midia/ChatGPT-Image-6-de-mai-de-2026-10-14-39.webp"],
      },
      {
        client: "Cliente: Vision Merchandising | Criação de Nome e Identidade Visual de Marca",
        description:
          "A marca Vision Merchandising apresenta uma identidade visual forte, moderna e altamente conectada ao universo do varejo.\n\nCom cores marcantes, ícone de carrinho e composição direta, a marca transmite organização, presença e eficiência, criando uma percepção de empresa estratégica, preparada para destacar produtos e potencializar resultados dentro dos supermercados.",
        results: [],
        gallery: ["/midia/ChatGPT-Image-6-de-mai-de-2026-11-55-16.webp"],
      },
      {
        client: "Cliente: Global Serviços | Criação de Identidade Visual de Marca",
        description:
          "A marca Global Serviços apresenta uma identidade visual forte, tecnológica e muito bem alinhada ao segmento de segurança.\n\nCom símbolo marcante, paleta em azul e presença corporativa, a marca transmite proteção, confiança e monitoramento, criando uma percepção de empresa moderna, preparada e eficiente para atender condomínios com vigilância e portaria remota.",
        results: [],
        gallery: ["/midia/ChatGPT-Image-6-de-mai-de-2026-12-01-18.webp"],
      },
      {
        client: "Cliente: Gigi´s House - Recreação Bilíngue e Inglês para Crianças | Criação de Identidade Visual de Marca",
        description:
          "A marca Gigi’s House apresenta uma identidade visual lúdica, acolhedora e muito bem alinhada ao universo infantil.\n\nCom cores vibrantes, personagem carismático e comunicação educativa, a marca transmite alegria, confiança e aprendizado, criando uma percepção de escola divertida, segura e preparada para ensinar inglês de forma leve e envolvente.",
        results: [],
        gallery: ["/midia/ChatGPT-Image-6-de-mai-de-2026-13-50-43.webp"],
      },
      {
        client: "Cliente: Anjos de Patas | Criação de Identidade Visual de Marca",
        description:
          "A marca Anjos de Patas apresenta uma identidade visual sensível, acolhedora e muito bem alinhada ao universo da equoterapia.\n\nCom ilustração do cavalo, cores suaves e proposta humanizada, a marca transmite cuidado, inclusão e desenvolvimento, criando uma percepção de institution afetiva, confiável e preparada para transformar vidas por meio da equitação.",
        results: [
          "Identidade visual alinhada aos conceitos do negócio",
          "Conexão imediata com o público",
          "Fortalecimento da percepção de valor do produto",
          "Padronização visual completa (on e offline)",
          "Manual de marca completo entregue",
        ],
        gallery: ["/midia/ChatGPT-Image-6-de-mai-de-2026-13-58-43.webp"],
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
        gallery: ["/midia/ChatGPT-Image-6-de-mai-de-2026-14-03-57.webp"],
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
        gallery: ["/midia/ChatGPT-Image-6-de-mai-de-2026-14-13-25.webp"],
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
        gallery: ["/midia/ChatGPT-Image-6-de-mai-de-2026-14-19-21.webp"],
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
        gallery: ["/midia/ChatGPT-Image-6-de-mai-de-2026-14-22-33.webp"],
      },
      {
        client: "Cliente: Point Pizzaria | Criação de Identidade Visual de Marca",
        description:
          "A marca Point Pizzaria Delivery apresenta uma identidade visual vibrante, comercial e muito bem alinhada ao segmento de alimentação rápida.\n\nCom ícone de pizza, cores fortes e comunicação direta, a marca transmite sabor, praticidade e desejo, criando uma percepção de pizzaria moderna, acessível e preparada para entregar uma experiência marcante no delivery.",
        results: [
          "Identidade visual alinhada aos conceitos do negócio",
          "Conexão imediata com o público",
          "Fortalecimento da percepção de valor do produto",
          "Padronização visual completa (on e offline)",
          "Manual de marca completo entregue",
        ],
        gallery: ["/midia/ChatGPT-Image-6-de-mai-de-2026-14-27-30.webp"],
      },
      {
        client: "Cliente: Dona Dora Bar| Criação de Identidade Visual de Marca",
        description:
          "A marca Dona Dora Bar apresenta uma identidade visual acolhedora, rústica e muito bem alinhada ao universo de bar de esquina.\n\nCom tipografia marcante, elementos dourados e estética tradicional, a marca transmite proximidade, descontração e autenticidade, criando uma percepção de ambiente convidativo, popular e perfeito para bons encontros.",
        results: [
          "Identidade visual alinhada aos conceitos do negócio",
          "Conexão imediata com o público",
          "Fortalecimento da percepção de valor do produto",
          "Padronização visual completa (on e offline)",
          "Manual de marca completo entregue",
        ],
        gallery: ["/midia/ChatGPT-Image-6-de-mai-de-2026-14-30-58.webp"],
      },
      {
        client: "Cliente: Quintal019 Bar & Restaurante | Criação de Identidade Visual de Marca",
        description:
          "A marca Quintal 019 apresenta uma identidade visual descontraída, moderna e muito bem alinhada ao universo de barzinho.\n\nCom tipografia marcante, elementos tropicais e paleta em preto, branco e dourado, a marca transmite estilo, proximidade e experiência, criando uma percepção de ambiente jovem, acolhedor e ideal para bons encontros.",
        results: [
          "Identidade visual alinhada aos conceitos do negócio",
          "Conexão imediata com o público",
          "Fortalecimento da percepção de valor do produto",
          "Padronização visual completa (on e offline)",
          "Manual de marca completo entregue",
        ],
        gallery: ["/midia/ChatGPT-Image-6-de-mai-de-2026-14-49-57.webp"],
      },
      {
        client: "Cliente: JR Fortunato | Criação de Identidade Visual de Marca",
        description:
          "A marca J.R Fortunato Empreendimentos apresenta uma identidade visual sofisticada, moderna e muito bem alinhada ao mercado imobiliário.\n\nCom símbolo minimalista, paleta em azul e dourado e composição corporativa, a marca transmite solidez, confiança e valorização, criando uma percepção de empresa estratégica, premium e preparada para desenvolver grandes empreendimentos.",
        results: [
          "Identidade visual alinhada aos conceitos do negócio",
          "Conexão imediata com o público",
          "Fortalecimento da percepção de valor do produto",
          "Padronização visual completa (on e offline)",
          "Manual de marca completo entregue",
        ],
        gallery: ["/midia/ChatGPT-Image-6-de-mai-de-2026-14-57-40.webp"],
      },
      {
        client: "Cliente: My Porto Ecologia Urbana - Portugal | Criação de Identidade Visual de Marca",
        description:
          "A marca My Porto Ecologia Urbana apresenta uma identidade visual leve, sustentável e muito bem alinhada ao segmento de preservação urbana.\n\nCom símbolo orgânico, paleta em azul e verde e comunicação ambiental, a marca transmite limpeza, responsabilidade e cuidado com a cidade, criando uma percepção de empresa moderna, consciente e preparada para atuar por um Porto mais sustentável.",
        results: [
          "Identidade visual alinhada aos conceitos do negócio",
          "Conexão imediata com o público",
          "Fortalecimento da percepção de valor do produto",
          "Padronização visual completa (on e offline)",
          "Manual de marca completo entregue",
        ],
        gallery: ["/midia/ChatGPT-Image-6-de-mai-de-2026-15-03-43.webp"],
      },
      {
        client: "Cliente: DGL Eletrônica Têxtil | Criação de Identidade Visual da Marca",
        description:
          "A marca DGL Eletrônica Têxtil apresenta uma identidade visual tecnológica, moderna e muito bem alinhada ao segmento industrial.\n\nCom símbolo inspirado em circuitos, paleta em azul e roxo e tipografia forte, a marca transmite inovação, precisão e confiança, criando uma percepção de empresa especializada, técnica e preparada para atender o setor têxtil com soluções eletrônicas.",
        results: [
          "Identidade visual alinhada aos conceitos do negócio",
          "Conexão imediata com o público",
          "Fortalecimento da percepção de valor do produto",
          "Padronização visual completa (on e offline)",
          "Manual de marca completo entregue",
        ],
        gallery: [],
        oculto: true, // imagem da marca pendente
      },
    ],
  },
  {
    title: "Produção de Conteúdos [Foto & Vídeo]",
    category: "Conteúdo",
    image: portfolioContent,
    intro:
      "Conteúdo estratégico que educa, engaja e converte seguidores em clientes.\n\nA Produção de Conteúdos [Foto & Vídeo] da TGT Marketing transforma ideias em materiais profissionais para redes sociais, campanhas e posicionamento de marca.\n\nCom equipamentos de alta qualidade, equipe experiente, direção criativa e olhar estratégico, criamos fotos, vídeos e conteúdos que geram mais autoridade, conexão e valor para o público.\n\nMais do que produzir, entregamos conteúdo pensado para destacar sua marca e vender melhor.",
    projects: [
      {
        client: "TGT Marketing — Produção de Conteúdos [Foto & Vídeo]",
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
        gallery: [],
        videoUrls: [
          "https://www.youtube.com/embed/-O33RMVZN6k",
          "https://www.youtube.com/embed/Sen_t5TeVLU",
        ],
      },
    ],
  },
  {
    title: "Desenvolvimento de Site e E-commerce",
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
        link: "https://claudiopocosartesianos.com.br/",
      },
      {
        client: "Cliente: Ricks Medicina Ocupacional | https://www.ricksocupacional.com.br/",
        description:
          "O site da Ricks Medicina Ocupacional apresenta uma construção moderna, objetiva e profissional, transmitindo credibilidade, organização e confiança para empresas que buscam serviços de medicina ocupacional e segurança do trabalho.\n\nDo ponto de vista de desenvolvimento, o site se destaca pela navegação simples, layout limpo, boa hierarquia visual e estrutura comercial, facilitando o acesso às informações e conduzindo o visitante ao contato.\n\nResumo final:\nUm site bem estruturado, estratégico e funcional, pensado para fortalecer a autoridade da marca e transformar visitantes em potenciais clientes.",
        results: [
          "Sua empresa aberta 24 horas por dia na internet",
          "Mais credibilidade e confiança para o cliente comprar",
          "Mais chances de aparecer no Google e ser encontrado",
          "Alcance além da sua região",
          "Mais contatos e pedidos"
        ],
        gallery: [],
        link: "https://www.ricksocupacional.com.br/",
      },
    ],
  },
  {
    title: "Registro de Marca INPI",
    category: "Proteção",
    image: "",
    oculto: true, // capa pendente
    intro:
      "Proteja o maior patrimônio da sua empresa. Realizamos todo o processo de registro de marca no INPI com segurança e agilidade.\\n\\nTer uma marca registrada é garantir a exclusividade do seu nome e logotipo em todo o território nacional, evitando cópias e problemas jurídicos.",
    projects: [
      {
        client: "TGT Marketing — Assessoria de Registro de Marca",
        description:
          "Acompanhamento completo de processos de registro no INPI, desde a pesquisa de viabilidade até a concessão do certificado de registro.",
        results: [
          "Garantia de exclusividade da marca",
          "Proteção contra uso indevido por terceiros",
          "Valorização do patrimônio da empresa",
          "Segurança jurídica para expansão do negócio",
        ],
        gallery: [],
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentGallery, setCurrentGallery] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openImageModal = (image: string, gallery: string[]) => {
    setSelectedImage(image);
    setCurrentGallery(gallery);
    setCurrentImageIndex(gallery.indexOf(image));
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentGallery.length === 0) return;
    const nextIdx = (currentImageIndex + 1) % currentGallery.length;
    setCurrentImageIndex(nextIdx);
    setSelectedImage(currentGallery[nextIdx]);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentGallery.length === 0) return;
    const prevIdx = (currentImageIndex - 1 + currentGallery.length) % currentGallery.length;
    setCurrentImageIndex(prevIdx);
    setSelectedImage(currentGallery[prevIdx]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, currentImageIndex, currentGallery]);

  useEffect(() => {
    // Add YouTube API script
    if (!(window as any).YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const onMessage = (event: MessageEvent) => {
      if (typeof event.data === 'string' && event.data.includes('infoDelivery')) {
        const data = JSON.parse(event.data);
        // event 1 is play, 2 is pause, 3 is buffering
        if (data.event === 'infoDelivery' && data.info && data.info.playerState === 1) {
          const iframes = document.querySelectorAll('.youtube-video-iframe');
          iframes.forEach((iframe: any) => {
            // If it's not the video that just started playing, pause it
            if (iframe.contentWindow && iframe !== event.source) {
              iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            }
          });
        }
      }
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  return (
    <section id="trabalhos" className="pt-20 pb-10 sm:pt-32 sm:pb-16 bg-background scroll-mt-20" ref={ref}>
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
          <h3 className="text-2xl sm:text-5xl lg:text-7xl font-black text-foreground mt-3 mb-8 tracking-tight leading-[1.2] sm:leading-[1.1]">
            Projetos que <br className="hidden sm:block" /><span className="text-gradient">fazem história.</span>
          </h3>
          <div className="divider-accent mx-auto mb-10" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed px-4">
            Cada trabalho é uma união entre criatividade e estratégia de alto nível para gerar resultados exponenciais.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6">
          {portfolioItems.filter((item) => !item.oculto).map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <motion.button
                type="button"
                onClick={() => {
                  if (window.dataLayer) {
                    window.dataLayer.push({
                      event: "portfolio_item_click",
                      portfolio_title: item.title,
                      portfolio_category: item.category
                    });
                  }
                  setActiveItem(item);
                }}
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
              className="shine-effect font-bold text-base bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <SparklesIcon className="w-5 h-5" />
                Solicitar diagnóstico gratuito
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setContactOpen(true)}
              className="font-bold text-base border-accent text-accent hover:bg-accent hover:text-accent-foreground"
            >
              <MessageCircle className="w-5 h-5" />
              Enviar uma mensagem
            </Button>
          </div>
        </motion.div>
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-40 mt-12 sm:mt-16" />

      <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} />

      <Dialog open={!!activeItem} onOpenChange={(open) => {
        if (selectedImage) return;
        if (!open) setActiveItem(null);
      }}>
        <DialogContent 
          className="max-w-4xl max-h-[90vh] overflow-y-auto" 
          data-lenis-prevent
          onInteractOutside={(e) => {
            if (selectedImage) e.preventDefault();
          }}
        >
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
                  {activeItem.title === "Criação de Marca [Branding]" && (
                    <div className="bg-muted/40 rounded-lg p-4 mt-6 text-left">
                      <p className="text-sm font-bold text-foreground mb-3">Resultados:</p>
                      <ul className="space-y-2">
                        {[
                          "Identidade visual alinhada aos conceitos do negócio",
                          "Conexão imediata com o público",
                          "Fortalecimento da percepção de valor do produto",
                          "Padronização visual completa (on e offline)",
                          "Manual de marca completo entregue"
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-foreground font-normal">
                            <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-10 mt-4">
                {activeItem.projects.filter((project) => !project.oculto).map((project, idx) => (
                  <article
                    key={idx}
                    className="relative pt-6 first:pt-0 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px] before:bg-gradient-to-r before:from-[hsl(0_78%_28%)] before:via-[hsl(0_78%_48%)] before:to-[hsl(0_85%_65%)] first:before:hidden"
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
                        {activeItem.title === "Produção de Conteúdos [Foto & Vídeo]" && (
                          <p className="text-sm font-medium text-foreground mb-3 italic">
                            Equipe TGT realizando captação de conteúdos em evento com gravação em tempo real LIVE AO VIVO
                          </p>
                        )}
                        {activeItem.title.includes("Mídias Sociais") || activeItem.title.includes("Branding") ? (
                          <div className="w-full">
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                              {project.gallery.map((img, gIdx) => (
                                <div 
                                  key={gIdx} 
                                  className="relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-black/20 group/social cursor-zoom-in"
                                  onClick={() => openImageModal(img, project.gallery)}
                                >
                                  <img
                                    src={img}
                                    alt={`${project.client} ${gIdx + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover/social:scale-110"
                                    loading="lazy"
                                    decoding="async"
                                    fetchPriority="low"
                                  />
                                  <div className="absolute inset-0 bg-black/20 group-hover/social:bg-transparent transition-colors duration-300" />
                                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/social:opacity-100 transition-opacity duration-300">
                                    <div className="p-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                                      <Maximize2 className="w-4 h-4 text-white" />
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            {activeItem.title.includes("Mídias Sociais") && (
                              <div className="mt-4 flex justify-center">
                                <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-accent/60 text-center">
                                  Conteúdos Estratégicos & Design para Feed e Stories
                                </p>
                              </div>
                            )}
                          </div>
                        ) : (
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
                                          decoding="async"
                                          fetchPriority="low"
                                        />
                                      </a>
                                    ) : (
                                      <div 
                                        className="w-full h-full cursor-zoom-in"
                                        onClick={() => openImageModal(src, project.gallery)}
                                      >
                                        <img
                                          src={src}
                                          alt={`${project.client} - imagem ${gIdx + 1}`}
                                          className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105 aspect-video"
                                          loading="lazy"
                                          decoding="async"
                                          fetchPriority="low"
                                        />
                                      </div>
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
                        )}
                        
                        {activeItem.title === "Produção de Conteúdos [Foto & Vídeo]" && (
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
                        {project.videoUrls?.map((url, vIdx) => {
                          const videoId = url.split('/').pop()?.split('?')[0];
                          const playerUrl = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&version=3&playerapiid=ytplayer`;
                          
                          return (
                            <div key={vIdx} className="aspect-video overflow-hidden rounded-lg bg-muted">
                              <iframe
                                src={playerUrl}
                                title={`${project.client} - vídeo ${vIdx + 1}`}
                                className="w-full h-full youtube-video-iframe"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {project.results.length > 0 && (
                      <div className="bg-muted/40 rounded-lg p-4 mb-5">
                        <p className="text-sm font-bold text-foreground mb-2">
                          {activeItem.title === "Produção de Conteúdos [Foto & Vídeo]" 
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

                <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                  <Button
                    onClick={() => {
                      if (window.dataLayer) {
                        window.dataLayer.push({
                          event: "diagnosis_button_click",
                          button_location: "portfolio_modal"
                        });
                      }
                      setContactOpen(true);
                    }}
                    size="lg"
                    className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold"
                  >
                    Agendar diagnóstico gratuito
                  </Button>

                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-accent text-accent hover:bg-accent/10 font-bold"
                  >
                    <a 
                      href="https://wa.me/5519992795271?text=Olá! Gostaria de agendar um diagnóstico gratuito para minha empresa." 
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={() => {
                        if (window.dataLayer) {
                          window.dataLayer.push({
                            event: "whatsapp_click",
                            button_location: "portfolio_modal"
                          });
                        }
                      }}
                    >
                      <MessageCircle className="w-5 h-5" />
                      Enviar uma mensagem
                    </a>
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md cursor-zoom-out"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
          >
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="fixed top-6 right-6 z-[110] rounded-full bg-red-600 hover:bg-red-700 text-white transition-all duration-300 shadow-2xl hover:scale-110 border-2 border-white/20 group/close cursor-pointer pointer-events-auto w-12 h-12"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X className="w-8 h-8 group-hover/close:rotate-90 transition-transform duration-300" />
            </Button>
            
            {currentGallery.length > 1 && (
              <>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="fixed left-4 sm:left-10 z-[110] rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 shadow-2xl hover:scale-110 border border-white/20 w-12 h-12 pointer-events-auto"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-8 h-8" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="fixed right-4 sm:right-10 z-[110] rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 shadow-2xl hover:scale-110 border border-white/20 w-12 h-12 pointer-events-auto"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-8 h-8" />
                </Button>
              </>
            )}

            <motion.div
              key={selectedImage}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full h-full flex flex-col items-center justify-center pointer-events-none"
            >
              <img
                src={selectedImage}
                alt="Visualização ampliada"
                className="max-w-full max-h-[85vh] object-contain rounded-lg sm:rounded-2xl shadow-2xl border border-white/10 pointer-events-auto"
              />
              {currentGallery.length > 1 && (
                <div className="mt-4 px-4 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-white/80 text-sm font-medium pointer-events-none">
                  {currentImageIndex + 1} / {currentGallery.length}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PortfolioSection;
