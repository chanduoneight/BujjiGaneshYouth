import React, { useState, useEffect, useRef } from "react";
import type { CommitteeMember } from "@/data/members";
import type { Lang } from "@/i18n/language";
import { ArrowRight, Sparkles } from "lucide-react";

interface MemberSlideProps {
  member: CommitteeMember;
  index: number;
  total: number;
  isActive: boolean;
  isExiting?: boolean;
  mousePos?: { x: number; y: number };
  lang: Lang;
  t: (key: any) => string;
  onViewProfile?: () => void;
}

export function MemberSlide({
  member,
  index,
  total,
  isActive,
  isExiting = false,
  lang,
  t,
  onViewProfile,
}: MemberSlideProps) {
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const slideRef = useRef<HTMLDivElement>(null);

  const isNameVisible = isHovered || isLocked;

  useEffect(() => {
    setImgError(false);
    setIsHovered(false);
    setIsLocked(false);
  }, [member.photo]);

  // Parallax tracking using CSS variables --px and --py
  useEffect(() => {
    if (!isActive || typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      slideRef.current?.style.setProperty("--px", `${x}px`);
      slideRef.current?.style.setProperty("--py", `${y}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      slideRef.current?.style.setProperty("--px", "0px");
      slideRef.current?.style.setProperty("--py", "0px");
    };
  }, [isActive]);

  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      ref={slideRef}
      data-active={isActive}
      className={`absolute inset-0 flex items-center justify-center select-none overflow-hidden ${
        isActive ? "opacity-100 pointer-events-auto z-10" : "opacity-0 pointer-events-none z-0"
      }`}
      aria-hidden={!isActive}
    >
      {/* DOT LINE: Subtle horizontal row of small gold dots across the middle */}
      <div className="absolute top-1/2 left-0 right-0 z-[2] flex justify-center gap-2 opacity-20 pointer-events-none -translate-y-1/2">
        {Array.from({ length: 36 }).map((_, i) => (
          <div key={i} className="w-1 h-1 rounded-full bg-gold shrink-0" />
        ))}
      </div>

      {/* LAYER 3: Golden Radial Halo Circle (Centered behind photo) */}
      <div
        className="absolute top-1/2 left-1/2 z-[3] pointer-events-none rounded-full w-[clamp(280px,48vw,580px)] h-[clamp(280px,48vw,580px)]"
        style={{
          background:
            "radial-gradient(circle, rgba(244,166,35,0.14) 0%, rgba(244,166,35,0.04) 50%, transparent 70%)",
          border: "1px solid rgba(244, 166, 35, 0.1)",
          transform: "translate(calc(-50% + var(--px, 0px) * 0.3), calc(-50% + var(--py, 0px) * 0.3))",
          transition: "transform 0.15s ease-out",
          animation: isActive
            ? isExiting
              ? "haloExit 0.4s ease-in forwards"
              : "haloBurst 1.2s cubic-bezier(0.25,0.46,0.45,0.94) 0.3s forwards, haloGlowPulse 0.8s ease-out 1s"
            : "none",
          opacity: isActive ? 1 : 0,
        }}
      />

      {/* LAYER 4: Direct Member Picture with Click-Lock & Hover Storm Gust Name Display */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => setIsLocked((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsLocked((prev) => !prev);
          }
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative z-[4] flex items-end justify-center pointer-events-auto cursor-pointer group focus:outline-none touch-manipulation"
        style={{
          width: "min(94vw, clamp(280px, 46vw, 560px))",
          height: "min(68vh, clamp(380px, 60vw, 700px))",
          maxHeight: "min(700px, calc(100svh - 180px))",
          transform: "translate(calc(var(--px, 0px) * 0.2), calc(var(--py, 0px) * 0.2))",
          transition: "transform 0.15s ease-out",
          animation: isActive
            ? isExiting
              ? "photoExit 0.4s ease-in forwards"
              : "photoRise 1.2s cubic-bezier(0.34,1.56,0.64,1) 0.5s forwards"
            : "none",
          opacity: isActive ? 1 : 0,
        }}
        aria-label={`Show name for ${lang === "te" ? member.nameTe : member.name}`}
      >
        {!imgError ? (
          <div className="relative w-full h-full flex items-end justify-center overflow-hidden [mask-image:linear-gradient(to_bottom,black_0%,black_80%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_80%,transparent_100%)]">
            <img
              src={member.photo}
              alt={lang === "te" ? member.nameTe : member.name}
              className={`w-full h-full object-contain object-bottom origin-bottom scale-100 drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)] filter drop-shadow-[0_0_30px_rgba(244,166,35,0.4)] transition-all duration-500 ease-out ${
                isNameVisible
                  ? "scale-105 drop-shadow-[0_0_55px_rgba(244,166,35,0.9)] brightness-105"
                  : "group-hover:scale-105 active:scale-95"
              }`}
              loading="eager"
              decoding="async"
              onError={() => setImgError(true)}
            />
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-gold/40 flex items-center justify-center bg-gold/15 text-gold text-2xl sm:text-3xl font-display font-bold mb-3 shadow-[0_0_20px_rgba(244,166,35,0.3)]">
              {initials}
            </div>
            <div className="font-display text-lg sm:text-xl font-bold text-white mb-1">
              {lang === "te" ? member.nameTe : member.name}
            </div>
            <div className="text-xs uppercase tracking-wider text-gold font-mono font-bold">
              {lang === "te" ? member.roleTe : member.role}
            </div>
          </div>
        )}

        {/* Soft dark gradient fading out the bottom cut line */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#120608] via-[#120608]/80 to-transparent pointer-events-none z-10" />

        {/* STORM GUST MOVIE TITLE OVERLAY DISPLAYED DIRECTLY OVER THE CROPPED BOTTOM PART ON CLICK / HOVER */}
        <div
          className={`absolute inset-x-0 bottom-4 sm:bottom-8 md:bottom-12 z-20 flex flex-col items-center justify-center pointer-events-none transition-all duration-300 px-3 sm:px-6 text-center w-full ${
            isNameVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-6 scale-95"
          }`}
        >
          {/* Gritty Cinematic Dark Backdrop Flare */}
          <div className="absolute inset-0 -inset-x-8 sm:-inset-x-12 bg-gradient-to-r from-transparent via-black/95 to-transparent blur-md -z-10 rounded-2xl" />
          <div className="absolute -inset-6 sm:-inset-8 bg-radial from-gold/35 via-transparent to-transparent blur-xl -z-10" />

          {/* STORM GUST BLOCKBUSTER NAME TITLE */}
          <div className="jailer-title-text font-storm-gust text-[clamp(22px,5.5vw,68px)] tracking-wider leading-tight drop-shadow-[0_8px_16px_rgba(0,0,0,1)] select-none break-words max-w-full">
            {lang === "te" ? member.nameTe : member.name}
          </div>

          {/* SUBTITLE (Role) */}
          <div className="mt-2 sm:mt-2.5 px-3 py-0.5 sm:px-4 sm:py-1 rounded-full bg-black/85 border border-gold/50 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.8)] flex items-center gap-1.5 sm:gap-2 max-w-full">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse shrink-0" />
            <span className="jailer-subtitle text-[10px] sm:text-xs tracking-[0.22em] sm:tracking-[0.32em] font-extrabold text-white truncate">
              {lang === "te" ? member.roleTe : member.role}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse shrink-0" />
          </div>
        </div>
      </div>

      {/* LEFT SIDEBAR: "SRP COMMITTEE" vertical text + 5 stars */}
      <div
        className="hidden lg:flex absolute top-1/2 left-[3.5%] -translate-y-1/2 z-[5] flex-col items-center gap-4"
        style={{
          animation: isActive
            ? isExiting
              ? "elementsExit 0.35s forwards"
              : "fadeIn 0.8s ease-out 0.6s forwards"
            : "none",
          opacity: isActive && !isExiting ? 1 : 0,
        }}
      >
        {/* Vertical text */}
        <div
          className="font-mono text-[9px] uppercase tracking-[2px] text-cream/40 whitespace-nowrap"
          style={{ writingMode: "vertical-rl" }}
        >
          SRP COMMITTEE
        </div>

        {/* 5 gold star dots */}
        <div className="flex flex-col gap-1 mt-1">
          {Array.from({ length: 5 }).map((_, sIdx) => (
            <div
              key={sIdx}
              className="w-1.5 h-1.5 rounded-full bg-gold"
              style={{ opacity: sIdx < 5 ? 0.7 : 0.2 }}
            />
          ))}
        </div>
      </div>

      {/* RIGHT EDGE: Rotated 2026 Year Label */}
      <div
        className="hidden lg:block absolute top-1/2 right-[2.5%] z-[5] font-mono text-[11px] tracking-[4px] text-gold/20 whitespace-nowrap"
        style={{
          transform: "translateY(-50%) rotate(90deg)",
          animation: isActive
            ? isExiting
              ? "elementsExit 0.35s forwards"
              : "fadeIn 0.8s ease-out 1s forwards"
            : "none",
          opacity: isActive && !isExiting ? 1 : 0,
        }}
      >
        2026
      </div>

      {/* BOTTOM BAR: View Profile Button (Right) */}
      <div
        className="absolute bottom-16 right-6 sm:right-12 z-[5] flex items-center"
        style={{
          animation: isActive
            ? isExiting
              ? "elementsExit 0.35s forwards"
              : "fadeIn 0.6s ease-out 1.2s forwards"
            : "none",
          opacity: isActive && !isExiting ? 1 : 0,
        }}
      >
        <button
          type="button"
          onClick={onViewProfile}
          className="px-5 py-2 sm:px-6 sm:py-2.5 rounded-full border border-gold/40 font-mono text-[10px] uppercase tracking-[2px] text-gold bg-black/40 hover:bg-gold hover:text-maroon transition-all duration-300 flex items-center gap-2 shadow-sm font-bold"
        >
          <span>VIEW PROFILE</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* FILM STRIP: Bottom edge with continuous shimmer and entrance animation */}
      <div
        className="absolute bottom-0 left-0 right-0 h-6 z-[6] bg-black/80 overflow-hidden flex items-center border-t border-gold/20"
        style={{
          animation: isActive
            ? isExiting
              ? "filmStripExit 0.4s ease-in forwards"
              : "filmStripIn 0.6s ease-out 1.4s forwards"
            : "none",
        }}
      >
        <div
          className="w-full h-2"
          style={{
            background:
              "repeating-linear-gradient(90deg, transparent 0px, transparent 12px, rgba(244,166,35,0.2) 12px, rgba(244,166,35,0.2) 20px, transparent 20px, transparent 32px)",
            animation: "filmStripMove 4s linear infinite",
          }}
        />
      </div>
    </div>
  );
}
