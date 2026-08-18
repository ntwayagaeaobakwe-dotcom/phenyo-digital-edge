import { useState } from "react";
import { ChevronRight, Info, Layers } from "lucide-react";
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
      iconGlyph="04"
      themeVariant="teal"
      declarativeTitle="The problem, the system,"
      qualifierTitle="and how information moves."
    >
      <div className="space-y-12">
        {PROJECTS.map((project, index) => {
          const isEven = index % 2 === 1;

          return (
            <article
              key={project.id}
              className="rounded-3xl border border-[rgba(184,181,172,0.18)] bg-[#082D2D] p-7 sm:p-10 backdrop-blur-xl relative overflow-hidden shadow-xl"
            >
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
                {/* Information Column */}
                <div className={`lg:col-span-6 space-y-6 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                  {/* Top Meta Bar */}
                  <div className="flex items-center justify-between gap-4 border-b border-[rgba(184,181,172,0.14)] pb-4">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-bold text-[#5FD8CD]">
                        0{index + 1}
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-widest text-[#B8B5AC]">
                        [ {project.tag} ]
                      </span>
                    </div>

                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#B8B5AC] px-3 py-1 rounded-full bg-[#123E3D] border border-[rgba(184,181,172,0.2)]">
                      {project.status}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-serif font-normal text-[#F3F0E8] tracking-tight leading-[1.12]">
                    {project.title}
                  </h3>

                  {/* Concept Disclaimer if any */}
                  {project.disclaimer && (
                    <div className="p-3.5 rounded-2xl border border-[rgba(184,181,172,0.2)] bg-[#123E3D]/80 text-xs font-mono text-[#F3F0E8] flex items-start gap-2.5">
                      <Info className="h-4 w-4 text-[#5FD8CD] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{project.disclaimer}</span>
                    </div>
                  )}

                  {/* Problem & Solution Breakdown */}
                  <div className="space-y-4 text-sm font-sans">
                    <div>
                      <span className="font-mono text-[11px] uppercase tracking-widest text-[#B8B5AC] block mb-1.5 font-semibold">
                        THE BOTTLENECK
                      </span>
                      <p className="text-[#B8B5AC] leading-relaxed font-normal">
                        {project.problem}
                      </p>
                    </div>

                    <div>
                      <span className="font-mono text-[11px] uppercase tracking-widest text-[#5FD8CD] block mb-1.5 font-semibold">
                        SYSTEM ARCHITECTURE
                      </span>
                      <p className="text-[#F3F0E8] leading-relaxed font-normal">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  {/* CTA Details Button */}
                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => handleOpenModal(project)}
                      className="inline-flex items-center gap-2 rounded-full bg-[#123E3D] hover:bg-[#194C4B] border border-[rgba(184,181,172,0.25)] px-5 py-3 min-h-[44px] font-mono text-xs uppercase tracking-wider text-[#F3F0E8] hover:text-[#5FD8CD] transition-all cursor-pointer focus-ring"
                      aria-label={`View architectural details for ${project.title}`}
                    >
                      <Layers className="h-3.5 w-3.5 text-[#5FD8CD]" />
                      <span>Inspect Architecture Spec</span>
                      <ChevronRight className="h-4 w-4 ml-1 text-[#B8B5AC]" />
                    </button>
                  </div>
                </div>

                {/* Visual Workflow Diagram / Information Path Column */}
                <div className={`lg:col-span-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                  <div className="rounded-3xl border border-[rgba(184,181,172,0.18)] bg-[#080A09]/70 p-6 sm:p-8 shadow-inner space-y-6">
                    <div className="flex items-center justify-between border-b border-[rgba(184,181,172,0.12)] pb-3">
                      <span className="font-mono text-[11px] uppercase tracking-widest text-[#5FD8CD] font-semibold">
                        [ INFORMATION_FLOW_MAP ]
                      </span>
                      <span className="font-mono text-[10px] text-[#B8B5AC]">[ ACTIVE ROUTE ]</span>
                    </div>

                    {/* Step Nodes */}
                    <div className="space-y-3">
                      {project.howItWorks.map((step, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3.5 rounded-2xl border border-[rgba(184,181,172,0.12)] bg-[#123E3D]/50"
                        >
                          <span className="font-mono text-xs font-bold shrink-0 mt-0.5 text-[#5FD8CD]">
                            0{idx + 1}.
                          </span>
                          <span className="text-xs font-sans text-[#F3F0E8] leading-snug">
                            {step}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Chips */}
                    <div className="pt-2 border-t border-[rgba(184,181,172,0.12)]">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[#B8B5AC] block mb-2">
                        INTEGRATED STACK
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {project.toolsUsed.map((tool) => (
                          <span
                            key={tool}
                            className="font-mono text-[11px] rounded-lg border border-[rgba(184,181,172,0.15)] bg-[#082D2D] px-2.5 py-1 text-[#B8B5AC]"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <ProjectModal project={selectedProject} open={modalOpen} onOpenChange={setModalOpen} />
    </SectionShell>
  );
}

