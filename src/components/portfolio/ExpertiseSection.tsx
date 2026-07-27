import { LineChart, Bot, Code2, Sparkles, Brain } from "lucide-react";
import { SectionShell } from "./SectionShell";
import { EXPERTISE_SKILLS } from "@/data/portfolio-data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LineChart,
  Bot,
  Code2,
  Sparkles,
  Brain,
};

export function ExpertiseSection() {
  return (
    <SectionShell
      id="expertise"
      eyebrow="Core Expertise"
      title={
        <>
          Five disciplines. <span className="text-gradient-gold">One operator.</span>
        </>
      }
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {EXPERTISE_SKILLS.map((skill) => {
          const IconComponent = iconMap[skill.iconName] || Sparkles;
          return (
            <div
              key={skill.title}
              className="glass rounded-2xl p-6 hover:border-primary/40 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <IconComponent className="h-5 w-5" />
                </div>
                <h3 className="font-display text-lg font-semibold">{skill.title}</h3>
              </div>
              <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">
                {skill.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
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
