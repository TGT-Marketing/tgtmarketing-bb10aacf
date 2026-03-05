import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const highlights = [
  "+200 empresas atendidas",
  "Desde 2012 no mercado",
  "Clientes no Brasil e Europa",
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/60" />
      </div>

      <div className="container-main relative z-10 pt-32 pb-20">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-primary-foreground mb-6"
          >
            Marketing estratégico para empresas que querem{" "}
            <span className="text-accent">crescer.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-xl text-primary-foreground/80 mb-8 max-w-2xl leading-relaxed"
          >
            Desde 2012 ajudamos empresas a ganhar visibilidade, posicionamento e
            resultados com estratégias inteligentes de marketing e comunicação.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 mb-10"
          >
            <a
              href="#contato"
              className="bg-accent text-accent-foreground px-8 py-4 rounded-lg font-bold text-lg hover:brightness-110 transition text-center"
            >
              Solicitar diagnóstico
            </a>
            <a
              href="https://wa.me/5519999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-primary-foreground/30 text-primary-foreground px-8 py-4 rounded-lg font-bold text-lg hover:border-accent hover:text-accent transition text-center"
            >
              Falar no WhatsApp
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-8"
          >
            {highlights.map((item) => (
              <div key={item} className="flex items-center gap-2 text-primary-foreground/70">
                <CheckCircle className="text-accent shrink-0" size={18} />
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
