/**
 * MandalaGlow
 * 
 * High-visibility divine Sacred Geometry Sri Yantra & Mandala Wheel
 * positioned directly behind hero headers and section names.
 * Features:
 * - Concentric counter-rotating golden & saffron Sri Yantra orbital rings
 * - Intersecting Sri Yantra triangles (Shiva & Shakti divine geometry)
 * - 16-petal sacred lotus chakra curves
 * - Orbiting sacred symbols (ॐ, 🔱, 🪷, 👑, 卐, 🪔, 🚩, 🥟)
 * - Deep golden radial aura glow directly illuminating the titles
 */
export function MandalaGlow({
  direction = "normal",
  duration = 60,
  opacity = 0.65,
}: {
  direction?: "normal" | "reverse";
  duration?: number;
  opacity?: number;
}) {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden flex items-center justify-center select-none"
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Central Golden Radial Halo / Aura */}
      <div 
        className="absolute w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full blur-2xl pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, oklch(0.85 0.16 85 / 0.45) 0%, oklch(0.72 0.18 55 / 0.25) 45%, transparent 70%)",
          animation: "glow-pulse 5s ease-in-out infinite",
        }}
      />

      {/* Main Sacred Geometry Container */}
      <div className="relative w-[650px] sm:w-[850px] lg:w-[1050px] h-[650px] sm:h-[850px] lg:h-[1050px] flex items-center justify-center shrink-0">
        
        {/* ========================================================
            RING 1: Outer Celestial Orbit & Sacred Glyphs (Clockwise)
           ======================================================== */}
        <div 
          className="absolute inset-0 animate-spin"
          style={{ 
            animationDuration: `${duration}s`, 
            animationTimingFunction: "linear",
            animationDirection: direction,
          }}
        >
          <svg 
            viewBox="0 0 1000 1000" 
            className="w-full h-full text-gold"
            style={{ filter: "drop-shadow(0 0 10px oklch(0.85 0.16 85 / 0.5))" }}
          >
            {/* Outer Orbit Borders */}
            <circle cx="500" cy="500" r="470" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="8 12" opacity="0.8" />
            <circle cx="500" cy="500" r="455" fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.9" />
            <circle cx="500" cy="500" r="440" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" opacity="0.7" />

            {/* 36 Sunburst Rays & Ticks */}
            {Array.from({ length: 36 }).map((_, i) => {
              const angle = (i * 10 * Math.PI) / 180;
              const isMajor = i % 3 === 0;
              const innerR = isMajor ? 415 : 435;
              const outerR = 455;
              const x1 = 500 + innerR * Math.cos(angle);
              const y1 = 500 + innerR * Math.sin(angle);
              const x2 = 500 + outerR * Math.cos(angle);
              const y2 = 500 + outerR * Math.sin(angle);
              return (
                <line 
                  key={i} 
                  x1={x1} 
                  y1={y1} 
                  x2={x2} 
                  y2={y2} 
                  stroke="currentColor" 
                  strokeWidth={isMajor ? "2" : "1"} 
                  opacity={isMajor ? "0.9" : "0.5"} 
                />
              );
            })}

            {/* Orbiting Sacred Nodes & Glyphs */}
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
              const cx = 500 + 455 * Math.cos(rad);
              const cy = 500 + 455 * Math.sin(rad);
              return (
                <g key={i}>
                  <circle cx={cx} cy={cy} r="20" fill="oklch(0.2 0.09 25 / 0.95)" stroke="currentColor" strokeWidth="2" />
                  <text
                    x={cx}
                    y={cy + 6}
                    textAnchor="middle"
                    fontSize="18"
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
            RING 2: Middle Sri Yantra & Sacred Lotus (Counter-Clockwise)
           ======================================================== */}
        <div 
          className="absolute w-[76%] h-[76%] animate-spin"
          style={{ 
            animationDuration: `${Math.round(duration * 0.75)}s`, 
            animationTimingFunction: "linear",
            animationDirection: direction === "normal" ? "reverse" : "normal",
          }}
        >
          <svg 
            viewBox="0 0 800 800" 
            className="w-full h-full text-saffron"
            style={{ filter: "drop-shadow(0 0 8px oklch(0.75 0.18 55 / 0.6))" }}
          >
            {/* Concentric Geometry Rings */}
            <circle cx="400" cy="400" r="380" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.85" />
            <circle cx="400" cy="400" r="350" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="6 8" opacity="0.7" />
            <circle cx="400" cy="400" r="320" fill="none" stroke="currentColor" strokeWidth="1.8" opacity="0.85" />

            {/* 16 Sacred Lotus Petal Arcs */}
            {Array.from({ length: 16 }).map((_, i) => {
              const angle = (i * 22.5 * Math.PI) / 180;
              const nextAngle = ((i + 1) * 22.5 * Math.PI) / 180;
              const x1 = 400 + 320 * Math.cos(angle);
              const y1 = 400 + 320 * Math.sin(angle);
              const x2 = 400 + 378 * Math.cos((angle + nextAngle) / 2);
              const y2 = 400 + 378 * Math.sin((angle + nextAngle) / 2);
              const x3 = 400 + 320 * Math.cos(nextAngle);
              const y3 = 400 + 320 * Math.sin(nextAngle);
              return (
                <path
                  key={i}
                  d={`M ${x1} ${y1} Q ${x2} ${y2} ${x3} ${y3}`}
                  fill="none"
                  stroke="var(--color-gold)"
                  strokeWidth="1.8"
                  opacity="0.85"
                />
              );
            })}

            {/* Intersecting Sacred Sri Yantra Triangles (Shiva & Shakti) */}
            <polygon
              points="400,90 680,560 120,560"
              fill="none"
              stroke="var(--color-gold)"
              strokeWidth="2"
              opacity="0.8"
            />
            <polygon
              points="400,710 680,240 120,240"
              fill="none"
              stroke="var(--color-gold)"
              strokeWidth="2"
              opacity="0.8"
            />
            {/* Secondary diagonal triangles */}
            <polygon
              points="400,160 620,520 180,520"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              opacity="0.65"
            />
            <polygon
              points="400,640 620,280 180,280"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              opacity="0.65"
            />

            {/* Orbiting Golden Star Nodes */}
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i * 45 * Math.PI) / 180;
              const cx = 400 + 350 * Math.cos(angle);
              const cy = 400 + 350 * Math.sin(angle);
              return (
                <circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r="7"
                  fill="var(--color-gold)"
                  stroke="oklch(0.2 0.09 25)"
                  strokeWidth="1.5"
                />
              );
            })}
          </svg>
        </div>

        {/* ========================================================
            RING 3: Inner Sanskrit Om & Sun Halo (Clockwise)
           ======================================================== */}
        <div 
          className="absolute w-[48%] h-[48%] animate-spin"
          style={{ 
            animationDuration: `${Math.round(duration * 0.5)}s`, 
            animationTimingFunction: "linear",
            animationDirection: direction,
          }}
        >
          <svg 
            viewBox="0 0 500 500" 
            className="w-full h-full text-gold"
            style={{ filter: "drop-shadow(0 0 12px oklch(0.85 0.16 85 / 0.7))" }}
          >
            <circle cx="250" cy="250" r="235" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.9" />
            <circle cx="250" cy="250" r="200" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.75" />
            <circle cx="250" cy="250" r="160" fill="none" stroke="currentColor" strokeWidth="1.8" opacity="0.85" />

            {/* 12 Inner Petals */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              const x1 = 250 + 160 * Math.cos(angle);
              const y1 = 250 + 160 * Math.sin(angle);
              const x2 = 250 + 200 * Math.cos(angle);
              const y2 = 250 + 200 * Math.sin(angle);
              return (
                <line 
                  key={i} 
                  x1={x1} 
                  y1={y1} 
                  x2={x2} 
                  y2={y2} 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  opacity="0.9" 
                />
              );
            })}

            {/* 4 Cardinal Golden Om Symbols */}
            {[0, 90, 180, 270].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const cx = 250 + 215 * Math.cos(rad);
              const cy = 250 + 215 * Math.sin(rad);
              return (
                <text
                  key={i}
                  x={cx}
                  y={cy + 7}
                  textAnchor="middle"
                  fontSize="24"
                  fontWeight="bold"
                  fill="var(--color-gold)"
                  opacity="0.95"
                >
                  ॐ
                </text>
              );
            })}
          </svg>
        </div>

        {/* Central Divine Symbol: Glowing ॐ emblem */}
        <div 
          className="absolute flex items-center justify-center w-28 h-28 rounded-full bg-maroon/70 border-2 border-gold shadow-glow text-gold text-5xl font-bold animate-pulse z-0"
          style={{
            boxShadow: "0 0 35px oklch(0.85 0.16 85 / 0.6), inset 0 0 20px oklch(0.85 0.16 85 / 0.4)",
          }}
        >
          ॐ
        </div>
      </div>
    </div>
  );
}
