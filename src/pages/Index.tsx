import { useState, useEffect, lazy, Suspense, startTransition, type ReactNode } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FloatingActions from "@/components/FloatingActions";
import SmoothScroll from "@/components/SmoothScroll";

// Desempenho: o topo (menu + hero) vem no pacote principal. O restante da página é baixado
// em pacotes separados, todos em paralelo, e cada seção é montada num intervalo livre do
// processador, uma por vez, para a tela nunca travar.
const importadores = {
  about: () => import("@/components/AboutSection"),
  problems: () => import("@/components/ProblemsSection"),
  services: () => import("@/components/ServicesSection"),
  ai: () => import("@/components/AiSection"),
  portfolio: () => import("@/components/PortfolioSection"),
  testimonials: () => import("@/components/TestimonialsSection"),
  results: () => import("@/components/ResultsSection"),
  faq: () => import("@/components/FaqSection"),
  process: () => import("@/components/ProcessSection"),
  cta: () => import("@/components/CtaSection"),
  footer: () => import("@/components/Footer"),
  cursor: () => import("@/components/CustomCursor"),
};

const AboutSection = lazy(importadores.about);
const ProblemsSection = lazy(importadores.problems);
const ServicesSection = lazy(importadores.services);
const AiSection = lazy(importadores.ai);
const PortfolioSection = lazy(importadores.portfolio);
const TestimonialsSection = lazy(importadores.testimonials);
const ResultsSection = lazy(importadores.results);
const FaqSection = lazy(importadores.faq);
const ProcessSection = lazy(importadores.process);
const CtaSection = lazy(importadores.cta);
const Footer = lazy(importadores.footer);
const CustomCursor = lazy(importadores.cursor);
const ContactFormDialog = lazy(() => import("@/components/ContactFormDialog"));

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
  cancelIdleCallback?: (id: number) => void;
};

const quandoLivre = (fn: () => void, timeout: number) => {
  const w = window as IdleWindow;
  if (w.requestIdleCallback) {
    const id = w.requestIdleCallback(fn, { timeout });
    return () => w.cancelIdleCallback?.(id);
  }
  const t = window.setTimeout(fn, 120);
  return () => window.clearTimeout(t);
};

const Index = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const [contatoCarregado, setContatoCarregado] = useState(false);

  const abrirContato = () => {
    setContatoCarregado(true);
    setContactOpen(true);
  };

  const secoes: ReactNode[] = [
    <AboutSection key="about" />,
    <ProblemsSection key="problems" onOpenContact={abrirContato} />,
    <ServicesSection key="services" />,
    <AiSection key="ai" onOpenContact={abrirContato} />,
    <PortfolioSection key="portfolio" />,
    <TestimonialsSection key="testimonials" />,
    <ResultsSection key="results" />,
    <FaqSection key="faq" />,
    <ProcessSection key="process" />,
    <CtaSection key="cta" onOpenContact={abrirContato} />,
  ];

  // Quem chega por um link com âncora (ex.: #trabalhos) já recebe a página inteira
  const [montadas, setMontadas] = useState(() =>
    typeof window !== "undefined" && window.location.hash.length > 1 ? secoes.length : 0,
  );
  const completa = montadas >= secoes.length;

  useEffect(() => {
    window.addEventListener("open-contact", abrirContato);
    return () => window.removeEventListener("open-contact", abrirContato);
  }, []);

  // Baixa todos os pacotes em paralelo assim que o topo aparece
  useEffect(() => quandoLivre(() => Object.values(importadores).forEach((carregar) => void carregar()), 800), []);

  // Monta a próxima seção no próximo intervalo livre
  useEffect(() => {
    if (completa) return;
    return quandoLivre(() => startTransition(() => setMontadas((n) => n + 1)), montadas === 0 ? 1200 : 400);
  }, [montadas, completa]);

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-section-dark selection:bg-accent/30 selection:text-white">
        <Header onOpenContact={abrirContato} />
        <main>
          <HeroSection onOpenContact={abrirContato} />
          {secoes.slice(0, montadas).map((secao, i) => (
            <Suspense key={i} fallback={null}>
              {secao}
            </Suspense>
          ))}
        </main>
        {completa && (
          <Suspense fallback={null}>
            <Footer />
            <CustomCursor />
          </Suspense>
        )}
        <FloatingActions />
        {contatoCarregado && (
          <Suspense fallback={null}>
            <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} />
          </Suspense>
        )}
      </div>
    </SmoothScroll>
  );
};

export default Index;
