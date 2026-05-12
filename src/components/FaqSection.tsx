import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "O diagnóstico é realmente gratuito? Por que vocês fazem isso?",
    answer: "Sim, é 100% gratuito. Fazemos isso porque acreditamos que a melhor forma de provar nosso valor é gerando clareza para o seu negócio antes mesmo de qualquer contrato. Se ao final você perceber que faz sentido trabalharmos juntos, excelente. Se não, você sairá com um plano de ação claro para sua empresa."
  },
  {
    question: "Minha empresa é pequena, o marketing da TGT serve para mim?",
    answer: "Trabalhamos com empresas de diversos portes. O que avaliamos não é apenas o tamanho atual, mas o potencial de crescimento e a disposição para investir estrategicamente. Se você busca escala e profissionalismo, estamos prontos para te ajudar."
  },
  {
    question: "Em quanto tempo verei os primeiros resultados?",
    answer: "Marketing digital não é mágica, é processo. Estratégias de tráfego pago (Google/Meta Ads) costumam gerar leads nos primeiros dias, enquanto branding e SEO são construções de médio prazo. No diagnóstico, daremos uma estimativa realista baseada no seu setor."
  },
  {
    question: "Já tive experiências ruins com outras agências. Qual o diferencial de vocês?",
    answer: "Nosso diferencial é o foco em inteligência de dados e a transparência total. Não somos apenas 'postadores' de redes sociais; somos parceiros estratégicos que olham para o seu funil de vendas, ROI e lucro. Mais de 15 anos de mercado e 200 clientes comprovam nossa solidez."
  },
  {
    question: "Preciso ter um site pronto para começar?",
    answer: "Não necessariamente. Como agência completa, nós também desenvolvemos sites e landing pages focadas em conversão. Se você não tem um site ou o seu não converte bem, incluiremos essa solução na sua estratégia."
  }
];

const FaqSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-padding bg-background relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 right-0 text-[15vw] font-black text-primary/[0.01] select-none pointer-events-none whitespace-nowrap">
        DÚVIDAS
      </div>
      
      <div className="container-main relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="section-label mb-4 block">Dúvidas Frequentes</span>
            <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black text-foreground mt-3 mb-6 leading-[1.1] tracking-tight">
              Tudo o que você precisa <span className="text-gradient">saber.</span>
            </h2>
            <div className="divider-accent mb-8" />
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
              Separamos as principais dúvidas de quem busca elevar o patamar do seu marketing e vendas. Se não encontrar o que procura, fale conosco.
            </p>
            
            <div className="mt-12 hidden lg:flex items-center gap-4 text-accent/60">
              <HelpCircle size={40} className="animate-pulse" />
              <div className="text-sm font-bold uppercase tracking-widest">Suporte especializado</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={cn(
                  "group rounded-[2rem] border transition-all duration-500 overflow-hidden",
                  openIndex === i 
                    ? "bg-white/[0.04] border-accent/30 shadow-2xl" 
                    : "bg-white/[0.02] border-white/[0.08] hover:border-accent/20"
                )}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full px-6 py-6 sm:px-8 sm:py-8 text-left flex items-center justify-between gap-4"
                >
                  <span className={cn(
                    "text-base sm:text-lg font-bold transition-colors duration-300",
                    openIndex === i ? "text-accent" : "text-foreground group-hover:text-accent/80"
                  )}>
                    {faq.question}
                  </span>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 shrink-0",
                    openIndex === i ? "bg-accent text-white rotate-180" : "bg-white/5 text-foreground/40"
                  )}>
                    <ChevronDown size={18} />
                  </div>
                </button>
                
                <div 
                  className={cn(
                    "transition-all duration-500 ease-in-out px-6 sm:px-8",
                    openIndex === i ? "max-h-[300px] pb-8 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                  )}
                >
                  <p className="text-muted-foreground leading-relaxed text-[15px] sm:text-base border-t border-white/5 pt-6">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
