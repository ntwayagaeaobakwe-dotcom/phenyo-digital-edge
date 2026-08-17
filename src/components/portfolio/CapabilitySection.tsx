import { ChevronRight, ArrowUpRight, ShieldCheck, Zap, Layers, RefreshCw } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import { SectionShell } from "./SectionShell";

export function CapabilitySection() {
  const whatsappHref = `https://wa.me/${PERSONAL_INFO.phone.replace(/[^0-9]/g, "")}`;

  const capabilities = [
    {
      index: "01",
      title: "Lead response in seconds",
      body: "Enquiries from portals, web forms, and WhatsApp get qualified and routed before a competitor picks up the phone.",
      icon: Zap,
    },
    {
      index: "02",
      title: "Operations on autopilot",
      body: "Scheduling, job dispatch, contract generation, and recurring executive reports run themselves and surface only the exceptions.",
      icon: RefreshCw,
    },
    {
      index: "03",
      title: "One source of truth",
      body: "CRM, databases, spreadsheets, and team messaging stay in continuous sync without anyone retyping anything.",
      icon: Layers,
    },
  ];

  return (
    <SectionShell
      id="studio"
      eyebrow="Studio Credibility & Delivery"
      iconGlyph="05"
      themeVariant="light"
      declarativeTitle="See the system."
      qualifierTitle="Before you buy it."
    >
      <div className="grid gap-10 lg:grid-cols-12 items-center">
        {/* Left Column: Direct Delivery Commitment */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#100C1D]/5 border border-[rgba(16,12,29,0.1)] text-xs font-mono text-[#7657FF] font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>BUILT FOR DUBAI OPERATORS</span>
          </div>

          <h3 className="font-sans text-3xl sm:text-4xl font-extrabold text-[#05060A] tracking-tight leading-tight">
            Every engagement starts with a working demo built on your actual process.
          </h3>

          <p className="text-base text-[#4A465B] leading-relaxed">
            No 40-page generic slide decks. We map your actual workflow, build a functioning proof-of-concept, and quantify the exact hours recovered before any long-term agreement.
          </p>

          <div className="pt-2 flex flex-wrap gap-3.5">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#7657FF] hover:bg-[#8A6EFF] px-6 py-3.5 text-sm font-semibold text-white transition-all shadow-md active:scale-[0.98] focus-ring"
            >
              <span>Request Working Demo</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-[#FFFFFF] border border-[rgba(16,12,29,0.15)] hover:border-[#7657FF] px-5 py-3.5 text-sm font-semibold text-[#05060A] transition-colors focus-ring"
            >
              WhatsApp Founder
            </a>
          </div>
        </div>

        {/* Right Column: 3 Structured Delivery Capabilities */}
        <div className="lg:col-span-6 space-y-4">
          {capabilities.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.index}
                className="rounded-2xl border border-[rgba(16,12,29,0.1)] bg-[#FFFFFF] p-6 shadow-sm hover:shadow-md hover:border-[#7657FF]/40 transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-[#7657FF]/10 border border-[#7657FF]/20 flex items-center justify-center text-[#7657FF] shrink-0 font-bold font-mono">
                    {item.index}
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h4 className="text-lg font-bold text-[#05060A] font-sans">
                      {item.title}
                    </h4>
                    <p className="text-sm text-[#4A465B] leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
