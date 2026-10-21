import { useState, useEffect, useRef, lazy, Suspense, startTransition, type ReactNode } from "react";
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
  const montadasRef = useRef(montadas);
  montadasRef.current = montadas;

  useEffect(() => {
    window.addEventListener("open-contact", abrirContato);
    return () => window.removeEventListener("open-contact", abrirContato);
  }, []);

  // Navegação interna: todo link "#secao" (menu, logo, botões) desce suavemente até a seção certa,
  // mesmo que ela ainda não tenha sido montada, descontando o cabeçalho fixo.
  useEffect(() => {
    const total = secoes.length;
    const DESCONTO_CABECALHO = 72;
    type LenisLike = {
      resize?: () => void;
      scrollTo: (alvo: number, opcoes?: { duration?: number; immediate?: boolean; force?: boolean; onComplete?: () => void }) => void;
    };

    const esperarElemento = (id: string, limiteMs: number) =>
      new Promise<HTMLElement | null>((resolver) => {
        const inicio = performance.now();
        const tentar = () => {
          const el = document.getElementById(id);
          if (el) return resolver(el);
          if (performance.now() - inicio > limiteMs) return resolver(null);
          requestAnimationFrame(tentar);
        };
        tentar();
      });

    const rolarAte = (calcularTopo: () => number, imediato: boolean) => {
      const lenis = (window as Window & { __lenis?: LenisLike }).__lenis;
      const reduzir = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
      const semAnimacao = imediato || reduzir;
      if (lenis) {
        // a página acabou de crescer (seções recém-montadas): o Lenis precisa recalcular a altura total
        lenis.resize?.();
        lenis.scrollTo(calcularTopo(), {
          duration: semAnimacao ? 0 : 1.2,
          immediate: semAnimacao,
          force: true,
          // confere a posição final (imagens podem ter mudado a altura no caminho)
          onComplete: () => {
            if (Math.abs(calcularTopo() - window.scrollY) > 6) {
              lenis.resize?.();
              lenis.scrollTo(calcularTopo(), { immediate: true, force: true });
            }
          },
        });
      } else {
        window.scrollTo({ top: calcularTopo(), behavior: semAnimacao ? "auto" : "smooth" });
      }
    };

    // Alguns navegadores embutidos (apps, prévias) bloqueiam a troca do endereço: a rolagem segue igual
    const atualizarEndereco = (url: string) => {
      try {
        history.replaceState(history.state, "", url);
      } catch {
        /* sem problema */
      }
    };

    const irPara = async (hash: string, imediato = false) => {
      if (hash === "#" || hash === "#topo" || hash === "#inicio") {
        rolarAte(() => 0, imediato);
        atualizarEndereco(window.location.pathname + window.location.search);
        return;
      }
      const id = decodeURIComponent(hash.slice(1));
      if (montadasRef.current < total) setMontadas(total);
      const el = await esperarElemento(id, 4000);
      if (!el) return;
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      rolarAte(() => Math.max(0, el.getBoundingClientRect().top + window.scrollY - DESCONTO_CABECALHO), imediato);
      atualizarEndereco(`#${id}`);
    };

    // Fase de captura: funciona também dentro do menu do celular, que bloqueia a propagação dos cliques
    const aoClicar = (ev: MouseEvent) => {
      if (ev.defaultPrevented || ev.button !== 0 || ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey) return;
      const link = (ev.target as Element | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
      ev.preventDefault();
      void irPara(link.getAttribute("href") || "#");
    };
    document.addEventListener("click", aoClicar, true);

    // Quem chega por um link com âncora (ex.: tgtmarketing.com.br/#trabalhos) cai direto na seção.
    // Enquanto imagens e seções terminam de carregar, a posição é conferida algumas vezes,
    // até a pessoa rolar por conta própria.
    const timers: number[] = [];
    let pessoaRolou = false;
    const marcarInteracao = () => { pessoaRolou = true; };
    const eventosInteracao = ["wheel", "touchstart", "keydown", "mousedown"] as const;
    if (window.location.hash.length > 1) {
      eventosInteracao.forEach((e) => window.addEventListener(e, marcarInteracao, { passive: true, once: true }));
      const hashInicial = window.location.hash;
      void irPara(hashInicial, true);
      [400, 1000, 2000, 3500].forEach((ms) =>
        timers.push(window.setTimeout(() => { if (!pessoaRolou) void irPara(hashInicial, true); }, ms)),
      );
    }

    return () => {
      document.removeEventListener("click", aoClicar, true);
      timers.forEach((t) => window.clearTimeout(t));
      eventosInteracao.forEach((e) => window.removeEventListener(e, marcarInteracao));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
