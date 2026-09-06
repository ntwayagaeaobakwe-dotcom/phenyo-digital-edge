import { useEffect, useState } from "react";
import { ArrowRight, Check, Play, RotateCcw } from "lucide-react";
import { SectionShell } from "./SectionShell";
import { ScrollScrubWorkflowFilm } from "./ScrollScrubWorkflowFilm";

const scenarios = {
  leads: {
    label: "Lead Routing",
    summary:
      "An incoming inquiry is captured, organized, qualified, routed to the right team member, and prepared for immediate follow-up.",
    nodes: [
      ["Inquiry received", "Website, WhatsApp, or form"],
      ["Details organized", "Contact, need, and urgency"],
      ["Lead qualified", "Checked against your criteria"],
      ["Team notified", "Instant alert to the right person"],
      ["Follow-up prepared", "Next step scheduled and visible"],
    ],
  },
  onboarding: {
    label: "Client Onboarding",
    summary:
      "A signed client receives an organized record in your CRM, folder access, welcome instructions, and a clear next step.",
    nodes: [
      ["Agreement signed", "Triggers the onboarding flow"],
      ["Record created", "Saved to CRM & spreadsheet"],
      ["Access granted", "Client portal and files ready"],
      ["Welcome sent", "Clear next steps delivered"],
      ["Kickoff scheduled", "Tasks and deadlines assigned"],
    ],
  },
} as const;

const comparisonRows = [
  { label: "Handoffs", manual: "4–6 manual handoffs", automated: "1 automated workflow" },
  {
    label: "First response",
    manual: "Hours or next day",
    automated: "Under 60 seconds",
  },
  {
    label: "Data entry",
    manual: "Copying & pasting between apps",
    automated: "Captured once, synced everywhere",
  },
  {
    label: "Follow-up tracking",
    manual: "Relying on memory",
    automated: "Scheduled & tracked automatically",
  },
  {
    label: "Customer records",
    manual: "Scattered in chats and sheets",
    automated: "One organized source of truth",
  },
] as const;

type ScenarioKey = keyof typeof scenarios;

export function SystemStudio() {
  const [scenario, setScenario] = useState<ScenarioKey>("leads");
  const [activeStep, setActiveStep] = useState(0);
  const [comparison, setComparison] = useState<"manual" | "automated">("automated");
  const [onboardingRunId, setOnboardingRunId] = useState(0);
  const [filmOpen, setFilmOpen] = useState(false);

  // Animate DOM workflow when Client Onboarding is active
  useEffect(() => {
    if (onboardingRunId === 0) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setActiveStep(scenarios[scenario].nodes.length - 1);
      return;
    }

    setActiveStep(0);
    const timers = scenarios[scenario].nodes
      .slice(1)
      .map((_, index) => window.setTimeout(() => setActiveStep(index + 1), (index + 1) * 650));
    return () => timers.forEach(window.clearTimeout);
  }, [scenario, onboardingRunId]);

  const switchScenario = (value: ScenarioKey) => {
    setScenario(value);
    setOnboardingRunId((current) => current + 1);
  };

  return (
    <SectionShell
      id="systems"
      eyebrow="Interactive workflow demo"
      declarativeTitle="Less friction. More flow."
      qualifierTitle="Follow the journey from an incoming request to an organized next action."
    >
      <span id="system-studio" className="anchor-alias" />
      <div className="workflow-studio">
        <div className="workflow-toolbar">
          <div className="segmented-control" role="group" aria-label="System scenario">
            {(Object.keys(scenarios) as ScenarioKey[]).map((key) => (
              <button
                type="button"
                key={key}
                aria-pressed={scenario === key}
                onClick={() => switchScenario(key)}
              >
                {scenarios[key].label}
              </button>
            ))}
          </div>
          <span className="demo-label">Interactive demonstration</span>
        </div>
        <div className="workflow-diagram">
          <ol aria-label={scenarios[scenario].label + " workflow stages"}>
            {scenarios[scenario].nodes.map(([title, detail], index) => (
              <li
                key={title}
                className={index <= activeStep ? "step-complete" : ""}
                aria-current={index === activeStep ? "step" : undefined}
              >
                <div className="workflow-step-top">
                  <span>0{index + 1}</span>
                  {index <= activeStep ? <Check size={16} /> : <span className="step-wait" />}
                </div>
                <h3>{title}</h3>
                <p>{detail}</p>
                {index < 4 && <ArrowRight className="workflow-connector" size={16} />}
              </li>
            ))}
          </ol>
        </div>
        <div className="workflow-bottom">
          <p>{scenarios[scenario].summary}</p>
          <button
            className="text-link"
            type="button"
            onClick={() => setOnboardingRunId((current) => current + 1)}
          >
            {onboardingRunId ? <RotateCcw size={16} /> : <Play size={16} />}{" "}
            {onboardingRunId ? "Replay flow" : "Run the workflow"}
          </button>
        </div>
        <p className="sr-only" aria-live="polite">
          {onboardingRunId > 0 && activeStep === 4
            ? "Workflow complete. All five stages finished."
            : ""}
        </p>
      </div>
      <div className="workflow-comparison">
        <div>
          <h3>A connected way to work.</h3>
          <p>Explore how the everyday experience changes.</p>
          <div className="segmented-control" role="group" aria-label="Compare workflows">
            {(["manual", "automated"] as const).map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={comparison === option}
                onClick={() => setComparison(option)}
              >
                {option === "manual" ? "Manual" : "Automated"}
              </button>
            ))}
          </div>
        </div>
        <div className="comparison-rows" aria-live="polite">
          {comparisonRows.map((row) => (
            <div key={row.label}>
              <span>{row.label}</span>
              <strong>{comparison === "automated" ? row.automated : row.manual}</strong>
            </div>
          ))}
          <small>
            Illustrative comparison. Actual timing and savings depend on your tools, workflow, and
            volume.
          </small>
        </div>
      </div>
      <details
        className="workflow-film-disclosure"
        onToggle={(event) => setFilmOpen(event.currentTarget.open)}
      >
        <summary>
          Watch the lead-routing workflow film <Play size={15} />
        </summary>
        {filmOpen && <ScrollScrubWorkflowFilm />}
      </details>
    </SectionShell>
  );
}
