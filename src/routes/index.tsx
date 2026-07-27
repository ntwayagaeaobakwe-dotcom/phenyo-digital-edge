import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { TickerBar } from "@/components/portfolio/TickerBar";
import { AboutSection } from "@/components/portfolio/AboutSection";
import { ExpertiseSection } from "@/components/portfolio/ExpertiseSection";
import { RoiCalculator } from "@/components/portfolio/RoiCalculator";
import { ServicesSection } from "@/components/portfolio/ServicesSection";
import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { ExperienceSection } from "@/components/portfolio/ExperienceSection";
import { ContactSection } from "@/components/portfolio/ContactSection";
import { FooterSection } from "@/components/portfolio/FooterSection";
import { PERSONAL_INFO } from "@/data/portfolio-data";

// Production URL placeholder (replace with target custom domain upon deployment, e.g. https://phenyo.digital)
const SITE_URL = typeof window !== "undefined" ? window.location.origin : "/";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Phenyo | AI Automation Builder, XAUUSD Trader & Digital Systems Architect" },
      {
        name: "description",
        content:
          "Phenyo builds AI automation workflows, XAUUSD trading content systems, and premium digital infrastructure for creators, traders, and online entrepreneurs.",
      },
      {
        name: "keywords",
        content:
          "Phenyo, AI automation builder, n8n automation, XAUUSD trader, gold trading content, AI workflow consultant, digital systems architect, trading content automation, AI-powered websites, digital nomad entrepreneur",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Phenyo | AI Automation Builder, XAUUSD Trader & Digital Systems Architect" },
      {
        property: "og:description",
        content:
          "Phenyo builds AI automation workflows, XAUUSD trading content systems, and premium digital infrastructure for creators, traders, and online entrepreneurs.",
      },
      { property: "og:url", content: SITE_URL },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Phenyo | AI Automation Builder, XAUUSD Trader & Digital Systems Architect" },
      {
        name: "twitter:description",
        content:
          "Phenyo builds AI automation workflows, XAUUSD trading content systems, and premium digital infrastructure for creators, traders, and online entrepreneurs.",
      },
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
              name: "Phenyo",
              jobTitle: "AI Automation Builder, XAUUSD Trader & Digital Systems Architect",
              description:
                "Phenyo builds AI automation workflows, XAUUSD trading content systems, and premium digital infrastructure for creators, traders, and online entrepreneurs.",
              email: PERSONAL_INFO.email,
              telephone: PERSONAL_INFO.phone,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Digital Nomad / International",
              },
              knowsAbout: [
                "XAUUSD Gold Trading",
                "Forex Market Analysis",
                "n8n AI Workflow Automation",
                "Autonomous AI Agents",
                "Content Automation Systems",
                "Full-Stack Web Development",
              ],
            },
            {
              "@type": "ProfessionalService",
              "@id": `${SITE_URL}#service`,
              name: "Phenyo Digital Systems & Automation Consulting",
              provider: { "@id": `${SITE_URL}#person` },
              description:
                "Bespoke n8n workflow automation, trading content pipelines, and AI-powered web applications.",
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "AI & Market Automation Services",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "n8n AI Workflow Automation",
                      description: "Custom n8n pipelines, API integrations, and autonomous AI lead research tools.",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Trading Content Systems",
                      description: "Automated daily publishing engines for gold/XAUUSD market commentary.",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "AI-Powered Web Applications",
                      description: "High-converting digital portals and platforms built with modern web tech.",
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
      <Navbar />
      <HeroSection />
      <TickerBar />
      <AboutSection />
      <ExpertiseSection />
      <RoiCalculator />
      <ServicesSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
}
