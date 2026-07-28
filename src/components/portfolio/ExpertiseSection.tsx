import { Workflow, Code2, Layers, Target, Brain } from "lucide-react";
import { SectionShell } from "./SectionShell";
import { EXPERTISE_SKILLS } from "@/data/portfolio-data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Workflow,
  Code2,
  Layers,
  Target,
  Brain,
};

export function ExpertiseSection() {
  return (
    <SectionShell
      id="expertise"
      eyebrow="Core Capabilities"
      title={
        <>
          Five core disciplines. <span className="text-gradient-gold">Practical execution.</span>
        </>
      }
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {EXPERTISE_SKILLS.map((skill) => {
          const IconComponent = iconMap[skill.iconName] || Workflow;
          return (
            <div
              key={skill.title}
              className="glass glass-hover rounded-2xl p-6 border border-border/80 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                  <IconComponent className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="font-display text-lg font-semibold">{skill.title}</h3>
              </div>
              <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">
                {skill.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}
