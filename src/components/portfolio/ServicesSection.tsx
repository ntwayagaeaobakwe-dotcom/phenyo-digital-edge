import {
  Workflow,
  LineChart,
  Rocket,
  Target,
  Sparkles,
  Layers,
  ArrowUpRight,
  ArrowRight,
  Code2,
} from "lucide-react";
import { SectionShell } from "./SectionShell";
import { SERVICES } from "@/data/portfolio-data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Workflow,
  LineChart,
  Rocket,
  Target,
  Sparkles,
  Layers,
};

export function ServicesSection() {
  return (
    <SectionShell
      id="services"
      eyebrow="Service architecture"
      iconGlyph="03"
      declarativeTitle="Select your primary service path"
      qualifierTitle="to focus effort where return is highest."
    >
      <div className="space-y-16">
        {SERVICES.map((service, index) => {
          const IconComponent = iconMap[service.iconName] || Code2;
          return (
            <div
              key={service.title}
              className={`pt-12 ${index > 0 ? "border-t border-border-subtle" : ""}`}
            >
              {/* Service Header Row */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-action-primary/10 text-action-primary border border-action-primary/20 shrink-0">
                    <IconComponent className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-widest text-action-primary font-semibold">
                      [ SERVICE_0{index + 1} // {service.tag} ]
                    </span>
                    <h3 className="text-2xl font-sans font-semibold text-text-primary mt-1">
                      {service.title}
                    </h3>
                  </div>
                </div>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border-default bg-surface-raised/40 px-5 py-2.5 min-h-[44px] font-mono text-xs uppercase tracking-widest text-text-primary hover:border-action-primary transition-all w-fit focus-ring"
                  aria-label={`Inquire about ${service.title}`}
                >
                  <span>Inquire</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-action-primary" aria-hidden="true" />
                </a>
              </div>

              {/* Unboxed Feature Grid: Whitespace separation */}
              <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-8">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-text-muted block mb-2 font-medium">
                    01 // Challenge
                  </span>
                  <p className="text-sm text-text-muted leading-relaxed">{service.problem}</p>
                </div>

                <div>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-action-primary block mb-2 font-medium">
                    02 // Solution
                  </span>
                  <p className="text-sm text-text-muted leading-relaxed">{service.solution}</p>
                </div>

                <div>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-text-primary block mb-2 font-medium">
                    03 // Output & Benefit
                  </span>
                  <p className="text-sm text-text-primary font-medium leading-relaxed">
                    {service.potentialBenefit}
                  </p>
                </div>
              </div>

              {/* Process Flow Technical Diagram */}
              {service.processSteps && service.processSteps.length > 0 && (
                <div className="border border-border-subtle rounded-xl bg-surface-raised/60 p-4 sm:p-5">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-text-muted block mb-3 font-medium">
                    [ EXECUTION_SEQUENCE ]
                  </span>
                  <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs">
                    {service.processSteps.map((step, idx) => (
                      <div key={idx} className="flex items-center gap-2.5">
                        <span className="rounded-md border border-border-default bg-surface-overlay/80 px-3 py-1.5 text-text-primary">
                          {step}
                        </span>
                        {idx < service.processSteps.length - 1 && (
                          <ArrowRight
                            className="h-3.5 w-3.5 text-action-primary shrink-0 rotate-90 sm:rotate-0"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}
