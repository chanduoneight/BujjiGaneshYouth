import { useEffect, useRef, useState } from "react";

/**
 * DevotionalPetals — Effect 2
 *
 * Weightlessly suspended 3D-style marigold petals, red hibiscus flowers,
 * and Durva grass blades drifting in a sacred temple atmosphere.
 * Responds to cursor proximity — elements gently push away from the mouse.
 */
export function DevotionalPetals({
  count = 18,
  className = "",
  isFixed = false,
}: {
  count?: number;
  className?: string;
  isFixed?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  type FloatElement = {
    id: number;
    type: "marigold" | "hibiscus" | "durva";
    x: number;
    y: number;
    vx: number;
    vy: number;
    rotation: number;
    rotSpeed: number;
    rotX: number;
    rotXSpeed: number;
    scale: number;
    opacity: number;
    driftPhase: number;
  };

  const [elements, setElements] = useState<FloatElement[]>([]);
  const elemsRef = useRef<FloatElement[]>([]);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const types: FloatElement["type"][] = ["marigold", "hibiscus", "durva"];
    const initial: FloatElement[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      type: types[i % 3] ?? "marigold",
      x: 5 + Math.random() * 90,
      y: 5 + Math.random() * 90,
      vx: (Math.random() - 0.5) * 0.04,
      vy: -0.015 - Math.random() * 0.025,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 0.4,
      rotX: Math.random() * 360,
      rotXSpeed: prefersReduced ? 0 : (Math.random() - 0.5) * 0.25,
      scale: 0.6 + Math.random() * 0.8,
      opacity: 0.55 + Math.random() * 0.35,
      driftPhase: Math.random() * Math.PI * 2,
    }));

    elemsRef.current = initial;
    setElements([...initial]);

    if (prefersReduced) return;

    const tick = () => {
      const container = containerRef.current;
      const rect = container?.getBoundingClientRect();
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      elemsRef.current = elemsRef.current.map((el) => {
        let { x, y, vx, vy, rotation, rotSpeed, rotX, rotXSpeed, driftPhase } = el;

        // Wrap around edges
        if (y < -5) { y = 105; x = 5 + Math.random() * 90; }
        if (x < -5) x = 105;
        if (x > 105) x = -5;

        // Gentle sine drift
        driftPhase += 0.008;
        const drift = Math.sin(driftPhase) * 0.02;

        // Mouse repulsion (only when container is in viewport)
        if (rect) {
          const elAbsX = rect.left + (x / 100) * rect.width;
          const elAbsY = rect.top + (y / 100) * rect.height;
          const dx = elAbsX - mx;
          const dy = elAbsY - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const repelRadius = 120;
          if (dist < repelRadius && dist > 0) {
            const force = ((repelRadius - dist) / repelRadius) * 0.25;
            vx += (dx / dist) * force;
            vy += (dy / dist) * force;
          }
        }

        // Friction
        vx *= 0.96;
        vy *= 0.96;

        // Apply base upward drift
        const baseVy = -0.015 - (el.id % 5) * 0.005;
        vy += (baseVy - vy) * 0.02;

        return {
          ...el,
          x: x + vx + drift,
          y: y + vy,
          vx,
          vy,
          rotation: rotation + rotSpeed,
          rotX: rotX + rotXSpeed,
          driftPhase,
        };
      });

      setElements([...elemsRef.current]);
      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [count]);

  // Track mouse position
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
        position: isFixed ? "fixed" : "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      {elements.map((el) => (
        <div
          key={el.id}
          style={{
            position: "absolute",
            left: `${el.x}%`,
            top: `${el.y}%`,
            transform: `rotate(${el.rotation}deg) rotateX(${el.rotX}deg) scale(${el.scale})`,
            opacity: el.opacity,
            willChange: "transform, opacity",
            transformStyle: "preserve-3d",
            filter:
              el.type === "marigold"
                ? "drop-shadow(0 2px 6px oklch(0.72 0.17 62 / 0.5))"
                : el.type === "hibiscus"
                ? "drop-shadow(0 2px 8px oklch(0.45 0.2 20 / 0.5))"
                : "drop-shadow(0 2px 4px oklch(0.52 0.12 145 / 0.4))",
          }}
        >
          {el.type === "marigold" && <MarigoldPetal />}
          {el.type === "hibiscus" && <HibiscusFlower />}
          {el.type === "durva" && <DurvaSprig />}
        </div>
      ))}
    </div>
  );
}

