import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

export function MusicPlayer({ audioSrc }: { audioSrc: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;

    // Try immediate autoplay
    const playAudio = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        // Autoplay blocked, will play on first user interaction
        const startOnInteraction = async () => {
          try {
            await audio.play();
            setIsPlaying(true);
            document.removeEventListener('click', startOnInteraction);
            document.removeEventListener('touchstart', startOnInteraction);
            document.removeEventListener('keydown', startOnInteraction);
          } catch (e) {
            // Ignore
          }
        };

        document.addEventListener('click', startOnInteraction);
        document.addEventListener('touchstart', startOnInteraction);
        document.addEventListener('keydown', startOnInteraction);
      }
    };

    playAudio();
  }, [volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
      if (audioRef.current) {
        audioRef.current.muted = false;
      }
    }
  };

  return (
    <div className="fixed bottom-24 right-4 z-40 lg:bottom-6">
      <div className="surface-card flex items-center gap-3 rounded-full px-4 py-3 shadow-lift backdrop-blur-sm">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className={`transition-all ${
            isPlaying 
              ? 'text-primary hover:text-primary/80' 
              : 'text-primary animate-pulse hover:text-primary/80'
          }`}
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5" fill="currentColor" />
          ) : (
            <Play className="h-5 w-5" fill="currentColor" />
          )}
        </button>

        {/* Volume Control */}
        <button
          onClick={toggleMute}
          className="text-primary hover:text-primary/80 transition-colors"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted || volume === 0 ? (
            <VolumeX className="h-5 w-5" />
          ) : (
            <Volume2 className="h-5 w-5" />
          )}
        </button>

        {/* Volume Slider */}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-20 accent-primary"
          aria-label="Volume"
        />

        {/* Music Icon Animation */}
        {isPlaying && (
          <div className="flex items-center gap-0.5">
            <div className="w-0.5 bg-primary animate-pulse h-3" style={{ animationDuration: '0.6s' }} />
            <div className="w-0.5 bg-primary animate-pulse h-4" style={{ animationDuration: '0.8s', animationDelay: '0.1s' }} />
            <div className="w-0.5 bg-primary animate-pulse h-2" style={{ animationDuration: '0.7s', animationDelay: '0.2s' }} />
          </div>
        )}

        {/* Hidden Audio Element */}
        <audio
          ref={audioRef}
          src={audioSrc}
          loop
          preload="auto"
        />
      </div>
    </div>
  );
}
