import { useRef, useEffect, useCallback } from "react";

interface PageMusicPlayerProps {
  audioSrc?: string;
  volume?: number;
}

export function PageMusicPlayer({ audioSrc, volume = 0.75 }: PageMusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const attemptPlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !audioSrc) return;

    audio.volume = volume;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay blocked by browser policy until first user interaction
      });
    }
  }, [audioSrc, volume]);

  useEffect(() => {
    if (!audioSrc) return;
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;

    // 1. Try immediate autoplay on mount/navigation
    attemptPlay();

    // 2. Interaction unlock: immediately play upon the very first user interaction anywhere on the page
    const handleGesture = () => {
      const el = audioRef.current;
      if (!el) return;

      if (el.paused) {
        el.play()
          .then(() => {
            removeListeners();
          })
          .catch(() => {
            // Keep listeners if interaction was not recognized as activation
          });
      } else {
        removeListeners();
      }
    };

    const events: (keyof WindowEventMap)[] = [
      "click",
      "pointerdown",
      "touchstart",
      "touchend",
      "mousedown",
      "keydown",
    ];

    const removeListeners = () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, handleGesture as EventListener, { capture: true });
        document.removeEventListener(evt, handleGesture as EventListener, { capture: true });
      });
    };

    events.forEach((evt) => {
      window.addEventListener(evt, handleGesture as EventListener, { capture: true, passive: true });
      document.addEventListener(evt, handleGesture as EventListener, { capture: true, passive: true });
    });

    const onCanPlay = () => {
      if (audio.paused) {
        attemptPlay();
      }
    };

    audio.addEventListener("canplay", onCanPlay);

    return () => {
      removeListeners();
      audio.removeEventListener("canplay", onCanPlay);
      audio.pause();
    };
  }, [audioSrc, volume, attemptPlay]);

  if (!audioSrc) return null;

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
