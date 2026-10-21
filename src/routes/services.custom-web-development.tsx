import { createFileRoute } from "@tanstack/react-router";
import { IntentPage } from "@/components/marketing/IntentPage";
import { MARKETING_PAGES } from "@/data/web-agency-content";
import { marketingPageHead } from "@/lib/marketing-seo";
const page = MARKETING_PAGES.customDevelopment;
export const Route = createFileRoute("/services/custom-web-development")({
  component: () => <IntentPage page={page} />,
  head: () => marketingPageHead(page),
});
