import React, { useState, useEffect, useRef, useCallback } from "react";
import { RealtimeAudioWaveform } from "./RealtimeAudioWaveform";

interface CommitteeSoundtrackVisualizerProps {
  audioSrc?: string;
  trackTitle?: string;
  trackSubtitle?: string;
}

export function CommitteeSoundtrackVisualizer({
  audioSrc = "/audio/karuppu-god-mode.mp3",
  trackTitle = "Karuppu — God Mode Entry BGM",
  trackSubtitle = "Sai Abhyankar • SRP Committee Official Anthem 2026",
}: CommitteeSoundtrackVisualizerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(144);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const [analyserNode, setAnalyserNode] = useState<AnalyserNode | null>(null);
  const isAudioConnectedRef = useRef(false);

  // Initialize Web Audio API Analyser
  const initAudio = useCallback(() => {
    if (typeof window === "undefined" || isAudioConnectedRef.current || !audioRef.current) return;

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.82;

      const source = ctx.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(ctx.destination);

      audioContextRef.current = ctx;
      analyserRef.current = analyser;
      setAnalyserNode(analyser);
      isAudioConnectedRef.current = true;
    } catch {
      // Audio element already attached or restricted
    }
  }, []);

  // Format time (mm:ss)
  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Toggle Play/Pause
  const togglePlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!isAudioConnectedRef.current) {
      initAudio();
    }

    if (audioContextRef.current && audioContextRef.current.state === "suspended") {
      await audioContextRef.current.resume();
    }

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        // Autoplay policy handled
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, [initAudio]);

  // Audio setup & first user interaction
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.85;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (audio.duration && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    const onLoadedMetadata = () => {
      if (audio.duration && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    const onEnded = () => {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    // Immediate autoplay attempt
    const promise = audio.play();
    if (promise !== undefined) {
      promise
        .then(() => {
          initAudio();
          setIsPlaying(true);
        })
        .catch(() => {});
    }

    const handleFirstInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        initAudio();
        if (audioContextRef.current && audioContextRef.current.state === "suspended") {
          audioContextRef.current.resume().catch(() => {});
        }
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
      removeListeners();
    };

    const removeListeners = () => {
      const evts = ["click", "touchstart", "touchend", "pointerdown", "mousedown", "keydown"];
      evts.forEach((evt) => {
        window.removeEventListener(evt, handleFirstInteraction, { capture: true });
        document.removeEventListener(evt, handleFirstInteraction, { capture: true });
      });
    };

    const evts = ["click", "touchstart", "touchend", "pointerdown", "mousedown", "keydown"];
    evts.forEach((evt) => {
      window.addEventListener(evt, handleFirstInteraction, { capture: true, passive: true });
      document.addEventListener(evt, handleFirstInteraction, { capture: true, passive: true });
    });

    return () => {
      removeListeners();
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
      audio.pause();
    };
  }, [initAudio]);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!isAudioConnectedRef.current) {
      initAudio();
    }
    if (audioContextRef.current && audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume().catch(() => {});
    }
    if (audio.paused) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
    if (duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const pct = Math.max(0, Math.min(1, x / rect.width));
      audio.currentTime = pct * duration;
      setCurrentTime(audio.currentTime);
    }
  };

  return (
    <div className="relative z-20 w-full overflow-hidden -mt-20 sm:-mt-28 md:-mt-32 mb-2 py-1 select-none bg-transparent group">
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        preload="auto"
        className="hidden"
        aria-hidden="true"
      />

      {/* FULL-WIDTH END-TO-END WHITE AUDIO WAVEFORM CANVAS */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Toggle audio playback"
        onClick={handleSeek}
        className="relative w-full h-24 sm:h-28 md:h-36 cursor-pointer flex items-center justify-center overflow-hidden"
      >
        <RealtimeAudioWaveform
          analyser={analyserNode}
          isPlaying={isPlaying}
          height={130}
          barColor="#FFFFFF"
          barWidth={1.8}
          barGap={2.2}
          smoothing={0.78}
        />

        {/* DOWNSIDE BLACK BLUR GRADIENT STROKE (Fades bottom of animation into pitch black) */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#120608] via-[#120608]/85 to-transparent pointer-events-none z-10 backdrop-blur-[2px]" />
      </div>
    </div>
  );
}
