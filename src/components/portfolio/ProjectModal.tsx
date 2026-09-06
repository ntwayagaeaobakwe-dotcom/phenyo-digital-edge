import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { type ProjectItem } from "@/data/portfolio-data";
import { ArrowUpRight } from "lucide-react";
import { navigateToSection } from "@/lib/navigation";
interface Props {
  project: ProjectItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export function ProjectModal({ project, open, onOpenChange }: Props) {
  if (!project) return null;
  const demonstration = project.status !== "Completed Build";
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="project-dialog">
        <DialogHeader>
          <span className="project-status">{project.status}</span>
          <DialogTitle>{project.title}</DialogTitle>
          <DialogDescription>{project.desc}</DialogDescription>
        </DialogHeader>
        {project.disclaimer && <p className="project-notice">{project.disclaimer}</p>}
        <div className="modal-story">
          <div>
            <h3>The problem</h3>
            <p>{project.problem}</p>
          </div>
          <div>
            <h3>The solution</h3>
            <p>{project.solution}</p>
          </div>
        </div>
        <div>
          <h3>How it works</h3>
          <ol className="modal-steps">
            {project.howItWorks.map((step, i) => (
              <li key={step}>
                <span>0{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
        <div className="tag-list">
          {project.toolsUsed.map((tool) => (
            <span key={tool}>{tool}</span>
          ))}
        </div>
        <div className="modal-result">
          <h3>{demonstration ? "Intended value" : "The result"}</h3>
          <p>{project.potentialValue}</p>
          {demonstration && (
            <small>
              This is a {project.status.toLowerCase()}. Benefits describe the intended use, not
              verified client results.
            </small>
          )}
        </div>
        <button
          className="button"
          onClick={() => {
            onOpenChange(false);
            window.setTimeout(() => navigateToSection("contact", { context: project.title }), 150);
          }}
        >
          Build a system like this <ArrowUpRight size={18} />
        </button>
      </DialogContent>
    </Dialog>
  );
}
