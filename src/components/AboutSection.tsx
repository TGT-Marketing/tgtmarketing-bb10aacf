import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import logoTgt from "@/assets/logo-tgt.png";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sobre" className="section-padding bg-background">
      <div className="container-main" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}>
            
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">
              Quem somos
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-3 mb-6 leading-tight">
              Não somos mais uma agência.
              <br />
              Somos sua <span className="text-accent">parceira estratégica.</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                A <strong className="text-foreground">TGT Marketing & Comunicação</strong> nasceu em 2012 em Americana – SP
                com um propósito claro: ajudar empresas a serem vistas, lembradas
                e escolhidas.
              </p>
              <p>
                Ao longo de mais de uma década, desenvolvemos mais de 200 projetos
                de marketing, branding e comunicação para empresas no Brasil e na
                Europa. Cada projeto é tratado como único — porque cada empresa
                tem desafios únicos.
              </p>
              <p className="text-foreground font-semibold italic border-l-4 border-accent pl-4 py-2">"Não basta existir no mercado — é preciso ser visto, lembrado e escolhido por seu público."


              </p>
            </div>
            <a href="#contato" className="inline-block mt-6 btn-primary text-base py-3 px-6">
              Conheça nosso trabalho
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6">
            
            {/* Logo display */}
            <div className="bg-secondary rounded-2xl p-10 flex items-center justify-center">
              <img src={logoTgt} alt="TGT Marketing & Comunicação" className="max-w-[280px] w-full" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
              { number: "+200", label: "Empresas atendidas" },
              { number: "12+", label: "Anos de mercado" },
              { number: "Brasil & Europa", label: "Atuação internacional" },
              { number: "100%", label: "Estratégia sob medida" }].
              map((stat) =>
              <div
                key={stat.label}
                className="bg-secondary rounded-xl p-5 text-center border border-border hover:border-accent/30 transition-colors">
                
                  <div className="text-2xl font-extrabold text-accent mb-1">
                    {stat.number}
                  </div>
                  <div className="text-xs text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>);

};

export default AboutSection;