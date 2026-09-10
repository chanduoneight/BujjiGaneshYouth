import { useEffect, useState } from "react";
import logo from "@/assets/logo.jpg";

export function CoinFlipLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Start exit animation after 1.8 seconds
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 1800);

    // Hide the loader after 2 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`coin-loader-overlay ${isExiting ? "exiting" : ""}`}>
      {/* Background glow */}
      <div className="coin-bg-glow" />
      
      {/* Floating particles */}
      <div className="coin-particles">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="coin-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="coin-flip-container">
        <div className="coin">
          <div className="coin-side coin-front">
            <img src={logo} alt="Bujji Ganesh Youth Logo" className="w-full h-full object-cover rounded-full" />
          </div>
          <div className="coin-side coin-back">
            <img src={logo} alt="Bujji Ganesh Youth Logo" className="w-full h-full object-cover rounded-full" />
          </div>
        </div>
      </div>
      <style>{`
        .coin-loader-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          background-image: linear-gradient(160deg, oklch(0.34 0.11 27), oklch(0.24 0.08 30));
          transition: opacity 0.3s ease-out;
        }
        
        .coin-loader-overlay.exiting {
          opacity: 0;
        }
        
        .coin-bg-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at 50% 50%,
            oklch(0.85 0.14 78 / 0.3),
            oklch(0.79 0.12 84 / 0.15) 40%,
            transparent 70%
          );
          animation: coin-glow-pulse 3s ease-in-out infinite;
        }
        
        .coin-particles {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        
        .coin-particle {
          position: absolute;
          bottom: -10px;
          width: 3px;
          height: 3px;
          background: oklch(0.79 0.12 84);
          border-radius: 50%;
          box-shadow: 0 0 6px oklch(0.79 0.12 84);
          animation: coin-particle-rise linear infinite;
        }
        
        @keyframes coin-particle-rise {
          0% {
            opacity: 0;
            transform: translateY(0) translateX(0);
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(-100vh) translateX(calc(-20px + 40px * 0.5));
          }
        }
        
        @keyframes coin-glow-pulse {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
        }

        .coin-flip-container {
          perspective: 1000px;
          width: 280px;
          height: 280px;
          position: relative;
          z-index: 1;
        }

        .coin {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: coinFlip 2s ease-in-out forwards;
        }

        .coin-side {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 50%;
          overflow: hidden;
          box-shadow: 
            0 0 40px oklch(0.79 0.12 84 / 0.6),
            0 0 80px oklch(0.79 0.12 84 / 0.4),
            0 20px 60px oklch(0.1 0 0 / 0.5);
          border: 6px solid oklch(0.79 0.12 84 / 0.9);
        }

        .coin-front {
          transform: rotateY(0deg);
        }

        .coin-back {
          transform: rotateY(180deg);
        }

        @keyframes coinFlip {
          0% {
            transform: rotateY(0deg) rotateX(0deg);
          }
          50% {
            transform: rotateY(180deg) rotateX(5deg);
          }
          100% {
            transform: rotateY(360deg) rotateX(0deg);
          }
        }

        @media (max-width: 640px) {
          .coin-flip-container {
            width: 200px;
            height: 200px;
          }
          
          .coin-particle {
            display: none;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .coin {
            animation: none;
          }
          
          .coin-bg-glow,
          .coin-particle {
            display: none;
          }
          
          .coin-loader-overlay {
            transition-duration: 0.15s;
          }
        }
      `}</style>
    </div>
  );
}
