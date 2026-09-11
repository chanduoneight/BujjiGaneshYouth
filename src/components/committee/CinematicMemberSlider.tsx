import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import type { CommitteeMember } from "@/data/members";
import { useLang } from "@/i18n/language";
import { MemberSlide } from "./MemberSlide";
import { ArrowLeft } from "lucide-react";

interface CinematicSliderProps {
  members: CommitteeMember[];
  currentIndex?: number;
  onIndexChange?: (index: number) => void;
}

export function CinematicMemberSlider({
  members,
  currentIndex: controlledIndex,
  onIndexChange,
}: CinematicSliderProps) {
  const { lang, t } = useLang();
  const [internalIndex, setInternalIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [isHovering, setIsHovering] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [flashBars, setFlashBars] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const currentIndex = controlledIndex !== undefined ? controlledIndex : internalIndex;

  // Change slide directly without double-render timeouts
  const handleSetIndex = useCallback(
    (targetIndex: number) => {
      const newIndex = (targetIndex + members.length) % members.length;
      if (newIndex === currentIndex) return;

      if (onIndexChange) {
        onIndexChange(newIndex);
      } else {
        setInternalIndex(newIndex);
      }
    },
    [currentIndex, members.length, onIndexChange]
  );

  const handlePrev = useCallback(() => {
    handleSetIndex(currentIndex - 1);
  }, [currentIndex, handleSetIndex]);

  const handleNext = useCallback(() => {
    handleSetIndex(currentIndex + 1);
  }, [currentIndex, handleSetIndex]);

  // Auto-advance logic: continuous photo change every second (1000ms) without stopping
  useEffect(() => {
    if (typeof window === "undefined" || members.length <= 1) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const interval = setInterval(() => {
      if (onIndexChange) {
        onIndexChange((currentIndex + 1) % members.length);
      } else {
        setInternalIndex((prev) => (prev + 1) % members.length);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [currentIndex, members.length, onIndexChange]);

  // Keyboard navigation (ArrowLeft / ArrowRight)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (["input", "textarea", "select"].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) {
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (touch) {
      touchStartX.current = touch.clientX;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touch = e.changedTouches[0];
    if (!touch) return;
    const touchEndX = touch.clientX;
    const deltaX = touchStartX.current - touchEndX;

    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  const handleScrollToGrid = () => {
    if (typeof document !== "undefined") {
      document.getElementById("committee-grid-section")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="cinematic-slider"
      role="region"
      aria-label="Committee members cinematic showcase"
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#120608] via-[#18070a] to-[#120608] text-white flex flex-col justify-between pt-8"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Atmospheric Golden Temple Radial Aura */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="w-[min(90vw,750px)] h-[min(90vw,750px)] rounded-full blur-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(244, 166, 35, 0.22) 0%, rgba(184, 51, 42, 0.12) 45%, transparent 70%)",
            animation: "glow-pulse 6s ease-in-out infinite",
          }}
        />
      </div>

      {/* BACK TO HOME (Top Left) */}
      <div className="absolute top-6 left-6 sm:left-8 z-30 flex items-center gap-2">
        <Link
          to="/"
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/50 hover:bg-gold/20 border border-gold/30 hover:border-gold text-gold font-mono text-[10px] uppercase tracking-[1.5px] transition-all backdrop-blur-md shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t("home")}</span>
        </Link>
      </div>

      {/* THREE VERTICAL BARS (Top Center) */}
      <div
        className="absolute top-6 left-1/2 -translate-x-1/2 z-20 hidden sm:flex gap-1.5 pointer-events-none"
        style={{
          animation: flashBars ? "barsFlash 0.4s ease-out" : "none",
        }}
      >
        <div className="w-1 h-5 bg-gold/40 rounded-full" />
        <div className="w-1 h-5 bg-gold/40 rounded-full" />
        <div className="w-1 h-5 bg-gold/40 rounded-full" />
      </div>

      {/* LANGUAGE TOGGLE & RELEASE LABEL (Top Right) */}
      <div className="absolute top-6 right-6 sm:right-8 z-30 flex items-center gap-3">
        <LanguageToggle className="scale-90 bg-black/60 border-gold/40 text-xs" />
        <div className="hidden lg:block font-mono text-[10px] uppercase tracking-[2px] text-cream/40 pointer-events-none">
          {lang === "te" ? "వినాయక చవితి 2026" : "GANESH CHATURTHI 2026"}
        </div>
      </div>

      {/* MAIN HERO PRESENTATION AREA */}
      <div className="relative flex-1 min-h-[560px] sm:min-h-[640px] w-full flex items-end justify-center overflow-hidden px-4">
        {members.map((member, i) => (
          <MemberSlide
            key={member.id}
            member={member}
            index={i}
            total={members.length}
            isActive={i === currentIndex}
            isExiting={i === currentIndex && isExiting}
            lang={lang}
            t={t}
            onViewProfile={handleScrollToGrid}
          />
        ))}
      </div>
    </section>
  );
}
