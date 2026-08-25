import { ArrowUpRight, ShieldCheck, Zap, Layers, RefreshCw } from "lucide-react";
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
      themeVariant="paper"
      declarativeTitle="See the system."
      qualifierTitle="Before you buy it."
    >
      <div className="grid gap-10 lg:grid-cols-12 items-center">
        {/* Left Column: Direct Delivery Commitment */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#082D2D]/5 border border-[rgba(8,45,45,0.14)] text-xs font-mono text-[#082D2D] font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>BUILT FOR UAE SERVICE BUSINESSES</span>
          </div>

          <h3 className="font-serif text-3xl sm:text-4xl font-normal text-[#080A09] tracking-tight leading-[1.12]">
            Every engagement starts with a working demo built on your actual process.
          </h3>

          <p className="text-base text-[#282B29] leading-relaxed font-sans font-normal">
            No 40-page generic slide decks. We map your actual workflow, build a functioning
            proof-of-concept, and demonstrate workflow improvements before any long-term agreement.
          </p>

          <div className="pt-2 flex flex-wrap gap-3.5">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#080A09] hover:bg-[#123E3D] px-6 py-3.5 text-xs font-mono uppercase tracking-wider font-bold text-[#F3F0E8] transition-all shadow-md active:scale-[0.98] focus-ring cursor-pointer"
            >
              <span>Request Working Demo</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#FAF8F2] border border-[rgba(8,45,45,0.18)] hover:border-[#082D2D] px-5 py-3.5 text-xs font-mono uppercase tracking-wider font-semibold text-[#080A09] transition-colors focus-ring cursor-pointer"
            >
              WhatsApp Founder
            </a>
          </div>
        </div>

        {/* Right Column: 3 Structured Delivery Capabilities */}
        <div className="lg:col-span-6 space-y-4">
          {capabilities.map((item) => {
            return (
              <div
                key={item.index}
                className="rounded-3xl border border-[rgba(8,45,45,0.12)] bg-[#FAF8F2] p-6 shadow-xs hover:border-[#082D2D]/40 transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-2xl bg-[#082D2D]/5 border border-[rgba(8,45,45,0.14)] flex items-center justify-center text-[#082D2D] shrink-0 font-bold font-mono text-xs">
                    {item.index}
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h4 className="text-lg font-serif font-normal text-[#080A09]">{item.title}</h4>
                    <p className="text-sm text-[#282B29] leading-relaxed font-sans">{item.body}</p>
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
