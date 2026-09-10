import { type ReactNode, useRef, useState } from "react";

/**
 * DurvaHoverCard — Component B
 *
 * Sacred Offerings Micro-Interactions.
 * Wraps any card content — on hover, reveals fresh green Durva grass
 * blades rising from the card baseline, plus a golden shimmer border.
 * Completely opt-in — just wrap your existing card content.
 */
export function DurvaHoverCard({
  children,
  className = "",
  bladeCount = 9,
}: {
  children: ReactNode;
  className?: string;
  bladeCount?: number;
}) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        transition:
          "box-shadow 0.4s ease, transform 0.35s ease, border-color 0.4s ease",
        boxShadow: hovered
          ? "0 0 0 1.5px oklch(0.79 0.12 84 / 0.7), 0 8px 32px oklch(0.6 0.15 60 / 0.22), 0 20px 44px oklch(0.34 0.11 27 / 0.16)"
          : undefined,
        transform: hovered ? "translateY(-4px)" : undefined,
      }}
    >
      {/* Golden gradient shimmer overlay on hover */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          background:
            "linear-gradient(135deg, oklch(0.85 0.14 78 / 0.1) 0%, transparent 50%, oklch(0.72 0.17 62 / 0.07) 100%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2 }}>{children}</div>

      {/* Durva Grass blades — rise from bottom */}
      <DurvaGrass hovered={hovered} count={bladeCount} />
    </div>
  );
}

/** Renders a row of Durva (sacred grass) SVG blades that rise on hover */
function DurvaGrass({
  hovered,
  count,
}: {
  hovered: boolean;
  count: number;
}) {
  // Pre-computed blade variations so they look organic
  const blades = Array.from({ length: count }, (_, i) => ({
    // spread blades across the width with slight randomness via index
    xPercent: 4 + (i / (count - 1)) * 92,
    height: 18 + ((i * 7 + 3) % 14),   // 18–32px
    lean: -12 + ((i * 13) % 25),        // -12deg to +13deg
    delay: (i * 0.07) % 0.5,
    swayDelay: (i * 0.11) % 0.8,
  }));

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "40px",
        pointerEvents: "none",
        zIndex: 3,
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      {blades.map((blade, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${blade.xPercent}%`,
            bottom: 0,
            transformOrigin: "50% 100%",
            transform: hovered ? "scaleY(1)" : "scaleY(0)",
            opacity: hovered ? 1 : 0,
            transition: hovered
              ? `transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) ${blade.delay}s,
                 opacity 0.3s ease ${blade.delay}s`
              : `transform 0.25s ease-in, opacity 0.25s ease-in`,
          }}
        >
          <DurvaBladesvg
            height={blade.height}
            lean={blade.lean}
            swayDelay={hovered ? blade.swayDelay : 0}
            sway={hovered}
          />
        </div>
      ))}
    </div>
  );
}

/** Individual Durva grass blade SVG */
function DurvaBladesvg({
  height,
  lean,
  swayDelay,
  sway,
}: {
  height: number;
  lean: number;
  swayDelay: number;
  sway: boolean;
}) {
  const w = 5;
  // Bezier grass blade shape
  const d = `M${w / 2} ${height} Q${w * 0.2} ${height * 0.5} ${w * 0.4} 0 Q${w * 0.6} ${height * 0.5} ${w} ${height}`;

  return (
    <svg
      width={w + 2}
      height={height + 2}
      viewBox={`0 0 ${w + 2} ${height + 2}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        display: "block",
        transform: `rotate(${lean}deg)`,
        animation: sway
          ? `durva-sway ${1.8 + swayDelay}s ease-in-out infinite`
          : "none",
        animationDelay: `${swayDelay}s`,
        transformOrigin: "50% 100%",
      }}
    >
      {/* Blade body */}
      <path
        d={d}
        fill="oklch(0.52 0.12 145)"
        opacity="0.85"
      />
      {/* Mid-vein highlight */}
      <line
        x1={w / 2}
        y1={height}
        x2={w * 0.4}
        y2={2}
        stroke="oklch(0.65 0.10 145)"
        strokeWidth="0.7"
        opacity="0.6"
      />
      {/* Tiny forked tip (characteristic of Durva) */}
      <path
        d={`M${w * 0.4} 2 Q${w * 0.2} -2 ${w * 0.1} -4 M${w * 0.4} 2 Q${w * 0.55} -2 ${w * 0.7} -4`}
        stroke="oklch(0.55 0.13 145)"
        strokeWidth="0.8"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
