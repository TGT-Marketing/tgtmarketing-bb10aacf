import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, Globe2, Mail, MapPin, Minus, Navigation, Pause, Phone, Play, Plus, RotateCcw, X } from "lucide-react";
import GloboTGT, { type GloboControle } from "@/components/globo/GloboTGT";
import { UNIDADES, horaLocal, linkMapa, type Unidade } from "@/data/unidades";

const NUMEROS = [
  { valor: "4", rotulo: "países" },
  { valor: "3", rotulo: "continentes" },
  { valor: "4", rotulo: "unidades" },
  { valor: "2011", rotulo: "desde" },
];

// Seção "Onde estamos": globo 3D interativo com as unidades da TGT no Brasil, Argentina, EUA e Reino Unido
const OndeEstamosSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const palco = useRef<HTMLDivElement>(null);
  const controle = useRef<GloboControle>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [carregarGlobo, setCarregarGlobo] = useState(false);
  const [ativa, setAtiva] = useState<string | null>(null);
  const [girando, setGirando] = useState(true);
  const [, setRelogio] = useState(0);

  // O globo só é baixado quando o visitante se aproxima da seção
  useEffect(() => {
    const el = palco.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setCarregarGlobo(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setCarregarGlobo(true);
          io.disconnect();
        }
      },
      { rootMargin: "900px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Horário local de cada unidade, atualizado a cada 30 segundos
  useEffect(() => {
    const t = window.setInterval(() => setRelogio((n) => n + 1), 30000);
    return () => window.clearInterval(t);
  }, []);

  const unidade = UNIDADES.find((u) => u.id === ativa) ?? null;

  const selecionar = (id: string) => {
    const u = UNIDADES.find((x) => x.id === id);
    if (!u) return;
    setAtiva(id);
    controle.current?.focar(u);
    window.dataLayer?.push({ event: "globo_unidade", unidade: id });
  };

  const fechar = () => {
    setAtiva(null);
    controle.current?.visaoGeral();
  };

  const alternarGiro = () => {
    const novo = !girando;
    setGirando(novo);
    controle.current?.girar(novo);
  };

  const cartao = (unidade: Unidade) => (
    
      <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0d0d0f]/90 p-5 text-white shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:p-6">
        <span className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-accent via-accent to-transparent" />
        <button
          type="button"
          onClick={fechar}
          aria-label="Fechar"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/70 transition-colors hover:bg-accent hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-accent">
          {unidade.pais}
          {unidade.sede ? " • Sede" : ""}
        </div>
        <div className="mt-1 text-2xl font-black tracking-tight">{unidade.cidade}</div>
        <div className="mt-3 flex items-start gap-2.5 text-sm text-white/70">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <span>{unidade.endereco.join(" • ")}</span>
        </div>
        <div className="mt-2 flex items-center gap-2.5 text-sm text-white/70">
          <Clock className="h-4 w-4 shrink-0 text-accent" />
          Agora são {horaLocal(unidade.fuso)} em {unidade.cidade.split(",")[0]}
        </div>
        <div className="mt-4 grid grid-cols-1 gap-2 text-sm">
          <a
            href={unidade.telefoneHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              window.dataLayer?.push({ event: "whatsapp_click", button_location: `globo_${unidade.id}` })
            }
            className="flex items-center gap-2.5 rounded-xl bg-white/5 px-3.5 py-2.5 font-semibold transition-colors hover:bg-accent"
          >
            <Phone className="h-4 w-4 shrink-0" />
            {unidade.telefone}
          </a>
          <a
            href={`mailto:${unidade.email}`}
            className="flex min-w-0 items-center gap-2.5 rounded-xl bg-white/5 px-3.5 py-2.5 transition-colors hover:bg-accent"
          >
            <Mail className="h-4 w-4 shrink-0" />
            <span className="truncate">{unidade.email}</span>
          </a>
          <a
            href={linkMapa(unidade)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 rounded-xl bg-white/5 px-3.5 py-2.5 transition-colors hover:bg-accent"
          >
            <Navigation className="h-4 w-4 shrink-0" />
            Ver no mapa
          </a>
        </div>
      </div>
  );

  return (
    <section id="onde-estamos" className="relative overflow-hidden bg-background pt-16 pb-12 sm:pt-28 sm:pb-20 scroll-mt-20">
      {/* Texto de fundo sutil, no mesmo estilo de "Quem somos" */}
      <div className="pointer-events-none absolute -top-6 -left-16 select-none whitespace-nowrap text-[20vw] font-black text-primary/[0.02]">
        MUNDO
      </div>

      <div className="container-main relative px-4 sm:px-6 xl:px-0" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
          className="grid items-end gap-6 lg:grid-cols-12"
        >
          <div className="lg:col-span-7">
            <span className="section-label mb-4 block">Onde estamos</span>
            <h2 className="mt-3 mb-6 text-3xl font-black leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-7xl">
              TGT pelo <span className="text-gradient">mundo!</span>
            </h2>
            <div className="divider-accent mb-6" />
            <p className="max-w-xl text-[15px] leading-relaxed text-muted-foreground">
              Nascemos em Americana, em 2011, e hoje levamos estratégia, criatividade e resultado para marcas em{" "}
              <strong className="text-foreground">4 países e 3 continentes</strong>. Gire o globo, explore o mapa e
              encontre a unidade TGT mais perto de você.
            </p>
          </div>
          {/* No celular, 2 colunas (número e rótulo lado a lado) para o texto não ser cortado */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3 lg:col-span-5">
            {NUMEROS.map((n, i) => (
              <motion.div
                key={n.rotulo}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                className="group flex items-baseline justify-center gap-2 rounded-2xl border border-black/[0.06] bg-white px-3 py-3.5 text-center shadow-[0_10px_30px_-18px_rgba(0,0,0,0.35)] transition-all duration-500 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_20px_40px_-18px_hsl(0_78%_48%/0.45)] sm:block sm:py-5"
              >
                {n.rotulo === "desde" && (
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">desde</div>
                )}
                <div className="text-2xl font-black leading-none tracking-tight text-gradient sm:text-4xl">{n.valor}</div>
                {n.rotulo !== "desde" && (
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground sm:mt-1.5">{n.rotulo}</div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="mt-10 grid gap-5 lg:mt-14 lg:grid-cols-12 lg:gap-6">
          {/* Palco escuro com o globo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
            ref={palco}
            className="globo-palco relative h-[440px] overflow-hidden rounded-[2rem] bg-[#070708] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.75)] sm:h-[560px] lg:order-2 lg:col-span-8 lg:h-[640px] lg:rounded-[2.5rem]"
          >
            <div className="globo-estrelas pointer-events-none absolute inset-0" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[90px]" />

            {carregarGlobo && (
              <GloboTGT ref={controle} unidades={UNIDADES} ativa={ativa} aoSelecionar={selecionar} />
            )}

            {/* Dica de uso */}
            <div className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/70 backdrop-blur-md sm:left-6 sm:top-6">
              <Globe2 className="h-3.5 w-3.5 text-accent" />
              <span className="hidden sm:inline">Arraste para girar • clique nos pontos</span>
              <span className="sm:hidden">Arraste e toque nos pontos</span>
            </div>

            {/* Controles */}
            <div className="absolute right-4 top-4 flex flex-col gap-2 sm:right-6 sm:top-6">
              {[
                { rotulo: "Aproximar", icone: Plus, acao: () => controle.current?.zoom(0.75) },
                { rotulo: "Afastar", icone: Minus, acao: () => controle.current?.zoom(1.3) },
                { rotulo: girando ? "Pausar giro" : "Girar sozinho", icone: girando ? Pause : Play, acao: alternarGiro },
                { rotulo: "Visão geral", icone: RotateCcw, acao: fechar },
              ].map(({ rotulo, icone: Icone, acao }) => (
                <button
                  key={rotulo}
                  type="button"
                  onClick={acao}
                  aria-label={rotulo}
                  title={rotulo}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white/80 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-accent/60 hover:bg-accent hover:text-white"
                >
                  <Icone className="h-4 w-4" />
                </button>
              ))}
            </div>

            {/* Cartão da unidade escolhida (no computador, por cima do globo) */}
            <div
              aria-live="polite"
              className={`absolute bottom-6 left-6 z-20 hidden w-[360px] transition-all duration-500 ease-out sm:block ${
                unidade ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
              }`}
            >
              {unidade && cartao(unidade)}
            </div>
          </motion.div>

          {/* No celular, o cartão da unidade aparece logo abaixo do globo */}
          <div
            aria-live="polite"
            className={`grid transition-all duration-500 ease-out sm:hidden ${unidade ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
          >
            <div className="overflow-hidden">{unidade && cartao(unidade)}</div>
          </div>

          {/* Lista das unidades: clicar leva o globo até a cidade */}
          <div className="grid grid-cols-2 gap-3 lg:order-1 lg:col-span-4 lg:grid-cols-1 lg:gap-4">
            {UNIDADES.map((u, i) => {
              const escolhida = u.id === ativa;
              return (
                <motion.button
                  key={u.id}
                  type="button"
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.25 + i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                  onClick={() => (escolhida ? fechar() : selecionar(u.id))}
                  aria-pressed={escolhida}
                  className={`group relative overflow-hidden rounded-[1.5rem] border p-4 text-left transition-all duration-500 sm:p-5 ${
                    escolhida
                      ? "border-accent bg-[#0d0d0f] text-white shadow-[0_25px_50px_-20px_hsl(0_78%_48%/0.55)]"
                      : "border-black/[0.07] bg-white text-foreground shadow-[0_12px_30px_-20px_rgba(0,0,0,0.35)] hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_25px_50px_-20px_hsl(0_78%_48%/0.35)]"
                  }`}
                >
                  <span
                    className={`pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left bg-gradient-to-r from-accent to-transparent transition-transform duration-700 ${
                      escolhida ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent"
                    >
                      {u.pais}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-all duration-500 group-hover:-rotate-6 group-hover:scale-110 ${
                        escolhida ? "bg-accent text-white" : "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white"
                      }`}
                    >
                      <MapPin className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="mt-2 text-base font-black tracking-tight sm:text-lg">
                    {u.cidade}
                    {u.sede && (
                      <span className="ml-2 rounded-full bg-accent px-2 py-0.5 align-middle text-[9px] font-bold uppercase tracking-[0.15em] text-white">
                        Sede
                      </span>
                    )}
                  </div>
                  <div
                    className={`mt-1 flex items-center gap-1.5 text-xs ${escolhida ? "text-white/60" : "text-muted-foreground"}`}
                  >
                    <Clock className="h-3.5 w-3.5" />
                    {horaLocal(u.fuso)} agora
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OndeEstamosSection;
