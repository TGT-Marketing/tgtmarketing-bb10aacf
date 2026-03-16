import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseOpacity: number;
}

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

      // Reinit nodes on resize
      nodesRef.current = [];
      const count = Math.floor((w * h) / 12000);
      for (let i = 0; i < Math.min(count, 80); i++) {
        nodesRef.current.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: 1.5 + Math.random() * 2,
          baseOpacity: 0.15 + Math.random() * 0.25,
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

    const drawTarget = (cx: number, cy: number, t: number) => {
      const radii = [28, 60, 100, 148];
      const rotation = t * 0.003;

      // Crosshair lines
      const lineLen = 170;
      ctx.strokeStyle = "hsla(0, 78%, 48%, 0.07)";
      ctx.lineWidth = 1;
      ctx.setLineDash([6, 8]);
      ctx.beginPath();
      ctx.moveTo(cx - lineLen, cy);
      ctx.lineTo(cx + lineLen, cy);
      ctx.moveTo(cx, cy - lineLen);
      ctx.lineTo(cx, cy + lineLen);
      ctx.stroke();
      ctx.setLineDash([]);

      // Target rings
      radii.forEach((r, i) => {
        ctx.beginPath();
        const startAngle = rotation + i * 0.5;
        const arcLen = Math.PI * 1.5;
        ctx.arc(cx, cy, r, startAngle, startAngle + arcLen);
        ctx.strokeStyle = `hsla(0, 78%, 48%, ${0.12 - i * 0.02})`;
        ctx.lineWidth = i === 0 ? 2 : 1;
        ctx.stroke();

        // Tick marks
        for (let j = 0; j < 4; j++) {
          const angle = startAngle + j * (Math.PI / 2);
          const ix = cx + Math.cos(angle) * r;
          const iy = cy + Math.sin(angle) * r;
          const ox = cx + Math.cos(angle) * (r + 6);
          const oy = cy + Math.sin(angle) * (r + 6);
          ctx.beginPath();
          ctx.moveTo(ix, iy);
          ctx.lineTo(ox, oy);
          ctx.strokeStyle = `hsla(0, 78%, 48%, ${0.1 - i * 0.02})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      // Center pulsing dot
      const pulse = 1 + Math.sin(t * 0.05) * 0.4;
      ctx.beginPath();
      ctx.arc(cx, cy, 4 * pulse, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(0, 78%, 48%, ${0.25 + Math.sin(t * 0.05) * 0.1})`;
      ctx.fill();

      // Scanning sweep
      const sweepAngle = t * 0.015;
      const gradient = ctx.createConicGradient(sweepAngle, cx, cy);
      gradient.addColorStop(0, "hsla(0, 78%, 48%, 0.06)");
      gradient.addColorStop(0.1, "hsla(0, 78%, 48%, 0)");
      gradient.addColorStop(1, "hsla(0, 78%, 48%, 0)");
      ctx.beginPath();
      ctx.arc(cx, cy, 148, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    };

    const drawHexGrid = (t: number) => {
      const spacing = 60;
      const cols = Math.ceil(w / spacing) + 1;
      const rows = Math.ceil(h / (spacing * 0.866)) + 1;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * spacing + (row % 2 ? spacing / 2 : 0);
          const y = row * spacing * 0.866;

          const distToMouse = Math.hypot(mouseRef.current.x - x, mouseRef.current.y - y);
          const mouseInfluence = Math.max(0, 1 - distToMouse / 200);
          const opacity = 0.025 + mouseInfluence * 0.06;

          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i + t * 0.001;
            const size = 3 + mouseInfluence * 3;
            const px = x + Math.cos(angle) * size;
            const py = y + Math.sin(angle) * size;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.strokeStyle = `hsla(0, 0%, 100%, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      timeRef.current++;
      const t = timeRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Hex grid background
      drawHexGrid(t);

      // Target element
      const targetX = w * 0.78;
      const targetY = h * 0.42;
      drawTarget(targetX, targetY, t);

      // Update and draw network nodes
      const nodes = nodesRef.current;
      const connectionDist = 140;
      const mouseDist = 200;

      nodes.forEach((node) => {
        // Mouse repulsion/attraction
        const dx = mx - node.x;
        const dy = my - node.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouseDist && dist > 0) {
          const force = (mouseDist - dist) / mouseDist * 0.02;
          node.vx += (dx / dist) * force;
          node.vy += (dy / dist) * force;
        }

        node.x += node.vx;
        node.y += node.vy;

        // Damping
        node.vx *= 0.995;
        node.vy *= 0.995;

        // Wrap edges
        if (node.x < -20) node.x = w + 20;
        if (node.x > w + 20) node.x = -20;
        if (node.y < -20) node.y = h + 20;
        if (node.y > h + 20) node.y = -20;
      });

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.12;

            // Highlight connections near mouse
            const midX = (nodes[i].x + nodes[j].x) / 2;
            const midY = (nodes[i].y + nodes[j].y) / 2;
            const mouseMid = Math.hypot(mx - midX, my - midY);
            const boost = mouseMid < 150 ? (1 - mouseMid / 150) * 0.15 : 0;

            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = boost > 0
              ? `hsla(0, 78%, 48%, ${alpha + boost})`
              : `hsla(0, 0%, 100%, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((node) => {
        const mouseDist2 = Math.hypot(mx - node.x, my - node.y);
        const highlight = mouseDist2 < 150 ? (1 - mouseDist2 / 150) : 0;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + highlight * 2, 0, Math.PI * 2);
        ctx.fillStyle = highlight > 0.3
          ? `hsla(0, 78%, 48%, ${node.baseOpacity + highlight * 0.4})`
          : `hsla(0, 0%, 100%, ${node.baseOpacity})`;
        ctx.fill();

        if (highlight > 0.3) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 6, 0, Math.PI * 2);
          const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius + 6);
          glow.addColorStop(0, `hsla(0, 78%, 48%, ${highlight * 0.2})`);
          glow.addColorStop(1, "hsla(0, 78%, 48%, 0)");
          ctx.fillStyle = glow;
          ctx.fill();
        }
      });

      // Floating data labels (subtle)
      const labels = ["ROI", "KPI", "SEO", "CRM", "B2B"];
      labels.forEach((label, i) => {
        const lx = (w * (0.6 + i * 0.08)) + Math.sin(t * 0.01 + i * 2) * 15;
        const ly = (h * (0.15 + i * 0.15)) + Math.cos(t * 0.008 + i * 3) * 10;
        const distToMouse = Math.hypot(mx - lx, my - ly);
        const labelOpacity = distToMouse < 120 ? 0.12 + (1 - distToMouse / 120) * 0.1 : 0.05;

        ctx.font = "600 10px Inter, sans-serif";
        ctx.fillStyle = `hsla(0, 0%, 100%, ${labelOpacity})`;
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
