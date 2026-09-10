import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useLang } from "@/i18n/language";
import { events, eventCategories, type EventCategory } from "@/data/content";
import { EventCard } from "@/components/site/EventCard";
import { PageMusicPlayer } from "@/components/site/PageMusicPlayer";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { FestivalParticles } from "@/components/effects/FestivalParticles";
import { MandalaGlow } from "@/components/effects/MandalaGlow";
import { CosmicParticles } from "@/components/effects/CosmicParticles";
import { SacredGeometryOrbs } from "@/components/effects/SacredGeometryOrbs";
import { Calendar } from "lucide-react";

export const Route = createFileRoute("/events")({
  component: EventsPage,
});

function EventsPage() {
  const { t, b } = useLang();
  const [activeCategory, setActiveCategory] = useState<"all" | EventCategory>("all");

  const filteredEvents =
    activeCategory === "all"
      ? events
      : events.filter((e) => e.category === activeCategory);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Events Page Background Music Player — Bob Marley Om Namah Shivaya Track */}
      <PageMusicPlayer audioSrc="/audio/bob-marley.mp3" />

      <FestivalParticles count={20} />

      {/* Hero Section */}
      <section className="bg-maroon/90 backdrop-blur-md text-maroon-foreground py-20 relative overflow-hidden border-b border-gold/20">
        <MandalaGlow direction="normal" duration={50} opacity={0.8} />
        <CosmicParticles count={100} />
        <SacredGeometryOrbs count={8} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center">
          <p className="text-gold text-2xl font-bold tracking-wider mb-4 drop-shadow-[0_0_15px_rgba(234,179,8,0.7)]">
            {t("namah")}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] tracking-wide">
            {t("events")}
          </h1>
          <p className="text-white/95 text-lg sm:text-xl max-w-3xl mx-auto font-medium drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
            {t("upcomingEvents")} & {t("schedule")}
          </p>

          {/* All Events Venue Badge */}
          <div className="mt-6 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black/40 backdrop-blur-md border border-gold/40 text-gold text-sm sm:text-base font-bold shadow-lg">
            <span>🏛️</span>
            <span>{b({ en: "Venue: Community Hall, Srungarapuram", te: "వేదిక: కమ్యూనిటీ హాల్, శృంగారాపురం" })}</span>
          </div>
        </div>
      </section>

      {/* Category Filter Section */}
      <section className="bg-transparent py-8 sticky top-0 z-20 backdrop-blur-md border-b border-gold/20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {eventCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm sm:text-base transition-all hover:-translate-y-0.5 active:scale-95 ${
                  activeCategory === cat.id
                    ? "gradient-saffron text-primary-foreground shadow-gold"
                    : "glass-card text-foreground hover:border-gold"
                }`}
              >
                {b(cat.label)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid Section */}
      <section className="bg-transparent py-16 relative z-10">
        <div className="mx-auto max-w-7xl px-4">
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event, index) => (
                <ScrollReveal key={event.id} variant="scale-in" delay={index * 80}>
                  <EventCard event={event} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <ScrollReveal variant="fade-up">
              <div className="glass-card p-12 text-center max-w-2xl mx-auto">
                <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4 opacity-50" />
                <h3 className="font-display text-2xl font-bold text-maroon mb-3">
                  {t("noResults")}
                </h3>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>
    </div>
  );
}
