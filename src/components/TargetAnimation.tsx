import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseOpacity: number;
}

const LABELS = ["SEO", "B2B", "B2C", "CTA", "ROI", "KPI", "BUZZ"];

// Desempenho: limita a densidade de pixels do canvas, agrupa traços iguais num único stroke,
// pausa fora da tela ou com a aba oculta e só começa depois que o conteúdo principal apareceu.
const MAX_DPR = 1.5;
const ALPHA_BUCKETS = 6;

const TargetAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const nodesRef = useRef<Node[]>([]);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    let w = 0, h = 0;
    let running = false;
    let visible = true;
    let started = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      nodesRef.current = [];
      const count = Math.floor((w * h) / 6000);
      for (let i = 0; i < Math.min(count, 160); i++) {
        nodesRef.current.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: 1.5 + Math.random() * 2.5,
          baseOpacity: 0.12 + Math.random() * 0.28,
        });
      }
      if (!running) drawFrame();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleMouseLeave = () => { mouseRef.current = { x: -1000, y: -1000 }; };

    // Todos os hexágonos giram no mesmo ângulo: os vértices são calculados uma vez por quadro
    const hexCos = new Float64Array(6);
    const hexSin = new Float64Array(6);
    const hexPath = (x: number, y: number, size: number) => {
      ctx.moveTo(x + hexCos[0] * size, y + hexSin[0] * size);
      for (let i = 1; i < 6; i++) ctx.lineTo(x + hexCos[i] * size, y + hexSin[i] * size);
      ctx.closePath();
    };

    const drawHexGrid = (t: number) => {
      const spacing = 55;
      const cols = Math.ceil(w / spacing) + 1;
      const rows = Math.ceil(h / (spacing * 0.866)) + 1;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const rot = t * 0.0008;
      const mouseOn = mx > -500;
      for (let i = 0; i < 6; i++) {
        hexCos[i] = Math.cos((Math.PI / 3) * i + rot);
        hexSin[i] = Math.sin((Math.PI / 3) * i + rot);
      }

      ctx.lineWidth = 0.5;
      // Hexágonos longe do mouse têm o mesmo estilo: um único traço para todos
      ctx.beginPath();
      const perto: Array<[number, number, number]> = [];
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * spacing + (row % 2 ? spacing / 2 : 0);
          const y = row * spacing * 0.866;
          if (mouseOn) {
            const dx = mx - x, dy = my - y;
            if (dx * dx + dy * dy < 220 * 220) {
              perto.push([x, y, Math.max(0, 1 - Math.hypot(dx, dy) / 220)]);
              continue;
            }
          }
          hexPath(x, y, 4);
        }
      }
      ctx.strokeStyle = "hsla(0, 0%, 100%, 0.02)";
      ctx.stroke();

      for (const [x, y, influence] of perto) {
        const opacity = 0.02 + influence * 0.08;
        ctx.beginPath();
        hexPath(x, y, 4 + influence * 4);
        ctx.strokeStyle = influence > 0.3 ? `hsla(0, 78%, 48%, ${opacity})` : `hsla(0, 0%, 100%, ${opacity})`;
        ctx.stroke();
      }
    };

    const drawTarget = (cx: number, cy: number, t: number) => {
      const radii = [24, 52, 88, 130, 170];
      const rotation = t * 0.003;

      const lineLen = 195;
      ctx.strokeStyle = "hsla(0, 78%, 48%, 0.06)";
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 8]);
      ctx.beginPath();
      ctx.moveTo(cx - lineLen, cy); ctx.lineTo(cx + lineLen, cy);
      ctx.moveTo(cx, cy - lineLen); ctx.lineTo(cx, cy + lineLen);
      ctx.stroke();
      ctx.setLineDash([]);

      radii.forEach((r, i) => {
        ctx.beginPath();
        const startAngle = rotation + i * 0.6;
        ctx.arc(cx, cy, r, startAngle, startAngle + Math.PI * 1.5);
        ctx.strokeStyle = `hsla(0, 78%, 48%, ${0.14 - i * 0.02})`;
        ctx.lineWidth = i === 0 ? 2.5 : 1;
        ctx.stroke();

        ctx.beginPath();
        for (let j = 0; j < 4; j++) {
          const angle = startAngle + j * (Math.PI / 2);
          ctx.moveTo(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r);
          ctx.lineTo(cx + Math.cos(angle) * (r + 7), cy + Math.sin(angle) * (r + 7));
        }
        ctx.strokeStyle = `hsla(0, 78%, 48%, ${0.1 - i * 0.015})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      const pulse = 1 + Math.sin(t * 0.05) * 0.4;
      ctx.beginPath();
      ctx.arc(cx, cy, 5 * pulse, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(0, 78%, 48%, ${0.3 + Math.sin(t * 0.05) * 0.12})`;
      ctx.fill();

      const sweepAngle = t * 0.012;
      const gradient = ctx.createConicGradient(sweepAngle, cx, cy);
      gradient.addColorStop(0, "hsla(0, 78%, 48%, 0.08)");
      gradient.addColorStop(0.12, "hsla(0, 78%, 48%, 0)");
      gradient.addColorStop(1, "hsla(0, 78%, 48%, 0)");
      ctx.beginPath();
      ctx.arc(cx, cy, 170, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, w, h);
      const t = timeRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mouseOn = mx > -500;

      drawHexGrid(t);
      drawTarget(w * 0.78, h * 0.42, t);

      const nodes = nodesRef.current;
      const connectionDist = 120;
      const connectionDist2 = connectionDist * connectionDist;
      const mouseRadius = 220;

      if (running) {
        for (const node of nodes) {
          if (mouseOn) {
            const dx = mx - node.x;
            const dy = my - node.y;
            const dist = Math.hypot(dx, dy);
            if (dist < mouseRadius && dist > 0) {
              const force = (mouseRadius - dist) / mouseRadius * 0.025;
              node.vx += (dx / dist) * force;
              node.vy += (dy / dist) * force;
            }
          }
          node.x += node.vx;
          node.y += node.vy;
          node.vx *= 0.994;
          node.vy *= 0.994;
          if (node.x < -30) node.x = w + 30;
          if (node.x > w + 30) node.x = -30;
          if (node.y < -30) node.y = h + 30;
          if (node.y > h + 30) node.y = -30;
        }
      }

      // Ligações brancas agrupadas por faixa de transparência (um traço por faixa)
      const buckets: Path2D[] = Array.from({ length: ALPHA_BUCKETS }, () => new Path2D());
      const used = new Array(ALPHA_BUCKETS).fill(false);
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 >= connectionDist2) continue;
          const dist = Math.sqrt(d2);
          const alpha = (1 - dist / connectionDist) * 0.15;
          let boost = 0;
          if (mouseOn) {
            const mouseMid = Math.hypot(mx - (a.x + b.x) / 2, my - (a.y + b.y) / 2);
            boost = mouseMid < 180 ? (1 - mouseMid / 180) * 0.25 : 0;
          }
          if (boost > 0) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `hsla(0, 78%, 48%, ${alpha + boost})`;
            ctx.lineWidth = 0.8 + boost * 2;
            ctx.stroke();
          } else {
            const k = Math.min(ALPHA_BUCKETS - 1, Math.floor((alpha / 0.15) * ALPHA_BUCKETS));
            buckets[k].moveTo(a.x, a.y);
            buckets[k].lineTo(b.x, b.y);
            used[k] = true;
          }
        }
      }
      ctx.lineWidth = 0.6;
      for (let k = 0; k < ALPHA_BUCKETS; k++) {
        if (!used[k]) continue;
        ctx.strokeStyle = `hsla(0, 0%, 100%, ${((k + 0.5) / ALPHA_BUCKETS) * 0.15})`;
        ctx.stroke(buckets[k]);
      }

      for (const node of nodes) {
        const d = mouseOn ? Math.hypot(mx - node.x, my - node.y) : 1e9;
        const highlight = d < 180 ? (1 - d / 180) : 0;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + highlight * 3, 0, Math.PI * 2);
        ctx.fillStyle = highlight > 0.2
          ? `hsla(0, 78%, 48%, ${node.baseOpacity + highlight * 0.5})`
          : `hsla(0, 0%, 100%, ${node.baseOpacity})`;
        ctx.fill();

        if (highlight > 0.25) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 8, 0, Math.PI * 2);
          const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius + 8);
          glow.addColorStop(0, `hsla(0, 78%, 48%, ${highlight * 0.25})`);
          glow.addColorStop(1, "hsla(0, 78%, 48%, 0)");
          ctx.fillStyle = glow;
          ctx.fill();
        }
      }

      ctx.font = "700 11px Inter, sans-serif";
      LABELS.forEach((label, i) => {
        const lx = (w * (0.12 + i * 0.12)) + Math.sin(t * 0.008 + i * 1.8) * 18;
        const ly = (h * (0.12 + (i % 4) * 0.2)) + Math.cos(t * 0.006 + i * 2.5) * 14;
        const distToMouse = mouseOn ? Math.hypot(mx - lx, my - ly) : 1e9;
        const labelOpacity = distToMouse < 140 ? 0.15 + (1 - distToMouse / 140) * 0.2 : 0.06;
        ctx.fillStyle = distToMouse < 140
          ? `hsla(0, 78%, 48%, ${labelOpacity})`
          : `hsla(0, 0%, 100%, ${labelOpacity})`;
        ctx.fillText(label, lx, ly);
      });
    };

    const loop = () => {
      timeRef.current++;
      drawFrame();
      animationRef.current = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduceMotion || !visible || document.hidden) return;
      running = true;
      animationRef.current = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(animationRef.current);
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!started) return;
      if (visible) start(); else stop();
    });
    io.observe(canvas);

    const onVisibility = () => { if (!started) return; if (document.hidden) stop(); else start(); };
    document.addEventListener("visibilitychange", onVisibility);

    // Começa a animar só depois que o conteúdo principal apareceu
    const begin = () => { started = true; start(); };
    const w8 = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    const idleId = w8.requestIdleCallback ? w8.requestIdleCallback(begin, { timeout: 1500 }) : window.setTimeout(begin, 600);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      if (w8.requestIdleCallback) (window as Window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback?.(idleId);
      else window.clearTimeout(idleId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[1] pointer-events-auto"
    />
  );
};

export default TargetAnimation;
