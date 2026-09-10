import { Link } from "@tanstack/react-router";
import { Home, Images, MoreHorizontal, PartyPopper } from "lucide-react";
import { useState } from "react";

import { moreMobileLinks, primaryMobileLinks } from "@/components/site/nav-links";
import { useLang } from "@/i18n/language";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const icons: Record<string, typeof Home> = {
  "/": Home,
  "/events": PartyPopper,
  "/gallery": Images,
};

export function BottomNav() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="border-gold/40 bg-background/95 fixed inset-x-0 bottom-0 z-50 border-t pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden"
      aria-label="Quick navigation"
    >
      <ul className="mx-auto grid max-w-md grid-cols-4">
        {primaryMobileLinks.map((link) => {
          const Icon = icons[link.to] ?? Home;
          return (
            <li key={link.to}>
              <Link
                to={link.to}
                activeOptions={{ exact: link.to === "/" }}
                activeProps={{ "data-current": "true" }}
                className="text-muted-foreground data-[current=true]:text-primary flex min-h-14 flex-col items-center justify-center gap-1 text-[11px] font-medium"
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                <span className="max-w-full truncate px-1">{t(link.key)}</span>
              </Link>
            </li>
          );
        })}
        <li>
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger className="text-muted-foreground flex min-h-14 w-full flex-col items-center justify-center gap-1 text-[11px] font-medium">
              <MoreHorizontal className="h-5 w-5" aria-hidden="true" />
              <span>{t("more")}</span>
            </DrawerTrigger>
            <DrawerContent className="bg-background">
              <DrawerHeader>
                <DrawerTitle className="text-maroon font-display">{t("more")}</DrawerTitle>
              </DrawerHeader>
              <ul className="grid gap-1 px-4 pb-8">
                {moreMobileLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      onClick={() => setOpen(false)}
                      activeProps={{ "data-current": "true" }}
                      className="hover:bg-accent data-[current=true]:bg-accent data-[current=true]:text-maroon flex min-h-12 items-center rounded-xl px-4 text-base font-medium"
                    >
                      {t(link.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </DrawerContent>
          </Drawer>
        </li>
      </ul>
    </nav>
  );
}
