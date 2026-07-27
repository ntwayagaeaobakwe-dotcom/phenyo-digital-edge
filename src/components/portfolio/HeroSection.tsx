import { ArrowUpRight, ChevronRight, TrendingUp } from "lucide-react";
import heroImg from "@/assets/phenyo-hero.jpg";
import bgGrid from "@/assets/bg-grid.jpg";
import { PERSONAL_INFO, HERO_STATS } from "@/data/portfolio-data";
import { MarketAutomationTerminal } from "./MarketAutomationTerminal";

export function HeroSection() {
  return (
    <section className="relative pt-40 pb-24 sm:pt-48 sm:pb-32">
      {/* Background Gradients */}
      <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 -z-10 grid-bg opacity-40" />
      <div
        className="absolute inset-0 -z-10 opacity-20 mix-blend-screen"
        style={{ backgroundImage: `url(${bgGrid})`, backgroundSize: "cover", backgroundPosition: "center" }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
        <div>
          {/* Availability Badge */}
          <div className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
            {PERSONAL_INFO.status}
          </div>

          {/* Main Headline */}
          <h1 className="mt-6 font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-[1.02]">
            Trading Markets.
            <br />
            Building Systems.
            <br />
            <span className="text-gradient-gold">Creating Digital Freedom.</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
            {PERSONAL_INFO.subheadline}
          </p>

          {/* Call-to-action Buttons */}
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity shadow-[var(--shadow-gold)]"
            >
              View my work <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-medium hover:bg-white/5 transition-colors"
            >
              Work with me
            </a>
            <a
              href="#roi-calculator"
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              ROI Calculator <ChevronRight className="h-4 w-4" />
            </a>
          </div>

          {/* Key Stats Counter */}
          <div className="mt-12 grid grid-cols-3 gap-6 max-w-md border-t border-border/40 pt-6">
            {HERO_STATS.map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-display font-bold text-gradient-gold">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Visual Container + Interactive Terminal */}
        <div className="space-y-6">
          <div className="relative animate-float">
            <div className="absolute -inset-8 bg-primary/20 blur-3xl rounded-full" />
            <div className="relative gold-border rounded-3xl overflow-hidden aspect-[16/10] sm:aspect-[4/3] shadow-[var(--shadow-elegant)]">
              <img
                src={heroImg}
                alt="Phenyo — day trader and AI automation builder"
                width={1024}
                height={1280}
                className="h-full w-full object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                <div className="glass-gold rounded-xl px-4 py-2.5 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Operator</div>
                    <div className="text-sm font-medium">Market Execution · AI Workflows</div>
                  </div>
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Market Automation Terminal */}
          <MarketAutomationTerminal />
        </div>
      </div>
    </section>
  );
}
