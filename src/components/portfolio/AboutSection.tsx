import { SectionShell } from "./SectionShell";
import { ABOUT_PILLARS, INTERESTS } from "@/data/portfolio-data";

export function AboutSection() {
  return (
    <SectionShell
      id="about"
      eyebrow="Direct Studio Model"
      iconGlyph="07"
      declarativeTitle="Direct access to the developer"
      qualifierTitle="designing and building your connected system."
    >
      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-start">
        {/* Short text block */}
        <div className="space-y-6 text-sm sm:text-base leading-relaxed text-muted-foreground/90">
          <p>
            NYG Digital is a focused automation and web-systems studio for service businesses that need
            practical operational improvements without agency layers or overhead.
          </p>
          <p>
            You work directly with the engineer mapping your workflow, designing the user interface, and
            connecting the APIs. Decisions stay transparent, delivery stays accountable, and every system
            is built around how your business actually operates.
          </p>

          <div className="grid gap-6 pt-6 sm:grid-cols-3 border-t border-border/30">
            {ABOUT_PILLARS.map((pillar, idx) => (
              <div key={pillar.title} className="border-l border-primary/40 pl-4">
                <span className="font-mono text-[11px] uppercase tracking-widest text-primary block mb-1">
                  0{idx + 1} // {pillar.title}
                </span>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Dark Terminal Panel */}
        <div className="rounded-2xl border border-border/40 bg-slate-950/70 p-6 sm:p-8 backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-border/30 pb-4 mb-6 font-mono text-[11px] uppercase tracking-widest">
            <span className="text-primary font-semibold">[ TECH_STACK_MATRIX ]</span>
            <span className="text-muted-foreground/50">V1.0</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {INTERESTS.map((interest) => (
              <span
                key={interest}
                className="font-mono text-xs rounded-md border border-border/40 bg-slate-900/60 px-3 py-1.5 text-muted-foreground hover:border-primary/50 hover:text-foreground transition-colors"
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
