import { SectionShell } from "./SectionShell";
import { ABOUT_PILLARS, INTERESTS } from "@/data/portfolio-data";

export function AboutSection() {
  return (
    <SectionShell
      id="about"
      eyebrow="About & Mindset"
      title={
        <>
          Operating at the intersection of <span className="text-gradient-gold">markets, AI & automation</span>.
        </>
      }
    >
      <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10">
        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
          <p>
            Phenyo operates at the intersection of financial markets, artificial intelligence,
            automation, and digital business. As a day trader, he studies market movement, risk,
            psychology, and execution — with a disciplined focus on <span className="text-foreground font-semibold">XAUUSD</span> (Gold).
          </p>
          <p>
            As a systems builder, he architects custom n8n workflows, AI agents, web platforms, and
            content automation pipelines designed to scale online operations — engineering leverage
            where traditional businesses trade time.
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
            Core Focus & Interests
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
