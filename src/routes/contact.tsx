import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/i18n/language";
import { contact } from "@/data/festival";
import { Instagram, Youtube, MapPin } from "lucide-react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { FestivalParticles } from "@/components/effects/FestivalParticles";
import { MandalaGlow } from "@/components/effects/MandalaGlow";
import { SacredGeometryOrbs } from "@/components/effects/SacredGeometryOrbs";
import { CosmicParticles } from "@/components/effects/CosmicParticles";

export const Route = createFileRoute("/contact")({
  component: Contact,
});

function Contact() {
  const { t, b } = useLang();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FestivalParticles count={15} />

      {/* Hero Section */}
      <section className="bg-maroon/90 backdrop-blur-md text-maroon-foreground py-20 relative overflow-hidden border-b border-gold/20">
        <MandalaGlow direction="normal" duration={50} opacity={0.8} />
        <CosmicParticles count={100} />
        <SacredGeometryOrbs count={8} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center">
          <p className="text-gold text-2xl font-bold tracking-wider mb-4 drop-shadow-[0_0_15px_rgba(234,179,8,0.7)]">
            {t("namah")}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] tracking-wide">
            {t("contactTitle")}
          </h1>
          <p className="text-white/95 text-lg sm:text-xl max-w-2xl mx-auto font-medium drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
            {t("getInTouch")}
          </p>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Address Card */}
            <ScrollReveal variant="scale-in" delay={0}>
              <div className="surface-card p-8 h-full">
                <div className="text-center mb-6">
                  <MapPin className="h-12 w-12 mx-auto text-primary mb-4" />
                  <h3 className="font-display text-2xl font-semibold text-maroon mb-2">
                    {t("contactLocation")}
                  </h3>
                </div>
                <p className="text-center text-muted-foreground text-lg mb-6">
                  {b(contact.address)}
                </p>
                <div className="flex justify-center">
                  <a
                    href={contact.mapsUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="gradient-saffron text-primary-foreground px-8 py-3 rounded-full font-semibold transition-all hover:shadow-gold hover:-translate-y-0.5 active:scale-95"
                  >
                    {t("directions")}
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* Social Media Card */}
            <ScrollReveal variant="scale-in" delay={120}>
              <div className="surface-card p-8 h-full">
                <div className="text-center mb-6">
                  <div className="text-5xl mb-4">🌐</div>
                  <h3 className="font-display text-2xl font-semibold text-maroon mb-2">
                    {t("followUs")}
                  </h3>
                </div>
                <p className="text-center text-muted-foreground text-lg mb-6">
                  {t("stayConnected")}
                </p>
                <div className="flex flex-col gap-4">
                  <a
                    href={contact.instagram}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center justify-center gap-3 px-8 py-3 rounded-full font-semibold text-lg transition-all hover:-translate-y-0.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg"
                  >
                    <Instagram className="h-6 w-6" />
                    Instagram
                  </a>
                  <a
                    href={contact.youtube}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center justify-center gap-3 px-8 py-3 rounded-full font-semibold text-lg transition-all hover:-translate-y-0.5 bg-red-600 text-white hover:shadow-lg"
                  >
                    <Youtube className="h-6 w-6" />
                    YouTube
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Map or Additional Info Section */}
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-7xl px-4">
          <ScrollReveal variant="fade-up">
            <div className="surface-card p-8 text-center">
              <h2 className="font-display text-3xl font-bold text-maroon mb-4">
                {t("visitUsDuringFestival")}
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
                {t("visitUsText")}
              </p>
              <div className="text-gold text-xl font-semibold">
                🙏 {t("bappaMorya")} 🙏
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
