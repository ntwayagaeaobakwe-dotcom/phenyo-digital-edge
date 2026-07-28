import { lazy, Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { DemoSkeleton } from "@/components/portfolio/DemoSkeleton";
import { AboutSection } from "@/components/portfolio/AboutSection";
import { RoiCalculator } from "@/components/portfolio/RoiCalculator";
import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { ExperienceSection } from "@/components/portfolio/ExperienceSection";
import { ContactSection } from "@/components/portfolio/ContactSection";
import { FooterSection } from "@/components/portfolio/FooterSection";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import { getSiteUrl } from "@/lib/seo";

const SystemStudio = lazy(() =>
  import("@/components/portfolio/SystemStudio").then((m) => ({
    default: m.SystemStudio,
  })),
);

const BottleneckConfigurator = lazy(() =>
  import("@/components/portfolio/BottleneckConfigurator").then((m) => ({
    default: m.BottleneckConfigurator,
  })),
);

const SITE_URL = getSiteUrl();
const PAGE_TITLE = "Phenyo | Business Automation & Conversion-Focused Websites";
const PAGE_DESC =
  "Phenyo helps businesses reduce repetitive work, organize leads, connect their tools, and build professional websites that turn visitors into inquiries.";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      {
        name: "keywords",
        content:
          "Phenyo, business automation, n8n workflow automation, web development, conversion-focused websites, lead research automation, client portals, API integrations, process optimization",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESC },
      { property: "og:url", content: SITE_URL },
      { property: "og:type", content: "website" },
      // TODO: swap for a real designed export once available — currently a code-generated
      // placeholder built from scripts/og-image.svg (see that file for the source).
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
              "@type": "Person",
              "@id": `${SITE_URL}#person`,
              name: PERSONAL_INFO.name,
              jobTitle: PERSONAL_INFO.title,
              description: PAGE_DESC,
              email: PERSONAL_INFO.email,
              telephone: PERSONAL_INFO.phone,
              address: {
                "@type": "PostalAddress",
                addressLocality: PERSONAL_INFO.location,
              },
              knowsAbout: [
                "Business Process Automation",
                "n8n Workflow Automation",
                "Web Application Development",
                "API Integrations",
                "Lead Research Systems",
                "Client Portals & Dashboards",
              ],
            },
            {
              "@type": "ProfessionalService",
              "@id": `${SITE_URL}#service`,
              name: "Phenyo Business Automation & Web Development",
              provider: { "@id": `${SITE_URL}#person` },
              description: PAGE_DESC,
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Business Automation & Web Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Business Automation",
                      description:
                        "Custom n8n pipelines, API integrations, and lead research tools.",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Websites That Generate Inquiries",
                      description:
                        "Professional, mobile-friendly websites designed to convert visitors into inquiries.",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Client Portals and Business Dashboards",
                      description:
                        "Secure online spaces that centralize operational data and client account management.",
                    },
                  },
                ],
              },
            },
            {
              "@type": "WebSite",
              "@id": `${SITE_URL}#website`,
              url: SITE_URL,
              name: "Phenyo Portfolio",
              publisher: { "@id": `${SITE_URL}#person` },
            },
          ],
        }),
      },
    ],
  }),
});

function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-clip">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:shadow-lg focus:outline-none font-medium text-sm"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <HeroSection />
        {/* Industry automation demo — placed early so visitors see it before core content */}
        <Suspense
          fallback={
            <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
              <DemoSkeleton className="h-[420px]" />
            </div>
          }
        >
          <SystemStudio />
        </Suspense>
        <AboutSection />
        <Suspense
          fallback={
            <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
              <DemoSkeleton className="h-[460px]" />
            </div>
          }
        >
          <BottleneckConfigurator />
        </Suspense>
        <ProjectsSection />
        <RoiCalculator />
        <ExperienceSection />
        <ContactSection />
      </main>
      <FooterSection />
    </div>
  );
}

export default Home;
