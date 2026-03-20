const WhatsAppFloat = () => {
  return (
    <a
      href="https://wa.me/5519992795271"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-[#25D366] hover:bg-[#1ebe5b] text-white w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 animate-pulse-glow"
      aria-label="Falar no WhatsApp"
      style={{ boxShadow: "0 4px 20px rgba(37, 211, 102, 0.4)" }}
    >
      <svg viewBox="0 0 32 32" fill="white" className="w-7 h-7 sm:w-9 sm:h-9">
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.908 15.908 0 0016.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.312 22.594c-.39 1.1-1.932 2.014-3.164 2.28-.844.18-1.946.322-5.656-1.216-4.746-1.966-7.8-6.79-8.036-7.104-.228-.314-1.91-2.546-1.91-4.858s1.21-3.446 1.64-3.918c.39-.428 1.026-.642 1.636-.642.198 0 .376.01.536.018.47.02.706.048 1.016.788.39.928 1.338 3.264 1.454 3.502.118.238.236.558.076.876-.15.326-.282.47-.52.742-.238.272-.464.48-.702.774-.218.258-.464.534-.196 1.004.268.462 1.19 1.962 2.554 3.178 1.756 1.566 3.234 2.052 3.694 2.278.352.174.77.136 1.048-.158.354-.374.79-.994 1.234-1.606.316-.436.714-.49 1.1-.33.392.154 2.48 1.17 2.904 1.382.426.214.708.32.812.498.104.178.104 1.03-.286 2.13z"/>
      </svg>
    </a>
  );
};

export default WhatsAppFloat;
