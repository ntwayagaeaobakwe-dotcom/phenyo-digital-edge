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
        contactElem.scrollIntoView();
      }
    }, 100);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-[#100C1D] border-[rgba(196,190,255,0.2)] text-[#F5F6FA] p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl rounded-2xl">
        <DialogHeader className="text-left space-y-2.5 border-b border-[rgba(196,190,255,0.12)] pb-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#78E7FF] font-bold px-3 py-1 rounded-full bg-[#78E7FF]/10 border border-[#78E7FF]/25">
              {project.tag}
            </span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#9D9AAF] px-3 py-1 rounded-full bg-white/5 border border-white/10">
              {project.status}
            </span>
          </div>
          <DialogTitle className="text-2xl sm:text-3xl font-sans font-bold text-[#F5F6FA] tracking-tight">
            {project.title}
          </DialogTitle>
          <DialogDescription className="text-[#9D9AAF] text-sm leading-relaxed">
            {project.desc}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-3 text-sm">
          {/* Disclaimer if present */}
          {project.disclaimer && (
            <div className="p-4 rounded-xl border border-[#FF5577]/30 bg-[#FF5577]/10 text-xs font-mono text-[#F5F6FA] flex items-start gap-3">
              <Info className="h-4 w-4 text-[#FF5577] shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold uppercase tracking-wider mb-1 text-[#FF5577]">
                  Concept Disclaimer
                </div>
                <div className="leading-relaxed text-[#9D9AAF]">{project.disclaimer}</div>
              </div>
            </div>
          )}

          {/* Problem & Solution */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-[rgba(196,190,255,0.12)] bg-[#05060A]/60">
              <div className="flex items-center gap-2 text-xs font-mono text-[#9D9AAF] font-semibold uppercase tracking-wider mb-2">
                <Target className="h-4 w-4 text-[#FF5577]" /> The Bottleneck
              </div>
              <p className="text-[#9D9AAF] leading-relaxed text-xs sm:text-sm">
                {project.problem}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-[rgba(196,190,255,0.12)] bg-[#05060A]/60">
              <div className="flex items-center gap-2 text-xs font-mono text-[#78E7FF] font-semibold uppercase tracking-wider mb-2">
                <Zap className="h-4 w-4 text-[#78E7FF]" /> What Was Built
              </div>
              <p className="text-[#F5F6FA] leading-relaxed text-xs sm:text-sm">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Process Workflow Steps */}
          {project.howItWorks && project.howItWorks.length > 0 && (
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#9D9AAF] mb-2.5">
                How It Works — Step-by-Step Workflow
              </div>
              <ul className="grid sm:grid-cols-2 gap-2.5 text-xs text-[#9D9AAF]">
                {project.howItWorks.map((step, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl border border-[rgba(196,190,255,0.1)] bg-[#05060A]/60"
                  >
                    <span className="h-5 w-5 rounded-full bg-[#7657FF]/20 text-[#78E7FF] font-mono text-[11px] font-bold tabular-nums grid place-items-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-snug text-[#F5F6FA]">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Supporting Tools & Tech Stack */}
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#9D9AAF] mb-2 flex items-center gap-1.5">
              <Cpu className="h-3.5 w-3.5 text-[#78E7FF]" /> Supporting Tools & Applications
            </div>
            <div className="flex flex-wrap gap-2">
              {project.toolsUsed.map((tool) => (
                <span
                  key={tool}
                  className="rounded-lg bg-[#05060A] border border-[rgba(196,190,255,0.15)] px-3 py-1 text-xs font-mono text-[#F5F6FA]"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Estimated Value */}
          <div className="p-4 rounded-xl border border-[#7657FF]/30 bg-[#7657FF]/10 shadow-sm">
            <div className="text-xs font-mono uppercase tracking-widest text-[#78E7FF] font-semibold mb-1">
              Estimated Operational Benefit
            </div>
            <div className="text-sm font-medium text-[#F5F6FA] leading-relaxed">
              {project.potentialValue}
            </div>
          </div>

          {/* Modal Action CTA */}
          <div className="pt-2">
            <button
              onClick={handleCtaClick}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#7657FF] hover:bg-[#8A6EFF] px-6 py-4 text-sm font-semibold text-white shadow-lg active:scale-[0.98] transition-all cursor-pointer focus-ring"
            >
              Discuss a Similar Build <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
