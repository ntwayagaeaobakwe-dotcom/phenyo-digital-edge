import { useState } from "react";
import { ChevronRight, Info, Layers, CheckCircle2, ArrowUpRight } from "lucide-react";
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

  // Color accents for each project
  const projectColors = ["#78E7FF", "#7657FF", "#FF5577"];

  return (
    <SectionShell
      id="projects"
      eyebrow="System Case Studies"
      iconGlyph="04"
      themeVariant="dark"
      declarativeTitle="The problem, the system,"
      qualifierTitle="and how information moves."
    >
      <div className="space-y-16">
        {PROJECTS.map((project, index) => {
          const isEven = index % 2 === 1;
          const accentColor = projectColors[index % projectColors.length];

          return (
            <article
              key={project.id}
              className="rounded-3xl border border-[rgba(196,190,255,0.16)] bg-[#100C1D]/90 p-7 sm:p-10 backdrop-blur-xl relative overflow-hidden shadow-2xl"
            >
              {/* Subtle background glow from project accent */}
              <div
                className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[120px] pointer-events-none opacity-20"
                style={{ backgroundColor: accentColor }}
              />

              <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
                {/* Information Column */}
                <div className={`lg:col-span-6 space-y-6 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                  {/* Top Meta Bar */}
                  <div className="flex items-center justify-between gap-4 border-b border-[rgba(196,190,255,0.12)] pb-4">
                    <div className="flex items-center gap-3">
                      <span
                        className="font-display font-bold text-lg"
                        style={{ color: accentColor }}
                      >
                        0{index + 1}
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-widest text-[#9D9AAF]">
                        [ {project.tag} ]
                      </span>
                    </div>

                    <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
                      {project.status}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-sans font-bold text-[#F5F6FA] tracking-tight">
                    {project.title}
                  </h3>

                  {/* Concept Disclaimer if any */}
                  {project.disclaimer && (
                    <div className="p-3.5 rounded-xl border border-[#FF5577]/30 bg-[#FF5577]/10 text-xs font-mono text-[#F5F6FA] flex items-start gap-2.5">
                      <Info className="h-4 w-4 text-[#FF5577] shrink-0 mt-0.5" />
                      <span>{project.disclaimer}</span>
                    </div>
                  )}

                  {/* Problem & Solution Breakdown */}
                  <div className="space-y-4 text-sm">
                    <div>
                      <span className="font-mono text-[11px] uppercase tracking-widest text-[#9D9AAF] block mb-1.5 font-semibold">
                        THE BOTTLENECK
                      </span>
                      <p className="text-[#9D9AAF] leading-relaxed font-normal">
                        {project.problem}
                      </p>
                    </div>

                    <div>
                      <span
                        className="font-mono text-[11px] uppercase tracking-widest block mb-1.5 font-semibold"
                        style={{ color: accentColor }}
                      >
                        SYSTEM ARCHITECTURE
                      </span>
                      <p className="text-[#F5F6FA] leading-relaxed font-normal">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  {/* CTA Details Button */}
                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => handleOpenModal(project)}
                      className="inline-flex items-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 border border-[rgba(196,190,255,0.2)] px-5 py-3 min-h-[44px] font-mono text-xs uppercase tracking-widest text-[#F5F6FA] hover:text-[#78E7FF] transition-all cursor-pointer focus-ring"
                      aria-label={`View architectural details for ${project.title}`}
                    >
                      <Layers className="h-3.5 w-3.5 text-[#78E7FF]" />
                      <span>Inspect Architecture Spec</span>
                      <ChevronRight className="h-4 w-4 ml-1 text-[#9D9AAF]" />
                    </button>
                  </div>
                </div>

                {/* Visual Workflow Diagram / Information Path Column */}
                <div className={`lg:col-span-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                  <div className="rounded-2xl border border-[rgba(196,190,255,0.18)] bg-[#05060A]/80 p-6 sm:p-8 shadow-inner space-y-6">
                    <div className="flex items-center justify-between border-b border-[rgba(196,190,255,0.1)] pb-3">
                      <span className="font-mono text-[11px] uppercase tracking-widest text-[#78E7FF] font-semibold">
                        [ INFORMATION_FLOW_MAP ]
                      </span>
                      <span className="font-mono text-[10px] text-[#9D9AAF]">[ ACTIVE ROUTE ]</span>
                    </div>

                    {/* Step Nodes */}
                    <div className="space-y-3">
                      {project.howItWorks.map((step, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3 rounded-xl border border-[rgba(196,190,255,0.1)] bg-[#100C1D]/60"
                        >
                          <span
                            className="font-mono text-xs font-bold shrink-0 mt-0.5"
                            style={{ color: accentColor }}
                          >
                            0{idx + 1}.
                          </span>
                          <span className="text-xs font-mono text-[#F5F6FA] leading-snug">
                            {step}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Chips */}
                    <div className="pt-2 border-t border-[rgba(196,190,255,0.1)]">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[#9D9AAF] block mb-2">
                        INTEGRATED STACK
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {project.toolsUsed.map((tool) => (
                          <span
                            key={tool}
                            className="font-mono text-[11px] rounded-lg border border-[rgba(196,190,255,0.12)] bg-[#100C1D] px-2.5 py-1 text-[#9D9AAF]"
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
