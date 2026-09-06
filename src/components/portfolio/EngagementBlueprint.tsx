import { ArrowUpRight, Plus } from "lucide-react";
import { SectionShell } from "./SectionShell";
const stages = [
  {
    name: "Discover & review",
    text: "We get to know your business, your tools, and the friction in your day. Together, we define what a better system should do.",
    details: [
      "Workflow mapping",
      "Identifying manual bottlenecks",
      "Reviewing existing tools & software",
      "Defining project goals & requirements",
    ],
  },
  {
    name: "Design & plan",
    text: "A clear blueprint connects the experience, technology, and workflow. You see the direction before we build.",
    details: [
      "Workflow blueprint & logic",
      "Tool & API integration planning",
      "Human review & approval checkpoints",
      "Clear scope and fixed timeline",
    ],
  },
  {
    name: "Build & handover",
    text: "We build, test, and refine. Then we document the system and walk your team through it, so you can move forward with confidence.",
    details: [
      "Custom build & workflow setup",
      "Thorough testing & error safeguards",
      "Step-by-step documentation",
      "Team handover & walkthrough",
    ],
  },
];
export function EngagementBlueprint() {
  return (
    <SectionShell
      id="process"
      eyebrow="Our process"
      declarativeTitle="A clear path from idea to impact."
      qualifierTitle="Good collaboration makes better systems. Here’s how we get there."
    >
      <div className="process-layout">
        {stages.map((stage, i) => (
          <article key={stage.name}>
            <span className="process-number">0{i + 1}</span>
            <h3>{stage.name}</h3>
            <p>{stage.text}</p>
            <details>
              <summary>
                What this includes <Plus size={16} />
              </summary>
              <ul>
                {stage.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </details>
          </article>
        ))}
      </div>
      <div id="faq" className="process-faq" aria-labelledby="faq-heading">
        <h3 id="faq-heading">Questions businesses ask.</h3>
        <details>
          <summary>What does NYG Digital build?</summary>
          <p>
            NYG Digital builds websites and web applications, practical AI integrations, and
            connected business automation systems around the way your team works.
          </p>
        </details>
        <details>
          <summary>Do you work with businesses in Dubai and Ajman?</summary>
          <p>
            Yes. NYG Digital is registered in Ajman and serves businesses in Dubai and across the
            wider United Arab Emirates.
          </p>
        </details>
        <details>
          <summary>What is n8n workflow automation?</summary>
          <p>
            n8n workflow automation connects forms, APIs, CRM tools, spreadsheets, and alerts so
            information moves between the tools your business already uses.
          </p>
        </details>
      </div>
      <div className="process-close">
        <p>Your business is unique. Your scope should be, too.</p>
        <a href="#contact" className="text-link">
          Let’s map the next step <ArrowUpRight size={16} />
        </a>
      </div>
    </SectionShell>
  );
}
