import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ProjectItem } from "@/data/portfolio-data";
import { ArrowUpRight, Cpu, Target, Zap, Info } from "lucide-react";

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
        contactElem.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-[#082D2D] border-[rgba(184,181,172,0.22)] text-[#F3F0E8] p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl rounded-3xl">
        <DialogHeader className="text-left space-y-2.5 border-b border-[rgba(184,181,172,0.14)] pb-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#5FD8CD] font-bold px-3 py-1 rounded-full bg-[#123E3D] border border-[rgba(184,181,172,0.2)]">
              {project.tag}
            </span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#B8B5AC] px-3 py-1 rounded-full bg-white/5 border border-white/10">
              {project.status}
            </span>
          </div>
          <DialogTitle className="text-2xl sm:text-3xl font-serif font-normal text-[#F3F0E8] tracking-tight">
            {project.title}
          </DialogTitle>
          <DialogDescription className="text-[#B8B5AC] text-sm leading-relaxed font-sans">
            {project.desc}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-3 text-sm font-sans">
          {/* Disclaimer if present */}
          {project.disclaimer && (
            <div className="p-4 rounded-2xl border border-[rgba(184,181,172,0.2)] bg-[#123E3D] text-xs font-mono text-[#F3F0E8] flex items-start gap-3">
              <Info className="h-4 w-4 text-[#5FD8CD] shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold uppercase tracking-wider mb-1 text-[#5FD8CD]">
                  Concept Disclaimer
                </div>
                <div className="leading-relaxed text-[#B8B5AC]">{project.disclaimer}</div>
              </div>
            </div>
          )}

          {/* Problem & Solution */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl border border-[rgba(184,181,172,0.14)] bg-[#080A09]/60">
              <div className="flex items-center gap-2 text-xs font-mono text-[#B8B5AC] font-semibold uppercase tracking-wider mb-2">
                <Target className="h-4 w-4 text-[#B8B5AC]" /> The Bottleneck
              </div>
              <p className="text-[#B8B5AC] leading-relaxed text-xs sm:text-sm font-normal">
                {project.problem}
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-[rgba(184,181,172,0.14)] bg-[#080A09]/60">
              <div className="flex items-center gap-2 text-xs font-mono text-[#5FD8CD] font-semibold uppercase tracking-wider mb-2">
                <Zap className="h-4 w-4 text-[#5FD8CD]" /> What Was Built
              </div>
              <p className="text-[#F3F0E8] leading-relaxed text-xs sm:text-sm font-normal">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Process Workflow Steps */}
          {project.howItWorks && project.howItWorks.length > 0 && (
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#B8B5AC] mb-2.5">
                How It Works — Step-by-Step Workflow
              </div>
              <ul className="grid sm:grid-cols-2 gap-2.5 text-xs text-[#B8B5AC]">
                {project.howItWorks.map((step, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-2xl border border-[rgba(184,181,172,0.12)] bg-[#123E3D]/50"
                  >
                    <span className="h-5 w-5 rounded-full bg-[#082D2D] text-[#5FD8CD] font-mono text-[11px] font-bold tabular-nums grid place-items-center shrink-0 mt-0.5 border border-[rgba(184,181,172,0.2)]">
                      {idx + 1}
                    </span>
                    <span className="leading-snug text-[#F3F0E8] font-sans">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Supporting Tools & Tech Stack */}
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#B8B5AC] mb-2 flex items-center gap-1.5">
              <Cpu className="h-3.5 w-3.5 text-[#5FD8CD]" /> Supporting Tools & Applications
            </div>
            <div className="flex flex-wrap gap-2">
              {project.toolsUsed.map((tool) => (
                <span
                  key={tool}
                  className="rounded-lg bg-[#080A09] border border-[rgba(184,181,172,0.15)] px-3 py-1 text-xs font-mono text-[#F3F0E8]"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Estimated Value */}
          <div className="p-4 rounded-2xl border border-[rgba(184,181,172,0.18)] bg-[#123E3D]/60 shadow-xs">
            <div className="text-xs font-mono uppercase tracking-widest text-[#5FD8CD] font-semibold mb-1">
              Estimated Operational Benefit
            </div>
            <div className="text-sm font-medium text-[#F3F0E8] leading-relaxed font-sans">
              {project.potentialValue}
            </div>
          </div>

          {/* Modal Action CTA */}
          <div className="pt-2">
            <button
              onClick={handleCtaClick}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#F3F0E8] hover:bg-white px-6 py-4 text-xs font-mono uppercase tracking-wider font-bold text-[#080A09] shadow-md active:scale-[0.98] transition-all cursor-pointer focus-ring"
            >
              <span>Discuss a Similar Build</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

