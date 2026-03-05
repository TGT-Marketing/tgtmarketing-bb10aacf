import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

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
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">
              Sobre a TGT
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mt-3 mb-6 leading-tight">
              Uma agência que entende de{" "}
              <span className="text-accent">resultados.</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Somos a <strong className="text-foreground">TGT Marketing & Comunicação</strong>, uma agência localizada em
                Americana – SP. Desde 2012 ajudamos empresas a crescer, ganhar
                visibilidade e se posicionar de forma estratégica no mercado.
              </p>
              <p>
                Ao longo desses anos já atendemos mais de 200 empresas no Brasil e
                também clientes na Europa, desenvolvendo projetos de marketing,
                comunicação e posicionamento de marca.
              </p>
              <p className="text-foreground font-medium italic border-l-4 border-accent pl-4">
                Acreditamos que não basta existir no mercado — é preciso ser visto,
                lembrado e escolhido.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            {[
              { number: "+200", label: "Empresas atendidas" },
              { number: "12+", label: "Anos de experiência" },
              { number: "2", label: "Continentes" },
              { number: "100%", label: "Estratégia personalizada" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-secondary rounded-xl p-6 text-center"
              >
                <div className="text-3xl font-extrabold text-accent mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
