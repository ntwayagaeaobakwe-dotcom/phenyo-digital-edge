import { useState } from "react";
import { ArrowUpRight, Plus, Minus, Code2, Workflow, Sparkles } from "lucide-react";
import { SectionShell } from "@/components/portfolio/SectionShell";
const services = [
  {
    title: "Web Development",
    intro: "Your business. Beautifully expressed.",
    text: "Distinctive websites and web applications that feel effortless to use. Designed around your customers and engineered for speed, accessibility, and growth.",
    tags: ["Websites & web apps", "Client portals", "Responsive design", "Cloud deployment"],
    icon: Code2,
    sample: ["Design with intention", "Build for performance", "Launch with confidence"],
  },
  {
    title: "AI Solutions",
    intro: "Make intelligence useful.",
    text: "Practical AI integrations built around real business needs. Turn information into useful insights, support your team, and create more capable digital experiences with human review where it matters.",
    tags: ["AI integrations", "Knowledge workflows", "AI transcription", "Human review"],
    icon: Sparkles,
    sample: ["Connect your information", "Add useful intelligence", "Keep people in control"],
  },
  {
    title: "Automation",
    intro: "Less busywork. More possibility.",
    text: "Connect your tools, APIs, and business processes into reliable workflows. From the first inquiry to daily operations, give every next step a clear path.",
    tags: ["n8n workflows", "API integrations", "CRM & data sync", "Lead routing"],
    icon: Workflow,
    sample: ["Capture the trigger", "Connect the right tools", "Let the workflow run"],
  },
];
export function ServicesSection() {
  const [active, setActive] = useState<number | null>(0);
  return (
    <SectionShell
      id="services"
      eyebrow="Capabilities"
      declarativeTitle="Built together. Better together."
      qualifierTitle="Web development, AI solutions, and n8n workflow automation for businesses across Ajman, Dubai, and the UAE."
    >
      <div className="service-list">
        {services.map((service, i) => (
          <article
            className={`service-item ${active === i ? "service-active" : ""}`}
            key={service.title}
          >
            <h3>
              <button
                aria-expanded={active === i}
                aria-controls={`service-panel-${i}`}
                onClick={() => setActive(active === i ? null : i)}
              >
                <span className="service-number">0{i + 1}</span>
                <span>{service.title}</span>
                <span className="service-intro">{service.intro}</span>
                {active === i ? <Minus /> : <Plus />}
              </button>
            </h3>
            <div id={`service-panel-${i}`} hidden={active !== i} className="service-panel">
              <div>
                <p>{service.text}</p>
                <div className="tag-list">
                  {service.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <a href="#contact" className="text-link">
                  Let’s talk {i === 0 ? "web" : i === 1 ? "AI" : "automation"}
                  <ArrowUpRight size={16} />
                </a>
              </div>
              <div className="service-path">
                <service.icon size={30} strokeWidth={1} />
                {service.sample.map((step, index) => (
                  <div key={step}>
                    <span className="path-dot" />
                    <span>{step}</span>
                    <span className="path-index">0{index + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
