import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useLocation,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import * as Sentry from "@sentry/tanstackstart-react";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { getSiteUrl } from "@/lib/seo";
import { trackPageView } from "@/lib/analytics";
import { AnalyticsConsent } from "@/components/nyg/AnalyticsConsent";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-gradient-gold">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This page doesn't exist. Head back to home.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
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
    Sentry.withScope((scope) => {
      scope.setTag("boundary", "tanstack_root_error_component");
      Sentry.captureException(error, {
        mechanism: { type: "react", handled: true },
      });
    });
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">Try refreshing.</p>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

const ROOT_SITE_URL = getSiteUrl();

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0B0C0E" },
      { title: "Web Design & Development Agency | NYG Digital" },
      {
        name: "description",
        content:
          "NYG Digital designs business websites, redesigns outdated sites, and builds booking and enquiry experiences for UAE and international clients.",
      },
      {
        name: "robots",
        content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "NYG Digital" },
      { property: "og:locale", content: "en_AE" },
      // Default OG/Twitter image — generated preview banner (public/og-image.png).
      { property: "og:image", content: `${ROOT_SITE_URL}/og-image.png` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "NYG Digital web design and development agency",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `${ROOT_SITE_URL}/og-image.png` },
      {
        name: "twitter:image:alt",
        content: "NYG Digital web design and development agency",
      },
    ],
    links: [
      // Fonts are self-hosted via @fontsource-variable imports in styles.css —
      // no external font CDN.
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon.ico", sizes: "16x16 32x32 48x48" },
      { rel: "icon", href: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en-AE">
      <head>
        <HeadContent />
      </head>
      <body>
        <div
          hidden
          dangerouslySetInnerHTML={{
            __html:
              "<!-- NYG Digital: web design and development for established businesses. Carbon and platinum identity, clear customer journeys, verified work, and direct project enquiries. -->",
          }}
        />
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useLocation({ select: (location) => location.pathname });

  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster position="top-right" />
      <AnalyticsConsent />
    </QueryClientProvider>
  );
}
