import { Clock, MapPin } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { FestivalEvent } from "@/data/content";
import { useLang } from "@/i18n/language";

export function EventCard({
  event,
}: {
  event: FestivalEvent;
  showCalendar?: boolean;
}) {
  const { t, b, lang } = useLang();
  const [open, setOpen] = useState(false);
  const title = b(event.title);
  const location = b(event.location);
  const description = b(event.description);
  const dateLabel = new Date(event.date).toLocaleDateString(lang === "te" ? "te-IN" : "en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="surface-card group flex h-full flex-col overflow-hidden transition-all hover:shadow-lift hover:-translate-y-1 rounded-2xl border border-gold/20 hover:border-gold">
      <div className="relative aspect-[3/2] overflow-hidden">
        <img
          src={event.image}
          alt={title}
          loading="lazy"
          width={1200}
          height={800}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-maroon/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="gradient-maroon text-maroon-foreground absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold shadow-lg">
          {dateLabel}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-maroon font-display text-lg font-semibold group-hover:text-primary transition-colors">
          {title}
        </h3>
        <ul className="text-muted-foreground mt-2 space-y-1.5 text-sm">
          <li className="flex items-center gap-2">
            <Clock className="text-primary h-4 w-4 shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true" />
            <span>{b(event.time)}</span>
          </li>
          <li className="flex items-center gap-2 font-medium text-foreground/90">
            <MapPin className="text-primary h-4 w-4 shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true" />
            <span>{location}</span>
          </li>
        </ul>
        <p className="text-foreground/80 mt-3 flex-1 text-sm leading-relaxed">{description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button onClick={() => setOpen(true)} className="min-h-11 rounded-full transition-all hover:-translate-y-0.5 active:scale-95 w-full sm:w-auto px-6">
            {t("viewDetails")}
          </Button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-card max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-maroon font-display text-xl">{title}</DialogTitle>
            <DialogDescription className="text-foreground/80">{description}</DialogDescription>
          </DialogHeader>
          <img
            src={event.image}
            alt={title}
            loading="lazy"
            width={1200}
            height={800}
            className="aspect-[3/2] w-full rounded-xl object-cover"
          />
          <dl className="text-sm border-t border-border/40 pt-3 space-y-2">
            <div className="flex gap-2 py-1">
              <dt className="text-muted-foreground w-24 shrink-0 font-medium">Date:</dt>
              <dd className="font-semibold text-foreground">{dateLabel}</dd>
            </div>
            <div className="flex gap-2 py-1">
              <dt className="text-muted-foreground w-24 shrink-0 font-medium">Time:</dt>
              <dd className="font-semibold text-foreground">{b(event.time)}</dd>
            </div>
            <div className="flex gap-2 py-1">
              <dt className="text-muted-foreground w-24 shrink-0 font-medium">Venue:</dt>
              <dd className="font-bold text-maroon">{location}</dd>
            </div>
          </dl>
        </DialogContent>
      </Dialog>
    </article>
  );
}
