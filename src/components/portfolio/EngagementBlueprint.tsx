import { ArrowUpRight, Search, Compass, Cpu, Check } from "lucide-react";
import { SectionShell } from "./SectionShell";

const stages = [
  {
    step: "01",
    name: "Discover & Review",
    tagline:
      "We review your current workflow, daily tools, and repetitive tasks to identify where time is being lost.",
    icon: Search,
    details: [
      "Workflow mapping",
      "Identifying manual bottlenecks",
      "Reviewing existing tools & software",
      "Defining project goals & requirements",
    ],
  },
  {
    step: "02",
    name: "Design & Plan",
    tagline:
      "We design the connected system, choose the right tools, map each automation step, and set a clear project scope.",
    icon: Compass,
    details: [
      "Workflow blueprint & logic",
      "Tool & API integration planning",
      "Human review & approval checkpoints",
      "Clear scope and fixed timeline",
    ],
  },
  {
    step: "03",
    name: "Build & Handover",
    tagline:
      "We build and test your system, document how everything works, and train your team so you can run it with confidence.",
    icon: Cpu,
    details: [
      "Custom build & workflow setup",
      "Thorough testing & error safeguards",
      "Step-by-step documentation",
      "Team handover & walkthrough",
    ],
  },
] as const;

export function EngagementBlueprint() {
  return (
    <SectionShell
      id="process"
      eyebrow="How We Work Together"
      iconGlyph="06"
      themeVariant="sand"
      declarativeTitle="Every system begins with the workflow"
      qualifierTitle="—not a preset package."
    >
      <div className="space-y-8">
        {/* Supporting Editorial Lead & Framework Principles */}
        <div className="rounded-2xl border border-[rgba(8,45,45,0.14)] bg-[#FAF8F2] p-5 sm:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-xs">
          <div className="space-y-1 max-w-2xl">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#082D2D] font-semibold flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#082D2D]" />
              [ 3-STEP PROCESS ]
            </span>
            <p className="font-sans text-sm sm:text-base text-[#282B29] leading-relaxed">
              Every system is customized to your business. We take time to understand how your team
              works before recommending the right setup.
            </p>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#5C5953] shrink-0">
            <span className="px-2.5 py-1 rounded-full bg-[#E5D6C2] border border-[rgba(8,45,45,0.14)] text-[#080A09] font-medium">
              3-STAGE PROCESS
            </span>
          </div>
        </div>

        {/* 3 Connected Architectural Stages */}
        <div className="relative grid gap-6 lg:grid-cols-3">
          {/* Connecting architectural guide line on desktop */}
          <div
            className="hidden lg:block absolute top-[42px] left-[15%] right-[15%] h-px bg-[rgba(8,45,45,0.16)] pointer-events-none z-0"
            aria-hidden="true"
          />

          {stages.map((stage) => {
            const Icon = stage.icon;
            return (
              <div
                key={stage.step}
                className="relative z-10 rounded-3xl border border-[rgba(8,45,45,0.14)] bg-[#FAF8F2] p-6 sm:p-8 flex flex-col justify-between shadow-xs transition-transform duration-200 hover:-translate-y-0.5"
              >
                <div>
                  {/* Top Stage Header with Monospace Step & Glyph */}
                  <div className="flex items-center justify-between border-b border-[rgba(8,45,45,0.1)] pb-4 mb-6">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold text-[#082D2D] px-2.5 py-1 rounded-full bg-[#E5D6C2] border border-[rgba(8,45,45,0.14)]">
                        {stage.step}
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-widest text-[#5C5953]">
                        STAGE {stage.step}
                      </span>
                    </div>
                    <div className="grid h-8 w-8 place-items-center rounded-full bg-[#082D2D] text-[#5FD8CD]">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Stage Name & Summary */}
                  <h3 className="font-serif text-2xl sm:text-[26px] font-normal text-[#080A09] tracking-tight mb-3">
                    {stage.name}
                  </h3>

                  <p className="font-sans text-sm text-[#282B29] leading-relaxed mb-6">
                    {stage.tagline}
                  </p>
                </div>

                {/* Deliverables / Scope Checklist */}
                <div className="border-t border-[rgba(8,45,45,0.1)] pt-5 mt-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#5C5953] block mb-3 font-semibold">
                    KEY DELIVERABLES
                  </span>
                  <ul className="space-y-2.5 font-sans text-xs text-[#282B29]">
                    {stage.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2.5">
                        <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#082D2D]/8 text-[#082D2D] mt-0.5">
                          <Check className="h-2.5 w-2.5 stroke-[2.5]" />
                        </span>
                        <span className="font-medium text-[#080A09]">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing Action Banner: Primary CTA + Trust Note */}
        <div className="rounded-3xl border border-[rgba(184,181,172,0.22)] bg-[#082D2D] p-7 sm:p-9 text-[#F3F0E8] shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#5FD8CD] font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-[#5FD8CD] animate-pulse" />
              <span>[ CLEAR SCOPE & EXPECTATIONS ]</span>
            </div>
            <p className="font-sans text-xs sm:text-sm text-[#B8B5AC] leading-relaxed">
              Every project is scoped individually around your exact business needs. We define
              clear deliverables before any build begins.
            </p>
          </div>

          <div className="w-full md:w-auto shrink-0">
            <a
              href="#contact"
              className="inline-flex w-full md:w-auto items-center justify-center gap-2 bg-[#F3F0E8] hover:bg-white text-[#080A09] font-mono text-xs uppercase tracking-wider font-bold px-7 py-4 rounded-full shadow-md transition-all active:scale-[0.98] focus-ring cursor-pointer"
            >
              <span>Request a Systems Review</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
