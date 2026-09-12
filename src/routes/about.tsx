import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/i18n/language";
import { festival } from "@/data/festival";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { FestivalParticles } from "@/components/effects/FestivalParticles";
import { DivineOmGlow } from "@/components/effects/DivineOmGlow";
import { PageMusicPlayer } from "@/components/site/PageMusicPlayer";
import { Sparkles, Heart, Users, Flame, Calendar, Award, Sun } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  const { t, b } = useLang();

  const historyMilestones = [
    {
      year: t("historyEra1Year"),
      title: t("historyEra1Title"),
      desc: t("historyEra1Desc"),
      icon: "🪔",
      badge: "2007 Inception",
    },
    {
      year: t("historyEra2Year"),
      title: t("historyEra2Title"),
      desc: t("historyEra2Desc"),
      icon: "🍲",
      badge: "Annadanam & Growth",
    },
    {
      year: t("historyEra3Year"),
      title: t("historyEra3Title"),
      desc: t("historyEra3Desc"),
      icon: "🥁",
      badge: "Youth Energy",
    },
    {
      year: t("historyEra4Year"),
      title: t("historyEra4Title"),
      desc: t("historyEra4Desc"),
      icon: "🕉️",
      badge: "19+ Years Divine Grace",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* About Page Music Player — Ekadantaya Vakratundaya Flute */}
      <PageMusicPlayer audioSrc="/audio/flute.mp3" />
      
      <FestivalParticles count={20} />

      {/* Hero Section */}
      <section className="bg-maroon/90 backdrop-blur-md text-maroon-foreground py-20 relative overflow-hidden border-b border-gold/20">
        <DivineOmGlow opacity={0.35} size="lg" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/30 text-gold text-sm font-semibold mb-4 tracking-wide shadow-sm">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            <span>2007 – 2026 • 19+ Years of Divine Celebrations</span>
          </div>
          <p className="text-gold text-2xl font-bold tracking-wider mb-4 drop-shadow-[0_0_15px_rgba(234,179,8,0.7)]">
            {t("namah")}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] tracking-wide">
            {t("aboutPageTitle")}
          </h1>
          <p className="text-white/95 text-lg sm:text-xl max-w-3xl mx-auto font-medium drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
            {t("aboutPageSubtitle")}
          </p>

          {/* Quick Key Facts Banner */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-black/30 backdrop-blur-md border border-gold/30 rounded-xl p-4 text-center">
              <p className="text-2xl sm:text-3xl font-bold text-gold font-display">{t("statYears")}</p>
              <p className="text-xs sm:text-sm text-white/80 mt-1">{t("statYearsLabel")}</p>
            </div>
            <div className="bg-black/30 backdrop-blur-md border border-gold/30 rounded-xl p-4 text-center">
              <p className="text-base sm:text-lg font-bold text-white font-display line-clamp-1">{t("statVenue")}</p>
              <p className="text-xs sm:text-sm text-gold/90 mt-1">{t("statVenueLabel")}</p>
            </div>
            <div className="bg-black/30 backdrop-blur-md border border-gold/30 rounded-xl p-4 text-center">
              <p className="text-base sm:text-lg font-bold text-gold font-display line-clamp-1">{t("statOrganizers")}</p>
              <p className="text-xs sm:text-sm text-white/80 mt-1">{t("statOrganizersLabel")}</p>
            </div>
            <div className="bg-black/30 backdrop-blur-md border border-gold/30 rounded-xl p-4 text-center">
              <p className="text-2xl sm:text-3xl font-bold text-gold font-display">{t("statBlessings")}</p>
              <p className="text-xs sm:text-sm text-white/80 mt-1">{t("statBlessingsLabel")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sacred History & Legacy Timeline Section (2007 - 2026) */}
      <section className="bg-transparent py-16 relative z-10">
        <div className="mx-auto max-w-5xl px-4">
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-3">
                <Calendar className="w-4 h-4" />
                <span>2007 – 2026</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-maroon mb-4">
                {t("srpHistoryTitle")}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {t("srpHistorySubtitle")}
              </p>
              <p className="text-base text-foreground/80 max-w-3xl mx-auto mt-3 italic">
                "{t("srpHistoryIntro")}"
              </p>
            </div>
          </ScrollReveal>

          {/* Timeline Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {historyMilestones.map((item, index) => (
              <ScrollReveal key={item.year} variant="fade-up" delay={index * 100}>
                <div className="glass-card p-6 sm:p-8 relative overflow-hidden h-full border border-gold/20 hover:border-gold/60 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col items-center text-center">
                  <div className="flex flex-col items-center gap-3 mb-4">
                    <span className="text-3xl p-3 rounded-2xl bg-gold/10 border border-gold/20 inline-flex items-center justify-center">
                      {item.icon}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                      {item.badge}
                    </span>
                    <h3 className="font-display text-2xl font-bold text-maroon">
                      {item.year} • {item.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-base max-w-md mx-auto">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Sacred Venue Feature Card: Community Hall, Srungarapuram */}
          <ScrollReveal variant="fade-up">
            <div className="glass-card p-8 sm:p-10 border-2 border-gold/40 relative overflow-hidden bg-gradient-to-br from-amber-500/10 via-background/80 to-red-500/10 shadow-lg text-center">
              <div className="absolute -right-6 -bottom-6 text-9xl opacity-10 select-none pointer-events-none">
                🏛️
              </div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="flex flex-col items-center gap-2 mb-4">
                  <div className="p-3.5 rounded-2xl bg-primary text-primary-foreground shadow-md inline-flex items-center justify-center mb-1">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <span className="text-xs uppercase tracking-wider text-primary font-bold">{t("venueSublabel")}</span>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-maroon">
                    {t("venueCardTitle")}
                  </h3>
                </div>
                <p className="text-base sm:text-lg text-foreground/80 leading-relaxed max-w-2xl mx-auto">
                  {t("venueCardDesc")}
                </p>
                <div className="mt-6 pt-5 border-t border-border/60 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground w-full">
                  <div className="flex items-center justify-center gap-1.5">
                    <Sun className="w-4 h-4 text-gold" />
                    <span><strong>19+</strong> Continuous Annual Celebrations</span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5">
                    <Award className="w-4 h-4 text-gold" />
                    <span>Organized with Devotion by <strong>SRP Committee Kurrollu</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Why We Celebrate Section */}
      <section className="bg-transparent py-16 relative z-10">
        <div className="mx-auto max-w-4xl px-4">
          <ScrollReveal variant="fade-up">
            <div className="glass-card p-8 sm:p-12 relative overflow-hidden text-center">
              <div 
                className="absolute top-0 right-0 text-9xl opacity-5 pointer-events-none"
                style={{ lineHeight: 1 }}
              >
                🌺
              </div>
              <div className="relative flex flex-col items-center">
                <div className="flex flex-col items-center gap-3 mb-6">
                  <div className="p-3 rounded-2xl bg-gold/10 border border-gold/20 text-primary inline-flex items-center justify-center">
                    <Sparkles className="h-7 w-7" />
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-maroon">
                    {t("whyWeCelebrate")}
                  </h2>
                </div>
                <div className="text-muted-foreground max-w-2xl mx-auto space-y-4">
                  <p className="text-lg leading-relaxed">
                    {t("whyWeCelebrateText1")}
                  </p>
                  <p className="text-lg leading-relaxed">
                    {t("whyWeCelebrateText2")}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Importance Section */}
      <section className="bg-transparent py-16 relative z-10">
        <div className="mx-auto max-w-4xl px-4">
          <ScrollReveal variant="fade-up">
            <div className="glass-card p-8 sm:p-12 relative overflow-hidden text-center">
              <div 
                className="absolute top-0 right-0 text-9xl opacity-5 pointer-events-none"
                style={{ lineHeight: 1 }}
              >
                🙏
              </div>
              <div className="relative flex flex-col items-center">
                <div className="flex flex-col items-center gap-3 mb-6">
                  <div className="p-3 rounded-2xl bg-gold/10 border border-gold/20 text-primary inline-flex items-center justify-center">
                    <Heart className="h-7 w-7" />
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-maroon">
                    {t("importance")}
                  </h2>
                </div>
                <div className="text-muted-foreground max-w-2xl mx-auto space-y-4">
                  <p className="text-lg leading-relaxed">
                    {t("importanceText1")}
                  </p>
                  <p className="text-lg leading-relaxed">
                    {t("importanceText2")}
                  </p>
                  <p className="text-lg leading-relaxed">
                    {t("importanceText3")}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Our Traditions Section */}
      <section className="bg-transparent py-16 relative z-10">
        <div className="mx-auto max-w-4xl px-4">
          <ScrollReveal variant="fade-up">
            <div className="glass-card p-8 sm:p-12 relative overflow-hidden text-center">
              <div 
                className="absolute top-0 right-0 text-9xl opacity-5 pointer-events-none"
                style={{ lineHeight: 1 }}
              >
                🪔
              </div>
              <div className="relative flex flex-col items-center">
                <div className="flex flex-col items-center gap-3 mb-6">
                  <div className="p-3 rounded-2xl bg-gold/10 border border-gold/20 text-primary inline-flex items-center justify-center">
                    <Flame className="h-7 w-7" />
                  </div>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold text-maroon">
                    {t("ourTraditions")}
                  </h2>
                </div>
                <div className="text-muted-foreground max-w-2xl mx-auto">
                  <p className="text-lg leading-relaxed mb-8">
                    {t("ourTraditionsText")}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-background/60 border border-gold/25 shadow-sm hover:border-gold/60 transition-colors">
                      <div className="text-3xl mb-2">🎭</div>
                      <h4 className="font-semibold text-primary text-base mb-1">{t("culturalPrograms")}</h4>
                      <p className="text-sm text-muted-foreground">{t("culturalProgramsDesc")}</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-background/60 border border-gold/25 shadow-sm hover:border-gold/60 transition-colors">
                      <div className="text-3xl mb-2">🕉️</div>
                      <h4 className="font-semibold text-primary text-base mb-1">{t("dailyRituals")}</h4>
                      <p className="text-sm text-muted-foreground">{t("dailyRitualsDesc")}</p>
                    </div>
                    <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-background/60 border border-gold/25 shadow-sm hover:border-gold/60 transition-colors">
                      <div className="text-3xl mb-2">🌊</div>
                      <h4 className="font-semibold text-primary text-base mb-1">{t("visarjanCeremony")}</h4>
                      <p className="text-sm text-muted-foreground">{t("visarjanCeremonyDesc")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="bg-transparent py-16 relative z-10">
        <div className="mx-auto max-w-4xl px-4">
          <ScrollReveal variant="fade-up">
            <div className="glass-card p-8 sm:p-12 text-center">
              <div className="flex flex-col items-center gap-3 mb-6">
                <div className="p-3 rounded-2xl bg-gold/10 border border-gold/20 text-primary inline-flex items-center justify-center">
                  <Users className="h-7 w-7" />
                </div>
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-maroon">
                  {t("ourStory")}
                </h2>
              </div>
              <div className="text-muted-foreground max-w-2xl mx-auto space-y-4">
                <p className="text-lg leading-relaxed">
                  {t("ourStoryText1")}
                </p>
                <p className="text-lg leading-relaxed">
                  {t("ourStoryText2")}
                </p>
                <p className="text-lg leading-relaxed">
                  {t("ourStoryText3")}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Bujji Ganesh Youth & SRP Committee Section */}
      <section className="bg-maroon/85 backdrop-blur-md text-maroon-foreground py-16 relative overflow-hidden border-y border-gold/20">
        <DivineOmGlow opacity={0.4} size="md" />
        <div className="relative z-10 mx-auto max-w-4xl px-4">
          <ScrollReveal variant="fade-up">
            <div className="text-center">
              <div className="inline-flex items-center gap-3 mb-6">
                <Heart className="h-10 w-10 text-gold" />
                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                  {b(festival.committeeTitle)} • {b(festival.committeeName)}
                </h2>
              </div>
              <div className="text-white/95 text-lg leading-relaxed space-y-4 max-w-3xl mx-auto font-medium drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
                <p>
                  {t("bujjiGaneshYouthText1")}
                </p>
                <p>
                  {t("bujjiGaneshYouthText2")}
                </p>
                <p className="text-2xl font-bold text-gold pt-4 drop-shadow-[0_0_12px_rgba(234,179,8,0.7)]">
                  {t("togetherMessage")}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-transparent py-16 relative z-10">
        <div className="mx-auto max-w-7xl px-4">
          <ScrollReveal variant="fade-up">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-center text-maroon mb-12">
              {t("ourValues")}
            </h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScrollReveal variant="scale-in" delay={0}>
              <div className="glass-card p-6 text-center h-full hover:border-gold hover:-translate-y-1">
                <div className="text-5xl mb-4">🙏</div>
                <h3 className="font-display text-xl font-bold text-maroon mb-3">{t("devotion")}</h3>
                <p className="text-muted-foreground">
                  {t("devotionDesc")}
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal variant="scale-in" delay={120}>
              <div className="glass-card p-6 text-center h-full hover:border-gold hover:-translate-y-1">
                <div className="text-5xl mb-4">🤝</div>
                <h3 className="font-display text-xl font-bold text-maroon mb-3">{t("unity")}</h3>
                <p className="text-muted-foreground">
                  {t("unityDesc")}
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal variant="scale-in" delay={240}>
              <div className="glass-card p-6 text-center h-full hover:border-gold hover:-translate-y-1">
                <div className="text-5xl mb-4">💪</div>
                <h3 className="font-display text-xl font-bold text-maroon mb-3">{t("service")}</h3>
                <p className="text-muted-foreground">
                  {t("serviceDesc")}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Closing Blessing */}
      <section className="bg-transparent py-12 relative z-10">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <ScrollReveal variant="fade-up">
            <div className="glass-card p-8">
              <p className="font-display text-2xl sm:text-3xl font-bold text-maroon mb-2">
                గణపతి బప్పా మోరియా!
              </p>
              <p className="text-gold text-xl font-semibold">
                🙏 {t("bappaMorya")} 🙏
              </p>
              <p className="text-muted-foreground mt-4 text-lg">
                {t("closingBlessing")}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

