import React, { useState, useEffect, useRef } from "react";
import type { CommitteeMember } from "@/data/members";
import { useLang } from "@/i18n/language";
import { Sparkles } from "lucide-react";

interface CommitteeGridProps {
  members: CommitteeMember[];
  onCardClick: (index: number) => void;
}

export function CommitteeGrid({ members, onCardClick }: CommitteeGridProps) {
  const { lang, t } = useLang();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="committee-grid-section" ref={sectionRef} className="relative z-10 pt-4 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{members.length} PILLARS OF SRP COMMITTEE</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-maroon">
          {t("committee.cinematic.gridTitle")}
        </h2>
        <p className="text-muted-foreground text-base sm:text-lg mt-3 max-w-xl mx-auto">
          {t("committee.cinematic.gridSubtitle")}
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-6 rounded-full" />
      </div>

      {/* 21 Member Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {members.map((member, i) => (
          <GridCard
            key={member.id}
            member={member}
            index={i}
            isVisible={isVisible}
            lang={lang}
            onClick={() => onCardClick(i)}
          />
        ))}
      </div>
    </section>
  );
}

function GridCard({
  member,
  index,
  isVisible,
  lang,
  onClick,
}: {
  member: CommitteeMember;
  index: number;
  isVisible: boolean;
  lang: string;
  onClick: () => void;
}) {
  const [imgError, setImgError] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  useEffect(() => {
    setImgError(false);
  }, [member.photo]);

  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleCardClick = (e: React.MouseEvent) => {
    // On touch screens/mobile, first tap reveals name overlay; second tap jumps to slider
    if (typeof window !== "undefined" && window.innerWidth < 768 && !isOverlayOpen) {
      setIsOverlayOpen(true);
      return;
    }
    onClick();
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      onMouseEnter={() => setIsOverlayOpen(true)}
      onMouseLeave={() => setIsOverlayOpen(false)}
      className={`group relative glass-card p-2.5 sm:p-4 rounded-3xl cursor-pointer border border-gold/20 hover:border-gold/70 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.3),0_0_25px_rgba(244,166,35,0.25)] focus:outline-none focus:ring-2 focus:ring-gold/50 flex flex-col justify-between touch-manipulation ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{
        transitionDelay: `${Math.min(index * 35, 600)}ms`,
      }}
    >
      {/* Member Number Badge */}
      <div className="absolute top-4 sm:top-5 right-4 sm:right-5 z-20 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/75 backdrop-blur-md border border-gold/40 text-[10px] sm:text-[11px] font-mono font-bold text-gold flex items-center justify-center shadow-md">
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Enlarged Uniform Photo Container */}
      <div className="relative overflow-hidden rounded-2xl mb-0 h-56 sm:h-72 md:h-80 w-full bg-gradient-to-b from-maroon/20 via-black/40 to-black/80 flex items-end justify-center pt-3 sm:pt-4 pb-0 px-2 border border-gold/15 group-hover:border-gold/40 transition-colors">
        {/* Golden Radial Backlight behind character */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-gold/10 blur-2xl pointer-events-none group-hover:bg-gold/20 transition-all duration-500" />

        {!imgError ? (
          <div className="relative w-full h-full flex items-end justify-center overflow-hidden [mask-image:linear-gradient(to_bottom,black_0%,black_82%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_82%,transparent_100%)]">
            <img
              src={member.photo}
              alt={lang === "te" ? member.nameTe : member.name}
              className="w-full h-full object-contain object-bottom origin-bottom scale-100 group-hover:scale-105 transition-transform duration-500 ease-out drop-shadow-[0_12px_24px_rgba(0,0,0,0.9)] z-10"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center z-10">
            <div className="w-16 h-16 rounded-full border border-gold/40 flex items-center justify-center bg-gold/10 text-gold text-2xl font-display font-bold mb-2 shadow-sm">
              {initials}
            </div>
          </div>
        )}

        {/* JAILER / STORM GUST MOVIE TITLE HOVER OVERLAY ON PHOTO */}
        <div className={`absolute inset-0 z-20 flex flex-col items-center justify-end pb-3 sm:pb-4 px-2 bg-gradient-to-t from-black/95 via-black/40 to-transparent transition-all duration-300 pointer-events-none text-center ${
          isOverlayOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}>
          <div
            className={`jailer-title-text ${
              lang === "te"
                ? "font-telugu-hero font-bold tracking-normal leading-snug"
                : "font-storm-gust font-black tracking-wider leading-none uppercase"
            } text-base sm:text-lg md:text-xl drop-shadow-[0_4px_10px_rgba(0,0,0,1)]`}
          >
            {lang === "te" ? member.nameTe : member.name}
          </div>
          <div
            className={`jailer-subtitle ${
              lang === "te" ? "tracking-normal font-sans" : "tracking-[0.2em] sm:tracking-[0.25em]"
            } text-[8px] sm:text-[10px] text-white/90 mt-1 sm:mt-1.5 font-bold`}
          >
            {lang === "te" ? member.roleTe : member.role}
          </div>
        </div>

        {/* Uniform Ground / Pedestal Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-gold/25 blur-md rounded-full pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/70 to-transparent z-10" />
      </div>
    </div>
  );
}
