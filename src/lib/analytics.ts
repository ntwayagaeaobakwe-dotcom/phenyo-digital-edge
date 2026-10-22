const GA4_MEASUREMENT_ID = "G-NJJL7RPGJW";
const CONSENT_STORAGE_KEY = "nyg-analytics-consent";
const SCRIPT_ID = "nyg-google-analytics";
const OPEN_SETTINGS_EVENT = "nyg:open-analytics-settings";
let analyticsConfigured = false;

type ConsentChoice = "granted" | "denied" | null;
type GtagValue = string | number | boolean | Date | Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: ArrayLike<GtagValue>[];
    gtag?: (...args: GtagValue[]) => void;
  }
}

export function getAnalyticsConsent(): ConsentChoice {
  if (typeof window === "undefined") return null;
  const choice = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  return choice === "granted" || choice === "denied" ? choice : null;
}

export function openAnalyticsSettings(): void {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}

export function analyticsSettingsEventName(): string {
  return OPEN_SETTINGS_EVENT;
}

export function setAnalyticsConsent(granted: boolean): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CONSENT_STORAGE_KEY, granted ? "granted" : "denied");

  if (granted) {
    initializeAnalytics();
    trackPageView(window.location.pathname);
  } else {
    window.gtag?.("consent", "update", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  }
}

export function initializeAnalytics(): boolean {
  if (typeof window === "undefined" || getAnalyticsConsent() !== "granted") return false;

  window.dataLayer ??= [];
  window.gtag ??= function () {
    // Google’s documented gtag bootstrap queues the arguments object, not an array.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments);
  };

  if (analyticsConfigured) {
    window.gtag("consent", "update", { analytics_storage: "granted" });
    return true;
  }

  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("consent", "update", { analytics_storage: "granted" });
  window.gtag("js", new Date());
  window.gtag("config", GA4_MEASUREMENT_ID, { send_page_view: false });
  analyticsConfigured = true;

  if (!document.getElementById(SCRIPT_ID)) {
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
    document.head.append(script);
  }

  return true;
}

let lastPageView: string | null = null;

export function trackPageView(pathname: string): void {
  if (!initializeAnalytics()) return;

  const pagePath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (lastPageView === pagePath) return;
  lastPageView = pagePath;
  window.gtag?.("event", "page_view", {
    page_title: document.title,
    page_location: `${window.location.origin}${pagePath}`,
    page_path: pagePath,
  });
}

const CONTROLLED_SERVICES = new Set([
  "Website Design",
  "Website Redesign",
  "Custom Web Development",
  "Booking or Enquiry Website",
  "Website Performance or SEO Improvements",
  "Ongoing Website Improvements",
  "Supporting Automation or Integration",
  "Not sure — I’ll describe the requirement",
]);

const CONTROLLED_PATHS = new Set([
  "/",
  "/services/web-design",
  "/services/website-redesign",
  "/services/custom-web-development",
]);

const trackedLeadIds = new Set<string>();

export function trackAcceptedLead(submissionId: string, service: string, sourcePath: string): void {
  if (!initializeAnalytics() || trackedLeadIds.has(submissionId)) return;
  trackedLeadIds.add(submissionId);
  window.gtag?.("event", "generate_lead", {
    service_type: CONTROLLED_SERVICES.has(service) ? service : "other",
    originating_page: CONTROLLED_PATHS.has(sourcePath) ? sourcePath : "/",
    form_type: "contact",
  });
}
