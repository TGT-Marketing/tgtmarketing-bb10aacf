import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProblemsSection from "@/components/ProblemsSection";
import ServicesSection from "@/components/ServicesSection";
import AiSection from "@/components/AiSection";
import PortfolioSection from "@/components/PortfolioSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ResultsSection from "@/components/ResultsSection";
import ProcessSection from "@/components/ProcessSection";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import ContactFormDialog from "@/components/ContactFormDialog";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

const Index = () => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-section-dark selection:bg-accent/30 selection:text-white">
        <CustomCursor />
        <Header onOpenContact={() => setContactOpen(true)} />
        <main>
          <HeroSection onOpenContact={() => setContactOpen(true)} />
          <AboutSection />
          <ProblemsSection onOpenContact={() => setContactOpen(true)} />
          <ServicesSection />
          <AiSection />
          <PortfolioSection />
          <TestimonialsSection />
          <ResultsSection />
          <ProcessSection />
          <CtaSection onOpenContact={() => setContactOpen(true)} />
        </main>
        <Footer />
        <FloatingActions />
        <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} />
      </div>
    </SmoothScroll>
  );
};

export default Index;
