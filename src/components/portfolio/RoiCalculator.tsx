import { useState, useId } from "react";
import { ArrowUpRight, Clock, DollarSign, Users, Zap, TrendingUp } from "lucide-react";
import { SectionShell } from "./SectionShell";

export function RoiCalculator() {
  const [hoursPerWeek, setHoursPerWeek] = useState(25);
  const [teamSize, setTeamSize] = useState(4);
  const [hourlyCost, setHourlyCost] = useState(45);
  const [automationPct, setAutomationPct] = useState(70);

  const hoursInputId = useId();
  const teamInputId = useId();
  const costInputId = useId();
  const autoInputId = useId();

  // Computations
  const totalWeeklyHours = hoursPerWeek * teamSize;
  const weeklyHoursSaved = (totalWeeklyHours * (automationPct / 100)).toFixed(0);
  const monthlyHoursSaved = (Number(weeklyHoursSaved) * 4.33).toFixed(0);
  const annualHoursSaved = (Number(weeklyHoursSaved) * 52).toFixed(0);

  const weeklyDollarSavings = (Number(weeklyHoursSaved) * hourlyCost).toFixed(0);
  const annualDollarSavings = (Number(weeklyDollarSavings) * 52).toLocaleString();

  return (
    <SectionShell
      id="roi"
      eyebrow="Financial Impact Estimator"
      iconGlyph="06"
      themeVariant="iris"
      declarativeTitle="Estimate your operational recovery"
      qualifierTitle="in reclaimed hours and annual capital."
    >
      <div className="grid gap-8 lg:grid-cols-12 items-center">
        {/* Left 7 Columns: Interactive Precision Sliders */}
        <div className="lg:col-span-7 rounded-2xl border border-[rgba(118,87,255,0.25)] bg-[#100C1D]/90 p-6 sm:p-8 backdrop-blur-xl space-y-6">
          <div className="border-b border-[rgba(196,190,255,0.12)] pb-4 flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#78E7FF] font-semibold">
              [ PARAMETER_CONFIGURATION ]
            </span>
            <span className="font-mono text-[11px] text-[#9D9AAF]">LIVE CALCULATION</span>
          </div>

          <div className="space-y-5">
            {/* Slider 1: Hours Per Week */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <label htmlFor={hoursInputId} className="flex items-center gap-1.5 text-[#9D9AAF]">
                  <Clock className="h-3.5 w-3.5 text-[#78E7FF]" /> MANUAL HOURS / PERSON / WEEK
                </label>
                <span className="font-bold text-[#F5F6FA] px-2.5 py-0.5 rounded-full bg-[#7657FF]/20 border border-[#7657FF]/40">
                  {hoursPerWeek} hrs/wk
                </span>
              </div>
              <input
                id={hoursInputId}
                type="range"
                min="5"
                max="40"
                step="1"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                className="w-full accent-[#7657FF] bg-[#05060A] rounded-lg h-2.5 cursor-pointer touch-target focus-ring"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#9D9AAF]">
                <span>5 hrs</span>
                <span>20 hrs</span>
                <span>40 hrs</span>
              </div>
            </div>

            {/* Slider 2: Team Size */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <label htmlFor={teamInputId} className="flex items-center gap-1.5 text-[#9D9AAF]">
                  <Users className="h-3.5 w-3.5 text-[#78E7FF]" /> OPERATIONAL TEAM SIZE
                </label>
                <span className="font-bold text-[#F5F6FA] px-2.5 py-0.5 rounded-full bg-[#7657FF]/20 border border-[#7657FF]/40">
                  {teamSize} {teamSize === 1 ? "person" : "people"}
                </span>
              </div>
              <input
                id={teamInputId}
                type="range"
                min="1"
                max="25"
                step="1"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full accent-[#7657FF] bg-[#05060A] rounded-lg h-2.5 cursor-pointer touch-target focus-ring"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#9D9AAF]">
                <span>1</span>
                <span>12</span>
                <span>25+</span>
              </div>
            </div>

            {/* Slider 3: Hourly Cost */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <label htmlFor={costInputId} className="flex items-center gap-1.5 text-[#9D9AAF]">
                  <DollarSign className="h-3.5 w-3.5 text-[#78E7FF]" /> AVERAGE HOURLY COST ($ USD)
                </label>
                <span className="font-bold text-[#F5F6FA] px-2.5 py-0.5 rounded-full bg-[#7657FF]/20 border border-[#7657FF]/40">
                  ${hourlyCost}/hr
                </span>
              </div>
              <input
                id={costInputId}
                type="range"
                min="15"
                max="150"
                step="5"
                value={hourlyCost}
                onChange={(e) => setHourlyCost(Number(e.target.value))}
                className="w-full accent-[#7657FF] bg-[#05060A] rounded-lg h-2.5 cursor-pointer touch-target focus-ring"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#9D9AAF]">
                <span>$15/hr</span>
                <span>$75/hr</span>
                <span>$150/hr</span>
              </div>
            </div>

            {/* Slider 4: Target Automation Percentage */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <label htmlFor={autoInputId} className="flex items-center gap-1.5 text-[#9D9AAF]">
                  <Zap className="h-3.5 w-3.5 text-[#FF5577]" /> TARGET AUTOMATION RATIO (%)
                </label>
                <span className="font-bold text-[#FF5577] px-2.5 py-0.5 rounded-full bg-[#FF5577]/20 border border-[#FF5577]/40">
                  {automationPct}%
                </span>
              </div>
              <input
                id={autoInputId}
                type="range"
                min="20"
                max="90"
                step="5"
                value={automationPct}
                onChange={(e) => setAutomationPct(Number(e.target.value))}
                className="w-full accent-[#FF5577] bg-[#05060A] rounded-lg h-2.5 cursor-pointer touch-target focus-ring"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#9D9AAF]">
                <span>20%</span>
                <span>55%</span>
                <span>90%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Visual Output Telemetry Card */}
        <div className="lg:col-span-5 rounded-2xl border border-[#7657FF]/40 bg-gradient-to-br from-[#100C1D] to-[#160F30] p-7 sm:p-9 shadow-[0_20px_50px_rgba(118,87,255,0.2)] flex flex-col justify-between space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#78E7FF] font-bold mb-4">
              <TrendingUp className="w-4 h-4" />
              <span>PROJECTED ANNUAL IMPACT</span>
            </div>

            <div className="space-y-1">
              <div className="font-sans font-extrabold text-4xl sm:text-5xl text-[#F5F6FA] tracking-tight">
                ${annualDollarSavings}
              </div>
              <p className="text-xs font-mono text-[#9D9AAF]">
                ESTIMATED ANNUAL CAPITAL RECOVERED
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-[rgba(196,190,255,0.12)]">
              <div>
                <span className="font-sans font-bold text-2xl text-[#78E7FF] block">
                  {weeklyHoursSaved}h
                </span>
                <span className="font-mono text-[11px] text-[#9D9AAF]">
                  RECOVERED / WEEK
                </span>
              </div>

              <div>
                <span className="font-sans font-bold text-2xl text-[#FF5577] block">
                  {annualHoursSaved}h
                </span>
                <span className="font-mono text-[11px] text-[#9D9AAF]">
                  RECOVERED / YEAR
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[rgba(196,190,255,0.12)] space-y-3">
            <a
              href="#contact"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#7657FF] hover:bg-[#8A6EFF] text-white font-semibold py-4 rounded-xl shadow-lg transition-all active:scale-[0.98] focus-ring text-sm"
            >
              <span>Capture this ROI in your operations</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <p className="text-[11px] font-mono text-center text-[#9D9AAF]/70">
              Zero upfront commitment. Guaranteed custom architecture.
            </p>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
