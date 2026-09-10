import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  as: As = "h2",
  className,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <header
      className={cn("mb-8", align === "center" ? "text-center" : "text-left", className)}
    >
      {eyebrow ? (
        <p className="text-primary mb-2 text-sm font-semibold tracking-[0.2em] uppercase">
          {eyebrow}
        </p>
      ) : null}
      <As className="text-maroon text-2xl leading-tight font-semibold sm:text-3xl md:text-4xl">
        {title}
      </As>
      {subtitle ? (
        <p
          className={cn(
            "text-muted-foreground mt-3 text-base leading-relaxed",
            align === "center" && "mx-auto max-w-2xl",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}
