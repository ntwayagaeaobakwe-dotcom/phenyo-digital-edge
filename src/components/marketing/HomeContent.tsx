import { ArrowRight, ArrowUpRight } from "lucide-react";
import { HOMEPAGE_SERVICES } from "@/data/web-agency-content";
import { COMPANY_INFO, PERSONAL_INFO } from "@/data/portfolio-data";
import { FeaturedPortfolioSection } from "@/components/marketing/FeaturedPortfolioSection";

const problems = [
  [
    "Capability and sector clarity",
    "A prospective client may not know whether a contractor takes on tenant improvements, commercial build-outs, or interior construction in their sector. A clear hierarchy of real services, commercial sectors, and verified capabilities helps visitors assess project fit.",
  ],
  [
    "Project portfolio context",
    "Strong photography shows the finished space, but may not explain the contractor’s delivery responsibilities. Presenting the project sector, scope of work, relevant specifications, and delivery role gives each project useful context.",
  ],
  [
    "Project inquiries and RFQs",
    "A generic contact form may not tell a project team how to discuss scope, request an RFQ, or send a bid invitation. A clear inquiry path can collect useful initial details and make project qualification easier without adding an unnecessary procurement portal.",
  ],
] as const;

const homepageProcess = [
  {
    title: "Discovery & Website Review",
    detail: "Review the current site, services, audience, project evidence, and inquiry path.",
    deliverable: "Review notes and agreed scope.",
  },
  {
    title: "Strategy, Structure & Design",
    detail:
      "Shape the pages around the contractor’s capabilities, service area, and project portfolio.",
    deliverable: "Sitemap, page outlines, and design direction.",
  },
  {
    title: "Development & Integration",
    detail: "Build the responsive experience and connect the agreed forms and business systems.",
    deliverable: "A working site ready for review.",
  },
  {
    title: "Testing, Launch & Handover",
    detail: "Check the pages, links, forms, and responsive states before release.",
    deliverable: "Launch checklist and handover notes.",
  },
] as const;

export function HomeContent() {
  return (
    <>
      <section className="home-section problem-section" aria-labelledby="problem-heading">
        <div className="page-width problem-layout">
          <div className="problem-statement">
            <p className="section-kicker">Websites for commercial contractors</p>
            <h2 id="problem-heading">Your work deserves more than a gallery.</h2>
            <p>
              NYG Digital designs websites for commercial contractors that make capabilities easier
              to understand, completed projects easier to evaluate, and project inquiries easier to
              start.
            </p>
          </div>
          <ol className="problem-index">
            {problems.map(([title, detail], index) => (
              <li key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div className="problem-copy">
                  <h3>{title}</h3>
                  <p>{detail}</p>
                </div>
              </li>
            ))}
          </ol>
          <a className="problem-link" href="/services/website-redesign">
            Explore our website redesign approach <ArrowRight aria-hidden="true" size={15} />
          </a>
        </div>
      </section>

      <section
        id="services"
        className="home-section services-section"
        aria-labelledby="services-heading"
      >
        <div className="page-width">
          <p className="section-kicker">Commercial contractor websites</p>
          <div className="home-heading-row services-heading-row">
            <h2 id="services-heading">Website design and development for commercial contractors</h2>
            <p>
              NYG Digital builds and redesigns websites for established commercial contractors in
              tenant improvement, commercial build-out, commercial renovation, and interior
              construction.
            </p>
          </div>

          <ol className="service-rows" aria-label="Website services">
            {HOMEPAGE_SERVICES.map((service, index) => (
              <li
                className={`service-row${index === 0 ? " service-row-primary" : ""}`}
                key={service.href}
              >
                <span className="service-row-number" aria-hidden="true">
                  {service.number}
                </span>
                <h3>{service.title}</h3>
                <div className="service-row-copy">
                  <p>{service.description}</p>
                  <p className="service-capabilities">
                    <span>Capabilities</span> {service.capabilities}
                  </p>
                </div>
                <a className="service-row-link" href={service.href}>
                  <span>Explore this service</span>
                  <ArrowUpRight aria-hidden="true" size={18} />
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="approach"
        className="home-section process-section"
        aria-labelledby="approach-heading"
      >
        <div className="page-width">
          <p className="section-kicker">A deliberate process</p>
          <div className="home-heading-row">
            <h2 id="approach-heading">A clear route from review to handover.</h2>
            <p>
              Each stage has a defined output, shaped around the contractor’s services, projects,
              and inquiry process.
            </p>
          </div>
          <ol className="process-grid">
            {homepageProcess.map(({ title, detail, deliverable }, index) => (
              <li className="process-stage" key={title}>
                <span className="process-stage-number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="process-stage-copy">
                  <h3>{title}</h3>
                  <p>{detail}</p>
                  <p className="process-deliverable">
                    <span>Deliverable</span> {deliverable}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FeaturedPortfolioSection />

      <section id="about" className="home-section founder-section" aria-labelledby="about-heading">
        <div className="page-width founder-layout">
          <figure>
            <div className="founder-image-wrap">
              <img
                src="/phenyo-founder-professional.webp"
                alt="Phenyo Ntwayagae, founder of NYG Digital"
                width="960"
                height="1200"
                loading="lazy"
                decoding="async"
              />
              <span aria-hidden="true">FOUNDER / 01</span>
            </div>
            <figcaption>{PERSONAL_INFO.name} · Founder</figcaption>
          </figure>
          <div className="founder-copy">
            <p className="section-kicker">Founder</p>
            <h2 id="about-heading">Work directly with the founder.</h2>
            <p>
              {PERSONAL_INFO.name} founded NYG Digital, an independent web design and development
              studio registered in {COMPANY_INFO.registeredLocality} and operating from Dubai. The
              studio works remotely with clients in the UAE, United States, and other markets.
            </p>
            <a
              href="https://www.linkedin.com/in/phenyo-ntwayagae-3a8016423/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Connect with Phenyo on LinkedIn <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
