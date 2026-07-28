/**
 * IndustrySolutionsSection
 *
 * Three sub-sections in one file:
 * 1. Industry service cards (Real Estate + Cleaning Services) — problems / capabilities
 * 2. Four-step process (Receive, Understand, Organize, Continue)
 * 3. Web + automation connection with a six-stage flow and general CTA
 *
 * Content is drawn from INDUSTRY_DEMOS and PROCESS_STEPS in portfolio-data.ts.
 * No fabricated claims, metrics, or live-system indicators.
 */
import { CheckCircle2, ArrowRight, Layers, Globe, X } from "lucide-react";
import { SectionShell } from "./SectionShell";
import { INDUSTRY_DEMOS, PROCESS_STEPS } from "@/data/portfolio-data";
import { navigateToSection } from "@/lib/navigation";

// ─── Industry service card ────────────────────────────────────────────────────

function scrollToContactWith(industryContext: string): void {
  navigateToSection("contact", { context: industryContext });
}

// ─── Web + Automation flow stages ────────────────────────────────────────────

const FLOW_STAGES = [
  "Visitor opens page",
  "Understands the service",
  "Sends inquiry",
  "Details organized",
  "Business notified",
  "Follow-up prepared",
] as const;

// ─── Main component ───────────────────────────────────────────────────────────

