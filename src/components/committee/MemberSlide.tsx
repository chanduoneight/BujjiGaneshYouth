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
    if (!isActive) {
      setIsHovered(false);
      setIsLocked(false);
    }
  }, [isActive, member.photo]);

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
      className={`absolute inset-0 flex items-end justify-center select-none overflow-hidden pb-0 transition-all duration-300 ease-out ${
        isActive ? "opacity-100 pointer-events-auto z-10" : "opacity-0 pointer-events-none z-0"
      }`}
      aria-hidden={!isActive}
    >
      {/* LAYER 3: Golden Radial Halo Circle (Centered behind photo) */}
      <div
        className={`absolute top-1/2 left-1/2 z-[3] pointer-events-none rounded-full w-[clamp(320px,56vw,680px)] h-[clamp(320px,56vw,680px)] transition-all duration-500 ease-out ${
          isActive ? "opacity-100 scale-100" : "opacity-0 scale-75"
        }`}
        style={{
          background:
            "radial-gradient(circle, rgba(244,166,35,0.18) 0%, rgba(244,166,35,0.05) 55%, transparent 70%)",
          border: "1px solid rgba(244, 166, 35, 0.15)",
          transform: "translate(calc(-50% + var(--px, 0px) * 0.3), calc(-50% + var(--py, 0px) * 0.3))",
        }}
      />

      {/* LAYER 4: Member Picture with Circular Pedestal Shadow & Click/Hover Name Display */}
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
        className={`relative z-[4] flex flex-col items-center justify-end pointer-events-auto cursor-pointer group focus:outline-none touch-manipulation transition-all duration-350 ease-out ${
          isActive ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"
        }`}
        style={{
          width: "min(96vw, clamp(300px, 52vw, 640px))",
          height: "min(82vh, clamp(440px, 78vh, 780px))",
          transform: `translate(calc(var(--px, 0px) * 0.2), calc(var(--py, 0px) * 0.2)) ${
            isActive ? "translateY(0) scale(1)" : "translateY(24px) scale(0.95)"
          }`,
        }}
        aria-label={`Show name for ${lang === "te" ? member.nameTe : member.name}`}
      >
        {!imgError ? (
          <div className="relative w-full h-full flex items-end justify-center">
            {/* Seamless Organic Curved Mask */}
            <div
              className="w-full h-full flex items-end justify-center overflow-hidden"
              style={{
                maskImage:
                  "linear-gradient(to bottom, black 0%, black 72%, transparent 98%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 0%, black 72%, transparent 98%)",
              }}
            >
              <img
                src={member.photo}
                alt={lang === "te" ? member.nameTe : member.name}
                className={`w-full h-full object-contain object-bottom scale-100 transition-all duration-500 ease-out ${
                  isNameVisible
                    ? "scale-105 brightness-110"
                    : "group-hover:scale-105 active:scale-95"
                }`}
                loading="eager"
                decoding="async"
                onError={() => setImgError(true)}
              />
            </div>

            {/* Circular / Elliptical Pedestal Shadow Directly Under the Base */}
            <div
              className="absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 pointer-events-none rounded-[100%] z-[1]"
              style={{
                width: "clamp(260px, 46vw, 520px)",
                height: "clamp(24px, 5vw, 44px)",
                background:
                  "radial-gradient(ellipse at 50% 50%, rgba(0, 0, 0, 0.98) 0%, rgba(18, 6, 8, 0.8) 50%, transparent 80%)",
                boxShadow: "0 0 35px rgba(0,0,0,0.98)",
              }}
            />

            {/* Seamless Bottom Black Blur Mask to dissolve cropped image bottom */}
            <div className="absolute inset-x-0 bottom-0 h-16 sm:h-24 bg-gradient-to-t from-[#120608] via-[#120608]/90 to-transparent pointer-events-none z-[3]" />
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-gold/40 flex items-center justify-center bg-gold/15 text-gold text-2xl sm:text-3xl font-display font-bold mb-3 shadow-[0_0_20px_rgba(244,166,35,0.3)]">
              {initials}
            </div>
            <div className="font-display text-lg sm:text-xl font-bold text-white mb-1">
              {lang === "te" ? member.nameTe : member.name}
            </div>
          </div>
        )}
      </div>

      {/* STORM GUST MOVIE TITLE DISPLAYED ON THE RIGHT SIDE OF THE PIC */}
      <div
        className={`absolute z-30 flex flex-col items-start justify-center pointer-events-none transition-all duration-350 ease-out right-4 sm:right-8 md:right-12 lg:right-20 top-1/2 -translate-y-1/2 max-w-[min(90vw,460px)] text-left ${
          isNameVisible
            ? "opacity-100 translate-x-0 scale-100"
            : "opacity-0 translate-x-8 scale-95"
        }`}
      >
        {/* Soft Golden Backdrop Flare */}
        <div
          className="absolute -inset-8 rounded-full blur-3xl -z-10 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 40% 50%, rgba(0,0,0,0.92) 20%, rgba(244,166,35,0.16) 55%, transparent 80%)",
          }}
        />

        {/* Decorative Tagline */}
        <div className="flex items-center gap-2 mb-2 font-mono text-[9px] sm:text-[10px] tracking-[3px] text-gold uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          <span className="w-5 h-[1.5px] bg-gold" />
          <span>{lang === "te" ? "SRP కమిటీ" : "SRP COMMITTEE"}</span>
        </div>

        {/* STORM GUST BLOCKBUSTER NAME TITLE */}
        <div
          className={`jailer-title-text ${
            lang === "te"
              ? "font-telugu-hero text-[clamp(24px,4.8vw,56px)] leading-tight tracking-normal"
              : "font-storm-gust text-[clamp(26px,5.2vw,64px)] tracking-wider leading-[0.98] uppercase"
          } drop-shadow-[0_8px_20px_rgba(0,0,0,1)] select-none break-words max-w-full`}
        >
          {lang === "te" ? member.nameTe : member.name}
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
        <div
          className="font-mono text-[9px] uppercase tracking-[2px] text-cream/40 whitespace-nowrap"
          style={{ writingMode: "vertical-rl" }}
        >
          {lang === "te" ? "SRP కమిటీ" : "SRP COMMITTEE"}
        </div>

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
    </div>
  );
}
