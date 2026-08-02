import { lazy, Suspense } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { DemoSkeleton } from "@/components/portfolio/DemoSkeleton";
import { TrustBar } from "@/components/portfolio/TrustBar";
import { ServicesSection } from "@/components/portfolio/ServicesSection";
import { AboutSection } from "@/components/portfolio/AboutSection";
import { RoiCalculator } from "@/components/portfolio/RoiCalculator";
import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { ExperienceSection } from "@/components/portfolio/ExperienceSection";
import { ContactSection } from "@/components/portfolio/ContactSection";
import { FooterSection } from "@/components/portfolio/FooterSection";
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
const PAGE_TITLE = "NYG Digital | Business Automation & Conversion-Focused Websites";
const PAGE_DESC =
  "NYG Digital helps service businesses explain their offer clearly, capture better inquiries, and connect follow-up work with websites and automation.";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      {
        name: "keywords",
        content:
          "NYG Digital, Ntwayagae, business automation, n8n workflow automation, web development, conversion-focused websites, lead research automation, client portals, API integrations, process optimization",
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
                        "Dedicated online spaces that centralize operational data and client account management.",
                    },
                  },
                ],
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
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-5 focus:py-3 focus:bg-action-primary focus:text-action-primary-foreground focus:rounded-full focus:shadow-2xl focus-ring font-mono text-xs uppercase tracking-widest font-semibold min-h-[44px] inline-flex items-center"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <HeroSection />
        <TrustBar />
        <Suspense
          fallback={
            <div className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
              <DemoSkeleton className="h-[420px]" />
            </div>
          }
        >
          <SystemStudio />
        </Suspense>
        <ServicesSection />
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
        <AboutSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <FooterSection />
    </div>
  );
}

export default Home;
