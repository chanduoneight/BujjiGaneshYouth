import { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  rotation: number;
  size: number;
}

export function FloatingPetals({ count = 10 }: { count?: number }) {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 12 + Math.random() * 8, // 12-20s
      rotation: Math.random() * 360,
      size: 8 + Math.random() * 8, // 8-16px
    }));
    setPetals(generated);
  }, [count]);

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="animate-petal-fall absolute -top-4"
          style={{
            left: `${petal.left}%`,
            animationDelay: `${petal.delay}s`,
            animationDuration: `${petal.duration}s`,
            transform: `rotate(${petal.rotation}deg)`,
          }}
        >
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse
              cx="8"
              cy="8"
              rx="6"
              ry="3"
              fill="var(--color-saffron)"
              opacity="0.6"
            />
            <ellipse
              cx="8"
              cy="8"
              rx="3"
              ry="6"
              fill="var(--color-saffron)"
              opacity="0.6"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
