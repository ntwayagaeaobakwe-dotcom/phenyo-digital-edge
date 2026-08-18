import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/components/nyg/HeroSection";
import { LiquidScrollBackground } from "@/components/nyg/LiquidScrollBackground";
import { SystemStudio } from "@/components/portfolio/SystemStudio";
import { BottleneckConfigurator } from "@/components/portfolio/BottleneckConfigurator";
import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { CapabilitySection } from "@/components/portfolio/CapabilitySection";
import { RoiCalculator } from "@/components/portfolio/RoiCalculator";
import { ContactSection } from "@/components/portfolio/ContactSection";
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
      { property: "og:image", content: `${SITE_URL}/og-image.png` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESC },
      { name: "twitter:image", content: `${SITE_URL}/og-image.png` },
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
    <div className="relative min-h-screen bg-[#080A09] text-[#080A09] selection:bg-[#082D2D] selection:text-[#5FD8CD]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3.5 focus:bg-[#F3F0E8] focus:text-[#080A09] focus:rounded-full focus-ring font-mono text-xs uppercase tracking-wider font-semibold inline-flex items-center min-h-[44px] shadow-lg border border-[rgba(8,45,45,0.2)]"
      >
        Skip to main content
      </a>

      {/* Persistent Liquid Digital Wall Atmosphere */}
      <LiquidScrollBackground />

      <main id="main-content" tabIndex={-1} className="outline-none relative z-10">
        {/* STAGE 1: HERO WITH SCROLL-SCRUBBED CINEMATIC VIDEO */}
        <HeroSection />

        {/* STAGE 2: SYSTEM STUDIO */}
        <SystemStudio />

        {/* STAGE 3: BOTTLENECK CONFIGURATOR */}
        <BottleneckConfigurator />

        {/* STAGE 4: CASE STUDIES */}
        <ProjectsSection />

        {/* STAGE 5: CREDIBILITY & DELIVERY */}
        <CapabilitySection />

        {/* STAGE 6: ROI ESTIMATOR */}
        <RoiCalculator />

        {/* STAGE 7: CONTACT CONVERSION */}
        <ContactSection />
      </main>

      <FooterSection />
    </div>
  );
}

export default Home;
