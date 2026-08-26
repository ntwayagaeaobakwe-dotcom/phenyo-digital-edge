import { useState } from "react";
import { ArrowUpRight, PlugZap, Check } from "lucide-react";
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
    tools: ["Smart Intake Forms", "Connected Database", "CRM (HubSpot / Zoho)", "Realtime Dashboard"],
    steps: [
      "Collect details once via a simple form",
      "Sync information automatically across all tools",
      "Give your team one clear, organized dashboard",
    ],
    outcome: "No more searching through lost WhatsApp messages, buried emails, and conflicting spreadsheets.",
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
    outcome:
      "Reduce repeated administrative work and free up hours for client work and revenue.",
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
      eyebrow="Find What Slows You Down"
      iconGlyph="03"
      themeVariant="mineral"
      declarativeTitle="Select what is slowing your business down."
      qualifierTitle="We build a connected system to solve it."
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
            <span>[ COMMON BOTTLENECKS ]</span>
            <span className="text-[#082D2D] font-semibold">TAILORED SOLUTION</span>
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
                <span>[ RECOMMENDED_SYSTEM_WORKFLOW ]</span>
              </div>
              <span className="font-mono text-[11px] text-[#B8B5AC]">
                [ SCOPE CONFIRMED IN REVIEW ]
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-normal text-[#F3F0E8] tracking-tight">
              {selected.system}
            </h3>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#B8B5AC] block mb-3 font-semibold">
                  CONNECTED TOOLS & APIS
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
                  HOW THE WORKFLOW RUNS
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
              <span>Request a Systems Review</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
