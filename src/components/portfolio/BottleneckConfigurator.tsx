import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { SectionShell } from "./SectionShell";

const bottlenecks = [
  {
    id: "follow-up",
    label: "Leads are not followed up quickly enough",
    system: "Automated Lead Routing System",
    tools: ["Website & Forms", "n8n Automation", "CRM Sync", "Instant WhatsApp & Email"],
    steps: [
      "Capture & organize each new inquiry",
      "Match criteria & alert the right team member",
      "Send instant confirmation & schedule next follow-up",
    ],
    outcome:
      "Respond to new inquiries in seconds so potential clients never slip through the cracks.",
  },
  {
    id: "scattered",
    label: "Customer & project data is scattered",
    system: "Central Operations Hub & Client Portal",
    tools: [
      "Smart Intake Forms",
      "Connected Database",
      "CRM (HubSpot / Zoho)",
      "Realtime Dashboard",
    ],
    steps: [
      "Collect details once via a simple form",
      "Sync information automatically across all tools",
      "Give your team one clear, organized dashboard",
    ],
    outcome:
      "No more searching through lost WhatsApp messages, buried emails, and conflicting spreadsheets.",
  },
  {
    id: "admin",
    label: "Staff repeat manual admin & reporting",
    system: "Automated Business Admin & Task Workflows",
    tools: ["n8n Workflows", "Business APIs", "Automated PDF Generator", "WhatsApp & Slack Alerts"],
    steps: [
      "Listen for operational triggers & form submissions",
      "Auto-generate documents & dispatch team tasks",
      "Alert staff only when an issue needs human attention",
    ],
    outcome: "Reduce repeated administrative work and free up hours for client work and revenue.",
  },
  {
    id: "conversion",
    label: "Website doesn't generate qualified inquiries",
    system: "High-Converting Website & Booking System",
    tools: ["Modern React Website", "Interactive Estimators", "Direct Booking", "CRM Lead Capture"],
    steps: [
      "Explain your services clearly & build trust",
      "Guide visitors through simple questions",
      "Route qualified buyers straight to booking a call",
    ],
    outcome:
      "A professional website that clearly explains what you do and turns visitors into active inquiries.",
  },
] as const;

type BottleneckId = (typeof bottlenecks)[number]["id"];

export function BottleneckConfigurator() {
  const [selectedId, setSelectedId] = useState<BottleneckId>(bottlenecks[0].id);
  const selected = bottlenecks.find((item) => item.id === selectedId) ?? bottlenecks[0];

  const carryContext = () => {
    try {
      sessionStorage.setItem("pendingIndustryContext", selected.label);
      window.dispatchEvent(new CustomEvent("industryContextSet"));
    } catch {
      // Storage unavailable fallback
    }
  };

  return (
    <SectionShell
      id="diagnostic"
      eyebrow="Find your next step"
      declarativeTitle="Where could things work better?"
      qualifierTitle="Start with a challenge. Explore the system that could solve it."
    >
      <div className="diagnostic-layout">
        <div className="diagnostic-options" role="group" aria-label="Choose a business bottleneck">
          {bottlenecks.map((item, index) => (
            <button
              type="button"
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              aria-pressed={selectedId === item.id}
            >
              <span>0{index + 1}</span>
              <strong>{item.label}</strong>
              <span className="diagnostic-check">
                {selectedId === item.id && <Check size={14} />}
              </span>
            </button>
          ))}
        </div>
        <div key={selected.id} className="diagnostic-result" aria-live="polite">
          <span className="result-label">A possible next step</span>
          <h3>{selected.system}</h3>
          <ol>
            {selected.steps.map((step, index) => (
              <li key={step}>
                <span>0{index + 1}</span>
                {step}
              </li>
            ))}
          </ol>
          <div className="tag-list">
            {selected.tools.map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
          <p>{selected.outcome}</p>
          <a href="#contact" onClick={carryContext} className="button">
            Discuss this system <ArrowUpRight size={16} />
          </a>
          <small>We’ll confirm the right scope together.</small>
        </div>
      </div>
    </SectionShell>
  );
}