/** Marigold petal — layered ellipses in orange/gold */
function MarigoldPetal() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      {/* Outer petals */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        const cx = 14 + 7 * Math.cos(angle);
        const cy = 14 + 7 * Math.sin(angle);
        return (
          <ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx="5"
            ry="3"
            transform={`rotate(${i * 45} ${cx} ${cy})`}
            fill={i % 2 === 0 ? "oklch(0.72 0.18 62)" : "oklch(0.65 0.2 50)"}
            opacity="0.85"
          />
        );
      })}
      {/* Inner petals */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = ((i * 45 + 22.5) * Math.PI) / 180;
        const cx = 14 + 4 * Math.cos(angle);
        const cy = 14 + 4 * Math.sin(angle);
        return (
          <ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx="3.5"
            ry="2"
            transform={`rotate(${i * 45 + 22.5} ${cx} ${cy})`}
            fill="oklch(0.79 0.16 72)"
            opacity="0.9"
          />
        );
      })}
      {/* Center */}
      <circle cx="14" cy="14" r="3.5" fill="oklch(0.55 0.18 45)" opacity="0.95" />
      <circle cx="14" cy="14" r="1.8" fill="oklch(0.35 0.1 35)" opacity="0.8" />
    </svg>
  );
}

/** Hibiscus flower — 5 petals in deep red */
function HibiscusFlower() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      {/* 5 petals */}
      {Array.from({ length: 5 }).map((_, i) => {
        const angle = (i * 72 * Math.PI) / 180;
        const cx = 13 + 6 * Math.cos(angle - Math.PI / 2);
        const cy = 13 + 6 * Math.sin(angle - Math.PI / 2);
        return (
          <ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx="5.5"
            ry="3"
            transform={`rotate(${i * 72 - 90} ${cx} ${cy})`}
            fill={i % 2 === 0 ? "oklch(0.45 0.22 20)" : "oklch(0.38 0.2 18)"}
            opacity="0.88"
          />
        );
      })}
      {/* Stamen */}
      <circle cx="13" cy="13" r="3" fill="oklch(0.72 0.17 62)" opacity="0.95" />
      <circle cx="13" cy="13" r="1.5" fill="oklch(0.55 0.12 55)" opacity="0.9" />
      {/* Stamen dots */}
      {Array.from({ length: 5 }).map((_, i) => {
        const a = (i * 72 * Math.PI) / 180;
        return (
          <circle
            key={i}
            cx={13 + 2.5 * Math.cos(a)}
            cy={13 + 2.5 * Math.sin(a)}
            r="0.5"
            fill="oklch(0.85 0.14 78)"
            opacity="0.9"
          />
        );
      })}
    </svg>
  );
}

/** Durva grass sprig — 3 blades in fresh green */
function DurvaSprig() {
  return (
    <svg width="18" height="28" viewBox="0 0 18 28" fill="none">
      {/* Left blade */}
      <path
        d="M9 28 Q5 20 4 12 Q3 6 7 2"
        stroke="oklch(0.52 0.13 145)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />
      {/* Center blade */}
      <path
        d="M9 28 Q9 18 9 10 Q9 4 9 0"
        stroke="oklch(0.55 0.12 145)"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />
      {/* Right blade */}
      <path
        d="M9 28 Q13 20 14 12 Q15 6 11 2"
        stroke="oklch(0.52 0.13 145)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />
      {/* Tip forks */}
      <path d="M7 2 Q6 0 5 -1" stroke="oklch(0.48 0.14 145)" strokeWidth="1" strokeLinecap="round" fill="none" />
      <path d="M7 2 Q8 0 9 -1" stroke="oklch(0.48 0.14 145)" strokeWidth="1" strokeLinecap="round" fill="none" />
    </svg>
  );
}
