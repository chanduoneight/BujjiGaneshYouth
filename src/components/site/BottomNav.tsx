import { Link, useLocation } from "@tanstack/react-router";
import {
  Home,
  Info,
  PartyPopper,
  Images,
  Users,
  Phone,
} from "lucide-react";
import { navLinks } from "@/components/site/nav-links";
import { useLang } from "@/i18n/language";

const navIcons: Record<string, typeof Home> = {
  "/": Home,
  "/about": Info,
  "/events": PartyPopper,
  "/gallery": Images,
  "/committee": Users,
  "/contact": Phone,
};

export function BottomNav() {
  const { t } = useLang();
  const location = useLocation();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-gold/40 bg-background/95 backdrop-blur-xl shadow-[0_-4px_20px_rgba(0,0,0,0.08)] pb-[calc(env(safe-area-inset-bottom)+6px)] pt-2 px-1 lg:hidden"
      aria-label="Bottom mobile navigation"
    >
      <div className="mx-auto flex max-w-lg items-center justify-around gap-0.5 sm:gap-1">
        {navLinks.map((link) => {
          const Icon = navIcons[link.to] ?? Home;
          const isExactHome = link.to === "/";
          const isActive = isExactHome
            ? location.pathname === "/" || location.pathname === ""
            : location.pathname.startsWith(link.to);

          return (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: isExactHome }}
              className={`group flex min-w-0 flex-1 flex-col items-center justify-center rounded-2xl py-1.5 px-1 transition-all duration-200 active:scale-95 ${
                isActive
                  ? "gradient-saffron text-primary-foreground font-bold shadow-md shadow-amber-500/25 ring-1 ring-gold/50"
                  : "text-foreground/75 hover:bg-gold/10 hover:text-maroon font-medium"
              }`}
            >
              <Icon
                className={`h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:scale-110 ${
                  isActive ? "text-primary-foreground" : "text-maroon/80"
                }`}
                aria-hidden="true"
              />
              <span
                className={`mt-0.5 truncate text-[10px] sm:text-[11px] leading-tight ${
                  isActive ? "text-primary-foreground font-bold" : "text-foreground/80"
                }`}
              >
                {t(link.key)}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

