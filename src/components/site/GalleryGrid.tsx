import { X } from "lucide-react";
import { useState } from "react";

import type { GalleryPhoto } from "@/data/content";
import { useLang } from "@/i18n/language";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function GalleryGrid({ photos }: { photos: GalleryPhoto[] }) {
  const { b, lang } = useLang();
  const [active, setActive] = useState<GalleryPhoto | null>(null);

  return (
    <>
      <ul className="columns-2 gap-3 [column-fill:_balance] sm:columns-3 lg:columns-4">
        {photos.map((photo, i) => (
          <li key={photo.id} className="mb-3 break-inside-avoid">
            <button
              type="button"
              onClick={() => setActive(photo)}
              className="group border-gold/40 block w-full overflow-hidden rounded-2xl border shadow-soft"
              aria-label={b(photo.title)}
            >
              <img
                src={photo.image}
                alt={b(photo.title)}
                loading="lazy"
                width={1200}
                height={i % 3 === 0 ? 1200 : 800}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          </li>
        ))}
      </ul>

      <Dialog open={active !== null} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="bg-card max-w-3xl overflow-hidden p-0">
          {active ? (
            <figure>
              <DialogTitle className="sr-only">{b(active.title)}</DialogTitle>
              <img
                src={active.image}
                alt={b(active.title)}
                className="max-h-[70vh] w-full bg-black/5 object-contain"
              />
              <figcaption className="flex items-center justify-between gap-4 p-4">
                <span>
                  <span className="text-maroon font-display block text-base font-semibold">
                    {b(active.title)}
                  </span>
                  <time className="text-muted-foreground text-xs" dateTime={active.date}>
                    {new Date(active.date).toLocaleDateString(
                      lang === "te" ? "te-IN" : "en-IN",
                      { day: "numeric", month: "long", year: "numeric" },
                    )}
                  </time>
                </span>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="border-gold/50 text-maroon hover:bg-accent inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </figcaption>
            </figure>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
