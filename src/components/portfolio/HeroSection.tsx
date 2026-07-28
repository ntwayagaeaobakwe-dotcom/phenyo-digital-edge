import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Check, Play } from "lucide-react";
import bgGridWebp from "@/assets/bg-grid.webp";
import { PERSONAL_INFO } from "@/data/portfolio-data";

const routingSteps = [
  ["Inquiry", "Captured from the website"],
  ["Organize", "Need and urgency structured"],
  ["Route", "Correct owner notified"],
  ["Follow up", "Next action prepared"],
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
      className="scroll-target relative overflow-hidden pb-24 pt-40 sm:pb-32 sm:pt-48"
      id="top"
    >
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 -z-10 grid-bg opacity-25" />
      <div
        className="absolute inset-0 -z-10 opacity-10 mix-blend-screen"
        style={{ backgroundImage: `url(${bgGridWebp})`, backgroundSize: "cover" }}
      />

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.08fr_0.92fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/[0.06] px-3.5 py-1.5 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
            {PERSONAL_INFO.status}
          </div>
          <h1
            tabIndex={-1}
            className="fluid-display mt-7 max-w-4xl font-display font-bold leading-[1.02] tracking-[-0.045em] outline-none"
          >
            Websites and automated systems that{" "}
            <span className="text-gradient-gold">remove manual work.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            NYG Digital builds business automation, connected tools, client portals, and
            conversion-focused websites—so your team spends less time moving information and more
            time moving the business forward.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-gold)]"
            >
              Tell me what is slowing you down <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="#system-studio"
              className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-black/20 px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/40"
            >
              Explore the system studio <ArrowRight className="h-4 w-4 text-primary" />
            </a>
          </div>
          <div className="mt-12 grid max-w-2xl gap-3 border-t border-border/50 pt-6 sm:grid-cols-3">
            {["Direct 1-on-1 access", "Custom workflow design", "Clear, practical delivery"].map(
              (item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 shrink-0 text-primary" />
                  {item}
                </div>
              ),
            )}
          </div>
        </div>

        <div className="studio-surface relative overflow-hidden p-5 sm:p-7">
          <div className="flex items-center justify-between border-b border-border/60 pb-4">
            <div>
              <p className="font-mono text-[11px] text-primary">SYSTEM PREVIEW</p>
              <p className="mt-1 text-sm font-semibold">New inquiry routing</p>
            </div>
            <button
              type="button"
              onClick={() => setRunId((current) => current + 1)}
              className="grid h-9 w-9 place-items-center rounded-full border border-border/70 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              aria-label="Replay inquiry routing preview"
            >
              <Play className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-6 space-y-3">
            {routingSteps.map(([title, detail], index) => (
              <div
                key={title}
                className={`flex items-center gap-4 rounded-2xl border p-4 transition-all duration-300 ${
                  index <= activeStep
                    ? "border-primary/40 bg-primary/[0.08]"
                    : "border-border/60 bg-black/20"
                }`}
              >
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border font-mono text-xs ${
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
            ))}
          </div>
          <p className="sr-only">
            A four-step example captures an inquiry, organizes its details, routes it to the correct
            owner, and prepares a follow-up action.
          </p>
        </div>
      </div>
    </section>
  );
}
