import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Check, Play } from "lucide-react";
import bgGridWebp from "@/assets/bg-grid.webp";
import { DotMatrixCanvas } from "@/components/ui/dot-matrix-canvas";
import { PERSONAL_INFO } from "@/data/portfolio-data";

const routingSteps = [
  ["Visitor", "Finds a clear service offer"],
  ["Inquiry", "Shares the problem and desired result"],
  ["Route", "Details reach the right place"],
  ["Follow up", "Next action is prepared"],
] as const;

export function HeroSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setActiveStep(routingSteps.length - 1);
      return;
    }

    setActiveStep(0);
    const timers = routingSteps
      .slice(1)
      .map((_, index) => window.setTimeout(() => setActiveStep(index + 1), (index + 1) * 650));
    return () => timers.forEach(window.clearTimeout);
  }, [runId]);

  return (
    <section
      className="scroll-target relative min-h-[100dvh] flex items-center overflow-hidden pb-24 pt-40 sm:pb-32 sm:pt-48"
      id="top"
    >
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
      {/* Animated gold dot field — replaces the static CSS line grid that used
          to sit here. Decorative and self-disabling under reduced motion. */}
      <div className="absolute inset-0 -z-10">
        <DotMatrixCanvas opacity={0.5} totalSize={24} dotSize={3} />
      </div>
      <div
        className="absolute inset-0 -z-10 opacity-10 mix-blend-screen"
        style={{ backgroundImage: `url(${bgGridWebp})`, backgroundSize: "cover" }}
      />

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.08fr_0.92fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/[0.06] px-3.5 py-1.5 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
            NYG Digital - {PERSONAL_INFO.status}
          </div>
          <h1
            tabIndex={-1}
            className="fluid-display mt-7 max-w-4xl font-display font-bold leading-[1.05] tracking-[-0.025em] outline-none font-optical-auto"
          >
            Websites and automations that turn interest into{" "}
            <span className="text-gradient-gold">organized next steps.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            NYG Digital helps service businesses explain their offer clearly, capture better
            inquiries, and connect the follow-up work behind the scenes.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground active:scale-[0.97] transition-all duration-150 ease-out shadow-[var(--shadow-gold)]"
            >
              Request a free process review <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-black/20 px-6 py-3.5 text-sm font-semibold text-foreground active:scale-[0.97] transition-all duration-150 ease-out hover:border-primary/40"
            >
              See what I build <ArrowRight className="h-4 w-4 text-primary" />
            </a>
          </div>
          <div className="mt-12 grid max-w-2xl gap-3 border-t border-border/50 pt-6 sm:grid-cols-3">
            {[
              "600+ leads organized in one build",
              "Direct 1-on-1 delivery",
              "Website plus workflow thinking",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 shrink-0 text-primary" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="perspective-1000">
          <div className="studio-surface card-3d-hover relative overflow-hidden p-5 sm:p-7">
            <div className="flex items-center justify-between border-b border-border/60 pb-4 translate-z-12">
              <div>
                <p className="font-mono text-[11px] text-primary font-bold">CONVERSION FLOW</p>
                <p className="mt-1 text-sm font-semibold">From visitor to follow-up</p>
              </div>
              <button
                type="button"
                onClick={() => setRunId((current) => current + 1)}
                className="grid h-9 w-9 place-items-center rounded-full border border-border/70 text-muted-foreground active:scale-95 transition-all duration-150 hover:border-primary/40 hover:text-primary cursor-pointer"
                aria-label="Replay inquiry routing preview"
              >
                <Play className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6">
              {routingSteps.map(([title, detail], index) => (
                <div key={title}>
                  <div
                    className={`flex items-center gap-4 rounded-2xl border p-4 transition-all duration-300 translate-z-12 ${
                      index <= activeStep
                        ? "border-primary/40 bg-primary/[0.08] shadow-md"
                        : "border-border/60 bg-black/20"
                    }`}
                  >
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border font-mono text-xs tabular-nums ${
                      index <= activeStep
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    {index <= activeStep ? <Check className="h-4 w-4" /> : `0${index + 1}`}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{detail}</p>
                  </div>
                </div>

                {/* Connector: signals which step the automation just moved
                    through. A traveling pulse fires once when the flow
                    reaches this segment, then settles into a solid line. */}
                {index < routingSteps.length - 1 && (
                  <div className="relative ml-[1.125rem] h-3 w-px" aria-hidden="true">
                    <div
                      className={`h-full w-px transition-colors duration-300 ${
                        index < activeStep ? "bg-primary/50" : "bg-border/60"
                      }`}
                    />
                    {index === activeStep - 1 && (
                      <span
                        key={`hero-pulse-${runId}-${index}`}
                        className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_2px_oklch(0.82_0.15_85/0.6)] animate-signal-travel-v"
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="sr-only">
            A four-step example explains the offer, captures an inquiry, routes the details, and
            prepares a follow-up action.
          </p>
        </div>
      </div>
    </div>
    </section>
  );
}
