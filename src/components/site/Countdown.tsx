import { useEffect, useState } from "react";

import { festival } from "@/data/festival";
import { useLang } from "@/i18n/language";

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return {
    done: ms === 0,
    days: Math.floor(ms / 86400000),
    hours: Math.floor(ms / 3600000) % 24,
    minutes: Math.floor(ms / 60000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
  };
}

export function Countdown() {
  const { t, b } = useLang();
  const target = new Date(festival.startDate).getTime();
  const [state, setState] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    setState(diff(target));
    const id = window.setInterval(() => setState(diff(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const cells = [
    { label: t("days"), value: state?.days },
    { label: t("hours"), value: state?.hours },
    { label: t("minutes"), value: state?.minutes },
    { label: t("seconds"), value: state?.seconds },
  ];

  return (
    <div className="surface-card mandala-bg mx-auto max-w-4xl p-6 text-center shadow-lift sm:p-8 relative overflow-hidden">
      {/* Subtle glow behind countdown */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 50%, oklch(0.79 0.12 84 / 0.15), transparent 70%)",
          animation: "glow-pulse 6s ease-in-out infinite",
        }}
      />
      
      <div className="relative">
        <h2 className="text-maroon font-display text-2xl font-bold sm:text-3xl mb-2">
          {state?.done ? t("festivalBegun") : t("countdownTitle")}
        </h2>
        <p className="text-gold font-semibold text-lg mb-1">
          {b(festival.festivalName)} {festival.year}
        </p>
        
        {!state?.done ? (
          <>
            <div className="mt-6 grid grid-cols-4 gap-3 sm:gap-4">
              {cells.map((cell) => (
                <div
                  key={cell.label}
                  className="gradient-saffron text-primary-foreground rounded-2xl px-2 py-4 shadow-gold transition-all hover:-translate-y-1 hover:shadow-lift sm:py-5"
                >
                  <div className="font-display text-3xl leading-none font-bold tabular-nums sm:text-5xl">
                    {state ? String(cell.value).padStart(2, "0") : "--"}
                  </div>
                  <div className="mt-2 text-xs font-semibold tracking-wide uppercase sm:text-sm">{cell.label}</div>
                </div>
              ))}
            </div>


          </>
        ) : (
          <div className="mt-6">
            <p className="text-xl text-primary font-semibold">
              {b(festival.festivalName)} Festival is now underway! 🎉
            </p>
            <p className="mt-2 text-muted-foreground">
              {festival.totalDays} Days of Devotion, Culture & Community
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
