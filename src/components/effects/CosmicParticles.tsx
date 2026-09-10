import { useEffect, useRef } from "react";

/**
 * CosmicParticles — Effect 1
 *
 * Deep crimson & amber particle field with hundreds of glowing golden
 * dust motes drifting upward against gravity with subtle left-right drift.
 * A radial golden aura pulses softly from center — evoking the infinite
 * Brahmanda (cosmic universe) of Lord Ganesha.
 *
 * Canvas-based for maximum performance (zero DOM nodes per particle).
 */
export function CosmicParticles({
  count = 180,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;

    // Resize handler
    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Check reduced motion preference
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      ro.disconnect();
      return;
    }

    // Particle type definitions
    type Particle = {
      x: number;
      y: number;
      vy: number;       // upward speed
      vx: number;       // lateral drift
      size: number;
      opacity: number;
      maxOpacity: number;
      life: number;     // 0–1 lifecycle
      lifeSpeed: number;
      hue: number;      // gold/amber hue range
      glow: number;     // glow radius multiplier
    };

    const particles: Particle[] = [];

    const spawn = (): Particle => ({
      x: Math.random() * width,
      y: height + Math.random() * 60,
      vy: 0.3 + Math.random() * 1.0,
      vx: (Math.random() - 0.5) * 0.5,
      size: 0.8 + Math.random() * 2.2,
      opacity: 0,
      maxOpacity: 0.4 + Math.random() * 0.55,
      life: 0,
      lifeSpeed: 0.002 + Math.random() * 0.004,
      hue: 40 + Math.random() * 30,   // golden yellow to amber
      glow: 2 + Math.random() * 4,
    });

    // Seed initial particles at random lifecycle positions
    for (let i = 0; i < count; i++) {
      const p = spawn();
      p.y = Math.random() * height;
      p.life = Math.random();
      p.opacity = p.maxOpacity * Math.sin(p.life * Math.PI);
      particles.push(p);
    }

    // Central aura glow state
    let auraPhase = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // ── Radial velvet aura from center ──
      auraPhase += 0.008;
      const auraOpacity = 0.12 + Math.sin(auraPhase) * 0.05;
      const aura = ctx.createRadialGradient(
        width / 2, height * 0.45, 0,
        width / 2, height * 0.45, Math.max(width, height) * 0.6
      );
      aura.addColorStop(0, `oklch(0.79 0.12 84 / ${auraOpacity})`);
      aura.addColorStop(0.4, `oklch(0.65 0.15 55 / ${auraOpacity * 0.4})`);
      aura.addColorStop(1, "transparent");
      ctx.fillStyle = aura;
      ctx.fillRect(0, 0, width, height);

      // ── Particles ──
      for (const p of particles) {
        // Advance lifecycle
        p.life += p.lifeSpeed;
        if (p.life >= 1) {
          // Reset particle
          Object.assign(p, spawn());
          continue;
        }

        // Opacity envelope: fade in → hold → fade out
        p.opacity = p.maxOpacity * Math.sin(p.life * Math.PI);

        // Move upward with drift
        p.y -= p.vy;
        p.x += p.vx + Math.sin(p.life * Math.PI * 3 + p.x) * 0.15;

        if (p.opacity <= 0) continue;

        // Draw glowing particle
        ctx.save();
        ctx.globalAlpha = p.opacity;

        // Outer glow
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * p.glow);
        grad.addColorStop(0, `hsl(${p.hue}, 90%, 80%)`);
        grad.addColorStop(0.4, `hsl(${p.hue}, 85%, 65%)`);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.glow, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.globalAlpha = p.opacity * 0.9;
        ctx.fillStyle = `hsl(${p.hue}, 95%, 88%)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.45, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
