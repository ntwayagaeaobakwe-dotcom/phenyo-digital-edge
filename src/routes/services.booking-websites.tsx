import { createFileRoute } from "@tanstack/react-router";
import { IntentPage } from "@/components/marketing/IntentPage";
import { MARKETING_PAGES } from "@/data/web-agency-content";
import { marketingPageHead } from "@/lib/marketing-seo";
const page = MARKETING_PAGES.bookingWebsites;
export const Route = createFileRoute("/services/booking-websites")({
  component: () => <IntentPage page={page} />,
  head: () => marketingPageHead(page),
});
