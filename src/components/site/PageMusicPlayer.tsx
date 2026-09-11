import { useRef, useEffect, useState, useCallback } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

export function PageMusicPlayer({ audioSrc }: { audioSrc: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const attemptPlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.75;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Autoplay restricted until user interaction
          setIsPlaying(false);
        });
    }
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // 1. Immediate autoplay attempt
    attemptPlay();

    // 2. Multi-vector user activation gestures (click, touch, pointerdown, keydown)
    const handleGesture = () => {
      const audio = audioRef.current;
      if (!audio) return;

      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          removeListeners(); // Only remove listeners once audio actually starts playing!
        })
        .catch(() => {
          // If browser is still waiting for a direct tap, keep listeners active
        });
    };

    const events = [
      "click",
      "touchstart",
      "touchend",
      "pointerdown",
      "mousedown",
      "keydown",
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

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      removeListeners();
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.pause();
    };
  }, [audioSrc, attemptPlay]);

  return (
    <>
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        preload="auto"
        className="hidden"
        aria-hidden="true"
      />

      {/* FLOATING DEVOTIONAL MUSIC CONTROLLER BADGE (Bottom-Right) */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={togglePlay}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-md shadow-lg transition-all duration-300 select-none ${
            isPlaying
              ? "bg-black/75 border-gold/40 text-gold shadow-[0_0_15px_rgba(244,166,35,0.25)] hover:border-gold"
              : "bg-maroon/90 border-gold/70 text-white animate-pulse shadow-[0_0_20px_rgba(244,166,35,0.45)] hover:scale-105"
          }`}
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {/* Animated Equalizer Wave Bars */}
          {isPlaying ? (
            <div className="flex items-end gap-[2px] h-3.5 w-3.5 shrink-0">
              <span className="w-1 bg-gold rounded-full animate-[equalizer_0.8s_ease-in-out_infinite]" />
              <span className="w-1 bg-gold rounded-full animate-[equalizer_0.6s_ease-in-out_0.2s_infinite]" />
              <span className="w-1 bg-gold rounded-full animate-[equalizer_0.9s_ease-in-out_0.4s_infinite]" />
            </div>
          ) : (
            <Music className="w-3.5 h-3.5 text-gold shrink-0" />
          )}

          <span className="font-mono text-[10px] font-bold uppercase tracking-wider">
            {isPlaying ? "Music ON" : "Play Music"}
          </span>

          <span
            onClick={toggleMute}
            className="ml-1 p-0.5 hover:text-gold transition-colors"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-red-400" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 opacity-80" />
            )}
          </span>
        </button>
      </div>
    </>
  );
}
