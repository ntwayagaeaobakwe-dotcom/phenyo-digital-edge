import { useState } from "react";
import { ArrowUpRight, Plus, Minus } from "lucide-react";
import { SectionShell } from "@/components/portfolio/SectionShell";
import { SystemVisual } from "./SystemVisual";

import { AGENCY_SERVICES } from "@/data/agency-services";

export function ServicesSection() {
  const [active, setActive] = useState<number | null>(0);
  return (
    <SectionShell
      id="services"
      eyebrow="Our capabilities"
      declarativeTitle="Build. Automate. Grow."
      qualifierTitle="Six connected capabilities. One clear direction for your business."
    >
      <div className="service-list">
        {AGENCY_SERVICES.map((service, i) => (
          <article
            className={`service-item ${active === i ? "service-active" : ""}`}
            key={service.title}
          >
            <h3>
              <button
                id={`service-button-${i}`}
                aria-expanded={active === i}
                aria-controls={`service-panel-${i}`}
                onClick={() => setActive(active === i ? null : i)}
              >
                <span className="service-number">0{i + 1}</span>
                <span>{service.title}</span>
                <span className="service-intro">{service.pillar}</span>
                {active === i ? <Minus aria-hidden="true" /> : <Plus aria-hidden="true" />}
              </button>
            </h3>
            <div
              id={`service-panel-${i}`}
              role="region"
              aria-labelledby={`service-button-${i}`}
              hidden={active !== i}
              className="service-panel"
            >
              <div>
                <p>{service.text}</p>
                <a href="#contact" className="text-link">
                  Discuss your requirements <ArrowUpRight size={16} />
                </a>
              </div>
              <div className="service-detail">
                <p>{service.intro}</p>
                <ul>
                  {service.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
      <details className="capability-explorer">
        <summary>
          Explore how web, AI, and automation connect <Plus size={18} />
        </summary>
        <div className="explorer-layout">
          <div>
            <h3>Every part has a purpose.</h3>
            <p>
              Select a layer to explore how the customer experience, business information, and
              workflow fit together.
            </p>
            <a href="#systems" className="text-link">
              Try a workflow demonstration <ArrowUpRight size={16} />
            </a>
          </div>
          <SystemVisual />
        </div>
      </details>
    </SectionShell>
  );
}