export function IndustrySolutionsSection() {
  return (
    <>
      {/* ── 1. Industry service cards ──────────────────────────────────────── */}
      <SectionShell
        id="industry-solutions"
        eyebrow="Built for Service Businesses"
        title={
          <>
            Built Around the Work Your{" "}
            <span className="text-gradient-gold">Business Actually Does</span>
          </>
        }
      >
        <p className="text-lg text-muted-foreground max-w-2xl -mt-6 mb-10 leading-relaxed">
          Most inquiry and scheduling problems look the same across service businesses. Here are two
          concrete examples — and what a connected system could do for each.
        </p>

        <div className="grid lg:grid-cols-2 gap-6">
          {INDUSTRY_DEMOS.map((industry) => (
            <div
              key={industry.id}
              className="glass glass-hover rounded-2xl border border-border/80 overflow-hidden"
            >
              {/* Card header */}
              <div className="px-6 pt-6 pb-4 border-b border-border/60 flex items-center justify-between">
                <h3 className="font-display text-xl font-bold">{industry.label}</h3>
              </div>

              {/* Problems */}
              <div className="p-6 border-b border-border/40 bg-red-500/5">
                <div className="text-xs font-mono uppercase tracking-widest text-red-400 font-semibold mb-3">
                  Common Problems
                </div>
                <ul className="space-y-2" role="list">
                  {industry.problems.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <X
                        className="mt-0.5 h-3.5 w-3.5 text-red-400/60 shrink-0"
                        aria-hidden="true"
                      />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Capabilities */}
              <div className="p-6 border-b border-border/40">
                <div className="text-xs font-mono uppercase tracking-widest text-primary font-semibold mb-3">
                  What I Can Build
                </div>
                <ul className="space-y-2" role="list">
                  {industry.capabilities.map((c) => (
                    <li key={c} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2
                        className="mt-0.5 h-3.5 w-3.5 text-primary shrink-0"
                        aria-hidden="true"
                      />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefit + CTA */}
              <div className="p-6 space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {industry.benefitStatement}
                </p>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToContactWith(industry.ctaIndustryContext);
                  }}
                  className="inline-flex items-center gap-2 rounded-full glass glass-hover px-5 py-2.5 text-sm font-medium text-foreground hover:text-primary transition-colors border border-primary/20"
                >
                  {industry.ctaLabel}
                  <ArrowRight className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="mt-8 text-center text-xs font-mono text-muted-foreground/70">
          Examples shown for real estate and cleaning services. Similar systems can be adapted to
          other service businesses.
        </p>
      </SectionShell>

      {/* ── 2. Four-step process ───────────────────────────────────────────── */}
      <SectionShell
        id="how-it-works"
        eyebrow="The Process"
        title={
          <>
            From Inquiry to Next Action <span className="text-gradient-gold">in Four Steps</span>
          </>
        }
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROCESS_STEPS.map((step, idx) => (
            <div key={step.label} className="relative">
              {/* Connector arrow (hidden on mobile, last item) */}
              {idx < PROCESS_STEPS.length - 1 && (
                <div
                  className="hidden lg:block absolute top-7 left-full -translate-x-1/2 z-10"
                  aria-hidden="true"
                >
                  <ArrowRight className="h-4 w-4 text-primary/50" />
                </div>
              )}

              <div className="glass glass-hover rounded-2xl p-6 border border-border/80 h-full flex flex-col gap-3">
                {/* Step number */}
                <div className="font-display text-3xl font-bold text-gradient-gold leading-none">
                  {step.number}
                </div>
                <div className="font-display text-lg font-bold">{step.label}</div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp Business Platform note */}
        <div className="mt-8 glass rounded-xl p-4 border border-border/60 flex items-start gap-3">
          <Layers className="h-4 w-4 text-primary mt-0.5 shrink-0" aria-hidden="true" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            <span className="text-foreground font-medium">Supporting technology: </span>
            Depending on the project, this can connect your website, WhatsApp Business Platform,
            calendar, email, spreadsheets, CRM, and internal tools. Note: automation via WhatsApp
            requires the official WhatsApp Business Platform and is separate from a personal
            WhatsApp account.
          </p>
        </div>
      </SectionShell>

      {/* ── 3. Web + automation connection ────────────────────────────────── */}
      <section
        id="web-and-automation"
        className="relative py-16 sm:py-24 border-t border-border/40"
      >
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 right-0 h-80 w-[500px] rounded-full bg-primary/5 blur-3xl opacity-60" />
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="glass-gold rounded-3xl p-8 sm:p-12 border border-primary/25 relative overflow-hidden">
            <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-primary/15 blur-3xl" />

            <div className="relative grid lg:grid-cols-[1fr_1fr] gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary font-semibold">
                  <span className="h-px w-8 bg-gradient-to-r from-primary to-transparent" />
                  Two Services, One System
                </div>
                <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold leading-tight tracking-tight">
                  A strong automation needs a{" "}
                  <span className="text-gradient-gold">clear entry point</span>
                </h2>
                <p className="mt-5 text-muted-foreground leading-relaxed">
                  I can design the website or landing page, connect the inquiry form, organize the
                  lead, and prepare the next step — as one complete system. Your customers see a
                  professional page. Your team receives organized, actionable information.
                </p>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  You do not need to know which technology you need. Tell me what your team
                  currently handles manually and what you want to make easier.
                </p>

                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateToSection("contact");
                  }}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground hover:opacity-95 transition-all shadow-[var(--shadow-gold)] hover:shadow-[var(--shadow-gold-hover)] font-display"
                >
                  Show Me What Can Be Automated
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>

              {/* Six-stage flow visualization */}
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-primary font-semibold mb-4">
                  Example end-to-end flow
                </div>
                <div className="flex flex-col gap-2">
                  {FLOW_STAGES.map((stage, i) => (
                    <div key={stage} className="flex items-center gap-3">
                      <div className="flex items-center gap-3 flex-1">
                        <div
                          className={`h-7 w-7 rounded-full border-2 flex items-center justify-center shrink-0 text-[10px] font-mono font-bold ${
                            i === 0 || i === FLOW_STAGES.length - 1
                              ? "border-primary bg-primary/20 text-primary"
                              : "border-border/50 text-muted-foreground"
                          }`}
                          aria-hidden="true"
                        >
                          {i + 1}
                        </div>
                        <span
                          className={`text-sm ${
                            i === 0 || i === FLOW_STAGES.length - 1
                              ? "text-foreground font-medium"
                              : "text-muted-foreground"
                          }`}
                        >
                          {stage}
                        </span>
                      </div>
                      {/* Icon hints */}
                      {i === 0 && (
                        <Globe
                          className="h-3.5 w-3.5 text-primary/50 shrink-0"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-primary/20">
                  <p className="text-xs text-muted-foreground font-mono">
                    The website handles the customer side. The automation handles the operational
                    side. Both work together.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
