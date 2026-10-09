import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/nyg/PolicyPage";
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
    "The live website loads a Cloudflare Insights beacon for website analytics and performance measurement. Cloudflare processes technical information associated with those requests. No advertising pixel was identified in the reviewed application. External destinations such as WhatsApp, LinkedIn and Instagram have their own tracking and privacy practices when you visit them. This notice should be reviewed before adding trackers or third-party embeds.",
  ],
  [
    "Your choices",
    "You can clear site data or restrict cookies in your browser. Doing so may reset preferences or affect security checks. Questions about storage or privacy can be sent to support@nygagency.com. Last updated: 13 September 2026.",
  ],
] as const;
export const Route = createFileRoute("/cookies")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Cookies & Storage | NYG Agency" },
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
    />
  );
}
