import { lazy, Suspense } from "react";
import { ArrowUpRight, ChevronRight, CheckCircle2 } from "lucide-react";
import heroImg from "@/assets/phenyo-hero.jpg";
import bgGrid from "@/assets/bg-grid.jpg";
import { PERSONAL_INFO, HERO_STATS } from "@/data/portfolio-data";
import { DemoSkeleton } from "./DemoSkeleton";
import heroImgWebp from "@/assets/phenyo-hero.webp";
import bgGridWebp from "@/assets/bg-grid.webp";

const BusinessSystemsDemo = lazy(() =>
  import("./BusinessSystemsDemo").then((m) => ({ default: m.BusinessSystemsDemo })),
);

export function HeroSection() {
  return (
    <section className="relative pt-40 pb-24 sm:pt-48 sm:pb-32 overflow-hidden" id="top">
      {/* Background Gradients */}
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 -z-10 grid-bg opacity-40" />
      <div
        className="absolute inset-0 -z-10 opacity-20 mix-blend-screen"
        style={{
          backgroundImage: `url(${bgGridWebp})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
        <div>
          {/* Availability Badge */}
          <div className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1 text-xs text-muted-foreground border border-primary/20">
            <span
              className="h-2 w-2 rounded-full bg-primary animate-pulse-glow"
              aria-hidden="true"
            />
            <span>{PERSONAL_INFO.status}</span>
          </div>

          {/* Customer-Focused Headline */}
          <h1 className="mt-6 font-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.08] tracking-tight text-foreground">
            Automations That Save You Time.
            <br />
            <span className="text-gradient-gold">Websites That Help You Grow.</span>
          </h1>

          {/* Customer-Focused Subheadline */}
          <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
            {PERSONAL_INFO.subheadline}
          </p>

          {/* Call-to-action Buttons */}
          <div className="mt-8 flex flex-wrap gap-3.5">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground hover:opacity-95 transition-all shadow-[var(--shadow-gold)] hover:shadow-[var(--shadow-gold-hover)] font-display"
            >
              Tell Me What You Need <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full glass glass-hover px-6 py-3.5 text-sm font-medium text-foreground transition-all"
            >
              See What I Can Build
            </a>
            <a
              href="#roi-calculator"
              className="inline-flex items-center gap-1.5 rounded-full px-5 py-3.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Estimate Time Saved{" "}
              <ChevronRight className="h-4 w-4 text-primary" aria-hidden="true" />
            </a>
          </div>

          {/* Key Stats Counter */}
          <div className="mt-12 grid grid-cols-3 gap-6 max-w-md border-t border-border/40 pt-6">
            {HERO_STATS.map((stat) => (
              <div key={stat.label}>
                <div className="text-xl sm:text-2xl font-display font-bold text-gradient-gold">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground mt-1 font-sans">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Visual Container + Interactive Demo */}
        <div className="space-y-6">
          <div className="relative animate-float">
            <div className="absolute -inset-8 bg-primary/20 blur-3xl rounded-full" />

            {/* Decorative animated accent layer — slow mesh-gradient drift + a
                gold "signal line" sweep. Purely visual, so it's aria-hidden and
                fully disabled under prefers-reduced-motion (see styles.css). */}
            <div
              className="absolute -inset-12 -z-10 overflow-hidden rounded-[2.5rem] pointer-events-none"
              aria-hidden="true"
            >
              <div
                className="absolute -top-10 -left-10 h-64 w-64 rounded-full blur-3xl opacity-50 animate-mesh-drift"
                style={{
                  background:
                    "radial-gradient(circle, oklch(0.82 0.15 85 / 0.35), transparent 70%)",
                }}
              />
              <div
                className="absolute -bottom-14 -right-8 h-72 w-72 rounded-full blur-3xl opacity-40 animate-mesh-drift"
                style={{
                  background:
                    "radial-gradient(circle, oklch(0.50 0.15 260 / 0.4), transparent 70%)",
                  animationDelay: "-8s",
                }}
              />
              <div className="absolute inset-x-0 top-1/2 h-px overflow-hidden">
                <div
                  className="h-px w-1/2 animate-signal-sweep"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, oklch(0.82 0.15 85 / 0.9), transparent)",
                  }}
                />
              </div>
            </div>

            <div className="relative gold-border rounded-3xl overflow-hidden aspect-[16/10] sm:aspect-[4/3] shadow-[var(--shadow-elegant)]">
              <picture>
                <source srcSet={heroImgWebp} type="image/webp" />
                <img
                  src={heroImg}
                  alt="Phenyo — Business Automation & Web Development Specialist"
                  width={1024}
                  height={1280}
                  loading="eager"
                  fetchPriority="high"
                  className="h-full w-full object-cover object-top"
                />
              </picture>
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                <div className="glass-gold rounded-xl px-4 py-2.5 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                      Focus
                    </div>
                    <div className="text-sm font-medium">
                      Business Automation · Conversion Websites
                    </div>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Business Systems Demo */}
          <Suspense fallback={<DemoSkeleton className="h-[280px]" />}>
            <BusinessSystemsDemo />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
