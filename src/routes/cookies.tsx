import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/nyg/PolicyPage";
import { openAnalyticsSettings } from "@/lib/analytics";
const sections = [
  [
    "Current website features",
    "The application uses session storage named pendingIndustryContext to remember a business challenge you select and insert it into the enquiry form. The form removes that value when it reads it. Session storage is generally cleared when the browsing session ends.",
  ],
  [
    "Hosting and security",
    "Cloudflare delivers and protects the site. Depending on the security features applied to a request, infrastructure cookies or technical request processing may be involved. Browser storage can be inspected or cleared using your browser settings.",
  ],
  [
    "Advertising and analytics",
    "The site uses Cloudflare Insights for website performance measurement. Google Analytics 4 may also measure page visits and confirmed enquiries only after you choose Allow analytics in the privacy prompt. The Google tag is not loaded when you choose Essential only. GA4 receives a controlled service category, page path and form type for a confirmed enquiry; names, email addresses, phone numbers and message contents are not sent. Google Analytics advertising features and enhanced measurement are disabled.",
  ],
  [
    "Your choices",
    "Your optional analytics choice is stored in this browser so the preference can be remembered. You can change it at any time using the control below, or clear the site’s local storage in your browser. Questions about storage or privacy can be sent to support@nygagency.com. Last updated: 22 October 2026.",
  ],
] as const;
export const Route = createFileRoute("/cookies")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Cookies & Storage | NYG Digital" },
      {
        name: "description",
        content: "How browser storage and external services relate to this website.",
      },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: "https://nygagency.com/cookies" }],
  }),
});
function Page() {
  return (
    <PolicyPage
      title="Cookies & Storage"
      intro="How browser storage and external services relate to this website."
      sections={sections}
      footerAction={
        <button type="button" onClick={openAnalyticsSettings}>
          Change analytics preference
        </button>
      }
    />
  );
}
