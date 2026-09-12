import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/i18n/language";
import { galleryItems, type GalleryItem, type GalleryCategory } from "@/data/gallery";
import { useState, useEffect, useCallback } from "react";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { FestivalParticles } from "@/components/effects/FestivalParticles";
import { DivineOmGlow } from "@/components/effects/DivineOmGlow";
import { PageMusicPlayer } from "@/components/site/PageMusicPlayer";
import { ImageIcon, Maximize2, X, ChevronLeft, ChevronRight, Calendar } from "lucide-react";

export const Route = createFileRoute("/gallery")({
  component: Gallery,
});

type ActiveCategory = "all" | GalleryCategory;

function Gallery() {
  const { t, b } = useLang();
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>("all");
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  // Gallery categories with bilingual support & item counts
  const categories: { id: ActiveCategory; label: string; icon: string; count: number }[] = [
    {
      id: "all",
      label: t("allPhotos"),
      icon: "📸",
      count: galleryItems.length,
    },
    {
      id: "idols",
      label: t("yearlyIdols"),
      icon: "🕉️",
      count: galleryItems.filter((item) => item.category === "idols").length,
    },
    {
      id: "celebrations",
      label: t("celebrations"),
      icon: "🎉",
      count: galleryItems.filter((item) => item.category === "celebrations").length,
    },
    {
      id: "logo",
      label: t("logoInauguration"),
      icon: "🎨",
      count: galleryItems.filter((item) => item.category === "logo").length,
    },
  ];

  // Filter items based on active category
  const filteredItems =
    activeCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setSelectedPhotoIndex(null);
  }, []);

  const nextPhoto = useCallback(() => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) =>
      prev !== null ? (prev + 1) % filteredItems.length : 0
    );
  }, [selectedPhotoIndex, filteredItems.length]);

  const prevPhoto = useCallback(() => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) =>
      prev !== null
        ? (prev - 1 + filteredItems.length) % filteredItems.length
        : 0
    );
  }, [selectedPhotoIndex, filteredItems.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "ArrowLeft") prevPhoto();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhotoIndex, closeLightbox, nextPhoto, prevPhoto]);

  const selectedPhoto: GalleryItem | undefined =
    selectedPhotoIndex !== null ? filteredItems[selectedPhotoIndex] : undefined;

  const getCategoryBadge = (category: GalleryCategory) => {
    switch (category) {
      case "idols":
        return "🕉️ Idol";
      case "logo":
        return "🎨 Logo";
      case "celebrations":
        return "🎉 Festival";
      default:
        return "✨ Gallery";
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Gallery Page Background Music Player — Divine Flute */}
      <PageMusicPlayer audioSrc="/audio/flute.mp3" />

      <FestivalParticles count={15} />

      {/* Hero Section */}
      <section className="bg-maroon/90 backdrop-blur-md text-maroon-foreground py-20 relative overflow-hidden border-b border-gold/20">
        <DivineOmGlow opacity={0.35} size="lg" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center">
          <p className="text-gold text-2xl font-bold tracking-wider mb-4 drop-shadow-[0_0_15px_rgba(234,179,8,0.7)]">
            {t("namah")}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] tracking-wide">
            {t("galleryPageTitle")}
          </h1>
          <p className="text-white/95 text-lg sm:text-xl max-w-3xl mx-auto font-medium drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
            {t("galleryPageSubtitle")}
          </p>
        </div>
      </section>

      {/* Category Filter Section */}
      <section className="bg-transparent py-8 sticky top-0 z-20 backdrop-blur-md border-b border-gold/20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all hover:-translate-y-0.5 active:scale-95 ${
                  activeCategory === category.id
                    ? "gradient-saffron text-primary-foreground shadow-gold"
                    : "surface-card text-foreground hover:shadow-lift border border-gold/20 hover:border-gold"
                }`}
              >
                <span className="text-lg sm:text-xl">{category.icon}</span>
                <span>{category.label}</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    activeCategory === category.id
                      ? "bg-white/20 text-white font-bold"
                      : "bg-muted text-muted-foreground font-medium"
                  }`}
                >
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid Section */}
      <section className="bg-transparent py-16 relative z-10">
        <div className="mx-auto max-w-7xl px-4">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item, index) => (
                <ScrollReveal key={item.id} variant="scale-in" delay={index * 50}>
                  <div
                    onClick={() => openLightbox(index)}
                    className="surface-card rounded-2xl overflow-hidden group cursor-pointer transition-all hover:-translate-y-1.5 hover:shadow-lift border border-gold/20 hover:border-gold relative flex flex-col h-full"
                  >
                    {/* Image Container */}
                    <div className="aspect-[4/5] overflow-hidden relative bg-black/40 flex items-center justify-center">
                      <img
                        src={item.src}
                        alt={item.alt}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />

                      {/* Category Badge */}
                      <span className="absolute top-3 left-3 bg-maroon/85 backdrop-blur-md text-gold border border-gold/40 text-xs px-3 py-1 rounded-full font-semibold shadow-md">
                        {getCategoryBadge(item.category)}
                      </span>

                      {/* Year Badge */}
                      {item.year ? (
                        <span className="absolute top-3 right-3 bg-black/75 backdrop-blur-md text-gold border border-gold/30 text-xs px-2.5 py-1 rounded-full font-bold shadow-md flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-gold" />
                          {item.year}
                        </span>
                      ) : null}

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                        <div className="flex items-center justify-between text-white">
                          <h3 className="font-display font-black text-xl sm:text-2xl text-gold tracking-wide leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,1)] uppercase">
                            {b(item.title)}
                          </h3>
                          <div className="h-9 w-9 rounded-full bg-gold/30 backdrop-blur-md border border-gold flex items-center justify-center text-white shrink-0 ml-2">
                            <Maximize2 className="h-4 w-4 text-gold" />
                          </div>
                        </div>
                        {item.year ? (
                          <p className="text-white/80 text-xs mt-1 font-medium">Year: {item.year}</p>
                        ) : null}
                      </div>
                    </div>

                    {/* Card Caption Below Image */}
                    <div className="p-4 bg-card flex-1 flex flex-col justify-between border-t border-gold/10">
                      <div>
                        <h4 className="font-display font-bold text-maroon text-base truncate">
                          {b(item.title)}
                        </h4>
                        <p className="text-muted-foreground text-xs mt-1 line-clamp-2">
                          {item.alt}
                        </p>
                      </div>
                      {item.year ? (
                        <div className="mt-3 pt-2 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
                          <span className="text-gold font-semibold">Bujji Ganesh Youth</span>
                          <span className="font-mono bg-muted px-2 py-0.5 rounded text-[11px] font-bold text-foreground">
                            {item.year}
                          </span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <ScrollReveal variant="fade-up">
              <div className="glass-card p-12 text-center max-w-2xl mx-auto">
                <ImageIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-display text-2xl font-bold text-maroon mb-3">
                  {t("noPhotosYet")}
                </h3>
                <p className="text-muted-foreground text-lg">
                  {t("uploadPhotos")}
                </p>
                <div className="mt-6 text-6xl">
                  📷
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* Full-Screen Photo Lightbox Modal */}
      {selectedPhotoIndex !== null && selectedPhoto ? (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-6 animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Top Bar with Title & Close Button */}
          <div
            className="w-full max-w-6xl flex items-center justify-between text-white z-10 pb-4 border-b border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-display font-bold text-gold">
                  {b(selectedPhoto.title)}
                </h3>
                {selectedPhoto.year ? (
                  <span className="bg-gold/20 text-gold border border-gold/40 text-xs px-2.5 py-0.5 rounded-full font-bold">
                    {selectedPhoto.year}
                  </span>
                ) : null}
              </div>
              <p className="text-white/75 text-sm mt-0.5">
                {selectedPhotoIndex + 1} of {filteredItems.length} · {selectedPhoto.alt}
              </p>
            </div>
            <button
              onClick={closeLightbox}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all hover:scale-110 active:scale-95"
              aria-label="Close photo preview"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Center Image Container with Navigation Arrows */}
          <div
            className="relative flex items-center justify-center w-full max-w-5xl flex-1 my-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous Button */}
            {filteredItems.length > 1 ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevPhoto();
                }}
                className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-black/60 hover:bg-black/90 border border-gold/40 text-gold hover:text-white transition-all hover:scale-110 active:scale-95 shadow-lg"
                aria-label="Previous photo"
              >
                <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
              </button>
            ) : null}

            {/* Preview Image */}
            <div className="max-h-[75vh] max-w-[90vw] flex items-center justify-center overflow-hidden rounded-xl border-2 border-gold/40 shadow-2xl bg-black/40">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                className="max-h-[75vh] max-w-[90vw] object-contain select-none"
              />
            </div>

            {/* Next Button */}
            {filteredItems.length > 1 ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextPhoto();
                }}
                className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-black/60 hover:bg-black/90 border border-gold/40 text-gold hover:text-white transition-all hover:scale-110 active:scale-95 shadow-lg"
                aria-label="Next photo"
              >
                <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
              </button>
            ) : null}
          </div>

          {/* Bottom Caption Bar */}
          <div
            className="w-full max-w-4xl text-center text-white/85 text-sm z-10 pt-2"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-gold font-medium">🙏 {t("bappaMorya")} 🙏</p>
          </div>
        </div>
      ) : null}

      {/* Instructions & Blessings Section */}
      <section className="bg-transparent pb-16 pt-6 relative z-10">
        <div className="mx-auto max-w-4xl px-4">
          <ScrollReveal variant="fade-up">
            <div className="glass-card p-8 text-center border border-gold/20">
              <h2 className="font-display text-3xl font-bold text-maroon mb-4">
                🕉️ {t("yearlyIdols")} • 🎨 {t("logoInauguration")} • 🎉 {t("celebrations")}
              </h2>
              <p className="text-muted-foreground text-lg mb-4">
                {t("visitUsText")}
              </p>
              <div className="text-gold text-xl font-bold">
                🙏 {t("bappaMorya")} 🙏
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
