import { useState } from "react";
import { ArrowUpRight, PlugZap, Check } from "lucide-react";
import { SectionShell } from "./SectionShell";

const bottlenecks = [
  {
    id: "follow-up",
    label: "Leads are not followed up immediately",
    system: "Zero-Leak Lead Routing Pipeline",
    tools: ["Website / Portals", "n8n Automation Engine", "CRM Sync", "Instant WhatsApp / Email"],
    steps: ["Capture & parse each inquiry", "Classify intent & assign owner", "Trigger immediate WhatsApp & schedule follow-up"],
    outcome: "Eliminate dead leads with sub-minute response SLA and automatic CRM ownership.",
  },
  {
    id: "scattered",
    label: "Customer & project data is scattered",
    system: "Unified Operations Hub & Portal",
    tools: ["Smart Intake Forms", "Normalized PostgreSQL", "HubSpot / Zoho", "Realtime Dashboard"],
    steps: ["Collect details once via structured intake", "Normalize and sync across tools", "Maintain single source of truth for team"],
    outcome: "No more searching through WhatsApp chats, lost emails, and conflicting spreadsheets.",
  },
  {
    id: "admin",
    label: "Staff repeat manual admin & reporting",
    system: "Rules-Based Workflow Automation",
    tools: ["n8n Pipeline", "REST APIs", "Automated PDF Gen", "Slack / WhatsApp Alerts"],
    steps: ["Listen for operational triggers", "Auto-generate contracts & dispatch tasks", "Escalate only exceptions to human review"],
    outcome: "Recover 15–30 hours per team member weekly for high-value client work.",
  },
  {
    id: "conversion",
    label: "Website doesn't generate qualified inquiries",
    system: "Conversion Web System & Qualification Route",
    tools: ["TanStack / React 19", "Interactive Estimators", "Direct Booking", "CRM Ingestion"],
    steps: ["Clarify the offer & eliminate friction", "Pre-qualify lead budget & timeline", "Route qualified buyers straight to calendar"],
    outcome: "A digital presence that actively acts as your top-performing qualification rep.",
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
      iconGlyph="03"
      themeVariant="light"
      declarativeTitle="You describe the operational friction."
      qualifierTitle="I design the connected system."
    >
      <div className="grid gap-8 lg:grid-cols-12 items-stretch">
        {/* Left Column: 5-Col Asymmetric Bottleneck Selector */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-3" aria-label="Choose a business bottleneck">
          <div className="space-y-3">
            {bottlenecks.map((item, index) => {
              const isSelected = selectedId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  aria-pressed={isSelected}
                  className={`flex w-full items-center justify-between gap-4 rounded-xl border p-4.5 min-h-[56px] text-left cursor-pointer transition-all duration-150 active:scale-[0.98] focus-ring ${
                    isSelected
                      ? "border-[#7657FF] bg-[#FFFFFF] shadow-[0_8px_24px_rgba(118,87,255,0.12)] text-[#05060A]"
                      : "border-[rgba(16,12,29,0.12)] bg-[#FFFFFF]/70 text-[#4A465B] hover:border-[rgba(16,12,29,0.25)] hover:bg-[#FFFFFF]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`font-mono text-xs font-bold ${isSelected ? "text-[#7657FF]" : "text-[#726E84]"}`}>
                      0{index + 1}
                    </span>
                    <span className={`text-sm ${isSelected ? "font-bold text-[#05060A]" : "font-medium"}`}>
                      {item.label}
                    </span>
                  </div>
                  <span
                    className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs transition-colors ${
                      isSelected
                        ? "bg-[#7657FF] text-white font-bold shadow-xs"
                        : "border border-[rgba(16,12,29,0.15)] text-transparent"
                    }`}
                  >
                    <Check className="h-3.5 w-3.5" />
                  </span>
                </button>
              );
            })}
          </div>

          <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[rgba(16,12,29,0.1)] text-xs text-[#4A465B] flex items-center justify-between font-mono">
            <span>[ DIAGNOSTIC MATRIX ]</span>
            <span className="text-[#7657FF] font-semibold">CUSTOM ARCHITECTURE</span>
          </div>
        </div>

        {/* Right Column: 7-Col High-Contrast Dark Architectural Solution Panel */}
        <div
          key={selected.id}
          className="lg:col-span-7 rounded-2xl border border-[rgba(196,190,255,0.2)] bg-[#100C1D] text-[#F5F6FA] p-6 sm:p-8 shadow-2xl flex flex-col justify-between"
          aria-live="polite"
        >
          <div>
            <div className="flex items-center justify-between border-b border-[rgba(196,190,255,0.12)] pb-4 mb-6">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#78E7FF] font-semibold">
                <PlugZap className="h-4 w-4" />
                <span>[ RECOMMENDED_SYSTEM_ARCHITECTURE ]</span>
              </div>
              <span className="font-mono text-[11px] text-[#9D9AAF]">[ SLA: &lt; 2 WEEKS ]</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-sans font-bold text-[#F5F6FA] tracking-tight">
              {selected.system}
            </h3>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#9D9AAF] block mb-3 font-semibold">
                  INTEGRATED TOOLS & APIS
                </span>
                <div className="flex flex-wrap gap-2">
                  {selected.tools.map((tool) => (
                    <span
                      key={tool}
                      className="font-mono text-xs rounded-lg border border-[rgba(196,190,255,0.15)] bg-[#05060A]/80 px-3 py-1.5 text-[#F5F6FA]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#9D9AAF] block mb-3 font-semibold">
                  AUTOMATED SEQUENCE
                </span>
                <ol className="space-y-2.5 font-mono text-xs">
                  {selected.steps.map((step, index) => (
                    <li key={step} className="flex items-start gap-2 text-[#9D9AAF]">
                      <span className="text-[#78E7FF] font-bold">0{index + 1}.</span>
                      <span className="text-[#F5F6FA] leading-snug">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-[rgba(196,190,255,0.12)] pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-xs text-[#9D9AAF] max-w-md font-medium leading-relaxed">
              {selected.outcome}
            </p>
            <a
              href="#contact"
              onClick={carryContext}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#7657FF] hover:bg-[#8A6EFF] px-6 py-3.5 min-h-[44px] font-mono text-xs uppercase tracking-widest font-bold text-white shadow-lg active:scale-[0.98] transition-all focus-ring w-full sm:w-fit"
            >
              <span>Solve this bottleneck</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
