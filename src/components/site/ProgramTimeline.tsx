import { Sun } from "lucide-react";

import { dailyProgram, dayParts, type ProgramItem } from "@/data/content";
import { useLang } from "@/i18n/language";
import { cn } from "@/lib/utils";

export function ProgramTimeline({ highlightMinutes }: { highlightMinutes?: number }) {
  const { b } = useLang();

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {dayParts.map((part) => (
        <section key={part.id} className="surface-card p-5">
          <h3 className="text-primary flex items-center gap-2 text-sm font-semibold tracking-[0.15em] uppercase">
            <Sun className="h-4 w-4" aria-hidden="true" />
            {b(part.label)}
          </h3>
          <ol className="border-gold/50 mt-4 space-y-4 border-l-2 pl-5">
            {dailyProgram[part.id].map((item: ProgramItem) => {
              const upcoming =
                highlightMinutes !== undefined && item.minutes >= highlightMinutes;
              return (
                <li key={item.title.en} className="relative">
                  <span
                    className={cn(
                      "border-background absolute top-1.5 -left-[27px] h-3 w-3 rounded-full border-2",
                      upcoming ? "gradient-saffron" : "bg-muted-foreground/50",
                    )}
                    aria-hidden="true"
                  />
                  <p className="text-maroon text-sm font-semibold">{b(item.time)}</p>
                  <p className="text-foreground/85 text-base">{b(item.title)}</p>
                </li>
              );
            })}
          </ol>
        </section>
      ))}
    </div>
  );
}

/** Flat "Today's / Next program" list used on the homepage. */
export function TodayProgramList() {
  const { b } = useLang();
  const items = dayParts.flatMap((p) => dailyProgram[p.id]);

  return (
    <ol className="border-gold/50 mx-auto max-w-2xl space-y-5 border-l-2 pl-6">
      {items.map((item) => (
        <li key={item.title.en} className="relative">
          <span
            className="gradient-saffron border-background absolute top-1.5 -left-[31px] h-4 w-4 rounded-full border-2 shadow-gold"
            aria-hidden="true"
          />
          <p className="text-primary text-sm font-semibold">{b(item.time)}</p>
          <p className="text-foreground text-base font-medium">{b(item.title)}</p>
        </li>
      ))}
    </ol>
  );
}
