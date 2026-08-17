import { useEffect, useState } from "react";
import { ArrowRight, Check, CheckCircle2, CircleAlert, Play, RotateCcw } from "lucide-react";
import { SectionShell } from "./SectionShell";

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
  { label: "First response", manual: "Hours or next day", automated: "Immediate acknowledgement (< 60s)" },
  { label: "Repeated admin", manual: "Copy, paste, re-entry", automated: "Captured once, synced everywhere" },
  { label: "Follow-up risk", manual: "Depends on memory", automated: "Next action scheduled & tracked" },
  { label: "Customer record", manual: "Chats and spreadsheets", automated: "One connected single source of truth" },
] as const;

type ScenarioKey = keyof typeof scenarios;

export function SystemStudio() {
  const [scenario, setScenario] = useState<ScenarioKey>("leads");
  const [activeStep, setActiveStep] = useState(0);
  const [comparison, setComparison] = useState<"manual" | "automated">("automated");
  const [runId, setRunId] = useState(0);

  useEffect(() => {
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
  }, [scenario, runId]);

  const switchScenario = (value: ScenarioKey) => {
    setScenario(value);
    setRunId((current) => current + 1);
  };

  return (
    <SectionShell
      id="systems"
      eyebrow="Interactive System Studio"
      iconGlyph="02"
      themeVariant="midnight"
      declarativeTitle="See how work moves"
      qualifierTitle="from initial request to organized next action."
    >
      {/* Interactive System Flow Canvas */}
      <div className="rounded-2xl border border-[rgba(196,190,255,0.18)] bg-[#05060A]/80 p-6 sm:p-8 backdrop-blur-xl shadow-xl">
        <div className="flex flex-col gap-5 border-b border-[rgba(196,190,255,0.12)] pb-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm leading-relaxed text-[#9D9AAF]">
            This interactive map shows the logic behind practical business automation—what happens, where ownership changes, and which next action is created.
          </p>
          <div
            className="inline-flex w-fit items-center rounded-xl border border-[rgba(196,190,255,0.2)] bg-[#100C1D] p-1 font-mono text-xs"
            aria-label="System scenario"
          >
            {(Object.keys(scenarios) as ScenarioKey[]).map((key) => (
              <button
                key={key}
                type="button"
                aria-pressed={scenario === key}
                onClick={() => switchScenario(key)}
                className={`rounded-lg px-4 py-2 min-h-[44px] font-medium transition-all uppercase tracking-wider cursor-pointer focus-ring ${
                  scenario === key
                    ? "bg-[#7657FF] text-white font-semibold shadow-md"
                    : "text-text-muted hover:text-white"
                }`}
              >
                {scenarios[key].label}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-6">
          <div className="grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-center">
            {scenarios[scenario].nodes.map(([title, detail], index) => {
              const complete = index <= activeStep;
              return (
                <div key={title} className="contents">
                  <div
                    className={`min-h-28 rounded-xl border p-4 transition-all duration-300 ${
                      complete
                        ? "border-[#7657FF] bg-[#7657FF]/15 shadow-sm"
                        : "border-[rgba(196,190,255,0.1)] bg-[#100C1D]/60"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="font-mono text-[11px] text-text-muted font-semibold">
                        0{index + 1}
                      </span>
                      <span
                        className={`grid h-5 w-5 place-items-center rounded-full text-[10px] ${
                          complete
                            ? "bg-[#7657FF] text-white font-bold"
                            : "border border-[rgba(196,190,255,0.2)] text-text-muted"
                        }`}
                      >
                        {complete ? <Check className="h-3 w-3" /> : index + 1}
                      </span>
                    </div>
                    <p className="mt-3 text-xs font-mono uppercase tracking-wider font-bold text-[#F5F6FA]">
                      {title}
                    </p>
                    <p className="mt-1 text-xs text-[#9D9AAF] leading-relaxed">
                      {detail}
                    </p>
                  </div>
                  {index < scenarios[scenario].nodes.length - 1 ? (
                    <div
                      className="relative mx-auto flex h-6 w-6 items-center justify-center lg:h-4 lg:w-6"
                      aria-hidden="true"
                    >
                      <ArrowRight
                        className={`relative h-4 w-4 rotate-90 transition-colors duration-300 lg:rotate-0 ${
                          index < activeStep ? "text-[#78E7FF]" : "text-text-muted/40"
                        }`}
                      />
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="mt-7 flex flex-col gap-4 border-t border-[rgba(196,190,255,0.12)] pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-xs text-[#9D9AAF] font-medium">
              {scenarios[scenario].summary}
            </p>
            <button
              type="button"
              onClick={() => setRunId((current) => current + 1)}
              className="inline-flex w-fit items-center justify-center gap-2 rounded-xl border border-[rgba(196,190,255,0.2)] bg-[#100C1D] px-5 py-2.5 min-h-[44px] font-mono text-xs uppercase tracking-wider font-semibold text-[#F5F6FA] hover:border-[#7657FF] hover:text-[#78E7FF] transition-all focus-ring cursor-pointer"
            >
              {activeStep === scenarios[scenario].nodes.length - 1 ? (
                <RotateCcw className="h-4 w-4 text-[#78E7FF]" />
              ) : (
                <Play className="h-4 w-4 text-[#78E7FF]" />
              )}
              Replay flow
            </button>
          </div>
        </div>
      </div>

      {/* Operating Model Comparison Panel */}
      <div className="mt-8 grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="flex flex-col justify-between rounded-2xl border border-[rgba(196,190,255,0.16)] bg-[#05060A]/80 p-6 sm:p-8">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#7657FF] font-bold">
              [ OPERATING_MODEL ]
            </span>
            <h3 className="mt-3 text-2xl font-bold text-[#F5F6FA]">
              Compare the same process.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[#9D9AAF]">
              Switch between manual and connected execution to see where automation creates consistency rather than complexity.
            </p>
          </div>
          <div className="mt-6 inline-flex w-fit items-center rounded-xl border border-[rgba(196,190,255,0.2)] bg-[#100C1D] p-1 font-mono text-xs">
            {(["manual", "automated"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setComparison(option)}
                aria-pressed={comparison === option}
                className={`rounded-lg px-4 py-2 min-h-[44px] font-medium uppercase tracking-wider transition-all cursor-pointer focus-ring ${
                  comparison === option
                    ? "bg-[#7657FF] text-white font-semibold shadow-xs"
                    : "text-text-muted hover:text-white"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[rgba(196,190,255,0.16)] bg-[#05060A]/80 p-6 sm:p-8">
          <div className="divide-y divide-[rgba(196,190,255,0.1)]">
            {comparisonRows.map((row) => (
              <div
                key={row.label}
                className="grid gap-2 py-3.5 sm:grid-cols-[0.85fr_1.15fr] sm:items-center"
              >
                <span className="font-mono text-xs uppercase tracking-wider text-[#9D9AAF] font-medium">
                  {row.label}
                </span>
                <span className="flex items-center gap-2 text-xs font-semibold text-[#F5F6FA]">
                  {comparison === "automated" ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#78E7FF]" />
                  ) : (
                    <CircleAlert className="h-4 w-4 shrink-0 text-[#FF5577]" />
                  )}
                  {comparison === "automated" ? row.automated : row.manual}
                </span>
              </div>
            ))}
          </div>
          <p className="border-t border-[rgba(196,190,255,0.1)] mt-3 pt-3 font-mono text-[11px] text-[#9D9AAF]/70">
            Illustrative operational benchmarks. Actual time savings depend on volume and existing tool stack.
          </p>
        </div>
      </div>
    </SectionShell>
  );
}
