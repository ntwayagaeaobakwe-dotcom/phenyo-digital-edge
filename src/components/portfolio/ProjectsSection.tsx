import { useState } from "react";
import { ChevronRight, Info } from "lucide-react";
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

  return (
    <SectionShell
      id="projects"
      eyebrow="System Case Studies"
      iconGlyph="05"
      declarativeTitle="The problem, the system,"
      qualifierTitle="and how information moves."
    >
      <div className="space-y-8">
        {PROJECTS.map((project, index) => (
          <article
            key={project.id}
            className="rounded-2xl border border-border/40 bg-slate-950/60 p-6 sm:p-9 backdrop-blur-sm relative overflow-hidden"
          >
            <div className="space-y-6">
              {/* Header with Title and Status */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/30 pb-5">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-primary font-semibold block mb-1">
                    [ CASE_STUDY_0{index + 1} // {project.status} ]
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-sans font-semibold text-foreground">
                    {project.title}
                  </h3>
                </div>

                <button
                  onClick={() => handleOpenModal(project)}
                  className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/30 px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-primary hover:bg-primary/20 transition-all cursor-pointer"
                  aria-label={`See how ${project.title} works`}
                >
                  <span>Architecture Details</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Disclaimer Notice if present */}
              {project.disclaimer && (
                <div className="p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/5 text-xs text-amber-300 font-mono flex items-start gap-2.5">
                  <Info className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{project.disclaimer}</span>
                </div>
              )}

              {/* Problem & Solution Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground/60 block mb-2">
                    THE PROBLEM
                  </span>
                  <p className="text-sm text-muted-foreground/90 leading-relaxed">{project.problem}</p>
                </div>

                <div>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-primary block mb-2">
                    WHAT WAS BUILT
                  </span>
                  <p className="text-sm text-muted-foreground/90 leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Step-by-Step Workflow Preview */}
              {project.howItWorks && project.howItWorks.length > 0 && (
                <div className="rounded-xl border border-border/30 bg-slate-900/40 p-4">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground/60 block mb-3">
                    [ INFORMATION_PATH ]
                  </span>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
                    {project.howItWorks.map((step, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 rounded-lg border border-border/30 bg-slate-950/60 p-3"
                      >
                        <span className="text-primary font-bold text-[11px]">0{idx + 1}.</span>
                        <span className="text-muted-foreground leading-snug">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tools Used Footer */}
              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-border/30 font-mono text-xs">
                <span className="text-muted-foreground/60 uppercase tracking-widest text-[11px] mr-2">
                  CONNECTED TECH:
                </span>
                {project.toolsUsed.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-md border border-border/40 bg-slate-900/60 px-3 py-1 text-muted-foreground"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <ProjectModal project={selectedProject} open={modalOpen} onOpenChange={setModalOpen} />
    </SectionShell>
  );
}
