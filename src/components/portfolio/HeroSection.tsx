import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import { useRevealRef } from "@/hooks/useRevealObserver";

export function HeroSection() {
  const [portraitError, setPortraitError] = useState(false);

  // Top Row reveal refs
  const service1Ref = useRevealRef<HTMLDivElement>(150);
  const service2Ref = useRevealRef<HTMLDivElement>(270);
  const service3Ref = useRevealRef<HTMLDivElement>(390);
  const introRef = useRevealRef<HTMLParagraphElement>(300);

  // Bottom Row reveal refs
  const badgeRef = useRevealRef<HTMLDivElement>(150);
  const h1Ref = useRevealRef<HTMLHeadingElement>(280);
  const contactCardRef = useRevealRef<HTMLDivElement>(420);

  const whatsappHref = `https://wa.me/${PERSONAL_INFO.phone.replace(/[^0-9]/g, "")}`;

  return (
    <section className="min-h-screen supports-[height:100svh]:min-h-[100svh] w-full flex flex-col justify-between pt-24 sm:pt-28 pb-12 md:pb-16 px-5 sm:px-8 md:px-12 relative z-10">
      {/* TOP ROW */}
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start justify-between">
        {/* Left: Service List */}
        <div className="flex flex-col gap-2 font-mono text-xs uppercase tracking-[0.15em] text-text-muted drop-shadow-md">
          <div ref={service1Ref} className="reveal-item">
            / WORKFLOW AUTOMATION
          </div>
          <div ref={service2Ref} className="reveal-item">
            / AI SYSTEMS
          </div>
          <div ref={service3Ref} className="reveal-item">
            / WEB PLATFORMS
          </div>
        </div>

        {/* Right: Intro Paragraph */}
        <p
          ref={introRef}
          className="reveal-item max-w-xs sm:text-right text-lg sm:text-xl leading-relaxed text-text-primary drop-shadow-md"
        >
          I build the systems that remove manual work from lead follow-up, scheduling, and reporting
          — so your team spends its hours where a person is actually required.
        </p>
      </div>

      {/* BOTTOM ROW */}
      <div className="flex flex-col gap-8 md:flex-row md:items-end justify-between mt-12 md:mt-0">
        {/* Left: Badge + Declarative H1 */}
        <div className="max-w-2xl">
          {/* Badge */}
          <div
            ref={badgeRef}
            className="reveal-item inline-flex items-center mb-5 border-l-2 border-accent bg-surface-glass px-3 py-1.5 backdrop-blur-md border border-r-border-glass border-t-border-glass border-b-border-glass font-mono text-[11px] uppercase tracking-[0.15em] text-text-primary drop-shadow-md"
          >
            {"{{PROOF_METRIC}}"} // UAE OPERATIONAL SYSTEMS
          </div>

          {/* H1 Two-Tone */}
          <h1
            ref={h1Ref}
            className="reveal-item font-display text-5xl sm:text-6xl lg:text-7xl font-normal leading-[1.05] tracking-tight drop-shadow-lg"
          >
            <span className="text-text-primary block">Systems that run.</span>
            <span className="text-text-muted block">Without you.</span>
          </h1>
        </div>

        {/* Right: Founder Contact Card */}
        <div
          ref={contactCardRef}
          className="reveal-item flex items-center gap-4 rounded-xl bg-surface-glass p-3 backdrop-blur-md border border-border-glass shrink-0 max-w-sm"
        >
          {portraitError ? (
            <div className="h-24 w-20 rounded-lg bg-surface-glass-strong border border-border-glass flex items-center justify-center font-mono text-xs font-semibold text-text-muted shrink-0">
              PN
            </div>
          ) : (
            <img
              src="/phenyo.avif"
              alt="Phenyo Ntwayagae, founder of NYG Digital"
              onError={() => setPortraitError(true)}
              className="h-24 w-20 rounded-lg object-cover shrink-0"
            />
          )}

          <div className="flex flex-col gap-1.5 pr-2">
            <span className="text-sm font-medium text-text-primary">Talk to Phenyo</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-subtle">
              Founder, NYG Digital
            </span>

            <a
              href="#contact"
              className="inline-flex items-center gap-1 rounded-full bg-text-primary px-4 py-2 text-xs font-medium text-surface-base hover:opacity-85 transition-opacity focus-ring mt-1.5"
            >
              <span>Book 15 minutes</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </a>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted hover:text-text-primary transition-colors focus-ring rounded-xs underline decoration-border-glass underline-offset-2"
            >
              WhatsApp me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
