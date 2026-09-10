import React, { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SliderControlsProps {
  currentIndex: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  onDotClick: (i: number) => void;
}

export function SliderControls({
  currentIndex,
  total,
  onPrev,
  onNext,
  onDotClick,
}: SliderControlsProps) {
  const dotsContainerRef = useRef<HTMLDivElement>(null);
  const activeDotRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeDotRef.current) {
      activeDotRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [currentIndex]);

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 sm:gap-6 px-4 sm:px-6 py-2.5 rounded-full bg-maroon/90 backdrop-blur-md border border-gold/30 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
      {/* Prev button */}
      <button
        type="button"
        onClick={onPrev}
        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-cream/70 hover:bg-gold/20 hover:text-gold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold/50"
        aria-label="Previous member"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      {/* Nav dots container */}
      <div
        ref={dotsContainerRef}
        className="flex items-center gap-1.5 max-w-[180px] sm:max-w-[280px] overflow-x-auto scrollbar-none px-1 py-1"
      >
        {Array.from({ length: total }).map((_, i) => {
          const isActive = i === currentIndex;
          return (
            <button
              key={i}
              ref={isActive ? activeDotRef : null}
              type="button"
              onClick={() => onDotClick(i)}
              className={`h-2 rounded-full transition-all duration-300 flex-shrink-0 ${
                isActive
                  ? "w-6 sm:w-8 bg-gold shadow-[0_0_10px_rgba(244,166,35,0.7)]"
                  : "w-2 bg-gold/25 hover:bg-gold/60"
              }`}
              aria-label={`Go to member ${i + 1}`}
            />
          );
        })}
      </div>

      {/* Counter */}
      <div className="font-mono text-xs sm:text-[13px] text-cream/70 min-w-[54px] text-center font-semibold">
        <span className="text-gold font-bold">
          {String(currentIndex + 1).padStart(2, "0")}
        </span>{" "}
        / {String(total).padStart(2, "0")}
      </div>

      {/* Next button */}
      <button
        type="button"
        onClick={onNext}
        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-cream/70 hover:bg-gold/20 hover:text-gold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold/50"
        aria-label="Next member"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </div>
  );
}
