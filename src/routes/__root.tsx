import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { LanguageProvider } from "@/i18n/language";
import { SiteLayout } from "@/components/site/SiteLayout";
import { GaneshaSketchLoader } from "@/components/effects/GaneshaSketchLoader";
import { RotatingSacredOrbits } from "@/components/effects/RotatingSacredOrbits";
import { DevotionalPetals } from "@/components/effects/DevotionalPetals";

function NotFoundComponent() {
  const location = useLocation();
  const router = useRouter();

  useEffect(() => {
    const rawPath = location.pathname;
    const lowerPath = rawPath.toLowerCase().replace(/\/$/, "");
    if (lowerPath === "/home" || lowerPath === "") {
      router.navigate({ to: "/", replace: true });
    } else if (["/about", "/events", "/gallery", "/committee", "/contact"].includes(lowerPath)) {
      router.navigate({ to: lowerPath as any, replace: true });
    }
  }, [location.pathname, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Bujji Ganesh Youth | SRP Committee Kurrollu | Ganesh Festival" },
      {
        name: "description",
        content:
          "Official website of Bujji Ganesh Youth — SRP Committee Kurrollu. View our Ganesh festival events, gallery and committee members.",
      },
      { name: "author", content: "Bujji Ganesh Youth — SRP Committee Kurrollu" },
      { name: "theme-color", content: "#b04a12" },
      
      /* Open Graph / Facebook */
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Bujji Ganesh Youth" },
      { property: "og:title", content: "Bujji Ganesh Youth | SRP Committee Kurrollu" },
      { property: "og:description", content: "Celebrating Ganesh Chaturthi 2026 with devotion, culture and community in Kurrollu Village" },
      { property: "og:image", content: "/logo.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      
      /* Twitter */
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Bujji Ganesh Youth | SRP Committee Kurrollu" },
      { name: "twitter:description", content: "Celebrating Ganesh Chaturthi 2026 with devotion, culture and community" },
      { name: "twitter:image", content: "/logo.jpg" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Black+Ops+One&family=Cinzel+Decorative:wght@700;900&family=Marcellus&family=Mukta:wght@400;500;600;700;800&family=Noto+Sans+Telugu:wght@400;500;600;700;800&family=Noto+Serif+Telugu:wght@500;600;700;900&family=Russo+One&display=swap",
      },
      { rel: "icon", href: "/logo.jpg", type: "image/jpeg" },
      { rel: "apple-touch-icon", href: "/logo.jpg" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const location = useLocation();

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        {/* Re-triggers Shri Ganesha drawing animation on every page change */}
        <GaneshaSketchLoader key={location.pathname} />
        {/* Global background sacred geometry orbital wheel for all pages */}
        <RotatingSacredOrbits opacity={0.25} />
        {/* Global floating devotional petals (Marigold, Hibiscus, Durva grass) */}
        <DevotionalPetals count={18} isFixed />
        <SiteLayout>
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </SiteLayout>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

