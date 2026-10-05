import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Database,
  ExternalLink,
  Gauge,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { FooterSection } from "@/components/nyg/FooterSection";
import { NygLogo } from "@/components/nyg/NygLogo";
import { COMPANY_INFO, PERSONAL_INFO } from "@/data/portfolio-data";
import { getSiteUrl } from "@/lib/seo";
import "./workflow-case-study.css";

const SITE_URL = getSiteUrl();
const PAGE_URL = `${SITE_URL}/work/lead-generation-automation`;
const PAGE_TITLE = "n8n Lead Generation Automation Case Study | NYG Agency";
const PAGE_DESCRIPTION =
  "See how NYG Agency built an n8n lead generation and AI enrichment workflow using Google Places, Sheets, Gemini, Brave Search, and SerpApi.";

const PROCESS = [
  { title: "Search configuration", detail: "Reusable business type, location, and radius inputs." },
  { title: "Location geocoding", detail: "Google Geocoding resolves the search location." },
  {
    title: "Places search",
    detail: "Google Places API (New) returns structured business records.",
  },
  {
    title: "Pagination",
    detail: "Stored next-page tokens continue the search after a controlled wait.",
  },
  {
    title: "Volume control",
    detail: "A cumulative counter limits each collection run to 90 businesses.",
  },
  {
    title: "Google Sheets",
    detail: "Records are appended or updated in a structured working database.",
  },
  {
    title: "AI research",
    detail: "Gemini works with live search tools to research each business.",
  },
  {
    title: "Contact enrichment",
    detail: "Brave Search and SerpApi support owner and contact discovery.",
  },
  {
    title: "Lead database",
    detail: "Normalized findings return to Sheets for review and outreach.",
  },
];

const RELIABILITY = [
  [
    "Stateful pagination",
    "Next-page tokens are stored and reused after the required waiting period.",
  ],
  ["Controlled volume", "A cumulative counter caps the Places workflow at 90 businesses per run."],
  [
    "Record upkeep",
    "The Sheets append-or-update step can update matching rows instead of adding another copy.",
  ],
  ["Rate-limit care", "Wait steps pace API requests instead of issuing an uncontrolled burst."],
  [
    "Credential-based access",
    "Google services are connected through managed credentials rather than exposed keys.",
  ],
  [
    "Failure visibility",
    "Conditional branches and message notifications surface empty inputs and AI errors.",
  ],
];

const TECHNOLOGIES = [
  "n8n",
  "Google Places API (New)",
  "Google Geocoding API",
  "Google Sheets API",
  "Google Gemini",
  "Brave Search",
  "SerpApi",
  "JavaScript",
  "OAuth 2.0",
];

const BUSINESS_VALUE = [
  "Run the same research process for a new market without rebuilding it from scratch.",
  "Keep prospect information in a consistent structure that is easier to review and qualify.",
  "Reduce repeated manual searches and the duplicate records they often create.",
  "Separate automated research from human outreach so the final list can be checked before use.",
];

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CreativeWork",
      "@id": `${PAGE_URL}#case-study`,
      name: "Lead Generation and Enrichment Automation",
      headline: "A working n8n system for Google Places lead generation and AI-assisted enrichment",
      description: PAGE_DESCRIPTION,
      url: PAGE_URL,
      image: `${SITE_URL}/workflow-studio/places-workflow-current.webp`,
      datePublished: "2026-10-05",
      dateModified: "2026-10-05",
      inLanguage: "en-AE",
      author: { "@type": "Person", name: PERSONAL_INFO.name },
      publisher: {
        "@type": "Organization",
        name: COMPANY_INFO.brandName,
        legalName: COMPANY_INFO.legalName,
        url: SITE_URL,
      },
      about: ["n8n automation", "Lead generation automation", "AI lead enrichment"],
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumbs`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Selected work", item: `${SITE_URL}/#projects` },
        { "@type": "ListItem", position: 3, name: "Lead generation automation", item: PAGE_URL },
      ],
    },
  ],
};

export const Route = createFileRoute("/work/lead-generation-automation")({
  component: LeadGenerationCaseStudy,
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESCRIPTION },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: PAGE_URL },
      { property: "og:site_name", content: COMPANY_INFO.brandName },
      {
        property: "og:image",
        content: `${SITE_URL}/workflow-studio/places-workflow-current.webp`,
      },
      { property: "og:image:width", content: "1825" },
      { property: "og:image:height", content: "930" },
      {
        property: "og:image:alt",
        content:
          "Actual n8n Google Places lead scraper with pagination and a completed Google Sheets write",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: PAGE_TITLE },
      { name: "twitter:description", content: PAGE_DESCRIPTION },
      {
        name: "twitter:image",
        content: `${SITE_URL}/workflow-studio/places-workflow-current.webp`,
      },
    ],
    links: [{ rel: "canonical", href: PAGE_URL }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(STRUCTURED_DATA) }],
  }),
});

