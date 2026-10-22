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
    "The enquiry form sends the details you submit to the Cloudflare-hosted website endpoint. The server validates the details, applies rate limits, and stores accepted inquiries in a Cloudflare D1 database before showing a success message. It then attempts and retries forwarding the inquiry to NYG Digital's n8n workflow for Google Sheets synchronization and any separately configured notification. A success message confirms durable receipt by the website; it does not confirm that an email or other notification reached an inbox. If you use the prepared email option, your email provider processes the message after you choose to send it. If you choose WhatsApp, that service processes your interaction under its own privacy terms.",
  ],
  [
    "Website visits and browser storage",
    "Cloudflare hosts and delivers this website and may process technical information, including IP addresses and request information, to deliver and protect it. Cloudflare Insights measures website performance. Google Analytics 4 is loaded only if a visitor allows optional analytics; it measures page visits and confirmed enquiry events with non-personal service and page categories. The name, email address, phone number and message submitted in the enquiry form are not sent to Google. See Cookies & Storage to review or change the choice.",
  ],
  [
    "Purpose and service providers",
    "Enquiry information is used to respond, discuss requirements and manage related business correspondence. Cloudflare processes requests to host and protect the website and stores accepted inquiries in D1. n8n and Google Sheets may process inquiries for workflow handling and lead management; any notification provider is a separate step. Hosting, spreadsheet, email and communication providers may process information outside the UAE. Sending an enquiry is not a signup for marketing messages.",
  ],
  [
    "Retention and your requests",
    "Retention depends on the purpose of the correspondence, whether a project follows, and applicable record-keeping requirements. Contact support@nygagency.com to ask about information held about you, request correction or deletion, or raise a privacy concern. Any applicable identity checks, legal requirements and exceptions will be considered when responding.",
  ],
  [
    "Changes",
    "This notice describes the current website, inquiry workflow and consent-gated analytics. It should be updated if enquiry handling, tracking or service providers change. Last updated: 22 October 2026.",
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
