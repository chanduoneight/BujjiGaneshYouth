import { Instagram, Youtube } from "lucide-react";

import { contact, festival } from "@/data/festival";
import { useLang } from "@/i18n/language";
import { MushakFooterTracker } from "@/components/effects/MushakFooterTracker";
import { MandalaGlow } from "@/components/effects/MandalaGlow";

export function Footer() {
  const { t, b } = useLang();

  return (
    <footer className="gradient-maroon text-maroon-foreground mandala-bg mt-16 pb-24 lg:pb-0 relative overflow-hidden border-t border-gold/30">
      {/* Mushak vehicle glides across the footer background on scroll */}
      <MushakFooterTracker />
      <MandalaGlow direction="normal" duration={60} opacity={0.65} />
      <div className="mx-auto max-w-6xl px-4 py-12 relative z-10">
        <div className="text-center">
          <p className="text-gold text-xl font-bold drop-shadow-[0_0_12px_rgba(234,179,8,0.7)]">🙏 {t("bappaMorya")} 🙏</p>
          <h2 className="font-display mt-3 text-3xl font-extrabold sm:text-4xl text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            {b(festival.committeeTitle)}
          </h2>
          <p className="text-gold font-display text-xl sm:text-2xl font-bold mt-1 drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
            {b(festival.committeeName)}
          </p>
          <p className="text-white/90 mx-auto mt-3 max-w-md text-base font-medium drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]">
            {t("footerTagline")}
          </p>
        </div>

        <div className="mt-10 flex justify-center gap-4">
          {[
            { href: contact.instagram, Icon: Instagram, label: "Instagram" },
            { href: contact.youtube, Icon: Youtube, label: "YouTube" },
          ].map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={label}
              className="border-gold/40 text-gold hover:bg-gold hover:text-gold-foreground inline-flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all hover:scale-110 hover:shadow-gold"
            >
              <Icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>

        <div className="border-gold/25 text-maroon-foreground/70 mt-10 border-t pt-6 text-center text-xs">
          <p>
            © {festival.year} {b(festival.committeeTitle)} — {b(festival.committeeName)}. All
            Rights Reserved.
          </p>
          <p className="mt-1">{t("madeWith")}</p>
        </div>
      </div>
    </footer>
  );
}
