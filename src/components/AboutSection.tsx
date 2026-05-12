import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
const guilhermeTgt = "https://cvbgrjauqjawrsyknhyj.supabase.co/storage/v1/object/public/files/uploads/2yyDFbv3SZYCVOKzHfDhTmjpljf2/1778096057487-9g4xn-Design_sem_nome.jpg";
import tgtLogoWall from "@/assets/tgt-logo-wall.png";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="sobre" className="section-padding bg-background scroll-mt-20 overflow-hidden">
      <div className="container-main" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label mb-4 block">Quem somos</span>
            <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black text-foreground mt-3 mb-6 leading-[1.1] tracking-tight">
              Estratégia de Marketing Digital:
              <br />
              Somos sua{" "}
              <span className="text-gradient">parceira de crescimento.</span>
            </h2>
            <div className="divider-accent mb-8" />
            <div className="space-y-5 text-muted-foreground leading-relaxed text-[15px]">
              <p>
                A{" "}
                <strong className="text-foreground">
                  TGT Marketing & Comunicação
                </strong>{" "}
                nasceu em 2011 em Americana – SP com um propósito claro: ajudar
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
              href="#trabalhos"
              onClick={() => {
                if (window.dataLayer) {
                  window.dataLayer.push({
                    event: "cta_click",
                    cta_name: "conheca_nossos_trabalhos",
                    button_location: "about_section"
                  });
                }
              }}
              className="inline-block mt-8 btn-primary text-base py-3.5 px-7"
            >
              Conheça nossos trabalhos
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
              {/* Shine sweep effect - white reflection */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none z-20" />

              {/* Subtle white glow on hover */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-500 pointer-events-none z-10" />

              <img
                src={guilhermeTgt}
                alt="Guilherme - Diretor TGT Marketing Digital"
                width={900}
                height={1350}
                loading="lazy"
                decoding="async"
                className="w-full h-[360px] sm:h-[420px] object-cover object-[center_15%] transition-transform duration-700 ease-out group-hover:scale-110 aspect-[3/4] sm:aspect-auto"
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
                { number: "+1200 campanhas", label: "gerenciadas e convertidas" },
                { number: "150% conversão", label: "como aumento médio" },
                { number: "+90% retenção", label: "dos clientes convertidos" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  whileHover={{ y: -6, scale: 1.03 }}
                  className="card-premium p-3.5 sm:p-5 text-center group relative overflow-hidden cursor-pointer transition-all duration-300 hover:border-accent hover:shadow-premium-accent"
                >
                  {/* Shine sweep effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-accent/10 to-transparent pointer-events-none" />
                  
                  {/* Glow background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/0 group-hover:from-accent/5 group-hover:to-accent/10 transition-all duration-500 pointer-events-none" />
                  
                  <h4 className="relative text-xl sm:text-2xl font-extrabold text-accent mb-1 transition-transform duration-300 group-hover:scale-110">
                    {stat.number}
                  </h4>
                  <div className="relative text-xs text-muted-foreground font-medium group-hover:text-foreground transition-colors duration-300">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Logo wall - identidade física TGT */}
        <Dialog>
          <DialogTrigger asChild>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              whileHover={{ y: -6, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (window.dataLayer) {
                  window.dataLayer.push({
                    event: "cta_click",
                    cta_name: "linha_do_tempo",
                    button_location: "about_section"
                  });
                }
              }}
              className="mt-16 sm:mt-24 relative rounded-2xl overflow-hidden border border-border group cursor-pointer transition-all duration-500 hover:border-accent hover:shadow-[0_20px_60px_-15px_hsl(var(--accent)/0.5)] bg-secondary"
            >
              {/* Shine sweep effect - white reflection */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none z-20" />

              {/* Subtle white glow on hover */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-500 pointer-events-none z-10" />

              <div className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/10] overflow-hidden bg-secondary">
                <img
                  src={tgtLogoWall}
                  alt="Sede TGT Marketing Digital Americana SP - Presença Física"
                  width={1600}
                  height={900}
                  loading="lazy"
                  fetchPriority="low"
                  decoding="async"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 aspect-video sm:aspect-auto"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none z-10" />

              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 z-20">
                <div className="max-w-2xl">
                  <span className="text-accent text-xs font-bold uppercase tracking-widest mb-2 block drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                    Nossa marca
                  </span>
                  <p className="text-white text-xl sm:text-3xl font-black tracking-tight leading-[1.1] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] group-hover:scale-105 transition-transform duration-500">
                    Clique na imagem e confira a <span className="text-gradient">Linha do Tempo</span> da marca TGT.
                  </p>
                </div>
              </div>
            </motion.div>
          </DialogTrigger>
          <DialogContent className="max-w-[95vw] lg:max-w-[80vw] p-0 overflow-hidden bg-transparent border-none shadow-none">
            <div className="relative w-full h-full flex items-center justify-center p-4">
              <motion.img
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                src="https://cvbgrjauqjawrsyknhyj.supabase.co/storage/v1/object/public/files/uploads/2yyDFbv3SZYCVOKzHfDhTmjpljf2/1778097120020-rhqx5-linha-do-tempo-atualizadaFeed.png"
                alt="Trajetória TGT Marketing - 15 Anos de História"
                loading="lazy"
                fetchPriority="low"
                className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default AboutSection;
