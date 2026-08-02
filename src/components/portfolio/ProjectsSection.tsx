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
            className="rounded-2xl border border-border-default bg-surface-raised/80 p-6 sm:p-9 backdrop-blur-md relative overflow-hidden"
          >
            <div className="space-y-6">
              {/* Header with Title and Status */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-subtle pb-5">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-action-primary font-semibold block mb-1">
                    [ CASE_STUDY_0{index + 1} // {project.status} ]
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-sans font-semibold text-text-primary">
                    {project.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenModal(project)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-action-primary/10 border border-action-primary/30 px-5 py-2.5 min-h-[44px] font-mono text-xs uppercase tracking-widest text-action-primary hover:bg-action-primary/20 transition-all cursor-pointer focus-ring"
                  aria-label={`See how ${project.title} works`}
                >
                  <span>Architecture Details</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Disclaimer Notice if present */}
              {project.disclaimer && (
                <div className="p-4 rounded-xl border border-status-warning/40 bg-status-warning/10 text-xs text-text-primary font-mono flex items-start gap-2.5">
                  <Info className="h-4 w-4 text-status-warning shrink-0 mt-0.5" />
                  <span>{project.disclaimer}</span>
                </div>
              )}

              {/* Problem & Solution Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-text-muted block mb-2 font-medium">
                    THE PROBLEM
                  </span>
                  <p className="text-sm text-text-muted leading-relaxed">{project.problem}</p>
                </div>

                <div>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-action-primary block mb-2 font-medium">
                    WHAT WAS BUILT
                  </span>
                  <p className="text-sm text-text-secondary leading-relaxed">{project.solution}</p>
                </div>
              </div>

              {/* Step-by-Step Workflow Preview */}
              {project.howItWorks && project.howItWorks.length > 0 && (
                <div className="rounded-xl border border-border-subtle bg-surface-base/50 p-4">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-text-muted block mb-3 font-medium">
                    [ INFORMATION_PATH ]
                  </span>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
                    {project.howItWorks.map((step, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 rounded-lg border border-border-subtle bg-surface-overlay/80 p-3"
                      >
                        <span className="text-action-primary font-bold text-[11px]">
                          0{idx + 1}.
                        </span>
                        <span className="text-text-muted leading-snug">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tools Used Footer */}
              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-border-subtle font-mono text-xs">
                <span className="text-text-muted/60 uppercase tracking-widest text-[11px] mr-2">
                  CONNECTED TECH:
                </span>
                {project.toolsUsed.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-md border border-border-subtle bg-surface-overlay/80 px-3 py-1.5 text-text-muted"
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
