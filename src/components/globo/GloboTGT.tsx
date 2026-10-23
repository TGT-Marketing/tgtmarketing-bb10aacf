import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import type { Unidade } from "@/data/unidades";
import { RAIO, angulosPara, dentroDoPoligono, desprojetar, paraVetor, projetar, type Vetor, type Vista } from "./projecao";

// Globo 3D da seção "TGT pelo mundo".
// O globo em pontos vermelhos é desenhado pela biblioteca cobe (cerca de 6 KB, WebGL). Por cima dele,
// uma camada leve desenha os contornos dos países, as rotas animadas entre as unidades e os pinos
// clicáveis, e descobre qual país está sob o mouse para mostrar o nome.

export type GloboControle = {
  focar: (u: Unidade) => void;
  zoom: (fator: number) => void;
  girar: (ligado: boolean) => void;
  visaoGeral: () => void;
};

type Props = {
  unidades: Unidade[];
  ativa: string | null;
  aoSelecionar: (id: string) => void;
};

type Pais = {
  nome: string;
  codigo: string;
  caixa: [number, number, number, number]; // lng mín, lat mín, lng máx, lat máx
  poligonos: number[][][][];
  aneis: Vetor[][]; // contornos já convertidos para 3D
};

type Rota = { pontos: Vetor[]; atraso: number };

const temWebGL = () => {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
  } catch {
    return false;
  }
};

const VISTA_INICIAL = angulosPara(8, -38);
const normalizarAngulo = (a: number) => {
  let x = a % (Math.PI * 2);
  if (x > Math.PI) x -= Math.PI * 2;
  if (x < -Math.PI) x += Math.PI * 2;
  return x;
};
const limitar = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
const escalar = (v: Vetor, k: number): Vetor => [v[0] * k, v[1] * k, v[2] * k];

// Caminho da rota em arco entre duas cidades (sobe mais quanto maior a distância)
const criarRota = (a: Unidade, b: Unidade, atraso: number): Rota => {
  const A = paraVetor(a.lat, a.lng);
  const B = paraVetor(b.lat, b.lng);
  const omega = Math.acos(limitar(A[0] * B[0] + A[1] * B[1] + A[2] * B[2], -1, 1));
  const altura = 0.08 + 0.22 * (omega / Math.PI);
  const pontos: Vetor[] = [];
  const N = 64;
  for (let k = 0; k <= N; k++) {
    const t = k / N;
    const s1 = Math.sin((1 - t) * omega) / Math.sin(omega);
    const s2 = Math.sin(t * omega) / Math.sin(omega);
    const p: Vetor = [A[0] * s1 + B[0] * s2, A[1] * s1 + B[1] * s2, A[2] * s1 + B[2] * s2];
    pontos.push(escalar(p, RAIO * (1.01 + altura * Math.sin(Math.PI * t))));
  }
  return { pontos, atraso };
};

