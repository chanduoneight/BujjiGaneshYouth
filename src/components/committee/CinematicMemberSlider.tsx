import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import type { CommitteeMember } from "@/data/members";
import { useLang } from "@/i18n/language";
import { MemberSlide } from "./MemberSlide";
import { SliderControls } from "./SliderControls";
import { MandalaGlow } from "@/components/effects/MandalaGlow";
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

  // Change slide with 400ms element-by-element exit sequence
  const handleSetIndex = useCallback(
    (targetIndex: number) => {
      const newIndex = (targetIndex + members.length) % members.length;
      if (newIndex === currentIndex) return;

      // Start exit animation on current slide
      setIsExiting(true);
      setFlashBars(true);

      setTimeout(() => {
        if (onIndexChange) {
          onIndexChange(newIndex);
        } else {
          setInternalIndex(newIndex);
        }
        setIsExiting(false);
      }, 400);

      setTimeout(() => {
        setFlashBars(false);
      }, 700);
    },
    [currentIndex, members.length, onIndexChange]
  );

  const handlePrev = useCallback(() => {
    handleSetIndex(currentIndex - 1);
  }, [currentIndex, handleSetIndex]);

  const handleNext = useCallback(() => {
    handleSetIndex(currentIndex + 1);
  }, [currentIndex, handleSetIndex]);

  // Auto-advance logic (6000ms) with hover pause and prefers-reduced-motion check
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    if (isHovering || isExiting) return;

    const interval = setInterval(() => {
      handleSetIndex(currentIndex + 1);
    }, 6000);

    return () => clearInterval(interval);
  }, [currentIndex, isHovering, isExiting, handleSetIndex]);

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
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#120608] via-[#1a080c] to-[#0d0305] text-white flex flex-col justify-between border-y border-gold/20 pt-8"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Mandala Glow */}
      <MandalaGlow direction="normal" duration={120} opacity={0.35} />

      {/* BACK TO HOME (Top Left) */}
      <Link
        to="/"
        className="absolute top-6 left-6 sm:left-8 z-30 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/50 hover:bg-gold/20 border border-gold/30 hover:border-gold text-gold font-mono text-[10px] uppercase tracking-[1.5px] transition-all backdrop-blur-md shadow-sm"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>HOME</span>
      </Link>

      {/* THREE VERTICAL BARS (Top Center) */}
      <div
        className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 pointer-events-none"
        style={{
          animation: flashBars ? "barsFlash 0.4s ease-out" : "none",
        }}
      >
        <div className="w-1 h-5 bg-gold/40 rounded-full" />
        <div className="w-1 h-5 bg-gold/40 rounded-full" />
        <div className="w-1 h-5 bg-gold/40 rounded-full" />
      </div>

      {/* RELEASE LABEL (Top Right) */}
      <div className="hidden sm:block absolute top-6 right-8 z-20 font-mono text-[10px] uppercase tracking-[2px] text-cream/40 pointer-events-none">
        GANESH CHATURTHI 2026
      </div>

      {/* MAIN HERO PRESENTATION AREA (Full Deadpool Composition) */}
      <div className="relative flex-1 min-h-[560px] sm:min-h-[620px] w-full flex items-center justify-center overflow-hidden px-4">
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

      {/* SLIDER CONTROLS (Fixed Bottom Center) */}
      <div className="relative z-30 pb-6">
        <SliderControls
          currentIndex={currentIndex}
          total={members.length}
          onPrev={handlePrev}
          onNext={handleNext}
          onDotClick={handleSetIndex}
        />
      </div>
    </section>
  );
}
