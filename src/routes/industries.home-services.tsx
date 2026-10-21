import { createFileRoute } from "@tanstack/react-router";
import { IntentPage } from "@/components/marketing/IntentPage";
import { MARKETING_PAGES } from "@/data/web-agency-content";
import { marketingPageHead } from "@/lib/marketing-seo";
const page = MARKETING_PAGES.homeServices;
export const Route = createFileRoute("/industries/home-services")({
  component: () => <IntentPage page={page} />,
  head: () => marketingPageHead(page),
});
