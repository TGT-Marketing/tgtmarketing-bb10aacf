import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import portfolioBranding from "@/assets/portfolio-branding.jpg";
import portfolioTraffic from "@/assets/portfolio-traffic.jpg";
import portfolioContent from "@/assets/portfolio-content.jpg";
import portfolioWeb from "@/assets/portfolio-web.jpg";

const portfolioItems = [
  {
    title: "Branding Estratégico",
    category: "Identidade",
    image: portfolioBranding,
  },
  {
    title: "Gestão de Tráfego",
    category: "Performance",
    image: portfolioTraffic,
  },
  {
    title: "Produção de Conteúdos",
    category: "Conteúdo",
    image: portfolioContent,
  },
  {
    title: "Web Design & UX",
    category: "Digital",
    image: portfolioWeb,
  },
];

const PortfolioSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl cursor-pointer"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 p-6">
                <span className="text-accent text-xs font-bold uppercase tracking-widest mb-2 block">
                  {item.category}
                </span>
                <h3 className="text-white font-bold text-xl">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
