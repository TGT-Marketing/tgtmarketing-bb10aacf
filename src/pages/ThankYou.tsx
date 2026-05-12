import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-section-dark selection:bg-accent/30 selection:text-white">
      <CustomCursor />
      <Header />
      
      <main className="pt-32 pb-20 container-main">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <CheckCircle2 className="text-accent w-12 h-12" />
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl font-extrabold text-primary-foreground mb-6"
          >
            Quase lá! Só falta um passo.
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-primary-foreground/70 mb-12 leading-relaxed"
          >
            Sua solicitação foi recebida com sucesso. Para agilizar seu diagnóstico, você pode nos chamar diretamente no WhatsApp clicando no botão abaixo.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-foreground/10 hover:bg-primary-foreground/20 text-primary-foreground font-bold rounded-xl transition-all"
            >
              <ArrowLeft size={20} />
              Voltar para o site
            </button>
            
            <a
              href="https://wa.me/5519992795271?text=Olá! Acabei de solicitar um diagnóstico no site e gostaria de agilizar o atendimento."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (window.dataLayer) {
                  window.dataLayer.push({
                    event: "whatsapp_click",
                    button_location: "thank_you_page"
                  });
                }
              }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-accent-foreground font-bold rounded-xl hover:bg-accent/90 transition-all shadow-lg shadow-accent/20"
            >
              <MessageCircle size={20} />
              Falar com especialista agora
            </a>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ThankYou;
