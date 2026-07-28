import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ProjectItem } from "@/data/portfolio-data";
import { ArrowUpRight, CheckCircle2, Cpu, Target, Zap, Info } from "lucide-react";

interface ProjectModalProps {
  project: ProjectItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectModal({ project, open, onOpenChange }: ProjectModalProps) {
  if (!project) return null;

  const handleCtaClick = () => {
    onOpenChange(false);
    setTimeout(() => {
      const contactElem = document.getElementById("contact");
      if (contactElem) {
        contactElem.scrollIntoView();
      }
    }, 100);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-background/95 border-primary/40 text-foreground glass p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
        <DialogHeader className="text-left space-y-2.5 border-b border-border/60 pb-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-primary font-bold px-3 py-1 rounded-full bg-primary/10 border border-primary/30">
              {project.tag}
            </span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground font-semibold px-3 py-1 rounded-full bg-white/5 border border-border">
              {project.status}
            </span>
          </div>
          <DialogTitle className="text-2xl sm:text-3xl font-display font-bold text-foreground tracking-tight">
            {project.title}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm leading-relaxed">
            {project.desc}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-3 text-sm">
          {/* Disclaimer if present */}
          {project.disclaimer && (
            <div className="glass p-4 rounded-xl border border-amber-500/40 bg-amber-500/10 text-xs text-amber-200 flex items-start gap-3">
              <Info className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold uppercase tracking-wider mb-1 text-amber-400">
                  Concept Disclaimer
                </div>
                <div className="leading-relaxed">{project.disclaimer}</div>
              </div>
            </div>
          )}

          {/* Problem & Solution */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="glass p-4 rounded-xl border border-border/70">
              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground font-semibold uppercase tracking-wider mb-2">
                <Target className="h-4 w-4 text-red-400" /> The Problem
              </div>
              <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
                {project.problem}
              </p>
            </div>

            <div className="glass p-4 rounded-xl border border-border/70">
              <div className="flex items-center gap-2 text-xs font-mono text-primary font-semibold uppercase tracking-wider mb-2">
                <Zap className="h-4 w-4 text-primary" /> What Was Built
              </div>
              <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Process Workflow Steps */}
          {project.howItWorks && project.howItWorks.length > 0 && (
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2.5">
                How It Works — Step-by-Step Workflow
              </div>
              <ul className="grid sm:grid-cols-2 gap-2.5 text-xs text-muted-foreground">
                {project.howItWorks.map((step, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 glass p-3 rounded-lg border border-border/50"
                  >
                    <span className="h-5 w-5 rounded-full bg-primary/20 text-primary font-mono text-[11px] font-bold grid place-items-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-snug text-foreground">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Supporting Tools & Tech Stack */}
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-1.5">
              <Cpu className="h-3.5 w-3.5 text-primary" /> Supporting Tools & Applications
            </div>
            <div className="flex flex-wrap gap-2">
              {project.toolsUsed.map((tool) => (
                <span
                  key={tool}
                  className="rounded-lg bg-black/40 border border-primary/20 px-3 py-1 text-xs font-mono text-foreground font-medium"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Estimated Value */}
          <div className="glass-gold p-4 rounded-xl border border-primary/40 shadow-sm">
            <div className="text-xs font-mono uppercase tracking-widest text-primary font-semibold mb-1">
              Estimated Potential Benefit
            </div>
            <div className="text-sm font-medium text-foreground leading-relaxed">
              {project.potentialValue}
            </div>
          </div>

          {/* Modal Action CTA */}
          <div className="pt-2">
            <button
              onClick={handleCtaClick}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground hover:opacity-95 transition-all shadow-[var(--shadow-gold)] font-display cursor-pointer"
            >
              Discuss a Similar Build <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
