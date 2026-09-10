import { useEffect, useRef, useState } from "react";

/**
 * SacredGeometryOrbs — Effect 4
 *
 * Thin golden line-art of Om symbols, small Ganesha silhouettes, and
 * geometric mandala circles float organically. Shapes orbit gently toward
 * the screen center and smoothly repel from the cursor when hovered.
 */
export function SacredGeometryOrbs({
  count = 12,
  className = "",
}: {
  count?: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animRef = useRef<number>(0);

  type OrbShape = "om" | "mandala" | "ganesha-head" | "lotus" | "trishul";

  type Orb = {
    id: number;
    shape: OrbShape;
    // Position in % of container
    x: number;
    y: number;
    vx: number;
    vy: number;
    // Orbit parameters
    orbitAngle: number;
    orbitSpeed: number;
    orbitRadius: number;
    orbitCx: number;   // orbit center x%
    orbitCy: number;   // orbit center y%
    rotation: number;
    rotSpeed: number;
    scale: number;
    opacity: number;
    pulsePhase: number;
  };

  const shapes: OrbShape[] = ["om", "mandala", "ganesha-head", "lotus", "trishul"];
  const [orbs, setOrbs] = useState<Orb[]>([]);
  const orbsRef = useRef<Orb[]>([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const initial: Orb[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      shape: shapes[i % shapes.length] ?? "om",
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 80,
      vx: 0,
      vy: 0,
      orbitAngle: Math.random() * Math.PI * 2,
      orbitSpeed: prefersReduced ? 0 : (0.003 + Math.random() * 0.005) * (i % 2 === 0 ? 1 : -1),
      orbitRadius: 8 + Math.random() * 18,
      orbitCx: 50 + (Math.random() - 0.5) * 20,
      orbitCy: 50 + (Math.random() - 0.5) * 20,
      rotation: Math.random() * 360,
      rotSpeed: prefersReduced ? 0 : (Math.random() - 0.5) * 0.15,
      scale: 0.5 + Math.random() * 0.9,
      opacity: 0.12 + Math.random() * 0.18,
      pulsePhase: Math.random() * Math.PI * 2,
    }));

    orbsRef.current = initial;
    setOrbs([...initial]);
    if (prefersReduced) return;

    const tick = () => {
      const container = containerRef.current;
      const rect = container?.getBoundingClientRect();

      orbsRef.current = orbsRef.current.map((orb) => {
        // Advance orbit
        const angle = orb.orbitAngle + orb.orbitSpeed;
        const targetX = orb.orbitCx + Math.cos(angle) * orb.orbitRadius;
        const targetY = orb.orbitCy + Math.sin(angle) * orb.orbitRadius;

        // Ease toward orbit target
        let vx = orb.vx + (targetX - orb.x) * 0.008;
        let vy = orb.vy + (targetY - orb.y) * 0.008;

        // Mouse repulsion
        if (rect) {
          const absX = rect.left + (orb.x / 100) * rect.width;
          const absY = rect.top + (orb.y / 100) * rect.height;
          const dx = absX - mouseRef.current.x;
          const dy = absY - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const repelR = 160;
          if (dist < repelR && dist > 0) {
            const force = ((repelR - dist) / repelR) * 0.5;
            vx += (dx / dist) * force * (100 / rect.width);
            vy += (dy / dist) * force * (100 / rect.height);
          }
        }

        vx *= 0.92;
        vy *= 0.92;

        // Pulse opacity
        const pulsePhase = orb.pulsePhase + 0.018;
        const opacity = orb.opacity * (0.75 + Math.sin(pulsePhase) * 0.25);

        return {
          ...orb,
          x: Math.max(2, Math.min(98, orb.x + vx)),
          y: Math.max(2, Math.min(98, orb.y + vy)),
          vx,
          vy,
          orbitAngle: angle,
          rotation: orb.rotation + orb.rotSpeed,
          pulsePhase,
          opacity,
        };
      });

      setOrbs([...orbsRef.current]);
      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [count]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      {orbs.map((orb) => (
        <div
          key={orb.id}
          style={{
            position: "absolute",
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            transform: `translate(-50%, -50%) rotate(${orb.rotation}deg) scale(${orb.scale})`,
            opacity: orb.opacity,
            willChange: "transform, opacity",
            filter: "drop-shadow(0 0 6px oklch(0.79 0.12 84 / 0.5))",
          }}
        >
          <OrbSVG shape={orb.shape} />
        </div>
      ))}
    </div>
  );
}

/** Renders the appropriate SVG for each sacred geometry shape */
function OrbSVG({ shape }: { shape: "om" | "mandala" | "ganesha-head" | "lotus" | "trishul" }) {
  const stroke = "oklch(0.79 0.12 84)";
  const w = 1.4;

  if (shape === "om") {
    return (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
        {/* OM symbol as SVG paths */}
        <text
          x="50%"
          y="54%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="34"
          fontFamily="serif"
          fill="none"
          stroke={stroke}
          strokeWidth="0.8"
        >
          ॐ
        </text>
      </svg>
    );
  }

  if (shape === "mandala") {
    return (
      <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
        <circle cx="26" cy="26" r="24" stroke={stroke} strokeWidth={w} opacity="0.6" />
        <circle cx="26" cy="26" r="18" stroke={stroke} strokeWidth={w * 0.7} opacity="0.5" />
        <circle cx="26" cy="26" r="11" stroke={stroke} strokeWidth={w * 0.6} opacity="0.45" />
        <circle cx="26" cy="26" r="5" stroke={stroke} strokeWidth={w * 0.8} opacity="0.6" />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * 45 * Math.PI) / 180;
          return (
            <line
              key={i}
              x1={26 + 5 * Math.cos(a)}
              y1={26 + 5 * Math.sin(a)}
              x2={26 + 24 * Math.cos(a)}
              y2={26 + 24 * Math.sin(a)}
              stroke={stroke}
              strokeWidth={w * 0.5}
              opacity="0.4"
            />
          );
        })}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = ((i * 45 + 22.5) * Math.PI) / 180;
          const cx = 26 + 15 * Math.cos(a);
          const cy = 26 + 15 * Math.sin(a);
          return (
            <ellipse
              key={i}
              cx={cx}
              cy={cy}
              rx="3.5"
              ry="2"
              transform={`rotate(${i * 45 + 22.5} ${cx} ${cy})`}
              stroke={stroke}
              strokeWidth={w * 0.5}
              fill="none"
              opacity="0.4"
            />
          );
        })}
      </svg>
    );
  }

  if (shape === "ganesha-head") {
    return (
      <svg width="44" height="50" viewBox="0 0 44 50" fill="none">
        {/* Head */}
        <ellipse cx="22" cy="28" rx="16" ry="14" stroke={stroke} strokeWidth={w} opacity="0.7" />
        {/* Ears */}
        <ellipse cx="6" cy="26" rx="6" ry="9" stroke={stroke} strokeWidth={w * 0.8} opacity="0.55" />
        <ellipse cx="38" cy="26" rx="6" ry="9" stroke={stroke} strokeWidth={w * 0.8} opacity="0.55" />
        {/* Crown */}
        <path d="M12 16 Q22 4 32 16" stroke={stroke} strokeWidth={w} strokeLinecap="round" fill="none" opacity="0.6" />
        <path d="M17 14 L14 6 M22 12 L22 4 M27 14 L30 6" stroke={stroke} strokeWidth={w * 0.8} strokeLinecap="round" fill="none" opacity="0.55" />
        {/* Eyes */}
        <circle cx="16" cy="25" r="2.5" stroke={stroke} strokeWidth={w * 0.7} fill="none" opacity="0.65" />
        <circle cx="28" cy="25" r="2.5" stroke={stroke} strokeWidth={w * 0.7} fill="none" opacity="0.65" />
        {/* Trunk tip */}
        <path d="M18 34 Q14 40 16 44 Q20 46 22 42" stroke={stroke} strokeWidth={w} strokeLinecap="round" fill="none" opacity="0.6" />
      </svg>
    );
  }

  if (shape === "lotus") {
    return (
      <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
        {/* 8 lotus petals */}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * 45 * Math.PI) / 180;
          const px = 23 + 13 * Math.cos(a - Math.PI / 2);
          const py = 23 + 13 * Math.sin(a - Math.PI / 2);
          return (
            <ellipse
              key={i}
              cx={px}
              cy={py}
              rx="5.5"
              ry="10"
              transform={`rotate(${i * 45} ${px} ${py})`}
              stroke={stroke}
              strokeWidth={w * 0.7}
              fill="none"
              opacity="0.5"
            />
          );
        })}
        <circle cx="23" cy="23" r="6" stroke={stroke} strokeWidth={w} fill="none" opacity="0.65" />
        <circle cx="23" cy="23" r="3" stroke={stroke} strokeWidth={w * 0.8} fill="none" opacity="0.6" />
      </svg>
    );
  }

  // trishul
  return (
    <svg width="32" height="50" viewBox="0 0 32 50" fill="none">
      {/* Central prong */}
      <line x1="16" y1="4" x2="16" y2="46" stroke={stroke} strokeWidth={w} strokeLinecap="round" opacity="0.7" />
      {/* Left prong */}
      <path d="M16 18 Q8 14 6 8 Q8 6 10 8 Q10 14 16 18" stroke={stroke} strokeWidth={w * 0.8} strokeLinecap="round" fill="none" opacity="0.6" />
      {/* Right prong */}
      <path d="M16 18 Q24 14 26 8 Q24 6 22 8 Q22 14 16 18" stroke={stroke} strokeWidth={w * 0.8} strokeLinecap="round" fill="none" opacity="0.6" />
      {/* Handle cross bar */}
      <line x1="10" y1="36" x2="22" y2="36" stroke={stroke} strokeWidth={w * 0.7} strokeLinecap="round" opacity="0.55" />
      {/* Center top gem */}
      <circle cx="16" cy="4" r="2" stroke={stroke} strokeWidth={w * 0.7} fill="none" opacity="0.65" />
    </svg>
  );
}
