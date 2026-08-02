import { useState } from "react";
import { ArrowUpRight, Check, PlugZap } from "lucide-react";
import { SectionShell } from "./SectionShell";

const bottlenecks = [
  {
    id: "follow-up",
    label: "Leads are not followed up",
    system: "Lead capture and follow-up pipeline",
    tools: ["Website form", "n8n", "CRM", "Email / WhatsApp"],
    steps: ["Capture each inquiry", "Assign an owner", "Prepare the next follow-up"],
    outcome: "A consistent path from first contact to a visible next action.",
  },
  {
    id: "scattered",
    label: "Customer information is scattered",
    system: "Connected customer operations hub",
    tools: ["Forms", "Database", "CRM", "Dashboard"],
    steps: ["Collect details once", "Normalize each record", "Maintain one source of truth"],
    outcome: "Less searching and fewer conflicting customer records.",
  },
  {
    id: "admin",
    label: "Staff repeat the same admin work",
    system: "Rules-based workflow automation",
    tools: ["n8n", "APIs", "Documents", "Notifications"],
    steps: ["Identify the trigger", "Automate repeatable steps", "Escalate exceptions"],
    outcome: "More team time reserved for judgment and customer work.",
  },
  {
    id: "conversion",
    label: "The website is not generating inquiries",
    system: "Conversion-focused website and lead route",
    tools: ["React", "Analytics", "Forms", "CRM"],
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
      // The contact form remains usable if browser storage is unavailable.
    }
  };

  return (
    <SectionShell
      id="diagnostic"
      eyebrow="Start with the bottleneck"
      title={
        <>
          You describe the friction.{" "}
          <span className="text-gradient-gold">I design the system.</span>
        </>
      }
    >
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-2" aria-label="Choose a business bottleneck">
          {bottlenecks.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedId(item.id)}
              aria-pressed={selectedId === item.id}
              className={`flex w-full items-center justify-between gap-4 rounded-2xl border px-5 py-4 text-left cursor-pointer transition-all duration-150 ease-out active:scale-[0.98] ${
                selectedId === item.id
                  ? "border-primary/50 bg-primary/[0.08] text-foreground shadow-sm"
                  : "border-border/60 bg-black/15 text-muted-foreground hover:border-border hover:text-foreground"
              }`}
            >
              <span className="font-semibold">{item.label}</span>
              <span
                className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-colors duration-150 ${
                  selectedId === item.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border"
                }`}
              >
                {selectedId === item.id ? <Check className="h-3.5 w-3.5" /> : null}
              </span>
            </button>
          ))}
        </div>

        <div key={selected.id} className="studio-surface p-6 sm:p-8 animate-in fade-in-50 duration-200" aria-live="polite">
          <div className="flex items-center gap-2 text-xs font-semibold text-primary">
            <PlugZap className="h-4 w-4" />
            Suggested system
          </div>
          <h3 className="mt-3 text-2xl font-bold sm:text-3xl">{selected.system}</h3>
          <div className="mt-7 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="font-mono text-xs text-muted-foreground">CONNECTED TOOLS</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {selected.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-border/70 px-3 py-1.5 text-xs"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="font-mono text-xs text-muted-foreground">AUTOMATED STEPS</p>
              <ol className="mt-3 space-y-2 text-sm">
                {selected.steps.map((step, index) => (
                  <li key={step} className="flex gap-2">
                    <span className="text-primary font-mono tabular-nums font-bold">0{index + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="mt-7 border-t border-border/60 pt-5">
            <p className="text-sm leading-relaxed text-muted-foreground">{selected.outcome}</p>
            <a
              href="#contact"
              onClick={carryContext}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground active:scale-[0.97] transition-all duration-150 ease-out shadow-[var(--shadow-gold)]"
            >
              Solve this bottleneck <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
