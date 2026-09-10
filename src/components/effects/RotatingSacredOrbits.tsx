import { useEffect, useState, useRef } from "react";

/**
 * RotatingSacredOrbits
 * 
 * Full-background sacred geometry orbital system featuring:
 * - 3 Concentric counter-rotating golden & saffron Sri Yantra orbit rings
 * - Orbiting sacred nodes with symbols (Om ॐ, Trishul 🔱, Lotus 🪷, Crown 👑, Diya 🪔)
 * - 3D parallax tilt responding to mouse movement
 * - Central divine radiant aura pulse
 */
export function RotatingSacredOrbits({
  className = "",
  opacity = 0.25,
}: {
  className?: string;
  opacity?: number;
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Normalized coords -1 to 1
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none fixed inset-0 z-0 overflow-hidden flex items-center justify-center ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Central Soft Golden Radial Aura */}
      <div 
        className="absolute w-[600px] h-[600px] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, oklch(0.79 0.16 80 / 0.35) 0%, oklch(0.68 0.18 50 / 0.15) 50%, transparent 70%)",
          transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)`,
          transition: "transform 0.4s ease-out",
        }}
      />

      {/* Main Interactive Orbits Container with 3D Parallax Tilt */}
      <div
        className="relative w-[700px] sm:w-[900px] lg:w-[1100px] h-[700px] sm:h-[900px] lg:h-[1100px] flex items-center justify-center"
        style={{
          transform: `perspective(1000px) rotateX(${mousePos.y * 6}deg) rotateY(${mousePos.x * -6}deg)`,
          transition: "transform 0.3s ease-out",
        }}
      >
        {/* ========================================================
            RING 1: Outer Celestial Orbit (Clockwise - 80s)
           ======================================================== */}
        <div 
          className="absolute inset-0 animate-spin"
          style={{ animationDuration: "80s", animationTimingFunction: "linear" }}
        >
          <svg viewBox="0 0 1000 1000" className="w-full h-full text-gold">
            {/* Outer Orbit Line */}
            <circle cx="500" cy="500" r="460" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="6 12" opacity="0.5" />
            <circle cx="500" cy="500" r="450" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />

            {/* 24 Ray Tick Marks */}
            {Array.from({ length: 24 }).map((_, i) => {
              const angle = (i * 15 * Math.PI) / 180;
              const x1 = 500 + 440 * Math.cos(angle);
              const y1 = 500 + 440 * Math.sin(angle);
              const x2 = 500 + 460 * Math.cos(angle);
              const y2 = 500 + 460 * Math.sin(angle);
              return (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
              );
            })}

            {/* Orbiting Sacred Symbol Nodes */}
            {[
              { angle: 0, symbol: "🕉️" },
              { angle: 45, symbol: "🔱" },
              { angle: 90, symbol: "🪷" },
              { angle: 135, symbol: "👑" },
              { angle: 180, symbol: "卐" },
              { angle: 225, symbol: "🪔" },
              { angle: 270, symbol: "🚩" },
              { angle: 315, symbol: "🥟" },
            ].map((node, i) => {
              const rad = (node.angle * Math.PI) / 180;
              const cx = 500 + 460 * Math.cos(rad);
              const cy = 500 + 460 * Math.sin(rad);
              return (
                <g key={i}>
                  <circle cx={cx} cy={cy} r="18" fill="oklch(0.25 0.12 25 / 0.8)" stroke="currentColor" strokeWidth="1.5" />
                  <text
                    x={cx}
                    y={cy + 5}
                    textAnchor="middle"
                    fontSize="16"
                    fill="var(--color-gold)"
                  >
                    {node.symbol}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* ========================================================
            RING 2: Middle Sri Yantra Geometry (Counter-Clockwise - 55s)
           ======================================================== */}
        <div 
          className="absolute w-[72%] h-[72%] animate-spin"
          style={{ 
            animationDuration: "55s", 
            animationTimingFunction: "linear",
            animationDirection: "reverse",
          }}
        >
          <svg viewBox="0 0 800 800" className="w-full h-full text-saffron">
            {/* Concentric Geometry Rings */}
            <circle cx="400" cy="400" r="370" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
            <circle cx="400" cy="400" r="340" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 8" opacity="0.4" />
            <circle cx="400" cy="400" r="310" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />

            {/* 12 Sacred Petal Arc Loops */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              const nextAngle = ((i + 1) * 30 * Math.PI) / 180;
              const x1 = 400 + 310 * Math.cos(angle);
              const y1 = 400 + 310 * Math.sin(angle);
              const x2 = 400 + 370 * Math.cos((angle + nextAngle) / 2);
              const y2 = 400 + 370 * Math.sin((angle + nextAngle) / 2);
              const x3 = 400 + 310 * Math.cos(nextAngle);
              const y3 = 400 + 310 * Math.sin(nextAngle);
              return (
                <path
                  key={i}
                  d={`M ${x1} ${y1} Q ${x2} ${y2} ${x3} ${y3}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  opacity="0.7"
                />
              );
            })}

            {/* Intersecting Triangles (Sri Yantra Core) */}
            <polygon
              points="400,90 670,550 130,550"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.4"
            />
            <polygon
              points="400,710 670,250 130,250"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.4"
            />

            {/* Orbiting Golden Star Nodes */}
            {Array.from({ length: 6 }).map((_, i) => {
              const angle = (i * 60 * Math.PI) / 180;
              const cx = 400 + 340 * Math.cos(angle);
              const cy = 400 + 340 * Math.sin(angle);
              return (
                <circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r="6"
                  fill="var(--color-gold)"
                  className="animate-pulse"
                />
              );
            })}
          </svg>
        </div>

        {/* ========================================================
            RING 3: Inner Sanskrit Om & Ganesha Orbit (Clockwise - 35s)
           ======================================================== */}
        <div 
          className="absolute w-[45%] h-[45%] animate-spin"
          style={{ animationDuration: "35s", animationTimingFunction: "linear" }}
        >
          <svg viewBox="0 0 500 500" className="w-full h-full text-gold">
            <circle cx="250" cy="250" r="220" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.7" />
            <circle cx="250" cy="250" r="190" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 6" opacity="0.5" />

            {/* 8 Inner Lotus Rays */}
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i * 45 * Math.PI) / 180;
              const x1 = 250 + 190 * Math.cos(angle);
              const y1 = 250 + 190 * Math.sin(angle);
              const x2 = 250 + 220 * Math.cos(angle);
              const y2 = 250 + 220 * Math.sin(angle);
              return (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="2" opacity="0.8" />
              );
            })}

            {/* 4 Inner Floating Om Symbols */}
            {[0, 90, 180, 270].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const cx = 250 + 205 * Math.cos(rad);
              const cy = 250 + 205 * Math.sin(rad);
              return (
                <text
                  key={i}
                  x={cx}
                  y={cy + 6}
                  textAnchor="middle"
                  fontSize="22"
                  fontWeight="bold"
                  fill="var(--color-gold)"
                  opacity="0.9"
                >
                  ॐ
                </text>
              );
            })}
          </svg>
        </div>

        {/* Central Divine Symbol: Golden Glowing ॐ */}
        <div className="absolute flex items-center justify-center w-24 h-24 rounded-full bg-maroon/60 border border-gold/40 shadow-glow text-gold text-4xl font-bold animate-pulse z-10">
          ॐ
        </div>
      </div>
    </div>
  );
}
