import { MessageCircle } from "lucide-react";

const WhatsAppFloat = () => {
  return (
    <a
      href="https://wa.me/5519992795271"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#1ebe5b] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 animate-pulse-glow"
      aria-label="Falar no WhatsApp"
      style={{ boxShadow: "0 4px 20px rgba(37, 211, 102, 0.4)" }}
    >
      <MessageCircle size={28} fill="white" />
    </a>
  );
};

export default WhatsAppFloat;
