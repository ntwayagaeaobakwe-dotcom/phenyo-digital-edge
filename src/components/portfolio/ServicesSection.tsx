import {
  Workflow,
  LineChart,
  Rocket,
  Target,
  Sparkles,
  Layers,
  ArrowUpRight,
  ArrowRight,
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
      eyebrow="Clear service paths"
      title={
        <>
          Choose the outcome <span className="text-gradient-gold">your business needs first</span>.
        </>
      }
    >
      <div className="grid gap-6">
        {SERVICES.map((service, index) => {
          const IconComponent = iconMap[service.iconName] || Workflow;
          return (
            <div
              key={service.title}
              className="glass glass-hover rounded-2xl p-6 sm:p-8 transition-all border border-border/80 relative overflow-hidden"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-border/60 pb-5">
                <div className="flex items-center gap-3.5">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground font-bold shrink-0 shadow-md">
                    <IconComponent className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-xs text-primary font-mono font-semibold">
                      {service.tag}
                    </div>
                    <h3 className="font-display text-2xl font-bold text-foreground">
                      {service.title}
                    </h3>
                  </div>
                </div>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full glass glass-hover px-5 py-2.5 text-xs font-medium text-foreground hover:text-primary transition-colors border border-primary/20 w-fit"
                  aria-label={`Inquire about ${service.title}`}
                >
                  <span>Discuss This Service</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                </a>
              </div>

              {/* Problem - Solution - Benefit Grid */}
              <div className="mt-6 grid md:grid-cols-3 gap-5">
                <div className="glass p-4 rounded-xl border border-red-500/20 bg-red-500/5">
                  <div className="text-xs font-mono uppercase tracking-wider text-red-400 font-semibold mb-1.5">
                    The Problem
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {service.problem}
                  </p>
                </div>

                <div className="glass p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                  <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold mb-1.5">
                    Practical Solution
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {service.solution}
                  </p>
                </div>

                <div className="glass-gold p-4 rounded-xl border border-primary/30">
                  <div className="text-xs font-mono uppercase tracking-wider text-primary font-semibold mb-1.5">
                    Potential Benefit
                  </div>
                  <p className="text-xs sm:text-sm text-foreground font-medium leading-relaxed">
                    {service.potentialBenefit}
                  </p>
                </div>
              </div>

              {/* Visual Process Flow Diagram */}
              {service.processSteps && service.processSteps.length > 0 && (
                <div className="mt-5 glass p-4 rounded-xl border border-border/60">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-3">
                    Process Flow
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
                    {service.processSteps.map((step, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="rounded-lg bg-black/40 border border-primary/20 px-3 py-1.5 text-foreground">
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

              {/* Supporting Technical Implementation Note */}
              <div className="mt-4 flex flex-col gap-2 border-t border-border/40 pt-3 text-xs text-muted-foreground sm:flex-row sm:items-start sm:justify-between">
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Supporting Technology
                </span>
                <span className="max-w-2xl text-foreground font-medium sm:text-right">
                  {service.supportingTools}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}
