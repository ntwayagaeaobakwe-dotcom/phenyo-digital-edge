import { useState } from "react";
import { ArrowUpRight, PlugZap, Check } from "lucide-react";
import { SectionShell } from "./SectionShell";

const bottlenecks = [
  {
    id: "follow-up",
    label: "Leads are not followed up immediately",
    system: "Zero-Leak Lead Routing Pipeline",
    tools: ["Website / Portals", "n8n Automation Engine", "CRM Sync", "Instant WhatsApp / Email"],
    steps: [
      "Capture & parse each inquiry",
      "Classify intent & assign owner",
      "Trigger immediate WhatsApp & schedule follow-up",
    ],
    outcome: "Eliminate dead leads with sub-minute response SLA and automatic CRM ownership.",
  },
  {
    id: "scattered",
    label: "Customer & project data is scattered",
    system: "Unified Operations Hub & Portal",
    tools: ["Smart Intake Forms", "Normalized PostgreSQL", "HubSpot / Zoho", "Realtime Dashboard"],
    steps: [
      "Collect details once via structured intake",
      "Normalize and sync across tools",
      "Maintain single source of truth for team",
    ],
    outcome: "No more searching through WhatsApp chats, lost emails, and conflicting spreadsheets.",
  },
  {
    id: "admin",
    label: "Staff repeat manual admin & reporting",
    system: "Rules-Based Workflow Automation",
    tools: ["n8n Pipeline", "REST APIs", "Automated PDF Gen", "Slack / WhatsApp Alerts"],
    steps: [
      "Listen for operational triggers",
      "Auto-generate contracts & dispatch tasks",
      "Escalate only exceptions to human review",
    ],
    outcome: "Recover 15–30 hours per team member weekly for high-value client work.",
  },
  {
    id: "conversion",
    label: "Website doesn't generate qualified inquiries",
    system: "Conversion Web System & Qualification Route",
    tools: ["TanStack / React 19", "Interactive Estimators", "Direct Booking", "CRM Ingestion"],
    steps: [
      "Clarify the offer & eliminate friction",
      "Pre-qualify lead budget & timeline",
      "Route qualified buyers straight to calendar",
    ],
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
      themeVariant="mineral"
      declarativeTitle="You describe the operational friction."
      qualifierTitle="I design the connected system."
    >
      <div className="grid gap-8 lg:grid-cols-12 items-stretch">
        {/* Left Column: 5-Col Asymmetric Bottleneck Selector */}
        <div
          className="lg:col-span-5 flex flex-col justify-between space-y-3"
          aria-label="Choose a business bottleneck"
        >
          <div className="space-y-3">
            {bottlenecks.map((item, index) => {
              const isSelected = selectedId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  aria-pressed={isSelected}
                  className={`flex w-full items-center justify-between gap-4 rounded-2xl border p-4.5 min-h-[56px] text-left cursor-pointer transition-all duration-150 active:scale-[0.98] focus-ring ${
                    isSelected
                      ? "border-[#082D2D] bg-[#FAF8F2] shadow-xs text-[#080A09]"
                      : "border-[rgba(8,45,45,0.12)] bg-[#FAF8F2]/75 text-[#282B29] hover:border-[rgba(8,45,45,0.25)] hover:bg-[#FAF8F2]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`font-mono text-xs font-bold ${isSelected ? "text-[#082D2D]" : "text-[#5C5953]"}`}
                    >
                      0{index + 1}
                    </span>
                    <span
                      className={`text-sm font-sans ${isSelected ? "font-bold text-[#080A09]" : "font-medium"}`}
                    >
                      {item.label}
                    </span>
                  </div>
                  <span
                    className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-xs transition-colors ${
                      isSelected
                        ? "bg-[#082D2D] text-[#5FD8CD] font-bold shadow-xs"
                        : "border border-[rgba(8,45,45,0.2)] text-transparent"
                    }`}
                  >
                    <Check className="h-3 w-3" />
                  </span>
                </button>
              );
            })}
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF8F2] border border-[rgba(8,45,45,0.12)] text-xs text-[#282B29] flex items-center justify-between font-mono">
            <span>[ DIAGNOSTIC MATRIX ]</span>
            <span className="text-[#082D2D] font-semibold">CUSTOM ARCHITECTURE</span>
          </div>
        </div>

        {/* Right Column: 7-Col High-Contrast Deep Teal Architectural Solution Panel */}
        <div
          key={selected.id}
          className="lg:col-span-7 rounded-3xl border border-[rgba(184,181,172,0.22)] bg-[#082D2D] text-[#F3F0E8] p-6 sm:p-8 shadow-xl flex flex-col justify-between"
          aria-live="polite"
        >
          <div>
            <div className="flex items-center justify-between border-b border-[rgba(184,181,172,0.14)] pb-4 mb-6">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#5FD8CD] font-semibold">
                <PlugZap className="h-3.5 w-3.5" />
                <span>[ RECOMMENDED_SYSTEM_ARCHITECTURE ]</span>
              </div>
              <span className="font-mono text-[11px] text-[#B8B5AC]">[ SLA: &lt; 2 WEEKS ]</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-normal text-[#F3F0E8] tracking-tight">
              {selected.system}
            </h3>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#B8B5AC] block mb-3 font-semibold">
                  INTEGRATED TOOLS & APIS
                </span>
                <div className="flex flex-wrap gap-2">
                  {selected.tools.map((tool) => (
                    <span
                      key={tool}
                      className="font-mono text-xs rounded-lg border border-[rgba(184,181,172,0.2)] bg-[#123E3D] px-3 py-1.5 text-[#F3F0E8]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#B8B5AC] block mb-3 font-semibold">
                  AUTOMATED SEQUENCE
                </span>
                <ol className="space-y-2.5 font-mono text-xs">
                  {selected.steps.map((step, index) => (
                    <li key={step} className="flex items-start gap-2 text-[#B8B5AC]">
                      <span className="text-[#5FD8CD] font-bold">0{index + 1}.</span>
                      <span className="text-[#F3F0E8] leading-snug font-sans">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-[rgba(184,181,172,0.14)] pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-xs text-[#B8B5AC] max-w-md font-sans font-medium leading-relaxed">
              {selected.outcome}
            </p>
            <a
              href="#contact"
              onClick={carryContext}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F3F0E8] hover:bg-white px-6 py-3.5 min-h-[44px] font-mono text-xs uppercase tracking-wider font-bold text-[#080A09] shadow-md active:scale-[0.98] transition-all focus-ring w-full sm:w-fit cursor-pointer"
            >
              <span>Solve this bottleneck</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
