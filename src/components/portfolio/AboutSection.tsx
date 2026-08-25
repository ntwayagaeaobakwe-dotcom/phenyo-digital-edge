import { SectionShell } from "./SectionShell";
import { ABOUT_PILLARS, INTERESTS, COMPANY_INFO } from "@/data/portfolio-data";

export function AboutSection() {
  return (
    <SectionShell
      id="about"
      eyebrow="Direct Studio Model"
      iconGlyph="07"
      declarativeTitle="Direct access to the systems consultant"
      qualifierTitle="designing and building your connected digital systems."
    >
      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-start">
        {/* Short text block */}
        <div className="space-y-6 text-sm sm:text-base leading-relaxed text-text-secondary">
          <p>
            {COMPANY_INFO.description} {COMPANY_INFO.subheadline}
          </p>
          <p>
            {COMPANY_INFO.overview}
          </p>

          <div className="grid gap-6 pt-6 sm:grid-cols-3 border-t border-border-subtle">
            {ABOUT_PILLARS.map((pillar, idx) => (
              <div key={pillar.title} className="border-l border-action-primary/50 pl-4">
                <span className="font-mono text-[11px] uppercase tracking-widest text-action-primary block mb-1 font-semibold">
                  0{idx + 1} // {pillar.title}
                </span>
                <p className="text-xs leading-relaxed text-text-muted">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dark Terminal Panel */}
        <div className="rounded-2xl border border-border-default bg-surface-raised/80 p-6 sm:p-8 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-border-subtle pb-4 mb-6 font-mono text-[11px] uppercase tracking-widest">
            <span className="text-action-primary font-semibold">[ TECH_STACK_MATRIX ]</span>
            <span className="text-text-muted/60">V1.0</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {INTERESTS.map((interest) => (
              <span
                key={interest}
                className="font-mono text-xs rounded-md border border-border-subtle bg-surface-overlay/80 px-3 py-1.5 text-text-muted hover:border-action-primary hover:text-text-primary transition-colors"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
