import { useEffect, useState } from "react";

interface Particle {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
}

export function FestivalParticles({ count = 25 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particles with random properties
    const generated = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 6, // 8-14s
      size: 2 + Math.random() * 3, // 2-5px
      opacity: 0.3 + Math.random() * 0.4, // 0.3-0.7
    }));
    setParticles(generated);
  }, [count]);

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      aria-hidden="true"
      style={{ zIndex: 1 }}
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="animate-float-up absolute bottom-0"
          style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        >
          <div
            className="rounded-full bg-gold"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              boxShadow: `0 0 ${particle.size * 2}px var(--color-gold)`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
