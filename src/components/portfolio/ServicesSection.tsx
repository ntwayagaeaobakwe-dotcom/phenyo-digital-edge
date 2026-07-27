import { Workflow, LineChart, Rocket, Target, Sparkles, ArrowUpRight } from "lucide-react";
import { SectionShell } from "./SectionShell";
import { SERVICES } from "@/data/portfolio-data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Workflow,
  LineChart,
  Rocket,
  Target,
  Sparkles,
};

export function ServicesSection() {
  return (
    <SectionShell
      id="services"
      eyebrow="Services & Solutions"
      title={
        <>
          What I <span className="text-gradient-gold">build for you</span>.
        </>
      }
    >
      <div className="grid md:grid-cols-2 gap-5">
        {SERVICES.map((service, index) => {
          const IconComponent = iconMap[service.iconName] || Workflow;
          const isFeatured = index === 0;
          return (
            <div
              key={service.title}
              className={`glass glass-hover rounded-2xl p-7 transition-all ${
                isFeatured ? "md:col-span-2 gold-border" : "border border-border/80"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-primary-foreground font-bold shrink-0">
                    <IconComponent className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-xs text-primary font-mono font-semibold">{service.tag}</div>
                    <h3 className="font-display text-xl font-semibold text-foreground">{service.title}</h3>
                  </div>
                </div>
                <a
                  href="#contact"
                  className="grid h-9 w-9 place-items-center rounded-full glass hover:bg-primary hover:text-primary-foreground transition-colors text-muted-foreground shrink-0"
                  aria-label={`Inquire about ${service.title}`}
                >
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
              <p className="mt-4 text-muted-foreground leading-relaxed text-sm sm:text-base">{service.desc}</p>
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}
