import { useState } from "react";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { APPROACH, INDUSTRIES, PRIMARY_SERVICES } from "@/data/web-agency-content";
import { COMPANY_INFO, PERSONAL_INFO } from "@/data/portfolio-data";

const problems = [
  ["Presentation", "Your digital presence should feel as considered as the work you deliver."],
  ["Customer journey", "People should understand the offer and the next step without searching."],
  [
    "Mobile usability",
    "The experience should remain calm, clear and useful on the smallest screen.",
  ],
  ["Performance", "Every visual decision should earn the time and bandwidth it consumes."],
  ["Service clarity", "Good-fit prospects should be able to recognise themselves in the message."],
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
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const activeService = PRIMARY_SERVICES[activeServiceIndex];

  return (
    <>
      <section className="home-section problem-section" aria-labelledby="problem-heading">
        <div className="page-width problem-layout">
          <div className="problem-statement">
            <p className="section-kicker">What the website must resolve</p>
            <h2 id="problem-heading">A capable business should never look difficult to trust.</h2>
            <p>
              We remove the small points of doubt that appear between first impression and first
              enquiry.
            </p>
          </div>
          <ol className="problem-index">
            {problems.map(([title, detail], index) => (
              <li key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="services"
        className="home-section services-section"
        aria-labelledby="services-heading"
      >
        <div className="page-width">
          <p className="section-kicker">Web practice · 01—04</p>
          <div className="home-heading-row services-heading-row">
            <h2 id="services-heading">Four ways to make the website work harder.</h2>
            <p>
              Start from zero, rebuild what exists, add custom functionality or improve the path
              from interest to enquiry.
            </p>
          </div>

          <div className="service-stage">
            <div className="service-index" role="list" aria-label="Website services">
              {PRIMARY_SERVICES.map((service, index) => (
                <a
                  href={service.href}
                  key={service.href}
                  role="listitem"
                  className={activeServiceIndex === index ? "is-active" : ""}
                  onMouseEnter={() => setActiveServiceIndex(index)}
                  onFocus={() => setActiveServiceIndex(index)}
                  onPointerDown={() => setActiveServiceIndex(index)}
                >
                  <span>{service.number}</span>
                  <div>
                    <h3>{service.title}</h3>
                    <p>{service.summary}</p>
                  </div>
                  <ArrowUpRight aria-hidden="true" />
                </a>
              ))}
            </div>

            <aside className="service-preview" aria-label={`Preview: ${activeService.title}`}>
              <div className="service-preview-bar" aria-hidden="true">
                <span />
                <span />
                <span />
                <em>nyg / service.{activeService.number}</em>
              </div>
              <div className="service-preview-canvas" key={activeService.href}>
                <div className="service-preview-meta">
                  <span>Selected service</span>
                  <span>{activeService.number} / 04</span>
                </div>
                <div className="service-preview-copy">
                  <small>NYG DIGITAL</small>
                  <strong>{activeService.title}</strong>
                  <p>{activeService.problem}</p>
                  <i>View the service</i>
                </div>
                <div className="service-preview-orbit" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </aside>
          </div>
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
