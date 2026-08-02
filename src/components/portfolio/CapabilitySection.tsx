import { ChevronRight } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import { useRevealRef } from "@/hooks/useRevealObserver";

export function CapabilitySection() {
  // Top Row reveal refs
  const topBadgeRef = useRevealRef<HTMLDivElement>(120);
  const topCopyRef = useRevealRef<HTMLParagraphElement>(220);

  // Bottom Area reveal refs
  const h2Ref = useRevealRef<HTMLHeadingElement>(180);
  const bodyRef = useRevealRef<HTMLParagraphElement>(320);
  const ctasRef = useRevealRef<HTMLDivElement>(420);

  // Capability Panel row refs
  const row0Ref = useRevealRef<HTMLDivElement>(300);
  const row1Ref = useRevealRef<HTMLDivElement>(410);
  const row2Ref = useRevealRef<HTMLDivElement>(520);

  const whatsappHref = `https://wa.me/${PERSONAL_INFO.phone.replace(/[^0-9]/g, "")}`;

  const capabilities = [
    {
      index: "01",
      title: "Lead response in seconds",
      body: "Enquiries from portals, forms, and WhatsApp get qualified and routed before a competitor picks up the phone.",
      ref: row0Ref,
    },
    {
      index: "02",
      title: "Operations on autopilot",
      body: "Scheduling, job dispatch, and recurring reporting run themselves and surface only the exceptions.",
      ref: row1Ref,
    },
    {
      index: "03",
      title: "One source of truth",
      body: "CRM, sheets, and inbox stay in sync without anyone retyping anything.",
      ref: row2Ref,
    },
  ];

  return (
    <section className="min-h-screen supports-[height:100svh]:min-h-[100svh] w-full flex flex-col justify-between pt-24 sm:pt-28 pb-12 md:pb-16 px-5 sm:px-8 md:px-12 relative z-10">
      {/* TOP ROW */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start justify-between">
        {/* Left Badge */}
        <div
          ref={topBadgeRef}
          className="reveal-item inline-flex items-center border-l-2 border-accent bg-surface-glass px-3 py-1.5 backdrop-blur-md border border-r-border-glass border-t-border-glass border-b-border-glass font-mono text-[11px] uppercase tracking-[0.15em] text-text-primary drop-shadow-md self-start"
        >
          BUILT FOR DUBAI OPERATORS
        </div>

        {/* Right Copy */}
        <p
          ref={topCopyRef}
          className="reveal-item max-w-sm sm:text-right text-lg sm:text-xl leading-relaxed text-text-primary drop-shadow-md"
        >
          Most agencies lose deals to response time, not to price. The fix is structural, and it is
          cheaper than another hire.
        </p>
      </div>

      {/* BOTTOM AREA */}
      <div className="flex-1 flex flex-col justify-end gap-12 md:flex-row md:items-end justify-between gap-16 mt-12 md:mt-0">
        {/* Left Column */}
        <div className="max-w-xl">
          {/* H2 Two-Tone */}
          <h2
            ref={h2Ref}
            className="reveal-item font-display text-5xl sm:text-6xl lg:text-7xl font-normal leading-[1.05] tracking-tight drop-shadow-lg"
          >
            <span className="text-text-primary block">See the system.</span>
            <span className="text-text-muted block">Before you buy it.</span>
          </h2>

          {/* Body */}
          <p
            ref={bodyRef}
            className="reveal-item mt-6 max-w-md text-sm sm:text-base text-text-muted drop-shadow-md leading-relaxed"
          >
            Every engagement starts with a working demo built on your actual process — not a slide
            deck. If it does not save measurable hours, there is nothing to discuss.
          </p>

          {/* CTAs */}
          <div ref={ctasRef} className="reveal-item mt-8 flex flex-wrap gap-3">
            <a
              href="#system-studio"
              className="inline-flex items-center gap-1.5 rounded-full bg-text-primary px-5 py-2.5 text-xs sm:text-sm font-medium text-surface-base hover:opacity-85 transition-opacity focus-ring"
            >
              <span>See a live workflow</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </a>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-surface-glass border border-border-glass px-5 py-2.5 text-xs sm:text-sm font-medium text-text-primary hover:bg-surface-glass-strong transition-colors focus-ring"
            >
              WhatsApp me
            </a>
          </div>
        </div>

        {/* Right Column — Frosted Capability Panel */}
        <div className="w-full max-w-md rounded-2xl border border-border-glass bg-surface-glass backdrop-blur-md px-5 sm:px-6 divide-y divide-border-glass">
          {capabilities.map((item) => (
            <div
              key={item.index}
              ref={item.ref}
              className="reveal-item flex gap-5 py-5 group cursor-default"
            >
              <span className="font-mono text-[11px] tracking-[0.15em] text-text-subtle pt-0.5 shrink-0">
                {item.index}
              </span>

              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base sm:text-lg font-medium text-text-primary group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <ChevronRight className="h-4 w-4 text-text-subtle group-hover:text-text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
