/**
 * SEO URL Helper
 *
 * Ensures canonical URLs, Open Graph URLs, social image URLs, and JSON-LD
 * identifiers always use a valid absolute public site URL.
 * SSR-safe and guards browser environment from unsafe `process` references.
 */

const DEFAULT_PROD_SITE_URL = "https://nygagency.com";
const DEFAULT_DEV_SITE_URL = "http://localhost:3000";

export function getSiteUrl(): string {
  // Check browser window origin first if running on client without custom env
  let rawUrl: string | undefined;

  // Safe check for Vite import.meta.env
  if (typeof import.meta !== "undefined" && import.meta.env) {
    rawUrl =
      (import.meta.env.VITE_SITE_URL as string | undefined) ||
      (import.meta.env.SITE_URL as string | undefined);
  }

  // Safe check for process.env (Node.js SSR environment)
  if (!rawUrl && typeof process !== "undefined" && process.env) {
    rawUrl = process.env.VITE_SITE_URL || process.env.SITE_URL;
  }

  // Client-side fallback if env variable was not set
  if (!rawUrl && import.meta.env.DEV && typeof window !== "undefined" && window.location?.origin) {
    rawUrl = window.location.origin;
  }

  // Sensible default fallback when no env or origin is found
  if (!rawUrl) {
    const isDev =
      typeof import.meta !== "undefined" && import.meta.env ? Boolean(import.meta.env.DEV) : false;
    rawUrl = isDev ? DEFAULT_DEV_SITE_URL : DEFAULT_PROD_SITE_URL;
  }

  // Format with protocol and strip trailing slashes
  if (!rawUrl.startsWith("http://") && !rawUrl.startsWith("https://")) {
    rawUrl = `https://${rawUrl}`;
  }

  return rawUrl.replace(/\/+$/, "");
}
