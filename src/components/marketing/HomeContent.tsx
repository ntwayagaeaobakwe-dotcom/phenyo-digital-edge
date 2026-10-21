import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { APPROACH, HOMEPAGE_SERVICES, INDUSTRIES } from "@/data/web-agency-content";
import { COMPANY_INFO, PERSONAL_INFO } from "@/data/portfolio-data";

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

const principles = [
  [
    "01",
    "Customer journeys first",
    "Structure follows the decisions a prospective customer needs to make.",
  ],
  [
    "02",
    "Design and code together",
    "The visual idea and its implementation are resolved as one system.",
  ],
  [
    "03",
    "Measured interaction",
    "Motion clarifies hierarchy, feedback and change instead of competing for attention.",
  ],
  [
    "04",
    "Direct collaboration",
    "You work with the person making the strategic and technical decisions.",
  ],
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
        id="industries"
        className="home-section industry-section"
        aria-labelledby="industries-heading"
      >
        <div className="page-width">
          <p className="section-kicker">Selected sectors</p>
          <div className="home-heading-row">
            <h2 id="industries-heading">One design language cannot answer every buying journey.</h2>
            <p>
              The information, reassurance and action a visitor needs changes with the service in
              front of them.
            </p>
          </div>
          <div className="industry-list">
            {INDUSTRIES.map((industry, index) => (
              <a href={industry.href} key={industry.href}>
                <span>0{index + 1}</span>
                <h3>{industry.title}</h3>
                <p>{industry.detail}</p>
                <ArrowUpRight aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="home-section work-section" aria-labelledby="work-heading">
        <div className="page-width">
          <div className="work-intro">
            <div>
              <p className="section-kicker">Selected work · honest by design</p>
              <h2 id="work-heading">Show the evidence. Leave out the theatre.</h2>
            </div>
            <p>
              Current public work is presented with its real status. No fabricated clients, results
              or testimonials.
            </p>
          </div>

          <article className="work-showcase">
            <div className="work-browser" aria-label="NYG Digital website interface study">
              <div className="work-browser-bar">
                <span>NYG / DIGITAL EXPERIENCE</span>
                <span>LIVE · 2026</span>
              </div>
              <div className="work-browser-canvas">
                <div className="work-browser-nav">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="work-browser-title">
                  <small>CLARITY / CREDIBILITY / ACTION</small>
                  <strong>Web experiences that earn the next conversation.</strong>
                </div>
                <div className="work-browser-object" aria-hidden="true">
                  <span />
                </div>
                <div className="work-browser-foot">
                  <span />
                  <span />
                </div>
              </div>
            </div>
            <div className="work-showcase-copy">
              <p className="work-status">In-house website build · Live</p>
              <h3>NYG Digital service website and enquiry journey</h3>
              <p>
                A responsive business website built to explain complex services clearly, demonstrate
                real work and provide direct email and WhatsApp paths.
              </p>
              <a href="#contact">
                Discuss a similar website <ArrowRight size={15} />
              </a>
            </div>
          </article>

          <a className="work-supporting" href="/work/lead-generation-automation">
            <picture>
              <source srcSet="/workflow-studio/places-workflow-current.avif" type="image/avif" />
              <img
                src="/workflow-studio/places-workflow-current.webp"
                alt="Actual n8n Google Places lead research workflow shown in the n8n editor"
                width="1825"
                height="930"
                loading="lazy"
              />
            </picture>
            <span>Supporting capability · Actual workflow</span>
            <strong>Lead research and enrichment automation</strong>
            <p>See how the customer-facing website can connect to useful operations behind it.</p>
            <ArrowUpRight aria-hidden="true" />
          </a>
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
            <h2 id="approach-heading">Each stage answers a different question.</h2>
            <p>The build only moves forward when the decision underneath it is clear.</p>
          </div>
          <ol className="process-rail">
            {APPROACH.map(([title, detail], index) => (
              <li key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="home-section principles-section" aria-labelledby="principles-heading">
        <div className="page-width">
          <div className="principles-intro">
            <p className="section-kicker">Why NYG Digital</p>
            <h2 id="principles-heading">One line of thought from strategy to launch.</h2>
          </div>
          <div className="principle-list">
            {principles.map(([number, title, detail]) => (
              <article key={title}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

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
            <p className="section-kicker">The person behind the work</p>
            <h2 id="about-heading">
              Direct access to the person shaping and building your website.
            </h2>
            <p>
              NYG Digital is an independent web design and development studio founded by{" "}
              {PERSONAL_INFO.name}. We work with established service businesses in the UAE, the
              United States and other international markets through a direct remote process.
            </p>
            <p>
              Our registered company is {COMPANY_INFO.legalName} in Ajman, United Arab Emirates. We
              operate from Dubai and do not claim a physical office in the United States.
            </p>
            <ul>
              {[
                "Clear scope and deliverables before development",
                "Responsive, accessible and performance-aware implementation",
                "A maintainable handover with room for ongoing improvement",
              ].map((item) => (
                <li key={item}>
                  <Check size={16} />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="https://www.linkedin.com/in/aobakwe-ntwayagae-3a8016423/"
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
