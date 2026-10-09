import { createFileRoute } from "@tanstack/react-router";
import { PolicyPage } from "@/components/nyg/PolicyPage";
const sections = [
  [
    "Before a project starts",
    "An enquiry through this website is not a purchase. The website does not take checkout payments. Payment schedules, deposits, cancellation arrangements and any refund terms should be confirmed in your written project agreement before payment.",
  ],
  [
    "Requesting a cancellation or change",
    "Email support@nygagency.com with your project reference and requested change. Avoid including card details or other sensitive payment information. The request can then be reviewed against the agreed scope, work completed and any third-party commitments.",
  ],
  [
    "Refund arrangements",
    "There is no blanket refund percentage or non-refundable deposit rule stated on this website. Any refund entitlement or amount depends on the applicable agreement and legal rights. Do not assume that submitting a cancellation request automatically cancels an external subscription or supplier commitment.",
  ],
  [
    "Questions before payment",
    "If cancellation or refund arrangements are unclear in a proposal, request written clarification before approving or paying for the project. Nothing on this page removes rights available under applicable law. Last updated: 13 September 2026.",
  ],
] as const;
export const Route = createFileRoute("/cancellations")({
  component: Page,
  head: () => ({
    meta: [
      { title: "Cancellations & Refunds | NYG Agency" },
      {
        name: "description",
        content: "How to discuss changes, cancellations and refund requests.",
      },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: "https://nygagency.com/cancellations" }],
  }),
});
function Page() {
  return (
    <PolicyPage
      title="Cancellations & Refunds"
      intro="How to discuss changes, cancellations and refund requests."
      sections={sections}
    />
  );
}
