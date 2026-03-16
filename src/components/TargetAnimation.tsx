import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  speed: number;
  size: number;
  opacity: number;
  trail: { x: number; y: number }[];
  phase: "flying" | "impact" | "fade";
  impactTimer: number;
  delay: number;
  angle: number;
}

interface Ring {
  radius: number;
  opacity: number;
  expanding: boolean;
}

const TargetAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const ringsRef = useRef<Ring[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const timeRef = useRef(0);

  const createParticle = useCallback((w: number, h: number, targetX: number, targetY: number): Particle => {
    const side = Math.floor(Math.random() * 4);
    let x: number, y: number;
    switch (side) {
      case 0: x = Math.random() * w; y = -20; break;
      case 1: x = w + 20; y = Math.random() * h; break;
      case 2: x = Math.random() * w; y = h + 20; break;
      default: x = -20; y = Math.random() * h; break;
    }
    const angle = Math.atan2(targetY - y, targetX - x);
    return {
      x, y,
      targetX, targetY,
      speed: 1.5 + Math.random() * 3,
      size: 2 + Math.random() * 3,
      opacity: 0.4 + Math.random() * 0.6,
      trail: [],
      phase: "flying",
      impactTimer: 0,
      delay: Math.random() * 120,
      angle,
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true };
    };
    const handleMouseLeave = () => { mouseRef.current.active = false; };
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) { animationRef.current = requestAnimationFrame(animate); return; }
      const w = rect.width;
      const h = rect.height;
      
      ctx.clearRect(0, 0, w, h);
      timeRef.current++;

      // Target center - right side of the hero
      const centerX = w * 0.82;
      const centerY = h * 0.45;

      // Draw subtle target rings
      const targetRadii = [30, 70, 120, 180];
      targetRadii.forEach((r, i) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(0, 78%, 48%, ${0.06 - i * 0.012})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Pulsing center dot
      const pulseScale = 1 + Math.sin(timeRef.current * 0.04) * 0.3;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 5 * pulseScale, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(0, 78%, 48%, ${0.3 + Math.sin(timeRef.current * 0.04) * 0.1})`;
      ctx.fill();

      // Spawn particles
      if (timeRef.current % 8 === 0 && particlesRef.current.length < 35) {
        const tx = mouseRef.current.active ? mouseRef.current.x : centerX;
        const ty = mouseRef.current.active ? mouseRef.current.y : centerY;
        particlesRef.current.push(createParticle(w, h, tx, ty));
      }

      // Update impact rings
      ringsRef.current = ringsRef.current.filter(ring => {
        ring.radius += 2;
        ring.opacity -= 0.015;
        if (ring.opacity <= 0) return false;
        ctx.beginPath();
        ctx.arc(centerX, centerY, ring.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(0, 78%, 48%, ${ring.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        return true;
      });

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(p => {
        if (p.delay > 0) { p.delay--; return true; }

        if (p.phase === "flying") {
          // Redirect toward mouse if active
          const tx = mouseRef.current.active ? mouseRef.current.x : p.targetX;
          const ty = mouseRef.current.active ? mouseRef.current.y : p.targetY;
          const targetAngle = Math.atan2(ty - p.y, tx - p.x);
          p.angle += (targetAngle - p.angle) * 0.05;

          p.trail.push({ x: p.x, y: p.y });
          if (p.trail.length > 12) p.trail.shift();

          p.x += Math.cos(p.angle) * p.speed;
          p.y += Math.sin(p.angle) * p.speed;

          const dist = Math.hypot(tx - p.x, ty - p.y);
          if (dist < 15) {
            p.phase = "impact";
            p.impactTimer = 20;
            if (Math.random() > 0.6) {
              ringsRef.current.push({ radius: 5, opacity: 0.25, expanding: true });
            }
          }

          // Draw trail
          if (p.trail.length > 1) {
            ctx.beginPath();
            ctx.moveTo(p.trail[0].x, p.trail[0].y);
            for (let i = 1; i < p.trail.length; i++) {
              ctx.lineTo(p.trail[i].x, p.trail[i].y);
            }
            ctx.strokeStyle = `hsla(0, 78%, 55%, ${p.opacity * 0.3})`;
            ctx.lineWidth = p.size * 0.5;
            ctx.stroke();
          }

          // Draw particle
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(0, 78%, 55%, ${p.opacity})`;
          ctx.fill();

          // Glow
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
          const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.5);
          glow.addColorStop(0, `hsla(0, 78%, 55%, ${p.opacity * 0.3})`);
          glow.addColorStop(1, "hsla(0, 78%, 55%, 0)");
          ctx.fillStyle = glow;
          ctx.fill();

        } else if (p.phase === "impact") {
          p.impactTimer--;
          const flash = p.impactTimer / 20;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * (2 - flash), 0, Math.PI * 2);
          ctx.fillStyle = `hsla(0, 78%, 65%, ${flash * 0.6})`;
          ctx.fill();
          if (p.impactTimer <= 0) return false;
        }
        return true;
      });

      // Floating ambient dots
      for (let i = 0; i < 20; i++) {
        const fx = (Math.sin(timeRef.current * 0.008 + i * 1.5) * 0.5 + 0.5) * w;
        const fy = (Math.cos(timeRef.current * 0.006 + i * 2.1) * 0.5 + 0.5) * h;
        ctx.beginPath();
        ctx.arc(fx, fy, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(0, 0%, 100%, ${0.05 + Math.sin(timeRef.current * 0.02 + i) * 0.03})`;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [createParticle]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[1] pointer-events-auto"
      style={{ mixBlendMode: "screen" }}
    />
  );
};

export default TargetAnimation;
