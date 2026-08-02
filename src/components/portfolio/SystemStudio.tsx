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
      title={
        <>
          See how work moves from request to{" "}
          <span className="text-gradient-gold">organized next action.</span>
        </>
      }
    >
      <div className="studio-surface overflow-hidden">
        <div className="flex flex-col gap-5 border-b border-border/60 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
            This simplified system map shows the logic behind a practical automation—what happens,
            where ownership changes, and which next action is created.
          </p>
          <div
            className="inline-flex w-fit rounded-xl border border-border/70 bg-black/25 p-1"
            aria-label="System scenario"
          >
            {(Object.keys(scenarios) as ScenarioKey[]).map((key) => (
              <button
                key={key}
                type="button"
                aria-pressed={scenario === key}
                onClick={() => switchScenario(key)}
                className={`rounded-lg px-3 py-2 text-xs font-semibold transition-colors ${
                  scenario === key
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {scenarios[key].label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-5 sm:p-8">
          <div className="grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-center">
            {scenarios[scenario].nodes.map(([title, detail], index) => {
              const complete = index <= activeStep;
              return (
                <div key={title} className="contents">
                  <div
                    className={`min-h-32 rounded-2xl border p-4 transition-all duration-300 ${
                      complete
                        ? "border-primary/45 bg-primary/[0.08] shadow-[0_18px_55px_-40px_var(--gold)]"
                        : "border-border/60 bg-black/20"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="font-mono text-[11px] text-muted-foreground">
                        0{index + 1}
                      </span>
                      <span
                        className={`grid h-6 w-6 place-items-center rounded-full border text-[10px] ${
                          complete
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border text-muted-foreground"
                        }`}
                      >
                        {complete ? <Check className="h-3.5 w-3.5" /> : index + 1}
                      </span>
                    </div>
                    <p className="mt-5 text-sm font-semibold leading-snug">{title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{detail}</p>
                  </div>
                  {index < scenarios[scenario].nodes.length - 1 ? (
                    <div
                      className="relative mx-auto flex h-6 w-6 items-center justify-center lg:h-4 lg:w-6"
                      aria-hidden="true"
                    >
                      <div
                        className={`absolute inset-0 m-auto h-full w-px transition-colors duration-300 lg:h-px lg:w-full ${
                          index < activeStep ? "bg-primary/50" : "bg-border"
                        }`}
                      />
                      <ArrowRight
                        className={`relative h-4 w-4 rotate-90 transition-colors duration-300 lg:rotate-0 ${
                          index < activeStep ? "text-primary" : "text-border"
                        }`}
                      />
                      {/* Traveling pulse: fires once as the flow crosses this
                          connector, then the line above settles solid gold. */}
                      {index === activeStep - 1 && (
                        <span
                          key={`studio-pulse-${scenario}-${runId}-${index}`}
                          className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_2px_oklch(0.82_0.15_85/0.6)] animate-signal-travel-v"
                        />
                      )}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="mt-7 flex flex-col gap-4 border-t border-border/50 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {scenarios[scenario].summary}
            </p>
            <button
              type="button"
              onClick={() => setRunId((current) => current + 1)}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/35 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
            >
              {activeStep === scenarios[scenario].nodes.length - 1 ? (
                <RotateCcw className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              Replay flow
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="flex flex-col justify-between rounded-3xl border border-border/70 bg-black/20 p-6 sm:p-8">
          <div>
            <span className="font-mono text-xs text-primary">OPERATING MODEL</span>
            <h3 className="mt-3 text-2xl font-bold">Compare the same process.</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Switch between manual and connected execution to see where automation creates
              consistency rather than complexity.
            </p>
          </div>
          <div className="mt-7 inline-flex w-fit rounded-xl border border-border/70 bg-black/25 p-1">
            {(["manual", "automated"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setComparison(option)}
                aria-pressed={comparison === option}
                className={`rounded-lg px-4 py-2 text-sm font-semibold capitalize transition-colors ${
                  comparison === option
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="studio-surface px-5 sm:px-7">
          <div className="divide-y divide-border/60">
            {comparisonRows.map((row) => (
              <div
                key={row.label}
                className="grid gap-2 py-4 sm:grid-cols-[0.85fr_1.15fr] sm:items-center"
              >
                <span className="text-sm text-muted-foreground">{row.label}</span>
                <span className="flex items-center gap-2 text-sm font-semibold">
                  {comparison === "automated" ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                  ) : (
                    <CircleAlert className="h-4 w-4 shrink-0 text-amber-400" />
                  )}
                  {comparison === "automated" ? row.automated : row.manual}
                </span>
              </div>
            ))}
          </div>
          <p className="border-t border-border/60 py-4 text-xs leading-relaxed text-muted-foreground">
            Illustrative benchmarks only. Actual results depend on process complexity, connected
            tools, and team adoption.
          </p>
        </div>
      </div>
    </SectionShell>
  );
}
