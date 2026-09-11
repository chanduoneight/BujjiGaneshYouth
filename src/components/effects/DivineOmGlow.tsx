/**
 * DivineOmGlow
 *
 * Clean, elegant glowing Om (ॐ) emblem with a soft pulsating golden radial halo,
 * without complex spinning geometric orbits.
 */
export function DivineOmGlow({
  opacity = 0.4,
  size = "md",
  className = "",
}: {
  opacity?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizeClasses = {
    sm: "w-20 h-20 text-4xl sm:w-24 sm:h-24 sm:text-5xl",
    md: "w-24 h-24 text-5xl sm:w-28 sm:h-28 sm:text-6xl",
    lg: "w-28 h-28 text-5xl sm:w-36 sm:h-36 sm:text-7xl",
  };

  const auraSizes = {
    sm: "w-[350px] sm:w-[450px] h-[350px] sm:h-[450px]",
    md: "w-[450px] sm:w-[600px] h-[450px] sm:h-[600px]",
    lg: "w-[550px] sm:w-[750px] h-[550px] sm:h-[750px]",
  };

  return (
    <div
      className={`pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Central Golden Radial Halo / Aura */}
      <div
        className={`absolute ${auraSizes[size]} rounded-full blur-3xl pointer-events-none`}
        style={{
          background:
            "radial-gradient(circle at 50% 50%, oklch(0.85 0.16 85 / 0.35) 0%, oklch(0.72 0.18 55 / 0.2) 45%, transparent 70%)",
          animation: "glow-pulse 5s ease-in-out infinite",
        }}
      />

      {/* Central Divine Symbol: Glowing ॐ emblem */}
      <div
        className={`relative flex items-center justify-center ${sizeClasses[size]} rounded-full bg-maroon/80 border-2 border-gold/80 text-gold font-bold animate-pulse shadow-glow`}
        style={{
          opacity,
          boxShadow:
            "0 0 40px oklch(0.85 0.16 85 / 0.6), inset 0 0 20px oklch(0.85 0.16 85 / 0.4)",
        }}
      >
        ॐ
      </div>
    </div>
  );
}
