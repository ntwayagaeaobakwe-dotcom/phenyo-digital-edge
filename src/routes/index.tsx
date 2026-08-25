import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/components/nyg/HeroSection";
import { LiquidScrollBackground } from "@/components/nyg/LiquidScrollBackground";
import { SystemStudio } from "@/components/portfolio/SystemStudio";
import { BottleneckConfigurator } from "@/components/portfolio/BottleneckConfigurator";
import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { CapabilitySection } from "@/components/portfolio/CapabilitySection";
import { EngagementBlueprint } from "@/components/portfolio/EngagementBlueprint";
import { ContactSection } from "@/components/portfolio/ContactSection";
import { FooterSection } from "@/components/nyg/FooterSection";
import { getSiteUrl } from "@/lib/seo";
import { COMPANY_INFO } from "@/data/portfolio-data";

const SITE_URL = getSiteUrl();
const PAGE_TITLE = "NYG Digital | Software Development & Systems Consultancy";
const PAGE_DESC =
  "NYG Digital (NYG Digital FZE LLC) is a software-development and computer-systems consultancy registered in Ajman, UAE. We design business automation, workflow tools, connected systems, digital platforms and conversion-focused websites.";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      {
        name: "keywords",
        content:
          "NYG Digital, NYG Digital FZE LLC, software development, computer systems consultancy, business automation, n8n workflows, connected systems, digital platforms, UAE automation, Ajman, Dubai",
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
              "@type": "Organization",
              "@id": `${SITE_URL}#organization`,
              name: COMPANY_INFO.brandName,
              legalName: COMPANY_INFO.legalName,
              foundingDate: COMPANY_INFO.foundedDate,
              url: SITE_URL,
              description: COMPANY_INFO.description,
              areaServed: {
                "@type": "Country",
                name: COMPANY_INFO.areaServed,
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: COMPANY_INFO.registeredLocality,
                addressRegion: COMPANY_INFO.registeredLocality,
                addressCountry: "AE",
              },
            },
            {
              "@type": "ProfessionalService",
              "@id": `${SITE_URL}#service`,
              name: COMPANY_INFO.brandName,
              legalName: COMPANY_INFO.legalName,
              url: SITE_URL,
              description: PAGE_DESC,
              parentOrganization: { "@id": `${SITE_URL}#organization` },
              areaServed: {
                "@type": "Country",
                name: COMPANY_INFO.areaServed,
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: COMPANY_INFO.registeredLocality,
                addressRegion: COMPANY_INFO.registeredLocality,
                addressCountry: "AE",
              },
            },
            {
              "@type": "WebSite",
              "@id": `${SITE_URL}#website`,
              url: SITE_URL,
              name: COMPANY_INFO.brandName,
              publisher: { "@id": `${SITE_URL}#organization` },
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

        {/* STAGE 6: ENGAGEMENT BLUEPRINT */}
        <EngagementBlueprint />

        {/* STAGE 7: CONTACT CONVERSION */}
        <ContactSection />
      </main>

      <FooterSection />
    </div>
  );
}

export default Home;
