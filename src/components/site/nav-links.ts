import type { dictionary } from "@/i18n/language";

export type NavLink = { to: string; key: keyof typeof dictionary };

export const navLinks: NavLink[] = [
  { to: "/", key: "home" },
  { to: "/about", key: "about" },
  { to: "/events", key: "events" },
  { to: "/gallery", key: "gallery" },
  { to: "/committee", key: "committee" },
  { to: "/contact", key: "contact" },
];

export const primaryMobileLinks: NavLink[] = [
  { to: "/", key: "home" },
  { to: "/events", key: "events" },
  { to: "/gallery", key: "gallery" },
];

export const moreMobileLinks: NavLink[] = [
  { to: "/about", key: "about" },
  { to: "/committee", key: "committee" },
  { to: "/contact", key: "contact" },
];
