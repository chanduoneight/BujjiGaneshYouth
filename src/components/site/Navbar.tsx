import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState } from "react";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { LanguageToggle } from "@/components/site/LanguageToggle";
import { navLinks } from "@/components/site/nav-links";
import { festival } from "@/data/festival";
import { useLang } from "@/i18n/language";
import ganesha from "@/assets/ganesha-hero.jpg";

export function Navbar() {
  const { t, b } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-gold/40 bg-background/90 sticky top-0 z-50 border-b backdrop-blur-md">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4"
        aria-label="Main"
      >
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <span className="border-gold/60 h-11 w-11 shrink-0 overflow-hidden rounded-full border-2 shadow-gold">
            <img
              src={ganesha}
              alt="Bujji Ganesh Youth Logo"
              width={44}
              height={44}
              className="h-full w-full object-cover"
            />
          </span>
          <span className="min-w-0 leading-tight hidden sm:block">
            <span className="text-maroon block truncate font-display text-lg font-bold">
              {b(festival.committeeTitle)}
            </span>
            <span className="text-muted-foreground block truncate text-xs">
              {b(festival.committeeName)}
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                activeOptions={{ exact: link.to === "/" }}
                activeProps={{ "data-current": "true" }}
                className="text-foreground/80 hover:bg-accent hover:text-maroon data-[current=true]:gradient-saffron data-[current=true]:text-primary-foreground inline-flex min-h-10 items-center rounded-full px-3 text-sm font-medium transition-colors"
              >
                {t(link.key)}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LanguageToggle className="hidden sm:inline-flex" />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="border-gold/50 text-maroon inline-flex h-11 w-11 items-center justify-center rounded-full border lg:hidden"
              aria-label={t("menu")}
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </SheetTrigger>
            <SheetContent className="bg-background w-[85vw] max-w-sm">
              <SheetHeader>
                <SheetTitle className="text-maroon font-display">
                  {b(festival.committeeTitle)}
                </SheetTitle>
              </SheetHeader>
              <ul className="mt-2 flex flex-col gap-1 px-4 pb-6">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      onClick={() => setOpen(false)}
                      activeOptions={{ exact: link.to === "/" }}
                      activeProps={{ "data-current": "true" }}
                      className="hover:bg-accent data-[current=true]:bg-accent data-[current=true]:text-maroon flex min-h-12 items-center rounded-xl px-4 text-base font-medium transition-colors"
                    >
                      {t(link.key)}
                    </Link>
                  </li>
                ))}
                <li className="mt-4 px-1">
                  <LanguageToggle />
                </li>
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
