import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/components/nyg/HeroSection";
import { ApproachSection } from "@/components/nyg/ApproachSection";
import { WorkSection } from "@/components/nyg/WorkSection";
import { FooterSection } from "@/components/nyg/FooterSection";
import { getSiteUrl } from "@/lib/seo";

const SITE_URL = getSiteUrl();
const PAGE_TITLE = "NYG Digital | Business Automation & Web Systems";
const PAGE_DESC =
  "NYG Digital builds the systems that remove manual work from lead follow-up, scheduling, and reporting for real estate agencies and facility services in Dubai.";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      {
        name: "keywords",
        content:
          "NYG Digital, business automation, n8n workflow automation, web development, Dubai systems, real estate automation, facility management automation, API integrations",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESC },
      { property: "og:url", content: SITE_URL },
      { property: "og:type", content: "website" },
      { property: "og:image", content: `${SITE_URL}/og-image.jpg` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESC },
      { name: "twitter:image", content: `${SITE_URL}/og-image.jpg` },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "ProfessionalService",
              "@id": `${SITE_URL}#service`,
              name: "NYG Digital",
              url: SITE_URL,
              description: PAGE_DESC,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Dubai",
                addressCountry: "AE",
              },
            },
            {
              "@type": "WebSite",
              "@id": `${SITE_URL}#website`,
              url: SITE_URL,
              name: "NYG Digital",
              publisher: { "@id": `${SITE_URL}#service` },
            },
          ],
        }),
      },
    ],
  }),
});

function Home() {
  return (
    <div className="relative min-h-screen bg-surface-base text-text-primary overflow-x-clip">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-5 focus:py-3 focus:bg-[--color-accent] focus:text-surface-base focus:rounded-full focus-ring font-mono text-xs uppercase tracking-widest font-semibold inline-flex items-center min-h-[44px]"
      >
        Skip to main content
      </a>

      <main id="main-content" tabIndex={-1} className="outline-none">
        {/* SECTION 1: HERO */}
        <HeroSection />

        {/* SECTION 2: APPROACH */}
        <ApproachSection />

        {/* SECTION 3: SELECTED WORK */}
        <WorkSection />
      </main>

      <FooterSection />
    </div>
  );
}

export default Home;
