import { useEffect, useRef, useState } from "react";

/**
 * MushakFooterTracker — Component D
 *
 * A small silhouette of Ganesha's sacred mouse vehicle (Mushak / Mooshak)
 * glides subtly across the footer background whenever the footer enters
 * the viewport. Detected via IntersectionObserver — no scroll listeners.
 * Direction alternates on each visit for a playful, living feel.
 */
export function MushakFooterTracker() {
  const [active, setActive] = useState(false);
  const [runCount, setRunCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setRunCount((c) => c + 1);
          setActive(true);
        } else {
          setActive(false);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Alternate direction each time footer is re-entered
  const goesRight = runCount % 2 === 0;
  const animationName = goesRight ? "mushak-glide" : "mushak-glide-back";

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {active && (
        <div
          key={runCount} // re-mount to restart animation each time
          style={{
            position: "absolute",
            bottom: "18px",
            left: 0,
            width: "80px",
            height: "48px",
            animation: `${animationName} 16s linear forwards`,
            willChange: "transform",
          }}
        >
          <MushakSVG />
        </div>
      )}
    </div>
  );
}

/** Mushak (mouse) SVG silhouette — side profile facing right */
function MushakSVG() {
  const color = "oklch(0.97 0.02 86 / 0.9)";
  const accent = "oklch(0.79 0.12 84 / 0.8)";

  return (
    <svg
      width="80"
      height="48"
      viewBox="0 0 80 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Mushak — Ganesha's vehicle"
    >
      {/* ── Body ── */}
      <ellipse cx="36" cy="30" rx="22" ry="14" fill={color} opacity="0.85" />

      {/* ── Head ── */}
      <ellipse cx="60" cy="26" rx="14" ry="11" fill={color} opacity="0.9" />

      {/* ── Snout ── */}
      <ellipse cx="73" cy="28" rx="5" ry="3.5" fill={color} opacity="0.85" />

      {/* ── Ear (left, back) ── */}
      <ellipse
        cx="54"
        cy="15"
        rx="5"
        ry="7"
        fill={color}
        opacity="0.75"
        transform="rotate(-15 54 15)"
      />
      {/* Ear inner */}
      <ellipse
        cx="54"
        cy="15"
        rx="3"
        ry="4.5"
        fill={accent}
        opacity="0.4"
        transform="rotate(-15 54 15)"
      />

      {/* ── Ear (right, front) ── */}
      <ellipse
        cx="63"
        cy="14"
        rx="5"
        ry="7"
        fill={color}
        opacity="0.8"
        transform="rotate(8 63 14)"
      />
      <ellipse
        cx="63"
        cy="14"
        rx="3"
        ry="4.5"
        fill={accent}
        opacity="0.4"
        transform="rotate(8 63 14)"
      />

      {/* ── Eye ── */}
      <circle cx="68" cy="23" r="2" fill="oklch(0.2 0 0 / 0.6)" />
      <circle cx="68.6" cy="22.4" r="0.7" fill="white" opacity="0.7" />

      {/* ── Nose tip ── */}
      <circle cx="77" cy="28" r="1.5" fill={accent} opacity="0.8" />

      {/* ── Whiskers ── */}
      <line x1="72" y1="26" x2="80" y2="24" stroke={color} strokeWidth="0.8" opacity="0.6" />
      <line x1="72" y1="28" x2="80" y2="28" stroke={color} strokeWidth="0.8" opacity="0.6" />
      <line x1="72" y1="30" x2="80" y2="32" stroke={color} strokeWidth="0.8" opacity="0.6" />

      {/* ── Legs (4 simple stubs) ── */}
      <ellipse cx="22" cy="42" rx="5" ry="3" fill={color} opacity="0.7" />
      <ellipse cx="34" cy="43" rx="5" ry="3" fill={color} opacity="0.7" />
      <ellipse cx="46" cy="43" rx="5" ry="3" fill={color} opacity="0.7" />
      <ellipse cx="57" cy="40" rx="5" ry="3" fill={color} opacity="0.7" />

      {/* ── Tail (long curved) ── */}
      <path
        d="M14 30 Q4 22 2 14 Q1 8 6 6 Q10 5 11 10"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      {/* Tail tip curl */}
      <path
        d="M11 10 Q14 7 16 10 Q17 13 14 14"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.65"
      />

      {/* ── Tiny crown on head (Mushak is royal!) ── */}
      <path
        d="M58 14 L56 8 L60 11 L63 6 L66 11 L70 8 L68 14"
        stroke={accent}
        strokeWidth="1.2"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      {/* Crown gem */}
      <circle cx="63" cy="6" r="1.2" fill={accent} opacity="0.7" />
    </svg>
  );
}
