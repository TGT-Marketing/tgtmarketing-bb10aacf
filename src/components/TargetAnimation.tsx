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

    let w = 0, h = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
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
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleMouseLeave = () => { mouseRef.current = { x: -1000, y: -1000 }; };
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const drawHexGrid = (t: number) => {
      const spacing = 55;
      const cols = Math.ceil(w / spacing) + 1;
      const rows = Math.ceil(h / (spacing * 0.866)) + 1;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * spacing + (row % 2 ? spacing / 2 : 0);
          const y = row * spacing * 0.866;
          const distToMouse = Math.hypot(mx - x, my - y);
          const mouseInfluence = Math.max(0, 1 - distToMouse / 220);
          const opacity = 0.02 + mouseInfluence * 0.08;

          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i + t * 0.0008;
            const size = 4 + mouseInfluence * 4;
            const px = x + Math.cos(angle) * size;
            const py = y + Math.sin(angle) * size;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.strokeStyle = mouseInfluence > 0.3
            ? `hsla(0, 78%, 48%, ${opacity})`
            : `hsla(0, 0%, 100%, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    };

    const drawTarget = (cx: number, cy: number, t: number) => {
      const radii = [24, 52, 88, 130, 170];
      const rotation = t * 0.003;

      // Crosshair
      const lineLen = 195;
      ctx.strokeStyle = "hsla(0, 78%, 48%, 0.06)";
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 8]);
      ctx.beginPath();
      ctx.moveTo(cx - lineLen, cy); ctx.lineTo(cx + lineLen, cy);
      ctx.moveTo(cx, cy - lineLen); ctx.lineTo(cx, cy + lineLen);
      ctx.stroke();
      ctx.setLineDash([]);

      // Rings
      radii.forEach((r, i) => {
        ctx.beginPath();
        const startAngle = rotation + i * 0.6;
        ctx.arc(cx, cy, r, startAngle, startAngle + Math.PI * 1.5);
        ctx.strokeStyle = `hsla(0, 78%, 48%, ${0.14 - i * 0.02})`;
        ctx.lineWidth = i === 0 ? 2.5 : 1;
        ctx.stroke();

        for (let j = 0; j < 4; j++) {
          const angle = startAngle + j * (Math.PI / 2);
          ctx.beginPath();
          ctx.moveTo(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r);
          ctx.lineTo(cx + Math.cos(angle) * (r + 7), cy + Math.sin(angle) * (r + 7));
          ctx.strokeStyle = `hsla(0, 78%, 48%, ${0.1 - i * 0.015})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      // Center pulse
      const pulse = 1 + Math.sin(t * 0.05) * 0.4;
      ctx.beginPath();
      ctx.arc(cx, cy, 5 * pulse, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(0, 78%, 48%, ${0.3 + Math.sin(t * 0.05) * 0.12})`;
      ctx.fill();

      // Radar sweep
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

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      timeRef.current++;
      const t = timeRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      drawHexGrid(t);

      // Target
      drawTarget(w * 0.78, h * 0.42, t);

      // Update nodes
      const nodes = nodesRef.current;
      const connectionDist = 120;
      const mouseRadius = 220;

      nodes.forEach((node) => {
        const dx = mx - node.x;
        const dy = my - node.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouseRadius && dist > 0) {
          const force = (mouseRadius - dist) / mouseRadius * 0.025;
          node.vx += (dx / dist) * force;
          node.vy += (dy / dist) * force;
        }
        node.x += node.vx;
        node.y += node.vy;
        node.vx *= 0.994;
        node.vy *= 0.994;
        if (node.x < -30) node.x = w + 30;
        if (node.x > w + 30) node.x = -30;
        if (node.y < -30) node.y = h + 30;
        if (node.y > h + 30) node.y = -30;
      });

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.15;
            const midX = (nodes[i].x + nodes[j].x) / 2;
            const midY = (nodes[i].y + nodes[j].y) / 2;
            const mouseMid = Math.hypot(mx - midX, my - midY);
            const boost = mouseMid < 180 ? (1 - mouseMid / 180) * 0.25 : 0;

            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = boost > 0
              ? `hsla(0, 78%, 48%, ${alpha + boost})`
              : `hsla(0, 0%, 100%, ${alpha})`;
            ctx.lineWidth = boost > 0 ? 0.8 + boost * 2 : 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((node) => {
        const d = Math.hypot(mx - node.x, my - node.y);
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
      });

      // Floating labels
      LABELS.forEach((label, i) => {
        const lx = (w * (0.12 + i * 0.12)) + Math.sin(t * 0.008 + i * 1.8) * 18;
        const ly = (h * (0.12 + (i % 4) * 0.2)) + Math.cos(t * 0.006 + i * 2.5) * 14;
        const distToMouse = Math.hypot(mx - lx, my - ly);
        const labelOpacity = distToMouse < 140 ? 0.15 + (1 - distToMouse / 140) * 0.2 : 0.06;
        const color = distToMouse < 140
          ? `hsla(0, 78%, 48%, ${labelOpacity})`
          : `hsla(0, 0%, 100%, ${labelOpacity})`;

        ctx.font = "700 11px Inter, sans-serif";
        ctx.fillStyle = color;
        ctx.fillText(label, lx, ly);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
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
