import type { ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function ScrollReveal({
  children,
  variant = "fade-up",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  variant?: "fade-up" | "fade-in" | "scale-in" | "slide-left" | "slide-right";
  delay?: number;
  className?: string;
}) {
  const { ref, isVisible } = useScrollReveal();

  const variantClasses = {
    "fade-up": "reveal-fade-up",
    "fade-in": "reveal-fade-in",
    "scale-in": "reveal-scale-in",
    "slide-left": "reveal-slide-left",
    "slide-right": "reveal-slide-right",
  };

  return (
    <div
      ref={ref}
      className={`${variantClasses[variant]} ${isVisible ? "is-visible" : ""} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
