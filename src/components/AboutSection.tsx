import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import guilhermeTgt from "@/assets/guilherme-tgt.webp";
import tgtLogoWall from "@/assets/tgt-logo-wall.png";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sobre" className="section-padding bg-background">
      <div className="container-main" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label mb-4 block">Quem somos</span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mt-3 mb-5 leading-tight tracking-tight">
              Não somos mais uma agência.
              <br />
              Somos sua{" "}
              <span className="text-accent">parceira estratégica.</span>
            </h2>
            <div className="divider-accent mb-8" />
            <div className="space-y-5 text-muted-foreground leading-relaxed text-[15px]">
              <p>
                A{" "}
                <strong className="text-foreground">
                  TGT Marketing & Comunicação
                </strong>{" "}
                nasceu em 2012 em Americana – SP com um propósito claro: ajudar
                empresas a serem vistas, lembradas e escolhidas.
              </p>
              <p>
                Ao longo de mais de uma década, desenvolvemos mais de 200
                projetos de marketing, branding e comunicação para empresas no
                Brasil e na Europa. Cada projeto é tratado como único — porque
                cada empresa tem desafios únicos.
              </p>
              <p className="text-foreground font-medium italic border-l-4 border-accent pl-5 py-3 bg-accent/5 rounded-r-lg">
                "Não basta existir no mercado — é preciso ser visto, lembrado e
                escolhido por seu público."
              </p>
            </div>
            <a
              href="#contato"
              className="inline-block mt-8 btn-primary text-base py-3.5 px-7"
            >
              Conheça nosso trabalho
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Photo */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative bg-secondary rounded-2xl overflow-hidden border border-border group cursor-pointer transition-all duration-500 hover:border-accent hover:shadow-[0_20px_60px_-15px_hsl(var(--accent)/0.5)]"
            >
              {/* Shine sweep effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-accent/20 to-transparent pointer-events-none z-20" />

              {/* Glow overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/0 group-hover:from-accent/10 group-hover:to-accent/20 transition-all duration-500 pointer-events-none z-10" />

              <img
                src={guilhermeTgt}
                alt="Guilherme - CEO da TGT Marketing & Comunicação"
                width={900}
                height={1350}
                loading="lazy"
                decoding="async"
                className="w-full h-[360px] sm:h-[420px] object-cover object-[center_15%] transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 sm:p-5 z-10 transition-all duration-500 group-hover:from-black/90">
                <p className="text-white/90 text-xs sm:text-sm font-medium transition-transform duration-500 group-hover:translate-y-[-2px]">
                  Guilherme Santos, diretor de comunicação e equipe TGT.
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { number: "+500 projetos", label: "entregues com sucesso" },
                { number: "+1000 campanhas", label: "gerenciadas e convertidas" },
                { number: "150% conversão", label: "como aumento médio" },
                { number: "+90% retenção", label: "dos clientes convertidos" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  whileHover={{ y: -6, scale: 1.03 }}
                  className="card-premium p-3.5 sm:p-5 text-center group relative overflow-hidden cursor-pointer transition-all duration-300 hover:border-accent hover:shadow-[0_10px_40px_-10px_hsl(var(--accent)/0.5)]"
                >
                  {/* Shine sweep effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-accent/10 to-transparent pointer-events-none" />
                  
                  {/* Glow background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/0 group-hover:from-accent/5 group-hover:to-accent/10 transition-all duration-500 pointer-events-none" />
                  
                  <div className="relative text-xl sm:text-2xl font-extrabold text-accent mb-1 transition-transform duration-300 group-hover:scale-110">
                    {stat.number}
                  </div>
                  <div className="relative text-xs text-muted-foreground font-medium group-hover:text-foreground transition-colors duration-300">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Logo wall - identidade física TGT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 sm:mt-24 relative rounded-2xl overflow-hidden border border-border group"
        >
          <div className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/10] overflow-hidden bg-secondary">
            <img
              src={tgtLogoWall}
              alt="Logo TGT em destaque na sede da agência — identidade visual e presença física da marca"
              width={1600}
              height={900}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/90 via-background/40 to-transparent pointer-events-none" />

          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
            <div className="max-w-2xl">
              <span className="text-accent text-xs font-bold uppercase tracking-widest mb-2 block">
                Nossa marca
              </span>
              <p className="text-foreground text-lg sm:text-2xl font-bold tracking-tight leading-snug">
                Identidade que se faz <span className="text-accent">presente</span> — no digital e no físico.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
