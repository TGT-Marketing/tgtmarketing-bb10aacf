import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, Palette, ShieldCheck, Video, BarChart3 } from "lucide-react";

const services = [
  {
    icon: BarChart3,
    title: "Marketing Digital",
    desc: "Gestão estratégica de redes sociais e posicionamento digital para ampliar alcance e gerar oportunidades de negócio.",
  },
  {
    icon: Globe,
    title: "Sites e E-commerce",
    desc: "Criação de sites institucionais e lojas virtuais preparados para gerar resultados e converter visitantes em clientes.",
  },
  {
    icon: Palette,
    title: "Criação de Marca (Branding)",
    desc: "Desenvolvimento de identidade visual, posicionamento e estratégia de marca que conecta com seu público.",
  },
  {
    icon: ShieldCheck,
    title: "Registro de Marca (INPI)",
    desc: "Processo completo de registro de marca para proteção legal no INPI, garantindo a segurança do seu negócio.",
  },
  {
    icon: Video,
    title: "Produção de Conteúdos",
    desc: "Produção profissional de vídeos e conteúdos empresariais que engajam e fortalecem sua presença digital.",
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
          className="text-center mb-14"
        >
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">
            Serviços
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-3 mb-4">
            Soluções completas para o seu negócio
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Oferecemos um ecossistema de serviços integrados para posicionar sua
            marca e gerar resultados reais.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-card border border-border rounded-xl p-8 hover:shadow-xl hover:border-accent/30 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition">
                <service.icon className="text-accent" size={28} />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
