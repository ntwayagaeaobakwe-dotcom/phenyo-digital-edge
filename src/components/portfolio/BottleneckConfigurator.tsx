import { useState } from "react";
import { ArrowUpRight, PlugZap } from "lucide-react";
import { SectionShell } from "./SectionShell";

const bottlenecks = [
  {
    id: "follow-up",
    label: "Leads are not followed up",
    system: "Lead capture & follow-up pipeline",
    tools: ["Website Form", "n8n Engine", "CRM Sync", "Email / WhatsApp"],
    steps: ["Capture each inquiry", "Assign an owner", "Prepare the next follow-up"],
    outcome: "A consistent path from first contact to a visible next action.",
  },
  {
    id: "scattered",
    label: "Customer information is scattered",
    system: "Connected customer operations hub",
    tools: ["Forms", "Normalized DB", "CRM", "Live Dashboard"],
    steps: ["Collect details once", "Normalize each record", "Maintain one source of truth"],
    outcome: "Less searching and fewer conflicting customer records.",
  },
  {
    id: "admin",
    label: "Staff repeat the same admin work",
    system: "Rules-based workflow automation",
    tools: ["n8n Pipeline", "REST APIs", "Docs", "Notifications"],
    steps: ["Identify the trigger", "Automate repeatable steps", "Escalate exceptions"],
    outcome: "More team time reserved for judgment and customer work.",
  },
  {
    id: "conversion",
    label: "The website is not generating inquiries",
    system: "Conversion-focused website & lead route",
    tools: ["React 19", "Analytics", "Forms", "CRM Route"],
    steps: ["Clarify the offer", "Reduce decision friction", "Route qualified inquiries"],
    outcome: "A website that actively supports the sales process.",
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
      eyebrow="Bottleneck Diagnostic"
      iconGlyph="04"
      declarativeTitle="You describe the operational friction."
      qualifierTitle="I design the connected system."
    >
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        {/* Left Column: Asymmetric bottleneck selector */}
        <div className="space-y-3" aria-label="Choose a business bottleneck">
          {bottlenecks.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedId(item.id)}
              aria-pressed={selectedId === item.id}
              className={`flex w-full items-center justify-between gap-4 rounded-xl border px-5 py-4 min-h-[44px] text-left cursor-pointer transition-all duration-150 active:scale-[0.98] focus-ring ${
                selectedId === item.id
                  ? "border-action-primary/60 bg-action-primary/10 text-text-primary"
                  : "border-border-subtle bg-surface-raised/40 text-text-muted hover:border-border-default hover:text-text-primary"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-text-muted/60">0{index + 1}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              <span
                className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-xs transition-colors ${
                  selectedId === item.id
                    ? "bg-action-primary text-action-primary-foreground font-bold"
                    : "border border-border-default text-transparent"
                }`}
              >
                ✓
              </span>
            </button>
          ))}
        </div>

        {/* Right Column: Dark Terminal Panel */}
        <div
          key={selected.id}
          className="rounded-2xl border border-border-default bg-surface-raised/80 p-6 sm:p-8 backdrop-blur-md animate-in fade-in-50 duration-200"
          aria-live="polite"
        >
          <div className="flex items-center justify-between border-b border-border-subtle pb-4 mb-6">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-action-primary font-semibold">
              <PlugZap className="h-3.5 w-3.5" />
              <span>[ SUGGESTED_ARCHITECTURE ]</span>
            </div>
            <span className="font-mono text-[11px] text-text-muted/60">[ STATUS: SPEC ]</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-sans font-semibold text-text-primary">
            {selected.system}
          </h3>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-text-muted block mb-3 font-medium">
                CONNECTED TOOLS
              </span>
              <div className="flex flex-wrap gap-2">
                {selected.tools.map((tool) => (
                  <span
                    key={tool}
                    className="font-mono text-xs rounded-md border border-border-subtle bg-surface-overlay/80 px-3 py-1.5 text-text-muted"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-text-muted block mb-3 font-medium">
                AUTOMATED SEQUENCE
              </span>
              <ol className="space-y-2 font-mono text-xs">
                {selected.steps.map((step, index) => (
                  <li key={step} className="flex items-center gap-2 text-text-muted">
                    <span className="text-action-primary font-bold">0{index + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="mt-8 border-t border-border-subtle pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-xs text-text-muted max-w-md">{selected.outcome}</p>
            <a
              href="#contact"
              onClick={carryContext}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-action-primary px-6 py-3 min-h-[44px] font-mono text-xs uppercase tracking-widest font-semibold text-action-primary-foreground active:scale-[0.98] transition-all hover:bg-action-primary-hover focus-ring w-fit"
            >
              <span>Solve bottleneck</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
