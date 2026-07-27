import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ProjectItem } from "@/data/portfolio-data";
import { ArrowUpRight, CheckCircle2, Cpu, Target, Zap } from "lucide-react";

interface ProjectModalProps {
  project: ProjectItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectModal({ project, open, onOpenChange }: ProjectModalProps) {
  if (!project) return null;

  const handleCtaClick = () => {
    onOpenChange(false);
    const contactElem = document.getElementById("contact");
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-background border-primary/30 text-foreground glass p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-left space-y-2 border-b border-border/60 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-primary font-bold px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20">
              {project.tag}
            </span>
          </div>
          <DialogTitle className="text-2xl sm:text-3xl font-display font-bold text-foreground">
            {project.title}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm leading-relaxed">
            {project.desc}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-2 text-sm">
          {/* Challenge & Objective */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="glass p-4 rounded-xl border border-border/60">
              <div className="flex items-center gap-2 text-xs font-mono text-primary font-semibold uppercase tracking-wider mb-2">
                <Target className="h-3.5 w-3.5" /> Challenge
              </div>
              <p className="text-muted-foreground leading-relaxed text-xs">{project.challenge}</p>
            </div>

            <div className="glass p-4 rounded-xl border border-border/60">
              <div className="flex items-center gap-2 text-xs font-mono text-primary font-semibold uppercase tracking-wider mb-2">
                <Zap className="h-3.5 w-3.5" /> Objective
              </div>
              <p className="text-muted-foreground leading-relaxed text-xs">{project.objective}</p>
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-1.5">
              <Cpu className="h-3.5 w-3.5 text-primary" /> Tech Stack & Tools
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md bg-white/5 border border-border/80 px-2.5 py-1 text-xs font-mono text-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2.5">
              Architecture & Features
            </div>
            <ul className="grid sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 glass p-2 rounded-lg border border-border/40">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Value Created */}
          <div className="glass-gold p-4 rounded-xl border border-primary/30">
            <div className="text-xs font-mono uppercase tracking-widest text-primary font-semibold mb-1">
              Impact & Value Delivered
            </div>
            <div className="text-sm font-medium text-foreground">{project.valueCreated}</div>
          </div>

          {/* Modal CTA */}
          <div className="pt-2">
            <button
              onClick={handleCtaClick}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity shadow-[var(--shadow-gold)] font-display"
            >
              Discuss a Similar Build <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
