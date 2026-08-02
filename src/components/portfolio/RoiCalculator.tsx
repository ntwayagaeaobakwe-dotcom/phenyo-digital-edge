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
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <SectionShell
      id="roi-calculator"
      eyebrow="ROI Calculator"
      iconGlyph="06"
      isPale={true}
      declarativeTitle="Estimate your operational return"
      qualifierTitle="by replacing repetitive manual tasks with connected workflows."
    >
      <div className="rounded-2xl border border-slate-300 bg-white p-6 sm:p-10 shadow-sm grid lg:grid-cols-2 gap-10">
        {/* Left Column: Input Sliders */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-slate-700 font-semibold border-b border-slate-200 pb-3">
            <Calculator className="h-4 w-4 text-blue-600" />
            <span>[ OPERATIONAL_INPUTS ]</span>
          </div>

          {/* Slider 1: Manual Hours */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 space-y-3">
            <div className="flex justify-between items-center text-xs font-mono">
              <label htmlFor="roi-hours" className="flex items-center gap-2 text-slate-700 font-semibold">
                <Clock className="h-3.5 w-3.5 text-blue-600" /> MANUAL HOURS / WEEK
              </label>
              <span className="font-mono text-blue-600 font-bold px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-xs">
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
              className="w-full accent-blue-600 bg-slate-200 rounded-lg h-2 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>5 hrs</span>
              <span>25 hrs</span>
              <span>50 hrs</span>
            </div>
          </div>

          {/* Slider 2: Team Size */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 space-y-3">
            <div className="flex justify-between items-center text-xs font-mono">
              <label htmlFor="roi-team" className="flex items-center gap-2 text-slate-700 font-semibold">
                <Users className="h-3.5 w-3.5 text-blue-600" /> TEAM SIZE
              </label>
              <span className="font-mono text-blue-600 font-bold px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-xs">
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
              className="w-full accent-blue-600 bg-slate-200 rounded-lg h-2 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>1</span>
              <span>10</span>
              <span>20</span>
            </div>
          </div>

          {/* Slider 3: Hourly Rate */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 space-y-3">
            <div className="flex justify-between items-center text-xs font-mono">
              <label htmlFor="roi-rate" className="flex items-center gap-2 text-slate-700 font-semibold">
                <DollarSign className="h-3.5 w-3.5 text-blue-600" /> HOURLY COST ($ USD)
              </label>
              <span className="font-mono text-blue-600 font-bold px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-xs">
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
              className="w-full accent-blue-600 bg-slate-200 rounded-lg h-2 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>$15/hr</span>
              <span>$100/hr</span>
              <span>$200/hr</span>
            </div>
          </div>

          {/* Slider 4: Automation Potential */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 space-y-3">
            <div className="flex justify-between items-center text-xs font-mono">
              <label htmlFor="roi-pct" className="flex items-center gap-2 text-slate-700 font-semibold">
                <Zap className="h-3.5 w-3.5 text-blue-600" /> AUTOMATION TARGET (%)
              </label>
              <span className="font-mono text-blue-600 font-bold px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-xs">
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
              className="w-full accent-blue-600 bg-slate-200 rounded-lg h-2 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>20%</span>
              <span>60%</span>
              <span>90%</span>
            </div>
          </div>
        </div>

        {/* Right Column: Calculated Results Panel */}
        <div className="rounded-xl border border-slate-300 bg-slate-900 text-white p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-blue-400 font-semibold border-b border-slate-800 pb-3 mb-6 flex items-center justify-between">
              <span>[ PROJECTED_SAVINGS_METRICS ]</span>
              <span className="text-slate-500 font-normal">CALCULATED LIVE</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
                <div className="text-xs text-slate-400 font-mono">WEEKLY TIME RECLAIMED</div>
                <div className="text-2xl font-mono font-bold text-white mt-1 tabular-nums">
                  {weeklyHoursSaved} hrs
                </div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
                <div className="text-xs text-slate-400 font-mono">MONTHLY HOURS SAVED</div>
                <div className="text-2xl font-mono font-bold text-white mt-1 tabular-nums">
                  {monthlyHoursSaved} hrs
                </div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
                <div className="text-xs text-slate-400 font-mono">MONTHLY VALUE</div>
                <div className="text-2xl font-mono font-bold text-blue-400 mt-1 tabular-nums">
                  {formatCurrency(monthlySavings)}
                </div>
              </div>

              <div className="rounded-xl border border-blue-500/40 bg-blue-950/40 p-4">
                <div className="text-xs text-blue-400 font-mono font-semibold">ANNUAL VALUE</div>
                <div className="text-2xl font-mono font-bold text-blue-300 mt-1 tabular-nums">
                  {formatCurrency(annualSavings)}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800">
            <a
              href="#contact"
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 font-mono text-xs uppercase tracking-widest font-semibold text-white hover:bg-blue-500 transition-colors"
            >
              <span>Request Process Review</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