const GloboTGT = forwardRef<GloboControle, Props>(({ unidades, ativa, aoSelecionar }, ref) => {
  const caixa = useRef<HTMLDivElement>(null);
  const telaGlobo = useRef<HTMLCanvasElement>(null);
  const telaCamada = useRef<HTMLCanvasElement>(null);
  const dica = useRef<HTMLDivElement>(null);
  const pinos = useRef<(HTMLButtonElement | null)[]>([]);
  const selecionarRef = useRef(aoSelecionar);
  const ativaRef = useRef(ativa);
  const [estado, setEstado] = useState<"carregando" | "pronto" | "sem-webgl">("carregando");

  selecionarRef.current = aoSelecionar;
  ativaRef.current = ativa;

  // Estado do movimento (fora do React para não redesenhar a tela a cada quadro)
  const mov = useRef({
    phi: VISTA_INICIAL.phi,
    theta: 0.25,
    alvoPhi: null as number | null,
    alvoTheta: null as number | null,
    escala: 0.6,
    alvoEscala: 1,
    autoLigado: true,
    pausadoAte: 0,
    sobre: false,
    arrastando: false,
    velocidade: 0,
    brilho: 0,
  });

  const escalaBase = () => ((caixa.current?.clientWidth ?? 800) < 560 ? 0.95 : 1);

  useImperativeHandle(ref, () => ({
    focar: (u) => {
      const m = mov.current;
      // No computador o cartão da unidade fica à esquerda: a cidade para um pouco à direita e acima do centro
      const largo = (caixa.current?.clientWidth ?? 800) >= 640;
      const alvo = largo ? angulosPara(u.lat - 7, u.lng - 16) : angulosPara(u.lat, u.lng);
      m.alvoPhi = m.phi + normalizarAngulo(alvo.phi - m.phi);
      m.alvoTheta = limitar(alvo.theta, -0.7, 0.9);
      m.alvoEscala = escalaBase() * 1.35;
      m.velocidade = 0;
    },
    zoom: (fator) => {
      const m = mov.current;
      m.alvoEscala = limitar(m.alvoEscala / fator, 0.75, 2.2);
    },
    girar: (ligado) => {
      mov.current.autoLigado = ligado;
    },
    visaoGeral: () => {
      const m = mov.current;
      m.alvoTheta = 0.25;
      m.alvoEscala = escalaBase();
      m.pausadoAte = 0;
    },
  }));

  useEffect(() => {
    pinos.current.forEach((el, i) => el?.classList.toggle("ativo", unidades[i]?.id === ativa));
  }, [ativa, unidades]);

  useEffect(() => {
    if (!temWebGL()) {
      setEstado("sem-webgl");
      return;
    }
    const el = caixa.current!;
    const tela = telaGlobo.current!;
    const camada = telaCamada.current!;
    const ctx = camada.getContext("2d")!;
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const m = mov.current;
    m.alvoEscala = escalaBase();

    let cancelado = false;
    let quadro = 0;
    let visivel = true;
    let globo: { update: (s: Record<string, unknown>) => void; destroy: () => void } | null = null;
    let paises: Pais[] = [];
    let paisSobre: Pais | null = null;
    let largura = el.clientWidth;
    let altura = el.clientHeight;
    const comTGT = new Set(unidades.map((u) => u.codigo));
    const sede = unidades.find((u) => u.sede) ?? unidades[0];
    const rotas = unidades
      .filter((u) => u.id !== sede.id)
      .map((u, i) => criarRota(sede, u, i * 0.33))
      .concat(unidades.length > 3 ? [criarRota(unidades[2], unidades[3], 0.5)] : []);
    const vetoresPinos = unidades.map((u) => escalar(paraVetor(u.lat, u.lng), RAIO * 1.02));

    const vista = (): Vista => ({ phi: m.phi, theta: m.theta, aspecto: largura / altura, escala: m.escala });

    const ajustarTamanho = () => {
      largura = el.clientWidth;
      altura = el.clientHeight;
      camada.width = Math.round(largura * dpr);
      camada.height = Math.round(altura * dpr);
      globo?.update({ width: largura, height: altura });
    };

    // ---- Camada por cima do globo: contornos, rotas e pinos ----
    const desenharCamada = (agora: number) => {
      ctx.clearRect(0, 0, camada.width, camada.height);
      const v = vista();
      const W = camada.width;
      const H = camada.height;

      // Liga os pontos visíveis; "acima" vale para rotas, que podem aparecer além da borda do globo
      const tracar = (pts: Vetor[], fechar = false, acima = false) => {
        let aberto = false;
        let tudoNaFrente = true;
        for (const p of pts) {
          const q = projetar(p, v);
          if (!(acima ? q.visivel : q.frente)) {
            aberto = false;
            tudoNaFrente = false;
            continue;
          }
          if (aberto) ctx.lineTo(q.x * W, q.y * H);
          else {
            ctx.moveTo(q.x * W, q.y * H);
            aberto = true;
          }
        }
        if (fechar && tudoNaFrente) ctx.closePath();
        return tudoNaFrente;
      };

      // Fronteiras de todos os países, bem suaves (no celular só as dos países com TGT, para poupar bateria)
      if (paises.length) {
        if (largura >= 640) {
          ctx.beginPath();
          for (const p of paises) for (const anel of p.aneis) tracar(anel);
          ctx.strokeStyle = "rgba(255,255,255,0.09)";
          ctx.lineWidth = 0.6 * dpr;
          ctx.stroke();
        }

        // Países com TGT: contorno vermelho
        ctx.beginPath();
        for (const p of paises) if (comTGT.has(p.codigo)) for (const anel of p.aneis) tracar(anel);
        ctx.strokeStyle = "rgba(255,70,70,0.75)";
        ctx.lineWidth = 1.1 * dpr;
        ctx.stroke();

        // País sob o mouse: preenchido e com borda clara
        if (paisSobre) {
          for (const anel of paisSobre.aneis) {
            ctx.beginPath();
            const inteiro = tracar(anel, true);
            if (inteiro) {
              ctx.fillStyle = comTGT.has(paisSobre.codigo) ? "rgba(255,50,50,0.38)" : "rgba(255,255,255,0.14)";
              ctx.fill();
            }
            ctx.strokeStyle = "rgba(255,255,255,0.95)";
            ctx.lineWidth = 1.4 * dpr;
            ctx.stroke();
          }
        }
      }

      // Rotas: linha de base e um cometa de luz que percorre cada uma
      for (const r of rotas) {
        ctx.beginPath();
        tracar(r.pontos, false, true);
        ctx.strokeStyle = "rgba(255,80,80,0.28)";
        ctx.lineWidth = 1.2 * dpr;
        ctx.stroke();

        const progresso = reduzido ? 0.6 : ((agora / 2600 + r.atraso) % 1.25) / 1.25;
        const fim = Math.floor(progresso * (r.pontos.length - 1) * 1.25);
        const ini = Math.max(0, fim - 14);
        if (ini < r.pontos.length - 1) {
          const trecho = r.pontos.slice(ini, Math.min(fim + 1, r.pontos.length));
          ctx.beginPath();
          tracar(trecho, false, true);
          ctx.strokeStyle = "rgba(255,180,180,0.95)";
          ctx.lineWidth = 2 * dpr;
          ctx.shadowColor = "rgba(255,60,60,0.9)";
          ctx.shadowBlur = 10 * dpr;
          ctx.stroke();
          ctx.shadowBlur = 0;
          const cabeca = projetar(trecho[trecho.length - 1], v);
          if (cabeca.visivel) {
            ctx.beginPath();
            ctx.arc(cabeca.x * W, cabeca.y * H, 2.4 * dpr, 0, Math.PI * 2);
            ctx.fillStyle = "#fff";
            ctx.fill();
          }
        }
      }

      // Pinos HTML das unidades
      vetoresPinos.forEach((p, i) => {
        const pino = pinos.current[i];
        if (!pino) return;
        const q = projetar(p, v);
        pino.style.transform = `translate3d(${(q.x * largura).toFixed(1)}px, ${(q.y * altura).toFixed(1)}px, 0)`;
        pino.classList.toggle("atras", !q.frente);
        pino.tabIndex = q.frente ? 0 : -1;
      });
    };

    let anterior = 0;
    const passo = (agora: number) => {
      quadro = 0;
      if (cancelado || !visivel) {
        anterior = 0;
        return;
      }
      // Movimento pelo tempo (e não por quadro): mesma velocidade em telas de 60 Hz ou 120 Hz
      const k = anterior ? Math.min((agora - anterior) / 16.667, 4) : 1;
      anterior = agora;
      const suave = (f: number) => 1 - Math.pow(1 - f, k);

      if (!m.arrastando) {
        if (m.alvoPhi !== null) {
          const d = m.alvoPhi - m.phi;
          m.phi += d * suave(0.075);
          if (Math.abs(d) < 0.0015) m.alvoPhi = null;
        } else if (Math.abs(m.velocidade) > 0.0002) {
          m.phi += m.velocidade * k;
          m.velocidade *= Math.pow(0.94, k);
        } else if (m.autoLigado && !reduzido && !ativaRef.current && agora > m.pausadoAte) {
          m.phi += (m.sobre ? 0.0012 : 0.0032) * k;
        }
        if (m.alvoTheta !== null) {
          const d = m.alvoTheta - m.theta;
          m.theta += d * suave(0.075);
          if (Math.abs(d) < 0.0015) m.alvoTheta = null;
        }
      }
      m.escala += (m.alvoEscala - m.escala) * suave(0.1);
      m.brilho += ((m.sobre ? 1 : 0) - m.brilho) * suave(0.08);
      const g = 0.75 + 0.25 * m.brilho;

      globo?.update({
        phi: m.phi,
        theta: m.theta,
        scale: m.escala,
        glowColor: [0.85 * g, 0.1 * g, 0.12 * g],
      });
      desenharCamada(agora);
      quadro = requestAnimationFrame(passo);
    };
    const iniciar = () => {
      if (!quadro && !cancelado) quadro = requestAnimationFrame(passo);
    };

    // ---- Mouse e toque ----
    let inicioX = 0;
    let inicioY = 0;
    let ultimoX = 0;
    let ultimoY = 0;
    let moveu = 0;
    let pendente: PointerEvent | null = null;

    const paisEm = (ev: PointerEvent | MouseEvent) => {
      const r = tela.getBoundingClientRect();
      const pos = desprojetar((ev.clientX - r.left) / r.width, (ev.clientY - r.top) / r.height, vista());
      if (!pos) return { sobreGlobo: false, pais: null as Pais | null };
      for (const p of paises) {
        const [a, b, c, d] = p.caixa;
        if (pos.lng < a || pos.lng > c || pos.lat < b || pos.lat > d) continue;
        if (p.poligonos.some((pol) => dentroDoPoligono(pos.lng, pos.lat, pol))) return { sobreGlobo: true, pais: p };
      }
      return { sobreGlobo: true, pais: null as Pais | null };
    };

    const atualizarDica = (ev: PointerEvent) => {
      const { sobreGlobo, pais } = paisEm(ev);
      m.sobre = sobreGlobo;
      paisSobre = pais;
      const d = dica.current;
      const r = el.getBoundingClientRect();
      if (d) {
        if (pais) {
          const tgt = comTGT.has(pais.codigo);
          d.innerHTML = "";
          d.append(document.createTextNode(pais.nome));
          if (tgt) {
            const s = document.createElement("span");
            s.className = "globo-dica-tgt";
            s.textContent = "TGT aqui";
            d.append(s);
          }
          d.style.transform = `translate3d(${ev.clientX - r.left + 14}px, ${ev.clientY - r.top + 14}px, 0)`;
          d.classList.add("visivel");
        } else d.classList.remove("visivel");
      }
      tela.style.cursor = m.arrastando ? "grabbing" : pais && comTGT.has(pais.codigo) ? "pointer" : sobreGlobo ? "grab" : "";
    };

    const aoMover = (ev: PointerEvent) => {
      if (m.arrastando) {
        const dx = ev.clientX - ultimoX;
        const dy = ev.clientY - ultimoY;
        ultimoX = ev.clientX;
        ultimoY = ev.clientY;
        moveu += Math.abs(dx) + Math.abs(dy);
        const passoPhi = ((dx / largura) * Math.PI * 1.1) / m.escala;
        m.phi += passoPhi;
        m.velocidade = passoPhi;
        if (ev.pointerType !== "touch") m.theta = limitar(m.theta + ((dy / altura) * Math.PI * 0.8) / m.escala, -0.9, 1.1);
      }
      if (ev.pointerType === "mouse") {
        pendente = ev;
        requestAnimationFrame(() => {
          if (pendente) atualizarDica(pendente);
          pendente = null;
        });
      }
    };
    const aoPressionar = (ev: PointerEvent) => {
      if (ev.button !== 0) return;
      m.arrastando = true;
      m.alvoPhi = null;
      m.alvoTheta = null;
      m.velocidade = 0;
      inicioX = ultimoX = ev.clientX;
      inicioY = ultimoY = ev.clientY;
      moveu = 0;
      tela.setPointerCapture?.(ev.pointerId);
      el.classList.add("arrastando");
    };
    const aoSoltar = (ev: PointerEvent) => {
      if (!m.arrastando) return;
      m.arrastando = false;
      el.classList.remove("arrastando");
      m.pausadoAte = performance.now() + 4500;
      // Um clique (sem arrastar) num país com TGT abre a unidade
      if (moveu < 6 && Math.abs(ev.clientX - inicioX) < 6 && Math.abs(ev.clientY - inicioY) < 6) {
        const { pais } = paisEm(ev);
        const u = pais ? unidades.find((x) => x.codigo === pais.codigo) : undefined;
        if (u) selecionarRef.current(u.id);
      }
    };
    const aoSair = () => {
      m.sobre = false;
      paisSobre = null;
      dica.current?.classList.remove("visivel");
    };

    tela.addEventListener("pointerdown", aoPressionar);
    window.addEventListener("pointermove", aoMover, { passive: true });
    window.addEventListener("pointerup", aoSoltar);
    tela.addEventListener("pointercancel", () => {
      m.arrastando = false;
      el.classList.remove("arrastando");
    });
    tela.addEventListener("pointerleave", aoSair);

    const ro = new ResizeObserver(ajustarTamanho);
    // Fora da tela, o globo para de desenhar (economiza bateria e processador)
    const io = new IntersectionObserver(
      ([e]) => {
        visivel = e.isIntersecting;
        if (visivel) iniciar();
      },
      { rootMargin: "120px" },
    );

    (async () => {
      const { default: createGlobe } = await import("cobe");
      if (cancelado) return;
      largura = el.clientWidth;
      altura = el.clientHeight;
      globo = createGlobe(tela, {
        devicePixelRatio: dpr,
        width: largura,
        height: altura,
        phi: m.phi,
        theta: m.theta,
        dark: 1,
        diffuse: 1.4,
        mapSamples: largura < 560 ? 14000 : 22000,
        mapBrightness: 7,
        mapBaseBrightness: 0.04,
        baseColor: [0.62, 0.06, 0.08],
        markerColor: [1, 1, 1],
        glowColor: [0.65, 0.08, 0.1],
        markers: unidades.map((u) => ({ location: [u.lat, u.lng] as [number, number], size: u.sede ? 0.06 : 0.045 })),
        markerElevation: 0.01,
        scale: m.escala,
        opacity: 0.95,
      }) as unknown as typeof globo;
      ajustarTamanho();
      ro.observe(el);
      io.observe(el);
      setEstado("pronto");
      iniciar();

      // Mapa dos países (contornos e nomes), carregado logo depois do globo
      try {
        const dados = (await fetch("/dados/paises.json").then((r) => r.json())) as {
          features: { properties: { n: string; c: string }; geometry: { type: string; coordinates: number[][][] | number[][][][] } }[];
        };
        if (cancelado) return;
        paises = dados.features.map((f) => {
          const poligonos = (f.geometry.type === "Polygon" ? [f.geometry.coordinates] : f.geometry.coordinates) as number[][][][];
          let a = 180, b = 90, c = -180, d = -90;
          const aneis: Vetor[][] = [];
          for (const pol of poligonos)
            for (const anel of pol) {
              aneis.push(anel.map(([lng, lat]) => escalar(paraVetor(lat, lng), RAIO * 1.003)));
              for (const [lng, lat] of anel) {
                a = Math.min(a, lng);
                b = Math.min(b, lat);
                c = Math.max(c, lng);
                d = Math.max(d, lat);
              }
            }
          return { nome: f.properties.n, codigo: f.properties.c, caixa: [a, b, c, d], poligonos, aneis };
        });
      } catch {
        // Sem o mapa, o globo continua funcionando (só sem os nomes e contornos)
      }
    })().catch(() => {
      if (!cancelado) setEstado("sem-webgl");
    });

    return () => {
      cancelado = true;
      if (quadro) cancelAnimationFrame(quadro);
      ro.disconnect();
      io.disconnect();
      tela.removeEventListener("pointerdown", aoPressionar);
      window.removeEventListener("pointermove", aoMover);
      window.removeEventListener("pointerup", aoSoltar);
      tela.removeEventListener("pointerleave", aoSair);
      globo?.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={caixa} className="globo-caixa absolute inset-0">
      <canvas
        ref={telaGlobo}
        className="absolute inset-0 h-full w-full"
        style={{ touchAction: "pan-y" }}
        aria-label="Globo interativo com as unidades da TGT. Arraste para girar."
        role="img"
      />
      <canvas ref={telaCamada} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />
      {unidades.map((u, i) => (
        <button
          key={u.id}
          ref={(b) => (pinos.current[i] = b)}
          type="button"
          className={`globo-pino ${u.id === ativa ? "ativo" : ""}`}
          onClick={() => aoSelecionar(u.id)}
          aria-label={`Ver a TGT ${u.cidade}, ${u.pais}`}
        >
          <span className="globo-pino-ponto" />
          <span className="globo-pino-rotulo">
            {u.sede ? "Sede • " : ""}
            {u.cidade}
          </span>
        </button>
      ))}
      <div ref={dica} className="globo-dica" aria-hidden="true" />
      {estado === "carregando" && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="globo-esqueleto" />
        </div>
      )}
      {estado === "sem-webgl" && (
        <div className="absolute inset-0 flex items-center justify-center p-8 text-center text-sm text-white/60">
          Seu navegador não conseguiu exibir o globo 3D. As unidades da TGT estão listadas ao lado.
        </div>
      )}
    </div>
  );
});

GloboTGT.displayName = "GloboTGT";
export default GloboTGT;
