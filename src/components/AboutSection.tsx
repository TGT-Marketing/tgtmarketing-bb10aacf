import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import logoTgt from "@/assets/logo-tgt.png";
import guilhermeTgt from "@/assets/guilherme-tgt.png";

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
            {/* Photo + Logo */}
            <div className="relative bg-secondary rounded-2xl overflow-hidden border border-border">
              <img
                src={guilhermeTgt}
                alt="Guilherme - CEO da TGT Marketing & Comunicação"
                className="w-full h-[360px] sm:h-[420px] object-cover object-top"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 sm:p-6">
                <img
                  src={logoTgt}
                  alt="TGT Marketing & Comunicação"
                  className="h-8 sm:h-10 mb-2 brightness-200"
                />
                <p className="text-white/90 text-sm font-medium">
                  Guilherme Teixeira — CEO & Fundador
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { number: "+200", label: "Empresas atendidas" },
                { number: "+1 década", label: "de mercado" },
                { number: "Brasil & Europa", label: "Atuação nacional e internacional" },
                { number: "100%", label: "Estratégia sob medida, sem fórmulas prontas ou padrão" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  className="card-premium p-3.5 sm:p-5 text-center"
                >
                  <div className="text-xl sm:text-2xl font-extrabold text-accent mb-1">
                    {stat.number}
                  </div>
                  <div className="text-xs text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
