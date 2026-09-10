import { useRef, useEffect } from "react";

export function PageMusicPlayer({ audioSrc }: { audioSrc: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.75;

    // 1. Direct immediate autoplay attempt
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay blocked by browser policy until first user interaction
      });
    }

    // 2. Seamlessly start on first user interaction anywhere on the screen (scroll, touch, click, keydown)
    const handleFirstInteraction = () => {
      const el = audioRef.current;
      if (el && el.paused) {
        el.play().catch(() => {});
      }
      removeListeners();
    };

    const removeListeners = () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("scroll", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("pointerdown", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction, { passive: true });
    window.addEventListener("touchstart", handleFirstInteraction, { passive: true });
    window.addEventListener("scroll", handleFirstInteraction, { passive: true, once: true });
    window.addEventListener("keydown", handleFirstInteraction, { passive: true, once: true });
    window.addEventListener("pointerdown", handleFirstInteraction, { passive: true, once: true });

    return () => {
      removeListeners();
      audio.pause();
    };
  }, [audioSrc]);

  return (
    <audio
      ref={audioRef}
      src={audioSrc}
      loop
      preload="auto"
      className="hidden"
      aria-hidden="true"
    />
  );
}
