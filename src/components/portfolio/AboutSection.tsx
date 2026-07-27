import { SectionShell } from "./SectionShell";
import { ABOUT_PILLARS, INTERESTS } from "@/data/portfolio-data";

export function AboutSection() {
  return (
    <SectionShell
      id="about"
      eyebrow="About & Operating Approach"
      title={
        <>
          Operating at the intersection of <span className="text-gradient-gold">automation, web design & connected tools</span>.
        </>
      }
    >
      <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10">
        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
          <p>
            Phenyo is a business automation and web development specialist focused on helping small businesses
            and online operators eliminate repetitive manual work, connect their software tools, and present
            their offerings clearly.
          </p>
          <p>
            As a systems builder, he designs automated n8n workflows, API integrations, client portals, and
            conversion-focused web applications — engineering practical leverage where traditional teams spend hours
            of manual effort.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 pt-4">
            {ABOUT_PILLARS.map((pillar) => (
              <div key={pillar.title} className="glass rounded-xl p-4 border border-border/60">
                <div className="text-sm font-display font-bold text-primary">{pillar.title}</div>
                <div className="text-xs text-muted-foreground mt-2 leading-relaxed">{pillar.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-6 border border-border/80">
          <div className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
            Core Focus & Capabilities
          </div>
          <ul className="mt-4 flex flex-wrap gap-2">
            {INTERESTS.map((interest) => (
              <li
                key={interest}
                className="rounded-full border border-border px-3.5 py-1.5 text-sm hover:border-primary/60 hover:text-foreground transition-colors text-muted-foreground"
              >
                {interest}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionShell>
  );
}
