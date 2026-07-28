import { useState } from "react";
import { ArrowRight, ChevronRight, Info } from "lucide-react";
import { SectionShell } from "./SectionShell";
import { PROJECTS, ProjectItem } from "@/data/portfolio-data";
import { ProjectModal } from "./ProjectModal";

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (project: ProjectItem) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "Completed Build":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "Capability Demonstration":
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/30";
      case "Concept Project":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "Personal Project":
      default:
        return "bg-primary/10 text-primary border-primary/30";
    }
  };

  return (
    <SectionShell
      id="projects"
      eyebrow="Selected system case studies"
      title={
        <>
          The problem, the system, and{" "}
          <span className="text-gradient-gold">how information moves</span>.
        </>
      }
    >
      <div className="grid gap-6">
        {PROJECTS.map((project, index) => (
          <article
            key={project.id}
            className="studio-surface p-7 lg:p-9 group relative overflow-hidden transition-all"
          >
            <div
              className={`absolute inset-0 -z-10 bg-gradient-to-br ${project.accent} opacity-60`}
            />
            <div className="space-y-6">
              {/* Header with Title and Status */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-primary font-bold">0{index + 1}</span>
                  <h3 className="font-display text-2xl lg:text-3xl font-semibold text-foreground">
                    {project.title}
                  </h3>
                </div>
                <span
                  className={`text-xs font-mono px-3 py-1 rounded-full border ${getStatusBadgeStyle(
                    project.status,
                  )} font-semibold`}
                >
                  {project.status}
                </span>
              </div>

              {/* Disclaimer Notice if present */}
              {project.disclaimer && (
                <div className="glass p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/5 text-xs text-amber-200 flex items-start gap-2.5">
                  <Info className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{project.disclaimer}</span>
                </div>
              )}

              {/* Problem & Solution Grid */}
              <div className="grid md:grid-cols-2 gap-5">
                <div className="border-l border-border/80 pl-4">
                  <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
                    The Problem
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{project.problem}</p>
                </div>

                <div className="border-l border-primary/50 pl-4">
                  <div className="text-xs font-mono uppercase tracking-wider text-primary font-semibold mb-1.5">
                    What Was Built
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Step-by-Step Workflow Preview */}
              {project.howItWorks && project.howItWorks.length > 0 && (
                <div className="rounded-xl border border-border/60 bg-black/20 p-4">
                  <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">
                    Process Flow
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
                    {project.howItWorks.map((step, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 rounded-lg border border-border/40 bg-black/20 p-2.5"
                      >
                        <span className="h-5 w-5 rounded-full bg-primary/20 text-primary font-mono text-[10px] font-bold grid place-items-center shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-muted-foreground leading-snug">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Potential Value & Action */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground block">
                    Estimated Potential Benefit
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {project.potentialValue}
                  </span>
                </div>

                <button
                  onClick={() => handleOpenModal(project)}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-all bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-full px-5 py-2.5 cursor-pointer font-display shrink-0"
                  aria-label={`See how ${project.title} works`}
                >
                  See How It Works <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              {/* Tools Used Footer */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-border/40">
                <span className="text-xs font-mono text-muted-foreground self-center mr-2">
                  Tools used:
                </span>
                {project.toolsUsed.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Project Case Study Deep-Dive Modal */}
      <ProjectModal project={selectedProject} open={modalOpen} onOpenChange={setModalOpen} />
    </SectionShell>
  );
}
