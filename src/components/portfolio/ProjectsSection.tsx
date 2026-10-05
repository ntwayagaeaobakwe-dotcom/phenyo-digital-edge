import { lazy, Suspense, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { SectionShell } from "./SectionShell";
import { PROJECTS, type ProjectItem } from "@/data/portfolio-data";
const ProjectModal = lazy(() =>
  import("./ProjectModal").then((module) => ({ default: module.ProjectModal })),
);

function ResearchPreview() {
  return (
    <div
      className="research-preview research-preview-real"
      aria-label="Actual n8n Google Places lead scraper with pagination and a Google Sheets output"
    >
      <div className="preview-topline">
        <span>Actual workflow / Business discovery</span>
        <span>n8n + Places + Sheets</span>
      </div>
      <img
        className="research-screenshot"
        src="/workflow-studio/places-workflow-current.webp"
        alt="Current n8n workflow showing geocoding, Google Places search, pagination, a 90-business cap, and 60 items written to Google Sheets in the captured run"
        width="1825"
        height="930"
        loading="lazy"
      />
      <div className="research-result">
        <span className="result-dot" />
        <span>Captured run · 60 items at the Google Sheets step</span>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const open = (project: ProjectItem) => {
    setSelectedProject(project);
    setModalOpen(true);
  };
  const featured = PROJECTS[0];
  const website = PROJECTS.find((project) => project.id === "conversion-service-website")!;
  return (
    <SectionShell
      id="projects"
      eyebrow="Selected work"
      declarativeTitle="Good thinking. Working systems."
      qualifierTitle="A closer look at the builds, experiments, and practical problems behind the work."
    >
      <span id="work" className="anchor-alias" />
      <article className="featured-project">
        <button
          className="project-preview"
          onClick={() => open(featured)}
          aria-label={`View system details for ${featured.title}`}
        >
          <ResearchPreview />
          <span className="preview-open">
            <ArrowUpRight size={22} />
          </span>
        </button>
        <div className="project-summary">
          <div className="project-meta">
            <span>{featured.status}</span>
            <span>Automation / Data systems</span>
          </div>
          <h3>{featured.title}</h3>
          <p>{featured.problem}</p>
          <div className="project-outcome">
            <span>Result</span>
            <p>Captured run: 60 items at the Google Sheets step.</p>
          </div>
          <a className="text-link" href="/work/lead-generation-automation">
            View the full case study <ArrowUpRight size={16} />
          </a>
        </div>
      </article>
      <article className="website-project">
        <div className="project-summary">
          <div className="project-meta">
            <span>{website.status}</span>
            <span>Web development</span>
          </div>
          <h3>{website.title}</h3>
          <p>{website.solution}</p>
          <button className="text-link" onClick={() => open(website)}>
            Inside the experience <ArrowUpRight size={16} />
          </button>
        </div>
        <button
          className="website-preview project-preview"
          aria-label={`View system details for ${website.title}`}
          onClick={() => open(website)}
        >
          <div className="mini-browser">
            <div className="browser-top">
              <i />
              <i />
              <i />
              <span>NYG AGENCY / INTERFACE STUDY</span>
            </div>
            <div className="mini-site">
              <span className="mini-brand">
                <img
                  src="/brand/nyg-agency-wordmark.svg"
                  alt="NYG Agency"
                  width="951"
                  height="180"
                  loading="lazy"
                />
              </span>
              <div className="mini-hero">
                <strong>
                  Digital systems.
                  <br />
                  Human ambition.
                </strong>
                <img
                  className="mini-identity"
                  src="/brand/nyg-agency-monogram.svg"
                  alt=""
                  width="120"
                  height="120"
                  loading="lazy"
                />
              </div>
              <span className="mini-cta">Let's build something</span>
              <div className="mini-footer">
                <span>WEB</span>
                <span>AI</span>
                <span>AUTOMATION</span>
              </div>
            </div>
          </div>
          <span className="preview-open">
            <ArrowUpRight size={22} />
          </span>
        </button>
      </article>
      <div className="work-experiments">
        <div className="experiments-heading">
          <h3>Inside the lab.</h3>
          <p>Capability demonstrations. Explore the approach and intended value.</p>
        </div>
        {PROJECTS.filter((project) => project !== featured && project !== website).map(
          (project, index) => (
            <button
              className="experiment-row"
              key={project.id}
              onClick={() => open(project)}
              aria-label={`View system details for ${project.title}`}
            >
              <span className="experiment-num">0{index + 1}</span>
              <span>
                <strong>{project.title}</strong>
                <span>{project.toolsUsed.slice(0, 3).join(" / ")}</span>
              </span>
              <span className="experiment-status">{project.status}</span>
              <ArrowUpRight size={22} />
            </button>
          ),
        )}
      </div>
      {selectedProject && (
        <Suspense fallback={<p role="status">Opening project details…</p>}>
          <ProjectModal project={selectedProject} open={modalOpen} onOpenChange={setModalOpen} />
        </Suspense>
      )}
    </SectionShell>
  );
}
