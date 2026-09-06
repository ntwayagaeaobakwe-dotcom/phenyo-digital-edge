import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { getSiteUrl } from "@/lib/seo";
import { PERSONAL_INFO, COMPANY_INFO } from "@/data/portfolio-data";
import { NygLogo } from "@/components/nyg/NygLogo";
import { SystemVisual } from "@/components/nyg/SystemVisual";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollScrubWorkflowFilm } from "@/components/portfolio/ScrollScrubWorkflowFilm";

const SITE_URL = getSiteUrl();
const PAGE_TITLE = "NYG Agency Business Card | UAE Software Consultancy";
const PAGE_DESC =
  "Connect with Phenyo Ntwayagae, founder of NYG Agency, an Ajman-based software development, AI, and business automation consultancy serving the UAE.";
export const Route = createFileRoute("/card")({
  component: CardPage,
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      {
        name: "robots",
        content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESC },
      { property: "og:url", content: SITE_URL + "/card" },
      { property: "og:type", content: "profile" },
      { property: "og:image", content: `${SITE_URL}/og-image.png` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "NYG Agency — software development, AI, and automation consultancy in the UAE",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESC },
      { name: "twitter:image", content: `${SITE_URL}/og-image.png` },
      {
        name: "twitter:image:alt",
        content: "NYG Agency — software development, AI, and automation consultancy in the UAE",
      },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/card" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          "@id": `${SITE_URL}/card#profile`,
          url: `${SITE_URL}/card`,
          name: PAGE_TITLE,
          description: PAGE_DESC,
          inLanguage: "en-AE",
          mainEntity: {
            "@type": "Person",
            name: PERSONAL_INFO.name,
            jobTitle: PERSONAL_INFO.title,
            worksFor: { "@type": "Organization", name: COMPANY_INFO.brandName, url: SITE_URL },
            url: "https://www.linkedin.com/in/aobakwe-ntwayagae-3a8016423/",
            sameAs: ["https://www.linkedin.com/in/aobakwe-ntwayagae-3a8016423/"],
          },
        }),
      },
    ],
  }),
});
function CardPage() {
  const [open, setOpen] = useState(false);
  return (
    <div className="business-card-page">
      <a href="#card-main" className="skip-link">
        Skip to main content
      </a>
      <header className="page-width card-nav">
        <Link to="/" aria-label="NYG Agency home">
          <NygLogo showWordmark />
        </Link>
        <nav className="card-nav-links" aria-label="Business card navigation">
          <Link to="/" hash="services">
            Services
          </Link>
          <Link to="/" hash="projects">
            Work
          </Link>
          <Link to="/" hash="contact">
            Let’s talk <ArrowUpRight size={13} className="inline" />
          </Link>
        </nav>
      </header>
      <main id="card-main" className="page-width card-body">
        <div>
          <h1>
            Digital systems.
            <br />
            <span>Human ambition.</span>
          </h1>
          <p>
            Web development, AI solutions, and intelligent automation. Built around your business,
            by NYG Agency.
          </p>
          <div className="card-actions">
            <Link to="/" hash="contact" className="button">
              Start a project <ArrowUpRight size={17} />
            </Link>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <button className="button button-outline">
                  <Play size={14} />
                  See a workflow
                </button>
              </DialogTrigger>
              <DialogContent className="card-film">
                <DialogTitle>A connected workflow, in action.</DialogTitle>
                <DialogDescription>
                  Lead routing demonstration. From first inquiry to a clear next step.
                </DialogDescription>
                <ScrollScrubWorkflowFilm />
              </DialogContent>
            </Dialog>
          </div>
          <div className="card-founder">
            <img
              src="/phenyo-founder-professional.webp"
              alt="Phenyo Ntwayagae, founder of NYG Agency"
              width="45"
              height="45"
              loading="lazy"
              decoding="async"
            />
            <div>
              <strong>{PERSONAL_INFO.name}</strong>
              <span>{PERSONAL_INFO.title} · United Arab Emirates</span>
            </div>
          </div>
        </div>
        <SystemVisual compact />
      </main>
      <footer className="page-width card-bottom">
        <p>
          {COMPANY_INFO.legalName} · Registered in Ajman, UAE.
          <br />
          Web platforms · AI integrations · Lead routing · CRM & data · Reporting dashboards
        </p>
        <div className="card-contact-links">
          <a href={`mailto:${PERSONAL_INFO.email}`}>
            {PERSONAL_INFO.email}
            <ArrowUpRight size={15} />
          </a>
          <a
            href="https://www.linkedin.com/in/aobakwe-ntwayagae-3a8016423/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn profile
            <ArrowUpRight size={15} />
          </a>
        </div>
      </footer>
    </div>
  );
}
