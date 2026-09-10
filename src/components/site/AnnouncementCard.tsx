import { AlertTriangle } from "lucide-react";

import { announcementCategories, type Announcement } from "@/data/content";
import { useLang } from "@/i18n/language";
import { cn } from "@/lib/utils";

export function AnnouncementCard({ item }: { item: Announcement }) {
  const { t, b, lang } = useLang();
  const category = announcementCategories.find((c) => c.id === item.category);
  const date = new Date(item.date).toLocaleDateString(lang === "te" ? "te-IN" : "en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <article
      className={cn(
        "surface-card h-full p-5 transition-shadow hover:shadow-lift",
        item.important && "border-primary/60 bg-accent/40 border-2",
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-xs font-semibold">
          {category ? b(category.label) : item.category}
        </span>
        {item.important ? (
          <span className="gradient-saffron text-primary-foreground inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold">
            <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
            {t("important")}
          </span>
        ) : null}
        <time className="text-muted-foreground ml-auto text-xs" dateTime={item.date}>
          {date}
        </time>
      </div>
      <h3 className="text-maroon font-display mt-3 text-lg font-semibold">{b(item.title)}</h3>
      <p className="text-foreground/80 mt-2 text-sm leading-relaxed">{b(item.description)}</p>
    </article>
  );
}
