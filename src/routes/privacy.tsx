import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/nyg/PolicyPage";
const sections = [
  [
    "Who we are",
    "NYG Digital is operated by NYG Digital FZE LLC, registered in Ajman NuVentures Centre Free Zone, United Arab Emirates. Contact support@nygagency.com for privacy questions or requests.",
  ],
  [
    "Information involved",
    "When you contact us, your correspondence may include your name, email address, selected service and project description. Please share only information needed to discuss your project. Do not include passwords, identity documents or sensitive customer records in an initial enquiry.",
  ],
  [
    "How the enquiry form works",
    "The enquiry form sends the details you submit to the Cloudflare-hosted website endpoint. While the n8n production workflow is not configured, the endpoint rejects online submissions and does not forward them; the form keeps your details available so you can retry or choose a direct contact option. When online submission is enabled, the server validates the details and forwards accepted inquiries to NYG Digital's n8n workflow for recording in Google Sheets and a separate email notification attempt. A success message means the workflow confirmed the inquiry was recorded; it does not confirm delivery of the notification to an inbox. If you use the prepared email option, your email provider processes the message after you choose to send it. If you choose WhatsApp, that service processes your interaction under its own privacy terms.",
  ],
  [
    "Website visits and browser storage",
    "Cloudflare hosts and delivers this website and may process technical information, including IP addresses and request information, to deliver and protect it. The live site also loads a Cloudflare Insights beacon for analytics and performance measurement. The site uses temporary session storage to carry a selected business challenge into the enquiry form. See our Cookies & Storage page for details.",
  ],
  [
    "Purpose and service providers",
    "Enquiry information is used to respond, discuss requirements and manage related business correspondence. Cloudflare processes requests to host and protect the website. If the online workflow is enabled, n8n, Google Sheets and the email provider configured for notifications process the inquiry as part of that workflow. Hosting, spreadsheet, email and communication providers may process information outside the UAE. Sending an enquiry is not a signup for marketing messages.",
  ],
  [
    "Retention and your requests",
    "Retention depends on the purpose of the correspondence, whether a project follows, and applicable record-keeping requirements. Contact support@nygagency.com to ask about information held about you, request correction or deletion, or raise a privacy concern. Any applicable identity checks, legal requirements and exceptions will be considered when responding.",
  ],
  [
    "Changes",
    "This notice describes the current website and the conditional inquiry workflow. It should be updated if enquiry handling, tracking or service providers change. Last updated: 22 October 2026.",
  ],
] as const;
export const Route = createFileRoute("/privacy")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Privacy Policy | NYG Digital" },
      {
        name: "description",
        content: "How NYG Digital handles website visits and project enquiries.",
      },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: "https://nygagency.com/privacy" }],
  }),
});
function Page() {
  return (
    <PolicyPage
      title="Privacy Policy"
      intro="How NYG Digital handles website visits and project enquiries."
      sections={sections}
    />
  );
}
