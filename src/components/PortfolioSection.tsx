import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const portfolioItems = [
  { title: "Identidade Visual Completa", category: "Branding", color: "from-accent to-marsala" },
  { title: "Site Institucional", category: "Web Design", color: "from-primary to-gray-700" },
  { title: "Campanha de Performance", category: "Marketing Digital", color: "from-marsala to-red-900" },
  { title: "Gestão de Redes Sociais", category: "Social Media", color: "from-gray-800 to-gray-600" },
  { title: "Loja Virtual", category: "E-commerce", color: "from-accent/90 to-primary" },
  { title: "Produção Audiovisual", category: "Conteúdo", color: "from-marsala to-gray-800" },
];

const PortfolioSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
              className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent group-hover:from-primary/90 transition-all" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-accent mb-1">
                  {item.category}
                </span>
                <h3 className="text-xl font-bold text-primary-foreground group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
