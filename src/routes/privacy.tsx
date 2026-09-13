import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/nyg/PolicyPage";
const sections = [
  [
    "Who we are",
    "NYG Agency is the trading brand of NYG Digital FZE LLC, registered in Ajman NuVentures Centre Free Zone, United Arab Emirates. Contact support@nygagency.com for privacy questions or requests.",
  ],
  [
    "Information involved",
    "When you contact us, your correspondence may include your name, email address, selected service and project description. Please share only information needed to discuss your project. Do not include passwords, identity documents or sensitive customer records in an initial enquiry.",
  ],
  [
    "How the enquiry form works",
    "The website currently prepares a message in your email application. Preparing the message does not send it to NYG; you review and send it yourself. Your email provider processes the message when you send it. If you choose WhatsApp, that service processes your interaction under its own privacy terms.",
  ],
  [
    "Website visits and browser storage",
    "Cloudflare hosts and delivers this website and may process technical information, including IP addresses and request information, to deliver and protect it. The live site also loads a Cloudflare Insights beacon for analytics and performance measurement. The site uses temporary session storage to carry a selected business challenge into the enquiry form. See our Cookies & Storage page for details.",
  ],
  [
    "Purpose and service providers",
    "Enquiry information is used to respond, discuss requirements and manage related business correspondence. Hosting, email and communication providers may process information as part of providing these services, potentially outside the UAE. Sending an enquiry is not a signup for marketing messages.",
  ],
  [
    "Retention and your requests",
    "Retention depends on the purpose of the correspondence, whether a project follows, and applicable record-keeping requirements. Contact support@nygagency.com to ask about information held about you, request correction or deletion, or raise a privacy concern. Any applicable identity checks, legal requirements and exceptions will be considered when responding.",
  ],
  [
    "Changes",
    "This notice describes the current website. It should be updated if enquiry handling, tracking or service providers change. Last updated: 13 September 2026.",
  ],
] as const;
export const Route = createFileRoute("/privacy")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Privacy Policy | NYG Agency" },
      {
        name: "description",
        content: "How NYG Agency handles website visits and project enquiries.",
      },
    ],
    links: [{ rel: "canonical", href: "https://nygagency.com/privacy" }],
  }),
});
function Page() {
  return (
    <PolicyPage
      title="Privacy Policy"
      intro="How NYG Agency handles website visits and project enquiries."
      sections={sections}
    />
  );
}
