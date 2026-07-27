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

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: `${PERSONAL_INFO.name} | ${PERSONAL_INFO.title}` },
      {
        name: "description",
        content:
          "Phenyo is a day trader and AI automation builder focused on forex, XAUUSD, intelligent n8n workflows, content systems, and digital business infrastructure.",
      },
      {
        name: "keywords",
        content:
          "Phenyo, day trader, AI automation, forex, XAUUSD, n8n workflows, digital nomad, AI content systems, vibe coding",
      },
      { property: "og:title", content: `${PERSONAL_INFO.name} | ${PERSONAL_INFO.title}` },
      {
        property: "og:description",
        content: "Trading markets. Building systems. Creating digital freedom.",
      },
      { property: "og:url", content: "/" },
      { name: "twitter:title", content: `${PERSONAL_INFO.name} | ${PERSONAL_INFO.title}` },
      {
        name: "twitter:description",
        content: "Trading markets. Building systems. Creating digital freedom.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: PERSONAL_INFO.name,
          jobTitle: PERSONAL_INFO.title,
          description:
            "Day trader focused on XAUUSD and AI automation builder crafting n8n workflows, content systems and digital business infrastructure.",
          knowsAbout: [
            "Forex Trading",
            "XAUUSD",
            "AI Automation",
            "n8n Workflows",
            "Prompt Engineering",
            "Web Development",
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
