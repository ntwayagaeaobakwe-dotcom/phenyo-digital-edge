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
              key={service.id}
              className={`pt-12 ${index > 0 ? "border-t border-border/30" : ""}`}
            >
              {/* Service Header Row */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary border border-primary/20 shrink-0">
                    <IconComponent className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-widest text-primary font-semibold">
                      [ SERVICE_0{index + 1} // {service.tag} ]
                    </span>
                    <h3 className="text-2xl font-sans font-semibold text-foreground mt-1">
                      {service.title}
                    </h3>
                  </div>
                </div>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-slate-950/30 px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-foreground hover:border-primary/50 transition-colors w-fit"
                  aria-label={`Inquire about ${service.title}`}
                >
                  <span>Inquire</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                </a>
              </div>

              {/* Unboxed Feature Grid: Whitespace separation, no card boxes */}
              <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-8">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground/60 block mb-2">
                    01 // Challenge
                  </span>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.problem}
                  </p>
                </div>

                <div>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-primary block mb-2">
                    02 // Solution
                  </span>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.solution}
                  </p>
                </div>

                <div>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-foreground block mb-2">
                    03 // Output & Benefit
                  </span>
                  <p className="text-sm text-foreground font-medium leading-relaxed">
                    {service.potentialBenefit}
                  </p>
                </div>
              </div>

              {/* Process Flow Technical Diagram */}
              {service.processSteps && service.processSteps.length > 0 && (
                <div className="border border-border/30 rounded-xl bg-slate-950/40 p-4 sm:p-5">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground/60 block mb-3">
                    [ EXECUTION_SEQUENCE ]
                  </span>
                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                    {service.processSteps.map((step, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="rounded-md border border-border/40 bg-slate-900/60 px-3 py-1.5 text-foreground">
                          {step}
                        </span>
                        {idx < service.processSteps.length - 1 && (
                          <ArrowRight
                            className="h-3.5 w-3.5 text-primary shrink-0"
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
