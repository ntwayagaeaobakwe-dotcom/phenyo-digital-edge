import { SectionShell } from "./SectionShell";
import { ABOUT_PILLARS, INTERESTS } from "@/data/portfolio-data";

export function AboutSection() {
  return (
    <SectionShell
      id="about"
      eyebrow="The studio model"
      title={
        <>
          Direct access to the person{" "}
          <span className="text-gradient-gold">designing and building your system</span>.
        </>
      }
    >
      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            Phenyo is a focused automation and digital-systems studio for businesses that need
            practical improvements without agency layers or unnecessary complexity.
          </p>
          <p>
            You work directly with the developer mapping the process, designing the interface, and
            connecting the tools. Decisions stay visible, delivery stays accountable, and the system
            is shaped around how your business actually operates.
          </p>

          <div className="grid gap-4 pt-4 sm:grid-cols-3">
            {ABOUT_PILLARS.map((pillar) => (
              <div key={pillar.title} className="border-l border-primary/35 pl-4">
                <div className="text-sm font-bold text-foreground">{pillar.title}</div>
                <div className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {pillar.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="studio-surface p-6">
          <div className="text-xs font-semibold text-primary">CORE FOCUS & CAPABILITIES</div>
          <ul className="mt-4 flex flex-wrap gap-2">
            {INTERESTS.map((interest) => (
              <li
                key={interest}
                className="rounded-full border border-border px-3.5 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
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
