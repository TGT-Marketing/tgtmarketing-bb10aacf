import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const portfolioItems = [
  { title: "Identidade Visual", category: "Branding", color: "from-accent/80 to-orange-600/80" },
  { title: "Site Institucional", category: "Web Design", color: "from-primary/80 to-blue-700/80" },
  { title: "Campanha Digital", category: "Marketing", color: "from-teal-600/80 to-emerald-600/80" },
  { title: "Redes Sociais", category: "Social Media", color: "from-rose-600/80 to-pink-600/80" },
  { title: "E-commerce", category: "Loja Virtual", color: "from-violet-600/80 to-purple-600/80" },
  { title: "Produção de Vídeo", category: "Conteúdo", color: "from-amber-600/80 to-yellow-600/80" },
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
            Projetos que geram resultados
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Conheça alguns dos projetos que desenvolvemos para nossos clientes ao
            longo de mais de 12 anos de atuação.
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/70 mb-1">
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
