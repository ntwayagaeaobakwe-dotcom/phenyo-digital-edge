import { ArrowUpRight, Check } from "lucide-react";
import { PERSONAL_INFO, COMPANY_INFO } from "@/data/portfolio-data";
import { SectionShell } from "./SectionShell";
export function CapabilitySection() {
  return (
    <SectionShell
      id="about"
      eyebrow="The studio"
      declarativeTitle="Technical minds. Human approach."
      qualifierTitle="A direct partnership with the person designing, building, and connecting your systems."
    >
      <span id="studio" className="anchor-alias" />
      <div className="about-layout">
        <figure className="founder-portrait">
          <img
            src="/phenyo.avif"
            alt="Phenyo Ntwayagae, founder of NYG Digital"
            width="600"
            height="750"
            loading="lazy"
          />
          <figcaption>
            <strong>{PERSONAL_INFO.name}</strong>
            <span>{PERSONAL_INFO.title}</span>
          </figcaption>
        </figure>
        <div className="about-copy">
          <h3>
            Small by design.
            <br />
            <span>Ambitious by nature.</span>
          </h3>
          <p>
            NYG Digital brings web development, AI, and automation under one roof. From a better
            website to a more connected business, this computer-systems consultancy makes complex
            technical work feel clear and manageable.
          </p>
          <p>
            Founded by {PERSONAL_INFO.name}, our studio works directly with businesses across the
            UAE. You speak with the builder, see the thinking, and understand what comes next.
          </p>
          <ul>
            {[
              "Working demos built around your actual process",
              "Clear scope and deliverables before the build",
              "Modern infrastructure, careful testing, and a proper handover",
            ].map((item) => (
              <li key={item}>
                <Check size={16} />
                {item}
              </li>
            ))}
          </ul>
          <a
            href={`https://wa.me/${PERSONAL_INFO.phone.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            Meet your next technical partner <ArrowUpRight size={16} />
          </a>
          <div className="studio-registration">
            <span>{COMPANY_INFO.legalName}</span>
            <span>Registered in Ajman · Serving the UAE</span>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
