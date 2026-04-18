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

const Index = () => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-section-dark">
      <Header onOpenContact={() => setContactOpen(true)} />
      <HeroSection onOpenContact={() => setContactOpen(true)} />
      <AboutSection />
      <ProblemsSection onOpenContact={() => setContactOpen(true)} />
      <ServicesSection />
      <AiSection />
        <PortfolioSection />
        <TestimonialsSection />
        <ProcessSection />
        <CtaSection onOpenContact={() => setContactOpen(true)} />
        <ResultsSection />
        <Footer />
      <FloatingActions />
      <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} />
    </div>
  );
};

export default Index;
