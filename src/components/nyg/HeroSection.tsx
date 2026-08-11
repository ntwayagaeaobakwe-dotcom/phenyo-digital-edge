import { useSyncExternalStore } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { HeaderNav } from "./HeaderNav";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Hero3DScene } from "@/components/canvas/Hero3DScene";

// Content Tokens awaiting actual client/credential inputs
export const PROOF_BADGE_LABEL = "{{PROOF_BADGE_LABEL}}";
export const PROOF_BADGE_CHIP = "{{PROOF_BADGE_CHIP}}";

function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      if (typeof window === "undefined") return () => {};
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => (typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false),
    () => false
  );
}

export function HeroSection() {
  const prefersReducedMotion = usePrefersReducedMotion();

  // If user has not provided proof badge credentials yet, we render a fallback token structure
  const badgeLabel = PROOF_BADGE_LABEL === "{{PROOF_BADGE_LABEL}}" ? "Dubai Real Estate & Ops Automation" : PROOF_BADGE_LABEL;
  const badgeChip = PROOF_BADGE_CHIP === "{{PROOF_BADGE_CHIP}}" ? "Production Ready" : PROOF_BADGE_CHIP;

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between bg-surface-base overflow-hidden">
      {/* NAVIGATION HEADER (z-20) */}
      <HeaderNav />

      {/* 3D BACKGROUND */}
      <Hero3DScene />

      {/* FLEX-1 SPACER (Pushes hero content to bottom anchor) */}
      <div className="flex-1 min-h-[40px] sm:min-h-[80px]" aria-hidden="true" />

      {/* HERO CONTENT AREA (z-20, bottom-anchored) */}
      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pb-14 sm:pb-16 lg:pb-20">
        {/* Mono Eyebrow */}
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-text-subtle mb-5 sm:mb-8">
          NYG DIGITAL
        </p>

        {/* Two-Tone H1 Headline */}
        <h1 className="font-display font-medium leading-[1.08] tracking-[-0.03em] text-[clamp(1.75rem,7vw,4.2rem)] sm:text-[clamp(2.5rem,5vw,4.2rem)] max-w-5xl">
          <span className="text-text-primary">We build the systems that run</span>
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          <span className="text-text-muted">growing operations — quietly,</span>
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          <span className="text-text-muted">and without another hire.</span>
        </h1>

        {/* CTA ROW */}
        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
          {/* Primary CTA with Text Roll */}
          <MagneticButton asChild>
            <a
              href="#work"
              className="group inline-flex items-center gap-3 bg-[--color-accent] hover:bg-[--color-accent-hover] text-[--color-action-primary-foreground] text-[13px] sm:text-[14px] font-medium rounded-full pl-5 sm:pl-6 pr-2 py-2 transition-colors duration-300 focus-ring"
            >
            <div className="overflow-hidden h-[20px] relative">
              <div
                className={`flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                  prefersReducedMotion ? "" : "group-hover:-translate-y-1/2"
                }`}
              >
                <span className="h-[20px] flex items-center font-semibold text-surface-base">
                  See a live workflow
                </span>
                <span className="h-[20px] flex items-center font-semibold text-surface-base" aria-hidden="true">
                  See a live workflow
                </span>
              </div>
            </div>
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-surface-glass flex items-center justify-center shrink-0">
                <ArrowRight
                  className={`w-4 h-4 text-surface-base transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                    prefersReducedMotion ? "" : "group-hover:-rotate-45"
                  }`}
                  aria-hidden="true"
                />
              </span>
            </a>
          </MagneticButton>

          {/* Proof Badge: Glass pill, raises one luminance step on hover (NO shadow) */}
          <div className="inline-flex items-center gap-2.5 px-3 sm:px-4 py-2 bg-surface-glass hover:bg-surface-glass-strong backdrop-blur-md border border-[--color-border-subtle] rounded-[4px] transition-colors duration-300">
            <ShieldCheck className="w-5 h-5 text-[--color-accent] shrink-0" aria-hidden="true" />
            <span className="text-[12px] sm:text-[13px] font-medium text-text-primary">
              {badgeLabel}
            </span>
            <span className="font-mono text-[10px] sm:text-[11px] text-text-subtle px-1.5 sm:px-2 py-0.5 rounded bg-surface-base border border-[--color-border-subtle]">
              {badgeChip}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
