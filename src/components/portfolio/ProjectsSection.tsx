import { useState } from "react";
import { ArrowUpRight, Cpu } from "lucide-react";
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
      eyebrow="Selected Work"
      title={
        <>
          Systems shipped, <span className="text-gradient-gold">stories told</span>.
        </>
      }
    >
      <div className="grid gap-5">
        {PROJECTS.map((project, index) => (
          <article
            key={project.id}
            className="glass rounded-2xl p-7 lg:p-9 group relative overflow-hidden hover:border-primary/40 transition-all border border-border/80"
          >
            <div
              className={`absolute inset-0 -z-10 bg-gradient-to-br ${project.accent} opacity-60`}
            />
            <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8 items-start">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-primary font-bold">0{index + 1}</span>
                  <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                    {project.tag}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-2xl lg:text-3xl font-semibold">
                  {project.title}
                </h3>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    onClick={() => handleOpenModal(project)}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-all bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-full px-4 py-2"
                  >
                    Explore Architecture <Cpu className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div>
                <p className="text-muted-foreground leading-relaxed">{project.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.features.map((feature) => (
                    <span
                      key={feature}
                      className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:border-primary/40 transition-colors"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Project Case Study Deep-Dive Modal */}
      <ProjectModal
        project={selectedProject}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </SectionShell>
  );
}
