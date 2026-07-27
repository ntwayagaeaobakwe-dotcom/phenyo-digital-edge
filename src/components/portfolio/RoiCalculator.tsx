import { useState } from "react";
import { ArrowUpRight, Calculator, Clock, DollarSign, Users, Zap } from "lucide-react";
import { SectionShell } from "./SectionShell";
import { ROI_CALCULATOR_DEFAULTS } from "@/data/portfolio-data";

export function RoiCalculator() {
  const [hoursPerWeek, setHoursPerWeek] = useState(ROI_CALCULATOR_DEFAULTS.hoursPerWeek);
  const [teamSize, setTeamSize] = useState(ROI_CALCULATOR_DEFAULTS.teamSize);
  const [hourlyCost, setHourlyCost] = useState(ROI_CALCULATOR_DEFAULTS.hourlyCost);
  const [automationPct, setAutomationPct] = useState(ROI_CALCULATOR_DEFAULTS.automationPct);

  // Calculations
  const weeklyHoursSaved = Math.round(hoursPerWeek * teamSize * (automationPct / 100));
  const monthlyHoursSaved = weeklyHoursSaved * 4;
  const monthlySavings = monthlyHoursSaved * hourlyCost;
  const annualSavings = monthlySavings * 12;

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val);

  return (
    <SectionShell
      id="roi-calculator"
      eyebrow="Interactive Business Tool"
      title={
        <>
          Calculate Your <span className="text-gradient-gold">Automation Leverage</span>
        </>
      }
    >
      <div className="text-muted-foreground text-lg max-w-2xl -mt-6 mb-10 leading-relaxed">
        Estimate how many hours and dollars your business could save by replacing manual workflows with AI-powered n8n automation systems.
      </div>

      <div className="glass rounded-3xl p-6 sm:p-10 border border-primary/20 shadow-[var(--shadow-elegant)] grid lg:grid-cols-2 gap-10">
        {/* Left Column: Input Sliders */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary font-semibold border-b border-border/60 pb-3">
            <Calculator className="h-4 w-4" /> Operational Parameters
          </div>

          {/* Slider 1: Manual Hours */}
          <div className="glass p-4 rounded-2xl border border-border/60 space-y-3">
            <div className="flex justify-between items-center text-sm font-medium">
              <label htmlFor="roi-hours" className="flex items-center gap-2 text-foreground">
                <Clock className="h-4 w-4 text-primary" /> Manual Hours / Week (per person)
              </label>
              <span className="font-mono text-primary font-bold px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-xs">
                {hoursPerWeek} hrs/wk
              </span>
            </div>
            <input
              id="roi-hours"
              type="range"
              min="5"
              max="50"
              step="1"
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(Number(e.target.value))}
              className="w-full accent-primary bg-white/10 rounded-lg h-2 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
              <span>5 hrs (Minimal)</span>
              <span>25 hrs (Medium)</span>
              <span>50 hrs (Heavy)</span>
            </div>
          </div>

          {/* Slider 2: Team Size */}
          <div className="glass p-4 rounded-2xl border border-border/60 space-y-3">
            <div className="flex justify-between items-center text-sm font-medium">
              <label htmlFor="roi-team" className="flex items-center gap-2 text-foreground">
                <Users className="h-4 w-4 text-primary" /> Team Size Affected
              </label>
              <span className="font-mono text-primary font-bold px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-xs">
                {teamSize} {teamSize === 1 ? "person" : "people"}
              </span>
            </div>
            <input
              id="roi-team"
              type="range"
              min="1"
              max="20"
              step="1"
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value))}
              className="w-full accent-primary bg-white/10 rounded-lg h-2 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
              <span>1 person</span>
              <span>10 people</span>
              <span>20 people</span>
            </div>
          </div>

          {/* Slider 3: Hourly Rate */}
          <div className="glass p-4 rounded-2xl border border-border/60 space-y-3">
            <div className="flex justify-between items-center text-sm font-medium">
              <label htmlFor="roi-rate" className="flex items-center gap-2 text-foreground">
                <DollarSign className="h-4 w-4 text-primary" /> Average Hourly Rate ($ USD)
              </label>
              <span className="font-mono text-primary font-bold px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-xs">
                ${hourlyCost}/hr
              </span>
            </div>
            <input
              id="roi-rate"
              type="range"
              min="15"
              max="200"
              step="5"
              value={hourlyCost}
              onChange={(e) => setHourlyCost(Number(e.target.value))}
              className="w-full accent-primary bg-white/10 rounded-lg h-2 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
              <span>$15/hr</span>
              <span>$100/hr</span>
              <span>$200/hr</span>
            </div>
          </div>

          {/* Slider 4: Automation Potential */}
          <div className="glass p-4 rounded-2xl border border-border/60 space-y-3">
            <div className="flex justify-between items-center text-sm font-medium">
              <label htmlFor="roi-pct" className="flex items-center gap-2 text-foreground">
                <Zap className="h-4 w-4 text-primary" /> Automation Potential (%)
              </label>
              <span className="font-mono text-primary font-bold px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-xs">
                {automationPct}%
              </span>
            </div>
            <input
              id="roi-pct"
              type="range"
              min="20"
              max="90"
              step="5"
              value={automationPct}
              onChange={(e) => setAutomationPct(Number(e.target.value))}
              className="w-full accent-primary bg-white/10 rounded-lg h-2 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
              <span>20% (Partial)</span>
              <span>60% (Standard)</span>
              <span>90% (Autonomous)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Results Panel */}
        <div className="glass-gold rounded-2xl p-6 sm:p-8 flex flex-col justify-between border border-primary/40 shadow-xl">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-primary font-semibold border-b border-primary/20 pb-3 mb-6 flex items-center justify-between">
              <span>Estimated ROI Metrics</span>
              <span className="text-[10px] text-muted-foreground font-normal">Calculated Live</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="glass p-4 rounded-xl border border-border/60">
                <div className="text-xs text-muted-foreground font-mono">Weekly Time Saved</div>
                <div className="text-2xl font-display font-bold text-gradient-gold mt-1">
                  {weeklyHoursSaved} hrs
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">reclaimed across team</div>
              </div>

              <div className="glass p-4 rounded-xl border border-border/60">
                <div className="text-xs text-muted-foreground font-mono">Monthly Time Saved</div>
                <div className="text-2xl font-display font-bold text-gradient-gold mt-1">
                  {monthlyHoursSaved} hrs
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">per month saved</div>
              </div>

              <div className="glass p-4 rounded-xl border border-border/60">
                <div className="text-xs text-muted-foreground font-mono">Monthly Savings</div>
                <div className="text-2xl sm:text-3xl font-display font-bold text-foreground mt-1">
                  {formatCurrency(monthlySavings)}
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">reclaimed monthly</div>
              </div>

              <div className="glass-gold p-4 rounded-xl border border-primary/50 bg-primary/10 shadow-lg">
                <div className="text-xs text-primary font-mono font-bold">Annualized Value</div>
                <div className="text-2xl sm:text-3xl font-display font-bold text-gradient-gold mt-1">
                  {formatCurrency(annualSavings)}
                </div>
                <div className="text-[11px] text-primary/90 mt-0.5 font-medium">annual operational ROI</div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border/50">
            <a
              href="#contact"
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground hover:opacity-95 transition-all shadow-[var(--shadow-gold)] font-display"
            >
              Book an Automation Audit <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
