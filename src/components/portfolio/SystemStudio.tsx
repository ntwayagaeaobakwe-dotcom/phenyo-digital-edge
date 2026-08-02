import { useEffect, useState } from "react";
import { ArrowRight, Check, CheckCircle2, CircleAlert, Play, RotateCcw } from "lucide-react";
import { SectionShell } from "./SectionShell";

const scenarios = {
  leads: {
    label: "Lead routing",
    summary:
      "An incoming inquiry is organized, qualified, routed to the right owner, and prepared for follow-up.",
    nodes: [
      ["Inquiry received", "Website, WhatsApp, or form"],
      ["Details extracted", "Contact, need, and urgency"],
      ["Lead qualified", "Rules and context applied"],
      ["Owner notified", "One clear point of ownership"],
      ["Follow-up prepared", "Next action stays visible"],
    ],
  },
  onboarding: {
    label: "Client onboarding",
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
  { label: "First response", manual: "Hours or next day", automated: "Immediate acknowledgement" },
  { label: "Repeated admin", manual: "Copy, paste, re-entry", automated: "Captured once" },
  { label: "Follow-up risk", manual: "Depends on memory", automated: "Next action created" },
  { label: "Customer record", manual: "Chats and spreadsheets", automated: "One connected record" },
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
      id="system-studio"
      eyebrow="Interactive system studio"
      iconGlyph="02"
      isPale={true}
      declarativeTitle="See how work moves"
      qualifierTitle="from initial request to organized next action."
    >
      {/* Pale Inverted High-Contrast Surface */}
      <div className="rounded-2xl border border-slate-300/80 bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col gap-5 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
            This simplified system map shows the logic behind practical business automation—what happens,
            where ownership changes, and which next action is created.
          </p>
          <div
            className="inline-flex w-fit rounded-lg border border-slate-200 bg-slate-100 p-1 font-mono text-xs"
            aria-label="System scenario"
          >
            {(Object.keys(scenarios) as ScenarioKey[]).map((key) => (
              <button
                key={key}
                type="button"
                aria-pressed={scenario === key}
                onClick={() => switchScenario(key)}
                className={`rounded-md px-3.5 py-1.5 font-medium transition-colors uppercase tracking-wider ${
                  scenario === key
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:text-slate-900"
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
                        ? "border-blue-500/50 bg-blue-50/70"
                        : "border-slate-200 bg-slate-50/50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="font-mono text-[11px] text-slate-400 font-medium">
                        0{index + 1}
                      </span>
                      <span
                        className={`grid h-5 w-5 place-items-center rounded-full text-[10px] ${
                          complete
                            ? "bg-blue-600 text-white font-bold"
                            : "border border-slate-300 text-slate-400"
                        }`}
                      >
                        {complete ? <Check className="h-3 w-3" /> : index + 1}
                      </span>
                    </div>
                    <p className="mt-4 text-xs font-mono uppercase tracking-wider font-semibold text-slate-900">
                      {title}
                    </p>
                    <p className="mt-1 text-xs text-slate-600 leading-relaxed">{detail}</p>
                  </div>
                  {index < scenarios[scenario].nodes.length - 1 ? (
                    <div
                      className="relative mx-auto flex h-6 w-6 items-center justify-center lg:h-4 lg:w-6"
                      aria-hidden="true"
                    >
                      <ArrowRight
                        className={`relative h-4 w-4 rotate-90 transition-colors duration-300 lg:rotate-0 ${
                          index < activeStep ? "text-blue-600" : "text-slate-300"
                        }`}
                      />
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="mt-7 flex flex-col gap-4 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-xs text-slate-600">
              {scenarios[scenario].summary}
            </p>
            <button
              type="button"
              onClick={() => setRunId((current) => current + 1)}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-300 px-4 py-2 font-mono text-xs uppercase tracking-wider font-semibold text-slate-800 transition-colors hover:bg-slate-100"
            >
              {activeStep === scenarios[scenario].nodes.length - 1 ? (
                <RotateCcw className="h-3.5 w-3.5" />
              ) : (
                <Play className="h-3.5 w-3.5" />
              )}
              Replay flow
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="flex flex-col justify-between rounded-2xl border border-slate-300 bg-white p-6 sm:p-8">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-widest text-blue-600 font-semibold">
              OPERATING MODEL
            </span>
            <h3 className="mt-3 text-xl font-semibold text-slate-900">Compare the same process.</h3>
            <p className="mt-3 text-xs leading-relaxed text-slate-600">
              Switch between manual and connected execution to see where automation creates
              consistency rather than complexity.
            </p>
          </div>
          <div className="mt-6 inline-flex w-fit rounded-lg border border-slate-200 bg-slate-100 p-1 font-mono text-xs">
            {(["manual", "automated"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setComparison(option)}
                aria-pressed={comparison === option}
                className={`rounded-md px-3.5 py-1.5 font-medium uppercase tracking-wider transition-colors ${
                  comparison === option
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-300 bg-white p-6 sm:p-8">
          <div className="divide-y divide-slate-100">
            {comparisonRows.map((row) => (
              <div
                key={row.label}
                className="grid gap-2 py-3.5 sm:grid-cols-[0.85fr_1.15fr] sm:items-center"
              >
                <span className="font-mono text-xs uppercase tracking-wider text-slate-500">{row.label}</span>
                <span className="flex items-center gap-2 text-xs font-semibold text-slate-900">
                  {comparison === "automated" ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-600" />
                  ) : (
                    <CircleAlert className="h-4 w-4 shrink-0 text-amber-500" />
                  )}
                  {comparison === "automated" ? row.automated : row.manual}
                </span>
              </div>
            ))}
          </div>
          <p className="border-t border-slate-200 mt-2 pt-3 font-mono text-[11px] text-slate-400">
            Illustrative benchmarks. Actual results depend on process complexity and adoption.
          </p>
        </div>
      </div>
    </SectionShell>
  );
}
