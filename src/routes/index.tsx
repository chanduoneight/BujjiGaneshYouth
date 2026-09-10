import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/i18n/language";
import { festival, contact } from "@/data/festival";
import ganesh2026 from "@/assets/ganesha-2026.png";
import { FestivalParticles } from "@/components/effects/FestivalParticles";
import { FloatingPetals } from "@/components/effects/FloatingPetals";
import { MandalaGlow } from "@/components/effects/MandalaGlow";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { DurvaHoverCard } from "@/components/effects/DurvaHoverCard";
import { SwingingTrunkDivider } from "@/components/effects/SwingingTrunkDivider";
import { CosmicParticles } from "@/components/effects/CosmicParticles";
import { SacredGeometryOrbs } from "@/components/effects/SacredGeometryOrbs";
import { Countdown } from "@/components/site/Countdown";
import { PageMusicPlayer } from "@/components/site/PageMusicPlayer";
import { Instagram, Youtube } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { b, t } = useLang();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Homepage Music Player */}
      <PageMusicPlayer audioSrc="/audio/ganesh-aarti.mp3" />
      
      {/* Global festival particles */}
      <FestivalParticles count={isMobile ? 12 : 25} />

      {/* Hero Section */}
      <section className="gradient-maroon text-maroon-foreground mandala-bg relative overflow-hidden">
        <MandalaGlow direction="normal" duration={50} opacity={0.8} />
        {/* Cosmic golden dust particles — Brahmanda universe effect */}
        <CosmicParticles count={isMobile ? 80 : 200} />
        {/* Sacred geometry symbols floating in background */}
        <SacredGeometryOrbs count={isMobile ? 5 : 10} />
        <FloatingPetals count={isMobile ? 4 : 8} />
        <div className="glow-halo animate-halo pointer-events-none absolute inset-0" aria-hidden="true" />
        
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:py-24 text-center">
          {/* Sacred Mantra with shimmer effect */}
          <p 
            className="text-gold text-2xl font-bold tracking-wider mb-4 drop-shadow-[0_0_15px_rgba(234,179,8,0.7)]"
            style={{ animation: "rise-in 0.6s ease-out both 0ms" }}
          >
            <span className="inline-block relative">
              {t("namah")}
              <span 
                className="absolute inset-0 animate-shimmer" 
                style={{ 
                  background: "linear-gradient(90deg, transparent 0%, oklch(1 0 0 / 0.4) 50%, transparent 100%)",
                  backgroundSize: "200% 100%",
                }}
              />
            </span>
          </p>
          
          {/* Committee Branding */}
          <h1 
            className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold mb-3 text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] tracking-wide"
            style={{ animation: "rise-in 0.6s ease-out both 0.15s, breathing 5s ease-in-out infinite 0.6s" }}
          >
            {b(festival.committeeTitle)}
          </h1>
          <h2 
            className="font-display text-2xl sm:text-3xl md:text-4xl mb-6 text-gold font-bold drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] tracking-wide"
            style={{ animation: "rise-in 0.6s ease-out both 0.3s" }}
          >
            {b(festival.committeeName)}
          </h2>
          
          {/* Welcome Message */}
          <p 
            className="text-xl sm:text-2xl font-semibold mb-3 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"
            style={{ animation: "rise-in 0.6s ease-out both 0.45s" }}
          >
            {t("heroHeadline")}
          </p>
          <p 
            className="text-white/95 text-base sm:text-lg max-w-3xl mx-auto mb-8 font-medium drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]"
            style={{ animation: "rise-in 0.6s ease-out both 0.6s" }}
          >
            {t("heroSupport")}
          </p>
          
          {/* CTA Button - Gallery only */}
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            style={{ animation: "rise-in 0.6s ease-out both 0.75s" }}
          >
            <a
              href="/gallery"
              className="gradient-saffron text-primary-foreground px-8 py-3 rounded-full font-semibold text-lg transition-all hover:shadow-gold hover:-translate-y-0.5 active:scale-95"
            >
              {t("ctaGallery")}
            </a>
          </div>
        </div>
      </section>

      {/* Swinging Trunk Divider — between Hero & Countdown */}
      <div className="bg-background pt-6 pb-2">
        <SwingingTrunkDivider variant="gold" />
      </div>

      {/* Countdown Section */}
      <section className="bg-background pt-4 pb-12">
        <ScrollReveal variant="scale-in">
          <div className="mx-auto max-w-7xl px-4">
            <Countdown />
          </div>
        </ScrollReveal>
      </section>

      {/* 2026 Lord Ganesha Idol Section with Divine Aura */}
      <section className="bg-cream/40 py-16 relative overflow-hidden">
        {/* Floating petals around the idol */}
        <FloatingPetals count={8} />

        <ScrollReveal variant="scale-in">
          <div className="mx-auto max-w-4xl px-4">
            <div className="surface-card rounded-3xl p-6 sm:p-10 relative overflow-hidden border border-gold/30 shadow-2xl flex flex-col items-center text-center">
              
              {/* Year & Blessing Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-maroon/90 text-gold border border-gold/40 text-xs sm:text-sm font-bold tracking-wider mb-6 shadow-md">
                <span>🕉️</span>
                <span>{b({ en: "Lord Ganesha Divine Darshan 2026", te: "శ్రీ వినాయక స్వామి దివ్య దర్శనం 2026" })}</span>
              </div>

              {/* Centerpiece Idol with Radiant Aura */}
              <div className="relative w-full flex flex-col items-center justify-center my-2">
                {/* Divine pulsating golden halo behind idol */}
                <div 
                  className="absolute w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] rounded-full -z-10 pointer-events-none"
                  style={{
                    background: "radial-gradient(circle, rgba(245, 166, 35, 0.45) 0%, rgba(234, 179, 8, 0.22) 45%, rgba(133, 56, 5, 0.08) 65%, transparent 75%)",
                    animation: "glow-pulse 6s ease-in-out infinite",
                  }}
                />

                {/* Concentric subtle mandala halo */}
                <div 
                  className="absolute w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] rounded-full border border-gold/30 -z-10 animate-spin-slow pointer-events-none"
                  style={{ animationDuration: "60s" }}
                />

                {/* 2026 Cutout Idol Image */}
                <img 
                  src={ganesh2026} 
                  alt="Lord Ganesha Idol 2026 - Bujji Ganesh Youth" 
                  className="max-h-[420px] sm:max-h-[580px] w-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:scale-105 select-none"
                />

                {/* Golden Pedestal Base Light */}
                <div className="w-2/3 h-6 bg-radial from-gold/50 via-gold/15 to-transparent blur-md rounded-full -mt-2 -z-10" />
              </div>

              {/* Devotional Salutation Below Idol */}
              <div className="mt-6 pt-4 border-t border-gold/20 w-full max-w-lg">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-maroon">
                  {b({ en: "Bujji Ganesh Youth — 2026 Idol Sthapana", te: "బుజ్జి గణేష్ యూత్ — 2026 వినాయక ప్రతిష్ట" })}
                </h3>
                <p className="text-muted-foreground text-sm mt-1 font-medium">
                  {b({ en: "Community Hall, Srungarapuram", te: "కమ్యూనిటీ హాల్, శృంగారపురం" })}
                </p>
                <div className="mt-3">
                  <a
                    href="/gallery"
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-maroon hover:text-gold transition-colors"
                  >
                    <span>📸</span>
                    <span>{b({ en: "View All Yearly Idols in Gallery →", te: "గ్యాలరీలో అన్ని విగ్రహాలను చూడండి →" })}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Festival Info Section */}
      <section className="bg-background py-16 relative">
        <div className="mx-auto max-w-7xl px-4">
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-maroon mb-4">
                {b(festival.festivalName)} {festival.year}
              </h2>
              <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
                {b(festival.description)}
              </p>
            </div>
          </ScrollReveal>

          {/* Festival Stats with staggered reveal + Durva hover */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScrollReveal variant="scale-in" delay={0}>
              <DurvaHoverCard className="surface-card p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">{festival.totalDays}</div>
                <div className="text-muted-foreground">{t("days")} {t("culturalPrograms")}</div>
              </DurvaHoverCard>
            </ScrollReveal>
            
            <ScrollReveal variant="scale-in" delay={120}>
              <DurvaHoverCard className="surface-card p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">🎭</div>
                <div className="text-muted-foreground">{t("culturalPrograms")}</div>
              </DurvaHoverCard>
            </ScrollReveal>
            
            <ScrollReveal variant="scale-in" delay={240}>
              <DurvaHoverCard className="surface-card p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">🎉</div>
                <div className="text-muted-foreground">{t("events")}</div>
              </DurvaHoverCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Bappa Morya Section - Most devotional */}
      <section className="gradient-maroon text-maroon-foreground py-16 text-center relative overflow-hidden">
        <MandalaGlow direction="reverse" duration={60} opacity={0.8} />
        {/* Sacred geometry orbs floating around mantra */}
        <SacredGeometryOrbs count={isMobile ? 4 : 8} />
        <div className="relative z-10">
          <p 
            className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-gold drop-shadow-[0_0_20px_rgba(234,179,8,0.85)] tracking-wide"
            style={{ animation: "breathing 5s ease-in-out infinite" }}
          >
            {t("bappaMorya")}
          </p>
        </div>
      </section>

      {/* Swinging Trunk Divider — before Quick Links */}
      <div className="bg-cream pt-8 pb-2">
        <SwingingTrunkDivider variant="saffron" />
      </div>

      {/* Quick Links Section */}
      <section className="bg-cream pb-16 pt-4">
        <div className="mx-auto max-w-7xl px-4">
          <ScrollReveal variant="fade-up">
            <h2 className="font-display text-3xl font-bold text-center text-maroon mb-8">
              {t("quickLinks")}
            </h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { href: "/events", icon: "🎪", title: t("events"), desc: t("events") },
              { href: "/gallery", icon: "📸", title: t("gallery"), desc: t("gallery") },
              { href: "/committee", icon: "👥", title: t("committee"), desc: t("meetCommittee") },
              { href: "/contact", icon: "📞", title: t("contact"), desc: t("contactTitle") },
            ].map((link, i) => (
              <ScrollReveal key={link.href} variant="scale-in" delay={i * 100}>
                <DurvaHoverCard className="surface-card block" bladeCount={11}>
                  <a
                    href={link.href}
                    className="p-6 text-center group block"
                  >
                    <div className="text-4xl mb-3 transition-transform group-hover:-translate-y-1">
                      {link.icon}
                    </div>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{link.desc}</p>
                  </a>
                </DurvaHoverCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
