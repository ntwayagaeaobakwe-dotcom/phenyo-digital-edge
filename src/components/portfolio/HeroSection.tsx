import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Play } from "lucide-react";
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
      <div className="absolute inset-0 -z-10 opacity-30">
        <DotMatrixCanvas opacity={0.4} totalSize={24} dotSize={3} />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.08fr_0.92fr]">
        <div>
          {/* Monospace Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-text-muted border border-border-default px-4 py-1.5 rounded-full bg-surface-raised/80">
            <span className="h-1.5 w-1.5 rounded-full bg-action-primary" aria-hidden="true" />
            <span>[ SYS // 01 ] NYG DIGITAL · {PERSONAL_INFO.status}</span>
          </div>

          {/* Two-Tone Headline */}
          <h1
            tabIndex={-1}
            className="fluid-display mt-7 max-w-3xl font-sans font-semibold leading-[1.08] tracking-tight text-text-primary outline-none"
          >
            Websites and automations{" "}
            <span className="text-text-muted font-normal">
              that turn visitor interest into organized next steps.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-text-secondary">
            NYG Digital helps service businesses explain their offer clearly, capture better
            inquiries, and connect the follow-up work behind the scenes.
          </p>

          {/* Strict Button System: 1 Primary CTA + 1 Ghost Secondary CTA */}
          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-action-primary px-7 py-3.5 min-h-[44px] font-mono text-xs uppercase tracking-widest font-semibold text-action-primary-foreground active:scale-[0.98] transition-all hover:bg-action-primary-hover focus-ring"
            >
              <span>Request a free review</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border-default bg-surface-raised/40 px-6 py-3.5 min-h-[44px] font-mono text-xs uppercase tracking-widest font-medium text-text-primary active:scale-[0.98] transition-all hover:bg-surface-overlay focus-ring"
            >
              <span>See what I build</span>
              <ArrowRight className="h-4 w-4 text-text-muted" />
            </a>
          </div>

          {/* Monospace Micro Statistics */}
          <div className="mt-12 grid max-w-xl gap-4 border-t border-border-subtle pt-6 sm:grid-cols-3 font-mono text-xs uppercase tracking-wider text-text-muted">
            {[
              "600+ leads routed",
              "Direct 1-on-1 build",
              "Full pipeline stack",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <span className="text-status-success font-bold">[✓]</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Frame & Animated Terminal Panel */}
        <div className="relative border border-border-default rounded-2xl bg-surface-raised/80 p-6 sm:p-8 backdrop-blur-md">
          {/* Hairline Corner Bracket Labels */}
          <div className="flex items-center justify-between border-b border-border-subtle pb-4 mb-6">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-action-primary font-semibold">
                [ CONVERSION_ROUTER ]
              </p>
              <p className="mt-1 text-xs text-text-muted">From visitor click to internal payload</p>
            </div>
            <button
              type="button"
              onClick={() => setRunId((current) => current + 1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-border-default text-text-muted hover:border-action-primary hover:text-action-primary active:scale-95 transition-all cursor-pointer focus-ring"
              aria-label="Replay inquiry routing preview"
            >
              <Play className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-3">
            {routingSteps.map(([title, detail], index) => (
              <div key={title}>
                <div
                  className={`flex items-center gap-4 rounded-xl border p-3.5 transition-all duration-300 ${
                    index <= activeStep
                      ? "border-action-primary/50 bg-action-primary/10"
                      : "border-border-subtle bg-surface-base/40 opacity-60"
                  }`}
                >
                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-md font-mono text-[11px] tabular-nums ${
                      index <= activeStep
                        ? "bg-action-primary text-action-primary-foreground font-bold"
                        : "border border-border-subtle text-text-muted"
                    }`}
                  >
                    {index <= activeStep ? "✓" : `0${index + 1}`}
                  </span>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-text-primary font-medium">
                      {title}
                    </p>
                    <p className="mt-0.5 text-xs text-text-muted">{detail}</p>
                  </div>
                </div>

                {index < routingSteps.length - 1 && (
                  <div className="relative ml-[1.125rem] h-2.5 w-px" aria-hidden="true">
                    <div
                      className={`h-full w-px transition-colors duration-300 ${
                        index < activeStep ? "bg-action-primary/50" : "bg-border-subtle"
                      }`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