function CaseStudyHeader() {
  return (
    <header className="case-header">
      <nav className="page-width case-nav" aria-label="Case study navigation">
        <a href="/#hero-stage" aria-label="NYG Agency home" className="case-brand">
          <NygLogo showWordmark />
        </a>
        <div>
          <a href="/#projects" className="case-back">
            <ArrowLeft size={15} /> Selected work
          </a>
          <a href="/#contact" className="button button-small">
            Discuss your workflow <ArrowRight size={15} />
          </a>
        </div>
      </nav>
    </header>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="case-kicker">{children}</p>;
}

function LeadGenerationCaseStudy() {
  return (
    <div className="nyg-site case-study-page">
      <a href="#case-main" className="skip-link">
        Skip to case study
      </a>
      <CaseStudyHeader />
      <main id="case-main">
        <section className="case-hero page-width" aria-labelledby="case-title">
          <nav className="case-breadcrumbs" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true">/</span>
            <a href="/#projects">Selected work</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Lead automation</span>
          </nav>
          <div className="case-hero-grid">
            <div>
              <SectionLabel>Workflow case study · Actual n8n systems</SectionLabel>
              <h1 id="case-title">Lead generation and enrichment automation.</h1>
            </div>
            <div className="case-hero-intro">
              <p>
                A working n8n system that turns a reusable market search into an organized,
                research-ready lead database.
              </p>
              <div className="case-status">
                <span /> Captured from the n8n editor after a successful Places run
              </div>
            </div>
          </div>
          <div className="case-evidence-frame">
            <div className="evidence-toolbar">
              <span>01 / Google Places business lead scraper</span>
              <span>Current workflow · Completed collection run</span>
            </div>
            <a
              className="case-image-link"
              href="/workflow-studio/places-workflow-current.webp"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open full-size screenshot of the Google Places workflow"
            >
              <picture>
                <source srcSet="/workflow-studio/places-workflow-current.avif" type="image/avif" />
                <img
                  src="/workflow-studio/places-workflow-current.webp"
                  alt="Actual n8n Google Places scraper showing schedule and manual triggers, geocoding, Places search, stored page tokens, a 90-business cap, and a successful Google Sheets write of 60 items"
                  width="1825"
                  height="930"
                  fetchPriority="high"
                />
              </picture>
            </a>
            <p className="evidence-caption">
              <ShieldCheck size={17} /> The current workflow shows geocoding, pagination, a
              90-business cap, and 60 items reaching Google Sheets in this run. Open the image to
              inspect the full-size capture. No credentials or lead records are shown.
            </p>
          </div>
        </section>

        <section className="case-section page-width case-split" aria-labelledby="problem-heading">
          <div>
            <SectionLabel>01 / The business problem</SectionLabel>
            <h2 id="problem-heading">Prospecting becomes a chain of repetitive decisions.</h2>
          </div>
          <div className="case-prose">
            <p>
              Manual lead finding is more than copying names from a map. Each search has to be
              configured, results checked across pages, duplicates removed, decision-makers
              researched, and findings normalized before outreach can begin.
            </p>
            <p>
              When that process lives across browser tabs and ad hoc spreadsheets, it is difficult
              to repeat consistently. This system turns those steps into a controlled workflow while
              keeping final review with a person.
            </p>
          </div>
        </section>

        <section className="case-section case-panel" aria-labelledby="solution-heading">
          <div className="page-width">
            <div className="case-split">
              <div>
                <SectionLabel>02 / The automated solution</SectionLabel>
                <h2 id="solution-heading">
                  One search brief. A structured path to qualified research.
                </h2>
              </div>
              <div className="case-prose">
                <p>
                  The first workflow accepts a business type, location, and radius; geocodes the
                  location; searches Google Places; and follows stored page tokens. Results are
                  capped at 90 businesses per run and written into Google Sheets.
                </p>
                <p>
                  A second workflow reads those records, uses Google Gemini with Brave Search and
                  SerpApi, processes the response in JavaScript, and writes the research back to
                  Sheets. Waits, loops, conditions, and alerts make the enrichment stage observable.
                </p>
              </div>
            </div>
            <div className="solution-signals" aria-label="Verified workflow capabilities">
              <span>
                <MapPin size={18} /> Location-aware search
              </span>
              <span>
                <Database size={18} /> Structured Sheets output
              </span>
              <span>
                <Sparkles size={18} /> AI-assisted enrichment
              </span>
              <span>
                <Gauge size={18} /> Controlled execution
              </span>
            </div>
          </div>
        </section>

        <section className="case-section page-width" aria-labelledby="process-heading">
          <SectionLabel>03 / How the workflow works</SectionLabel>
          <div className="case-heading-row">
            <h2 id="process-heading">From search configuration to a reviewable lead database.</h2>
            <p>
              Nine connected stages, designed to remain understandable when the market, location, or
              search radius changes.
            </p>
          </div>
          <ol className="workflow-process">
            {PROCESS.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.detail}</p>
                </div>
                {index < PROCESS.length - 1 && <ArrowRight aria-hidden="true" />}
              </li>
            ))}
          </ol>
        </section>

        <section className="case-section case-proof" aria-labelledby="proof-heading">
          <div className="page-width">
            <SectionLabel>04 / Workflow evidence</SectionLabel>
            <div className="case-heading-row">
              <h2 id="proof-heading">Evidence from the system itself.</h2>
              <p>
                These are captures of the two actual n8n editors. The collection image shows a
                completed run; the enrichment image shows its configured stages and branches.
              </p>
            </div>
            <div className="proof-grid">
              <figure className="proof-figure">
                <div className="proof-figure-toolbar">
                  02 / AI research and enrichment workflow <span>Actual n8n editor capture</span>
                </div>
                <a
                  className="case-image-link"
                  href="/workflow-studio/enrichment-workflow-current.webp"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open full-size screenshot of the enrichment workflow"
                >
                  <picture>
                    <source
                      srcSet="/workflow-studio/enrichment-workflow-current.avif"
                      type="image/avif"
                    />
                    <img
                      src="/workflow-studio/enrichment-workflow-current.webp"
                      alt="Actual n8n enrichment workflow showing Sheets intake, item loops, Gemini AI Agent with Brave Search and SerpApi, JavaScript processing, Sheets output, and error notifications"
                      width="1825"
                      height="930"
                      loading="lazy"
                    />
                  </picture>
                </a>
                <figcaption>
                  <strong>Enrichment workflow structure.</strong> The editor shows the configured
                  Sheets intake, AI research tools, processing, output, and error paths. This image
                  does not claim a completed enrichment run. Open the full-size capture to inspect
                  the nodes.
                </figcaption>
              </figure>
              <aside className="proof-ledger" aria-label="Verified enrichment workflow nodes">
                <p className="proof-ledger-title">
                  <Search size={18} /> Live enrichment workflow observed
                </p>
                <ul>
                  <li>
                    <Check /> Google Sheets read and update
                  </li>
                  <li>
                    <Check /> Google Gemini Chat Model
                  </li>
                  <li>
                    <Check /> Brave Search web tool
                  </li>
                  <li>
                    <Check /> Google search through SerpApi
                  </li>
                  <li>
                    <Check /> JavaScript normalization
                  </li>
                  <li>
                    <Check /> Loop, wait, and conditional branches
                  </li>
                  <li>
                    <Check /> Empty-sheet and AI-error notifications
                  </li>
                </ul>
                <p>
                  Private spreadsheet values are intentionally excluded. This list reflects node
                  names and connections verified in the working n8n editor.
                </p>
              </aside>
            </div>
          </div>
        </section>

        <section className="case-section page-width" aria-labelledby="reliability-heading">
          <SectionLabel>05 / Reliability features</SectionLabel>
          <div className="case-heading-row">
            <h2 id="reliability-heading">
              Controls around the automation, not just actions inside it.
            </h2>
            <p>Reliable workflows need limits, state, pacing, and useful failure signals.</p>
          </div>
          <div className="reliability-grid">
            {RELIABILITY.map(([title, detail], i) => (
              <article key={title}>
                <span>0{i + 1}</span>
                <h3>{title}</h3>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="case-section case-panel" aria-labelledby="technology-heading">
          <div className="page-width technology-layout">
            <div>
              <SectionLabel>06 / Technologies used</SectionLabel>
              <h2 id="technology-heading">A practical automation stack.</h2>
              <p>
                Each tool has a defined role: discovery, structured storage, research, processing,
                authentication, or orchestration.
              </p>
            </div>
            <ul>
              {TECHNOLOGIES.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="case-section page-width business-value" aria-labelledby="value-heading">
          <div>
            <SectionLabel>07 / Business value</SectionLabel>
            <h2 id="value-heading">Make prospect research repeatable before making it bigger.</h2>
          </div>
          <ul>
            {BUSINESS_VALUE.map((value) => (
              <li key={value}>
                <Check aria-hidden="true" />
                <span>{value}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="case-cta page-width" aria-labelledby="cta-heading">
          <p className="case-kicker">Have a manual process worth improving?</p>
          <h2 id="cta-heading">Build an automation like this.</h2>
          <p>
            Bring the workflow you use today. We’ll map the steps, define the controls, and build a
            system your team can understand.
          </p>
          <div>
            <a className="button" href="/#contact">
              Discuss your workflow <ArrowRight size={17} />
            </a>
            <a className="case-email" href={`mailto:${PERSONAL_INFO.email}`}>
              {PERSONAL_INFO.email} <ExternalLink size={15} />
            </a>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}
