import { festival } from "@/data/festival";
import { useLang } from "@/i18n/language";
import { DivineOmGlow } from "@/components/effects/DivineOmGlow";

export function CommitteeQuote() {
  const { t, b } = useLang();

  return (
    <section className="gradient-maroon text-maroon-foreground mandala-bg relative overflow-hidden rounded-3xl px-6 py-12 text-center shadow-lift border border-gold/30">
      <DivineOmGlow opacity={0.4} size="md" />
      <div className="glow-halo animate-halo pointer-events-none absolute inset-0" aria-hidden="true" />
      <blockquote className="relative mx-auto max-w-2xl z-10">
        <p 
          className="font-display text-xl leading-relaxed sm:text-2xl text-white font-semibold drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
          style={{ animation: "breathing 5s ease-in-out infinite" }}
        >
          "{t("committeeQuote")}"
        </p>
        <footer className="mt-6">
          <p className="text-gold font-display text-xl font-bold drop-shadow-[0_0_10px_rgba(234,179,8,0.7)]">
            {b(festival.committeeTitle)}
          </p>
          <p className="text-white/90 text-base font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">{b(festival.committeeName)}</p>
        </footer>
      </blockquote>
    </section>
  );
}
