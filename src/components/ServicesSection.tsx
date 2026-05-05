import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Globe,
  Palette,
  ShieldCheck,
  Video,
  BarChart3,
  Megaphone,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

const services = [
  {
    icon: Megaphone,
    title: "Meta e Google Ads",
    desc: "Campanhas de tráfego pago estratégicas no Meta Ads e Google Ads para atrair clientes qualificados, aumentar suas vendas e escalar seus resultados com investimento inteligente e estratégico.",
    highlight: "Resultados com tráfego pago",
  },
  {
    icon: BarChart3,
    title: "Marketing Digital - Gestão Mídias Sociais",
    desc: "Não é sobre postar. É sobre posicionar. Gestão estratégica de redes sociais e campanhas digitais que geram visibilidade e oportunidades reais de negócio.",
    highlight: "Mais visibilidade, mais clientes",
  },
  {
    icon: Globe,
    title: "Sites e E-commerce",
    desc: "Seu site é seu vendedor 24h. Criamos sites institucionais e lojas virtuais com foco em conversão, performance e experiência do usuário na navegação.",
    highlight: "Venda na internet",
  },
  {
    icon: Palette,
    title: "Criação de Marca",
    desc: "Sua marca é a primeira impressão. Desenvolvemos identidade visual completa, posicionamento e estratégia de marca que diferencia você da concorrência.",
    highlight: "Branding estratégico",
  },
  {
    icon: ShieldCheck,
    title: "Registro de Marca (INPI)",
    desc: "Proteja o que é seu. Cuidamos de todo o processo de registro de marca no INPI para garantir a segurança jurídica do seu negócio. Sem risco de perder sua marca.",
    highlight: "Proteção legal completa",
  },
  {
    icon: Video,
    title: "Produção de Conteúdos",
    desc: "Conteúdo que engaja e converte. Produção profissional de vídeos, fotos e materiais digitais que fortalecem sua autoridade no mercado com posicionamento.",
    highlight: "Conteúdo que vende",
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="servicos" className="section-padding bg-background" ref={ref}>
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label justify-center mb-4 block">
            O que fazemos
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mt-3 mb-4 tracking-tight">
            Soluções que geram{" "}
            <span className="text-accent">resultado real</span>
          </h2>
          <div className="divider-accent mx-auto mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto text-[15px]">
            Cada serviço é uma peça estratégica. Juntos, formam um ecossistema
            completo para o crescimento do seu negócio.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden card-premium p-6 sm:p-10 transition-all duration-500 hover:shadow-premium-accent"
            >
              {/* Glass reflection effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
              
              <div className="relative w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-8 group-hover:bg-accent group-hover:shadow-2xl group-hover:shadow-accent/40 transition-all duration-500 transform group-hover:-rotate-3 group-hover:scale-110">
                <service.icon
                  className="text-accent group-hover:text-accent-foreground transition-colors duration-300"
                  size={32}
                />
              </div>
              <div className="relative text-[11px] font-bold uppercase tracking-[0.2em] text-accent/70 mb-3">
                {service.highlight}
              </div>
              <h3 className="relative text-xl sm:text-2xl font-extrabold text-foreground mb-4 tracking-tight leading-tight">
                {service.title}
              </h3>
              <p className="relative text-muted-foreground leading-relaxed text-[15px] mb-8 group-hover:text-foreground/80 transition-colors">
                {service.desc}
              </p>
              <div className="relative mt-auto">
                <a
                  href="#contato"
                  className="inline-flex items-center gap-2 text-accent font-bold text-sm uppercase tracking-wider group-hover:gap-4 transition-all duration-300"
                >
                  Saber mais
                  <span className="w-8 h-px bg-accent scale-x-50 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                  <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center mt-14"
        >
          <a
            href="https://wa.me/5519992795271"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5b] text-white font-bold text-base sm:text-lg px-6 sm:px-8 py-3.5 sm:py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 w-full sm:w-auto"
          >
            <MessageCircle size={24} fill="white" />
            Fale conosco no WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
