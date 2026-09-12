import type { ReactNode } from "react";
import { useLocation } from "@tanstack/react-router";

import { AnnouncementBar } from "@/components/site/AnnouncementBar";
import { BottomNav } from "@/components/site/BottomNav";
import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";

export function SiteLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const isCommitteePage = location.pathname === "/committee";

  return (
    <div className="flex min-h-screen flex-col">
      {!isCommitteePage && <AnnouncementBar />}
      {!isCommitteePage && <Navbar />}
      <main id="main" className="flex-1 pb-24 lg:pb-0">
        {children}
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}

/** Standard inner page header used on every sub-page. */
export function PageHero({
  title,
  subtitle,
  kicker,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  kicker?: ReactNode;
}) {
  return (
    <section className="gradient-maroon text-maroon-foreground mandala-bg relative overflow-hidden">
      <div className="glow-halo animate-halo pointer-events-none absolute inset-0" aria-hidden="true" />
      {/* Subtle background glow */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 40%, oklch(0.79 0.12 84 / 0.15), transparent 70%)",
          animation: "glow-pulse 8s ease-in-out infinite",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-4 py-12 text-center sm:py-16">
        {kicker ? (
          <p 
            className="text-gold text-sm font-semibold tracking-[0.2em] uppercase"
            style={{ animation: "rise-in 0.5s ease-out both" }}
          >
            {kicker}
          </p>
        ) : null}
        <h1 
          className="font-display mt-2 text-3xl leading-tight font-semibold sm:text-4xl"
          style={{ animation: "rise-in 0.6s ease-out both 0.1s" }}
        >
          {title}
        </h1>
        {subtitle ? (
          <p 
            className="text-maroon-foreground/80 mx-auto mt-3 max-w-2xl text-base"
            style={{ animation: "rise-in 0.6s ease-out both 0.2s" }}
          >
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}
