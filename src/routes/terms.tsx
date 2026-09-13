import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/nyg/PolicyPage";
const sections = [
  [
    "Website operator",
    "This website is operated by NYG Digital FZE LLC, trading as NYG Agency, registered in Ajman NuVentures Centre Free Zone, United Arab Emirates. Questions can be sent to support@nygagency.com.",
  ],
  [
    "Information and enquiries",
    "The site describes our services, completed builds and capability demonstrations. Sending an enquiry does not confirm an order, a delivery date or a project price. Project scope, fees, milestones, responsibilities and support are to be agreed separately in writing.",
  ],
  [
    "Examples and results",
    "Demonstrations illustrate possible approaches. They are not guarantees of revenue, conversion rates, time savings or uninterrupted operation. Results depend on the agreed implementation, source data, external services and how a system is used.",
  ],
  [
    "Content and third-party services",
    "Website text, branding and media may be protected by intellectual-property rights. Contact us before reusing material beyond what applicable law permits. Links to other services are provided for convenience; those services have their own terms and privacy practices.",
  ],
  [
    "Responsible use",
    "Do not attempt unauthorised access, disrupt the website or submit malicious material. For a security concern, email support@nygagency.com with a description that does not expose private data.",
  ],
  [
    "Project agreements and applicable rights",
    "A signed project agreement sets the terms for paid services, including ownership of deliverables and cancellation arrangements. This page does not replace that agreement or limit rights that cannot lawfully be excluded. Last updated: 13 September 2026.",
  ],
] as const;
export const Route = createFileRoute("/terms")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Website Terms | NYG Agency" },
      {
        name: "description",
        content: "Information about using this website and arranging a project.",
      },
    ],
    links: [{ rel: "canonical", href: "https://nygagency.com/terms" }],
  }),
});
function Page() {
  return (
    <PolicyPage
      title="Website Terms"
      intro="Information about using this website and arranging a project."
      sections={sections}
    />
  );
}
