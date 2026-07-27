import { Workflow, Layers, Zap, Target, Code2, Cpu, CheckCircle2 } from "lucide-react";
import { SectionShell } from "./SectionShell";
import { FOCUS_AREAS, CREDENTIALS_SUMMARY } from "@/data/portfolio-data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Workflow,
  Layers,
  Zap,
  Target,
  Code2,
  Cpu,
};

export function ExperienceSection() {
  return (
    <SectionShell
      id="experience"
      eyebrow="Experience & Focus Areas"
      title={
        <>
          A working <span className="text-gradient-gold">operating approach</span>.
        </>
      }
    >
      <div className="grid md:grid-cols-2 gap-5">
        {FOCUS_AREAS.map((area) => {
          const IconComponent = iconMap[area.iconName] || Workflow;
          return (
            <div
              key={area.label}
              className="glass rounded-2xl p-5 flex items-center gap-4 border border-border/70 hover:border-primary/40 transition-colors"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary shrink-0">
                <IconComponent className="h-5 w-5" />
              </div>
              <div className="font-medium text-sm sm:text-base">{area.label}</div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 glass rounded-2xl p-6 border border-border/80 text-sm space-y-3">
        <div className="text-xs font-mono uppercase tracking-widest text-primary font-semibold mb-1">
          Execution Track Record & Capability Summary
        </div>
        {CREDENTIALS_SUMMARY.map((cred, idx) => (
          <div key={idx} className="flex items-center gap-3 text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
            <span>{cred}</span>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
