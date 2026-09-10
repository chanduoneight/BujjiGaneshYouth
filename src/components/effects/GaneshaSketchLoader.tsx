import { useEffect, useState } from "react";

/**
 * GaneshaSketchLoader — Component A
 *
 * An SVG profile of Lord Ganesha draws itself from thin air using
 * stroke-dasharray / stroke-dashoffset animation, then bursts into
 * a sacred golden Tejas (divine glow) pulse before fading away.
 */
export function GaneshaSketchLoader() {
  const [phase, setPhase] = useState<"drawing" | "tejas" | "exiting" | "done">(
    "drawing"
  );

  useEffect(() => {
    // After SVG finishes drawing (~2.2s), trigger Tejas glow
    const tejasTimer = setTimeout(() => setPhase("tejas"), 2200);
    // Start exit fade
    const exitTimer = setTimeout(() => setPhase("exiting"), 3200);
    // Fully unmount
    const doneTimer = setTimeout(() => setPhase("done"), 3700);

    return () => {
      clearTimeout(tejasTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      aria-label="Loading… Jai Ganesh"
      role="status"
      onClick={() => setPhase("exiting")}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(160deg, oklch(0.34 0.11 27), oklch(0.22 0.07 30))",
        opacity: phase === "exiting" ? 0 : 1,
        transition: "opacity 0.5s ease-out",
        cursor: "pointer",
      }}
    >
      {/* Background ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 50%, oklch(0.85 0.14 78 / 0.18), oklch(0.79 0.12 84 / 0.08) 50%, transparent 75%)",
          animation: "glow-pulse 4s ease-in-out infinite",
        }}
      />

      {/* Floating gold particles */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}
      >
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              bottom: "-8px",
              left: `${5 + i * 5.5}%`,
              width: "3px",
              height: "3px",
              borderRadius: "50%",
              background: "oklch(0.79 0.12 84)",
              boxShadow: "0 0 6px oklch(0.79 0.12 84)",
              animation: `float-up linear infinite`,
              animationDuration: `${3.5 + (i % 5) * 0.8}s`,
              animationDelay: `${(i * 0.3) % 3}s`,
            }}
          />
        ))}
      </div>

      {/* Tejas (Divine Glow) rings — appear after drawing */}
      {phase === "tejas" || phase === "exiting" ? (
        <div
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        >
          {/* Outer ring */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "420px",
              height: "420px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, oklch(0.85 0.18 84 / 0.55) 0%, oklch(0.79 0.14 84 / 0.25) 40%, transparent 70%)",
              animation: "tejas-glow 1.2s ease-out forwards",
            }}
          />
          {/* Inner bright core */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "220px",
              height: "220px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, oklch(0.97 0.08 84 / 0.9) 0%, oklch(0.85 0.18 84 / 0.5) 50%, transparent 75%)",
              animation: "tejas-inner 1s ease-out 0.1s forwards",
            }}
          />
          {/* Ray spokes */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "2px",
                height: "180px",
                background:
                  "linear-gradient(to bottom, oklch(0.85 0.18 84 / 0.7), transparent)",
                transformOrigin: "50% 0%",
                transform: `translateX(-50%) rotate(${i * 30}deg)`,
                animation: "tejas-glow 1.2s ease-out forwards",
                animationDelay: `${i * 0.04}s`,
              }}
            />
          ))}
        </div>
      ) : null}

      {/* SVG Ganesha Sketch */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          animation: "sketch-fade-in 0.4s ease-out both",
        }}
      >
        <GaneshaSVG drawing={phase === "drawing"} />
      </div>

      {/* Sacred text below */}
      <p
        style={{
          position: "relative",
          zIndex: 1,
          marginTop: "28px",
          color: "oklch(0.79 0.12 84)",
          fontFamily: "var(--font-display)",
          fontSize: "1.1rem",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          animation: "rise-in 0.6s ease-out both 0.5s",
          opacity: 0,
        }}
      >
        🙏 Jai Shri Ganesha 🙏
      </p>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .ganesha-path { animation: none !important; stroke-dashoffset: 0 !important; }
        }
      `}</style>
    </div>
  );
}

/** The actual SVG Ganesha line-art silhouette */
function GaneshaSVG({ drawing }: { drawing: boolean }) {
  // Path length approx values — SVG uses stroke-dasharray equal to path length
  const animStyle = (length: number, delay: number, dur = 2.0) =>
    drawing
      ? ({
          strokeDasharray: length,
          strokeDashoffset: length,
          animation: `sketch-draw ${dur}s ease-out both`,
          animationDelay: `${delay}s`,
        } as React.CSSProperties)
      : ({
          strokeDasharray: length,
          strokeDashoffset: 0,
        } as React.CSSProperties);

  const gold = "oklch(0.79 0.12 84)";
  const saffron = "oklch(0.72 0.17 62)";
  const cream = "oklch(0.97 0.02 86 / 0.85)";

  return (
    <svg
      width="240"
      height="280"
      viewBox="0 0 240 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Lord Ganesha silhouette"
      className="ganesha-sketch-svg"
    >
      {/* ── Crown / Mukut ── */}
      {/* Crown base arch */}
      <path
        d="M85 60 Q95 30 120 25 Q145 30 155 60"
        stroke={gold}
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        className="ganesha-path"
        style={animStyle(130, 0, 1.2)}
      />
      {/* Crown jewels - three points */}
      <path
        d="M95 50 L90 30 L100 40 M120 45 L120 20 M145 50 L150 30 L140 40"
        stroke={gold}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        className="ganesha-path"
        style={animStyle(100, 0.2, 1.0)}
      />
      {/* Crown center gem */}
      <circle cx="120" cy="22" r="4" stroke={gold} strokeWidth="1.5" fill="none"
        className="ganesha-path" style={animStyle(30, 0.3, 0.5)} />

      {/* ── Head (large rounded elephant head) ── */}
      <path
        d="M78 65 Q65 70 60 90 Q55 115 60 135 Q65 155 80 165 Q95 175 120 176 Q145 175 160 165 Q175 155 180 135 Q185 115 180 90 Q175 70 162 65"
        stroke={cream}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        className="ganesha-path"
        style={animStyle(380, 0.4, 1.6)}
      />

      {/* ── Eyes ── */}
      {/* Left eye */}
      <ellipse cx="98" cy="105" rx="8" ry="6" stroke={gold} strokeWidth="1.5" fill="none"
        className="ganesha-path" style={animStyle(50, 1.2, 0.5)} />
      <circle cx="100" cy="106" r="2.5" stroke={gold} strokeWidth="1.2" fill="none"
        className="ganesha-path" style={animStyle(18, 1.3, 0.4)} />
      {/* Right eye */}
      <ellipse cx="142" cy="105" rx="8" ry="6" stroke={gold} strokeWidth="1.5" fill="none"
        className="ganesha-path" style={animStyle(50, 1.2, 0.5)} />
      <circle cx="144" cy="106" r="2.5" stroke={gold} strokeWidth="1.2" fill="none"
        className="ganesha-path" style={animStyle(18, 1.3, 0.4)} />
      {/* Third eye dot (tilak) */}
      <circle cx="120" cy="95" r="3" stroke={saffron} strokeWidth="1.5" fill="none"
        className="ganesha-path" style={animStyle(20, 1.4, 0.4)} />

      {/* ── Trunk (curved to the left — auspicious) ── */}
      <path
        d="M108 135 Q100 148 92 158 Q84 170 90 180 Q96 192 110 188 Q122 184 120 172"
        stroke={cream}
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
        className="ganesha-path"
        style={animStyle(160, 1.5, 1.0)}
      />
      {/* Trunk tip curl */}
      <path
        d="M120 172 Q124 160 118 158 Q112 156 110 162"
        stroke={cream}
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        className="ganesha-path"
        style={animStyle(60, 2.1, 0.5)}
      />

      {/* ── Large ears ── */}
      {/* Left ear */}
      <path
        d="M68 90 Q40 88 32 110 Q25 132 40 148 Q55 165 72 155"
        stroke={cream}
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        className="ganesha-path"
        style={animStyle(170, 0.6, 1.2)}
      />
      {/* Left ear inner detail */}
      <path
        d="M65 100 Q48 102 44 118 Q41 134 52 144"
        stroke={gold}
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        className="ganesha-path"
        style={animStyle(100, 0.8, 0.9)}
      />
      {/* Right ear */}
      <path
        d="M172 90 Q200 88 208 110 Q215 132 200 148 Q185 165 168 155"
        stroke={cream}
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        className="ganesha-path"
        style={animStyle(170, 0.6, 1.2)}
      />
      {/* Right ear inner */}
      <path
        d="M175 100 Q192 102 196 118 Q199 134 188 144"
        stroke={gold}
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        className="ganesha-path"
        style={animStyle(100, 0.8, 0.9)}
      />

      {/* ── Body (rounded, seated position) ── */}
      <path
        d="M80 170 Q65 185 62 210 Q60 235 80 250 Q100 260 120 261 Q140 260 160 250 Q180 235 178 210 Q176 185 160 170"
        stroke={cream}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        className="ganesha-path"
        style={animStyle(340, 1.7, 1.3)}
      />

      {/* ── Necklace / Haar ── */}
      <path
        d="M90 178 Q105 190 120 192 Q135 190 150 178"
        stroke={gold}
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
        className="ganesha-path"
        style={animStyle(90, 1.9, 0.6)}
      />
      {/* Necklace pendant */}
      <circle cx="120" cy="196" r="4" stroke={gold} strokeWidth="1.2" fill="none"
        className="ganesha-path" style={animStyle(28, 2.1, 0.4)} />

      {/* ── Arms ── */}
      {/* Left arm holding modak */}
      <path
        d="M75 195 Q55 200 48 220 Q44 235 55 242"
        stroke={cream}
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        className="ganesha-path"
        style={animStyle(120, 1.8, 0.8)}
      />
      {/* Modak (sweet) */}
      <path
        d="M50 240 Q44 230 46 222 Q52 218 58 224 Q62 232 55 242 Z"
        stroke={gold}
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
        className="ganesha-path"
        style={animStyle(80, 2.2, 0.6)}
      />
      {/* Right arm (blessing gesture) */}
      <path
        d="M165 195 Q185 200 192 220 Q196 235 185 242"
        stroke={cream}
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        className="ganesha-path"
        style={animStyle(120, 1.8, 0.8)}
      />
      {/* Abhaya mudra fingers */}
      <path
        d="M184 240 L185 250 M188 238 L190 248 M192 237 L193 246"
        stroke={cream}
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        className="ganesha-path"
        style={animStyle(60, 2.4, 0.5)}
      />

      {/* ── Lotus seat base ── */}
      <path
        d="M75 258 Q88 268 120 271 Q152 268 165 258"
        stroke={saffron}
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
        className="ganesha-path"
        style={animStyle(130, 2.0, 0.8)}
      />
      {/* Lotus petals base */}
      {[85, 100, 120, 140, 155].map((x, i) => (
        <path
          key={x}
          d={`M${x} 258 Q${x - 4} 270 ${x} 276 Q${x + 4} 270 ${x + 8} 258`}
          stroke={saffron}
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          className="ganesha-path"
          style={animStyle(40, 2.2 + i * 0.07, 0.5)}
        />
      ))}

      {/* ── Om symbol small ── */}
      <text
        x="120"
        y="230"
        textAnchor="middle"
        fontSize="18"
        fill="none"
        stroke={gold}
        strokeWidth="0.8"
        fontFamily="serif"
        className="ganesha-path"
        style={animStyle(120, 2.0, 0.8)}
      >
        ॐ
      </text>
    </svg>
  );
}
