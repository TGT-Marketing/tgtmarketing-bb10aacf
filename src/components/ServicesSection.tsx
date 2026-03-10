import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, Palette, ShieldCheck, Video, BarChart3, ArrowRight } from "lucide-react";

const services = [
{
  icon: BarChart3,
  title: "Marketing Digital",
  desc: "Não é sobre postar. É sobre posicionar. Gestão estratégica de redes sociais e campanhas digitais que geram visibilidade e oportunidades reais de negócio.",
  highlight: "Mais visibilidade, mais clientes"
},
{
  icon: Globe,
  title: "Sites e E-commerce",
  desc: "Seu site é seu vendedor 24h. Criamos sites institucionais e lojas virtuais com foco em conversão, performance e experiência do usuário na navegação.",
  highlight: "VENDA NA INTERNET"
},
{
  icon: Palette,
  title: "Criação de Marca",
  desc: "Sua marca é a primeira impressão. Desenvolvemos identidade visual completa, posicionamento e estratégia de marca que diferencia você da concorrência.",
  highlight: "Branding estratégico"
},
{
  icon: ShieldCheck,
  title: "Registro de Marca (INPI)",
  desc: "Proteja o que é seu. Cuidamos de todo o processo de registro de marca no INPI para garantir a segurança jurídica do seu negócio.",
  highlight: "Proteção legal completa"
},
{
  icon: Video,
  title: "Produção de Conteúdos",
  desc: "Conteúdo que engaja e converte. Produção profissional de vídeos, fotos e materiais digitais que fortalecem sua autoridade no mercado.",
  highlight: "Conteúdo que vende"
}];


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
          className="text-center mb-14">
          
          <span className="text-accent font-semibold text-sm uppercase tracking-widest">
            O que fazemos
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-3 mb-4">
            Soluções que geram <span className="text-accent">resultado real</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Cada serviço é uma peça estratégica. Juntos, formam um ecossistema completo para o crescimento do seu negócio. Marketing completo para sua empresa!


          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) =>
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group bg-card border border-border rounded-xl p-8 hover:shadow-2xl hover:border-accent/40 hover:-translate-y-1 transition-all duration-300">
            
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent group-hover:shadow-lg group-hover:shadow-accent/20 transition-all duration-300">
                <service.icon className="text-accent group-hover:text-accent-foreground transition-colors" size={28} />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-accent mb-2">
                {service.highlight}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm mb-4">
                {service.desc}
              </p>
              <a href="#contato" className="inline-flex items-center gap-1 text-accent font-semibold text-sm group-hover:gap-2 transition-all">
                Saiba mais <ArrowRight size={14} />
              </a>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

};

export default ServicesSection;