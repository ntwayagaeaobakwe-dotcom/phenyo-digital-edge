import { useEffect, useState } from "react";
import { ArrowRight, Check, CheckCircle2, CircleAlert, Play, RotateCcw } from "lucide-react";
import { SectionShell } from "./SectionShell";
import { ScrollScrubWorkflowFilm } from "./ScrollScrubWorkflowFilm";

const scenarios = {
  leads: {
    label: "Lead Routing",
    summary:
      "An incoming inquiry is organized, qualified, routed to the right owner, and prepared for immediate follow-up.",
    nodes: [
      ["Inquiry received", "Website, WhatsApp, or form"],
      ["Details extracted", "Contact, need, and urgency"],
      ["Lead qualified", "Rules and context applied"],
      ["Owner notified", "One clear point of ownership"],
      ["Follow-up prepared", "Next action stays visible"],
    ],
  },
  onboarding: {
    label: "Client Onboarding",
    summary:
      "A signed client receives an organized record, access, welcome communication, and a visible next step.",
    nodes: [
      ["Agreement signed", "Trigger the onboarding flow"],
      ["Record created", "One source of client details"],
      ["Access granted", "Portal and shared resources"],
      ["Welcome sent", "Expectations communicated"],
      ["Kickoff prepared", "Tasks and owners assigned"],
    ],
  },
} as const;

const comparisonRows = [
  { label: "Handoffs", manual: "4–6 manual handoffs", automated: "One review point" },
  {
    label: "First response",
    manual: "Hours or next day",
    automated: "Immediate acknowledgement (< 60s)",
  },
  {
    label: "Repeated admin",
    manual: "Copy, paste, re-entry",
    automated: "Captured once, synced everywhere",
  },
  {
    label: "Follow-up risk",
    manual: "Depends on memory",
    automated: "Next action scheduled & tracked",
  },
  {
    label: "Customer record",
    manual: "Chats and spreadsheets",
    automated: "One connected single source of truth",
  },
] as const;

type ScenarioKey = keyof typeof scenarios;

