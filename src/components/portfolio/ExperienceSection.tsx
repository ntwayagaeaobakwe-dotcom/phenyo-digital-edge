import { Workflow, Layers, Zap, Target, Code2, Cpu } from "lucide-react";
import { SectionShell } from "./SectionShell";
import { FOCUS_AREAS, CREDENTIALS_SUMMARY } from "@/data/portfolio-data";

export function ExperienceSection() {
  return (
    <SectionShell
      id="experience"
      eyebrow="Operating Standards"
      iconGlyph="08"
      declarativeTitle="A practical engineering approach"
      qualifierTitle="grounded in measurable business outcomes."
    >
      <div className="grid md:grid-cols-2 gap-4">
        {FOCUS_AREAS.map((area, index) => (
          <div
            key={area.label}
            className="rounded-xl border border-border-subtle bg-surface-raised/60 p-4 flex items-center gap-4 hover:border-action-primary/50 transition-colors"
          >
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-action-primary/10 text-action-primary shrink-0 font-mono text-xs font-bold border border-action-primary/30">
              0{index + 1}
            </div>
            <div className="font-mono text-xs uppercase tracking-wider text-text-primary font-medium">
              {area.label}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-border-default bg-surface-raised/80 p-6 font-mono text-xs space-y-4">
        <div className="uppercase tracking-widest text-action-primary font-semibold border-b border-border-subtle pb-3">
          [ CAPABILITY_SUMMARY // TRACK_RECORD ]
        </div>
        <div className="space-y-3">
          {CREDENTIALS_SUMMARY.map((cred, idx) => (
            <div key={idx} className="flex items-center gap-3 text-text-muted">
              <span className="text-status-success font-bold">[✓]</span>
              <span>{cred}</span>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
