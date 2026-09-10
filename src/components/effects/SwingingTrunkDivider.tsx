/**
 * SwingingTrunkDivider — Component C
 *
 * Organic section divider with a royal crown center-piece
 * that pendulums gently, flanked by lotus-trunk flourishes
 * that sway in opposite directions. Slow, life-giving CSS transforms.
 */
export function SwingingTrunkDivider({
  className = "",
  variant = "gold",
}: {
  className?: string;
  /** "gold" uses gold tones; "saffron" uses saffron/orange tones */
  variant?: "gold" | "saffron";
}) {
  const primary =
    variant === "saffron" ? "oklch(0.72 0.17 62)" : "oklch(0.79 0.12 84)";
  const secondary =
    variant === "saffron" ? "oklch(0.60 0.19 50)" : "oklch(0.68 0.14 80)";
  const faint =
    variant === "saffron"
      ? "oklch(0.72 0.17 62 / 0.35)"
      : "oklch(0.79 0.12 84 / 0.35)";

  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0",
        width: "100%",
        padding: "4px 0",
        userSelect: "none",
      }}
    >
      <svg
        width="100%"
        height="56"
        viewBox="0 0 600 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ maxWidth: "640px", overflow: "visible" }}
      >
        {/* ── Left horizontal rule ── */}
        <line
          x1="0"
          y1="28"
          x2="195"
          y2="28"
          stroke={faint}
          strokeWidth="1"
        />
        {/* Left dot accent series */}
        <circle cx="200" cy="28" r="2" fill={secondary} opacity="0.6" />
        <circle cx="210" cy="28" r="1.5" fill={secondary} opacity="0.45" />
        <circle cx="218" cy="28" r="1" fill={secondary} opacity="0.3" />

        {/* ── Left Lotus-Trunk flourish (sways left) ── */}
        <g
          style={{
            transformOrigin: "235px 36px",
            animation: "lotus-sway-left 7s ease-in-out infinite",
          }}
        >
          {/* Stem */}
          <path
            d="M235 36 Q230 28 228 20"
            stroke={primary}
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />
          {/* Leaf left */}
          <path
            d="M230 26 Q222 20 220 14 Q226 14 230 20"
            stroke={primary}
            strokeWidth="1.2"
            strokeLinecap="round"
            fill={`${primary.replace(")", " / 0.15)")}`}
            opacity="0.75"
          />
          {/* Lotus bud */}
          <ellipse
            cx="228"
            cy="17"
            rx="4"
            ry="5"
            stroke={primary}
            strokeWidth="1.2"
            fill={`${primary.replace(")", " / 0.2)")}`}
            opacity="0.8"
          />
          <path
            d="M224 17 Q228 12 232 17"
            stroke={primary}
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />
          {/* Trunk curl */}
          <path
            d="M235 36 Q240 42 238 48 Q234 52 230 50 Q226 48 228 44"
            stroke={secondary}
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
            opacity="0.65"
          />
        </g>

        {/* ── Center Crown (pendulum swing) ── */}
        <g
          style={{
            transformOrigin: "300px 12px",
            animation: "trunk-swing 6s ease-in-out infinite",
          }}
        >
          {/* Crown base */}
          <path
            d="M272 38 L272 30 Q300 24 328 30 L328 38 Z"
            stroke={primary}
            strokeWidth="1.5"
            fill={`${primary.replace(")", " / 0.12)")}`}
            opacity="0.9"
          />
          {/* Crown left point */}
          <path
            d="M272 30 L265 10 L280 22"
            stroke={primary}
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            fill="none"
            opacity="0.9"
          />
          {/* Crown center point (tallest) */}
          <path
            d="M292 26 L300 4 L308 26"
            stroke={primary}
            strokeWidth="1.6"
            strokeLinejoin="round"
            strokeLinecap="round"
            fill="none"
            opacity="0.95"
          />
          {/* Crown right point */}
          <path
            d="M328 30 L335 10 L320 22"
            stroke={primary}
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            fill="none"
            opacity="0.9"
          />
          {/* Crown gems */}
          <circle cx="280" cy="22" r="2.5" fill={primary} opacity="0.7" />
          <circle cx="300" cy="4" r="3" fill={primary} opacity="0.85" />
          <circle cx="320" cy="22" r="2.5" fill={primary} opacity="0.7" />
          {/* Crown base ornaments */}
          <circle cx="282" cy="34" r="2" fill={secondary} opacity="0.55" />
          <circle cx="300" cy="32" r="2.5" fill={secondary} opacity="0.7" />
          <circle cx="318" cy="34" r="2" fill={secondary} opacity="0.55" />
          {/* Glow dot on center gem */}
          <circle cx="300" cy="4" r="1.2" fill="white" opacity="0.6" />
        </g>

        {/* ── Right Lotus-Trunk flourish (sways right) ── */}
        <g
          style={{
            transformOrigin: "365px 36px",
            animation: "lotus-sway-right 7s ease-in-out infinite",
          }}
        >
          {/* Stem */}
          <path
            d="M365 36 Q370 28 372 20"
            stroke={primary}
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />
          {/* Leaf right */}
          <path
            d="M370 26 Q378 20 380 14 Q374 14 370 20"
            stroke={primary}
            strokeWidth="1.2"
            strokeLinecap="round"
            fill={`${primary.replace(")", " / 0.15)")}`}
            opacity="0.75"
          />
          {/* Lotus bud */}
          <ellipse
            cx="372"
            cy="17"
            rx="4"
            ry="5"
            stroke={primary}
            strokeWidth="1.2"
            fill={`${primary.replace(")", " / 0.2)")}`}
            opacity="0.8"
          />
          <path
            d="M368 17 Q372 12 376 17"
            stroke={primary}
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />
          {/* Trunk curl (mirrored) */}
          <path
            d="M365 36 Q360 42 362 48 Q366 52 370 50 Q374 48 372 44"
            stroke={secondary}
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
            opacity="0.65"
          />
        </g>

        {/* Right dot accent series */}
        <circle cx="382" cy="28" r="1" fill={secondary} opacity="0.3" />
        <circle cx="390" cy="28" r="1.5" fill={secondary} opacity="0.45" />
        <circle cx="400" cy="28" r="2" fill={secondary} opacity="0.6" />

        {/* ── Right horizontal rule ── */}
        <line
          x1="405"
          y1="28"
          x2="600"
          y2="28"
          stroke={faint}
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