export function SystemStudio() {
  const [scenario, setScenario] = useState<ScenarioKey>("leads");
  const [activeStep, setActiveStep] = useState(0);
  const [comparison, setComparison] = useState<"manual" | "automated">("automated");
  const [onboardingRunId, setOnboardingRunId] = useState(0);

  // Animate DOM workflow when Client Onboarding is active
  useEffect(() => {
    if (scenario !== "onboarding") return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setActiveStep(scenarios.onboarding.nodes.length - 1);
      return;
    }

    setActiveStep(0);
    const timers = scenarios.onboarding.nodes
      .slice(1)
      .map((_, index) => window.setTimeout(() => setActiveStep(index + 1), (index + 1) * 650));
    return () => timers.forEach(window.clearTimeout);
  }, [scenario, onboardingRunId]);

  const switchScenario = (value: ScenarioKey) => {
    setScenario(value);
    if (value === "onboarding") {
      setOnboardingRunId((current) => current + 1);
    }
  };

  return (
    <SectionShell
      id="systems"
      eyebrow="Interactive System Studio"
      iconGlyph="02"
      themeVariant="paper"
      declarativeTitle="See how work moves"
      qualifierTitle="from initial request to organized next action."
    >
      {/* Studio Header & Scenario Selector */}
      <div className="flex flex-col gap-5 border-b border-[rgba(8,45,45,0.1)] pb-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl text-sm leading-relaxed text-[#282B29]">
          This interactive blueprint shows the logic behind practical business automation—what
          happens, where ownership changes, and which next action is created.
        </p>
        <div
          className="inline-flex w-fit items-center rounded-full border border-[rgba(8,45,45,0.14)] bg-[#F3F0E8] p-1 font-mono text-xs shrink-0"
          aria-label="System scenario"
        >
          {(Object.keys(scenarios) as ScenarioKey[]).map((key) => (
            <button
              key={key}
              type="button"
              aria-pressed={scenario === key}
              onClick={() => switchScenario(key)}
              className={`rounded-full px-4 py-2 min-h-[40px] font-medium transition-all uppercase tracking-wider cursor-pointer focus-ring text-xs ${
                scenario === key
                  ? "bg-[#080A09] text-[#F3F0E8] font-semibold shadow-xs"
                  : "text-[#282B29] hover:text-[#080A09]"
              }`}
            >
              {scenarios[key].label}
            </button>
          ))}
        </div>
      </div>

      {/* Scenario Stage Presentation */}
      <div className="mt-6">
        {scenario === "leads" ? (
          /* Cinematic Scroll-Scrubbed Workflow Film for Lead Routing */
          <ScrollScrubWorkflowFilm />
        ) : (
          /* Accessible Editorial DOM Workflow for Client Onboarding */
          <div className="rounded-3xl border border-[rgba(8,45,45,0.14)] bg-[#FAF8F2] p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col gap-4 border-b border-[rgba(8,45,45,0.1)] pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#082D2D] font-bold">
                  [ BLUEPRINT // CLIENT_ONBOARDING ]
                </span>
                <p className="mt-1 text-xs text-[#282B29] font-sans">
                  Automated onboarding checklist and client handoff sequence.
                </p>
              </div>
            </div>

            <div className="pt-6">
              <div className="grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-center">
                {scenarios.onboarding.nodes.map(([title, detail], index) => {
                  const complete = index <= activeStep;
                  return (
                    <div key={title} className="contents">
                      <div
                        className={`min-h-28 rounded-2xl border p-4 transition-all duration-300 ${
                          complete
                            ? "border-[#082D2D] bg-[#F3F0E8] shadow-xs ring-1 ring-[#082D2D]/15"
                            : "border-[rgba(8,45,45,0.1)] bg-[#FAF8F2]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <span className="font-mono text-[11px] text-[#5C5953] font-semibold">
                            0{index + 1}
                          </span>
                          <span
                            className={`grid h-5 w-5 place-items-center rounded-full text-[10px] ${
                              complete
                                ? "bg-[#082D2D] text-[#5FD8CD] font-bold"
                                : "border border-[rgba(8,45,45,0.2)] text-[#5C5953]"
                            }`}
                          >
                            {complete ? <Check className="h-3 w-3" /> : index + 1}
                          </span>
                        </div>
                        <p className="mt-3 text-xs font-mono uppercase tracking-wider font-bold text-[#080A09]">
                          {title}
                        </p>
                        <p className="mt-1 text-xs text-[#282B29] leading-relaxed font-sans">
                          {detail}
                        </p>
                      </div>
                      {index < scenarios.onboarding.nodes.length - 1 ? (
                        <div
                          className="relative mx-auto flex h-6 w-6 items-center justify-center lg:h-4 lg:w-6"
                          aria-hidden="true"
                        >
                          <ArrowRight
                            className={`relative h-4 w-4 rotate-90 transition-colors duration-300 lg:rotate-0 ${
                              index < activeStep ? "text-[#082D2D]" : "text-[#B8B5AC]"
                            }`}
                          />
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>

              <div className="mt-7 flex flex-col gap-4 border-t border-[rgba(8,45,45,0.1)] pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-2xl text-xs text-[#282B29] font-medium font-sans">
                  {scenarios.onboarding.summary}
                </p>
                <button
                  type="button"
                  onClick={() => setOnboardingRunId((current) => current + 1)}
                  className="inline-flex w-fit items-center justify-center gap-2 rounded-full border border-[rgba(8,45,45,0.2)] bg-[#082D2D] px-5 py-2.5 min-h-[40px] font-mono text-xs uppercase tracking-wider font-semibold text-[#F3F0E8] hover:bg-[#123E3D] transition-all focus-ring cursor-pointer"
                >
                  {activeStep === scenarios.onboarding.nodes.length - 1 ? (
                    <RotateCcw className="h-3.5 w-3.5 text-[#5FD8CD]" />
                  ) : (
                    <Play className="h-3.5 w-3.5 text-[#5FD8CD]" />
                  )}
                  Replay flow
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Operating Model Comparison Panel */}
      <div className="mt-8 grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="flex flex-col justify-between rounded-3xl border border-[rgba(8,45,45,0.14)] bg-[#FAF8F2] p-6 sm:p-8">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#082D2D] font-bold">
              [ OPERATING_MODEL ]
            </span>
            <h3 className="mt-3 text-2xl font-serif font-normal text-[#080A09]">
              Compare the same process.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#282B29] font-sans">
              Switch between manual and connected execution to see where automation creates
              consistency rather than complexity.
            </p>
          </div>
          <div className="mt-6 inline-flex w-fit items-center rounded-full border border-[rgba(8,45,45,0.14)] bg-[#F3F0E8] p-1 font-mono text-xs">
            {(["manual", "automated"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setComparison(option)}
                aria-pressed={comparison === option}
                className={`rounded-full px-4 py-2 min-h-[40px] font-medium uppercase tracking-wider transition-all cursor-pointer focus-ring text-xs ${
                  comparison === option
                    ? "bg-[#080A09] text-[#F3F0E8] font-semibold shadow-xs"
                    : "text-[#282B29] hover:text-[#080A09]"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-[rgba(8,45,45,0.14)] bg-[#FAF8F2] p-6 sm:p-8">
          <div className="divide-y divide-[rgba(8,45,45,0.08)]">
            {comparisonRows.map((row) => (
              <div
                key={row.label}
                className="grid gap-2 py-3.5 sm:grid-cols-[0.85fr_1.15fr] sm:items-center"
              >
                <span className="font-mono text-xs uppercase tracking-wider text-[#5C5953] font-medium">
                  {row.label}
                </span>
                <span className="flex items-center gap-2 text-xs font-semibold text-[#080A09]">
                  {comparison === "automated" ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#082D2D]" />
                  ) : (
                    <CircleAlert className="h-4 w-4 shrink-0 text-[#5C5953]" />
                  )}
                  {comparison === "automated" ? row.automated : row.manual}
                </span>
              </div>
            ))}
          </div>
          <p className="border-t border-[rgba(8,45,45,0.08)] mt-3 pt-3 font-mono text-[11px] text-[#5C5953]">
            Illustrative operational benchmarks. Actual time savings depend on volume and existing
            tool stack.
          </p>
        </div>
      </div>
    </SectionShell>
  );
}
