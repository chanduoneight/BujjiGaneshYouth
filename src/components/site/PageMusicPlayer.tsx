import { useRef, useEffect, useCallback } from "react";

export function PageMusicPlayer({ audioSrc }: { audioSrc?: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const attemptPlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.75;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay restricted until user interaction
      });
    }
  }, []);

  useEffect(() => {
    if (!audioSrc) return;
    const audio = audioRef.current;
    if (!audio) return;

    // 1. Immediate autoplay attempt
    attemptPlay();

    // 2. Multi-vector user activation gestures (click, touch, pointerdown, keydown, scroll)
    const handleGesture = () => {
      const audio = audioRef.current;
      if (!audio) return;

      audio
        .play()
        .then(() => {
          removeListeners(); // Remove listeners once playback starts
        })
        .catch(() => {
          // If browser is still waiting for direct gesture, keep listeners active
        });
    };

    const events = [
      "click",
      "touchstart",
      "touchend",
      "pointerdown",
      "mousedown",
      "keydown",
      "scroll",
    ];

    const removeListeners = () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, handleGesture);
        document.removeEventListener(evt, handleGesture);
      });
    };

    events.forEach((evt) => {
      window.addEventListener(evt, handleGesture, { passive: true });
      document.addEventListener(evt, handleGesture, { passive: true });
    });

    return () => {
      removeListeners();
      audio.pause();
    };
  }, [audioSrc, attemptPlay]);

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
