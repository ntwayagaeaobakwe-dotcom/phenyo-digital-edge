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

  // Computations (strictly preserving USD)
  const totalWeeklyHours = hoursPerWeek * teamSize;
  const weeklyHoursSaved = (totalWeeklyHours * (automationPct / 100)).toFixed(0);
  const annualHoursSaved = (Number(weeklyHoursSaved) * 52).toFixed(0);

  const weeklyDollarSavings = (Number(weeklyHoursSaved) * hourlyCost).toFixed(0);
  const annualDollarSavings = (Number(weeklyDollarSavings) * 52).toLocaleString();

  return (
    <SectionShell
      id="roi"
      eyebrow="Financial Impact Estimator"
      iconGlyph="06"
      themeVariant="sand"
      declarativeTitle="Estimate your operational recovery"
      qualifierTitle="in reclaimed hours and annual capital."
    >
      <div className="grid gap-8 lg:grid-cols-12 items-center">
        {/* Left 7 Columns: Interactive Precision Sliders on Bone Plate */}
        <div className="lg:col-span-7 rounded-3xl border border-[rgba(8,45,45,0.14)] bg-[#FAF8F2] p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="border-b border-[rgba(8,45,45,0.1)] pb-4 flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#082D2D] font-semibold">
              [ PARAMETER_CONFIGURATION ]
            </span>
            <span className="font-mono text-[11px] text-[#5C5953]">LIVE CALCULATION</span>
          </div>

          <div className="space-y-5">
            {/* Slider 1: Hours Per Week */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <label htmlFor={hoursInputId} className="flex items-center gap-1.5 text-[#5C5953] font-medium">
                  <Clock className="h-3.5 w-3.5 text-[#082D2D]" /> MANUAL HOURS / PERSON / WEEK
                </label>
                <span className="font-bold text-[#080A09] px-2.5 py-0.5 rounded-full bg-[#F3F0E8] border border-[rgba(8,45,45,0.14)]">
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
                className="w-full accent-[#082D2D] bg-[#E5D6C2] rounded-full h-2 cursor-pointer touch-target focus-ring"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#5C5953]">
                <span>5 hrs</span>
                <span>20 hrs</span>
                <span>40 hrs</span>
              </div>
            </div>

            {/* Slider 2: Team Size */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <label htmlFor={teamInputId} className="flex items-center gap-1.5 text-[#5C5953] font-medium">
                  <Users className="h-3.5 w-3.5 text-[#082D2D]" /> OPERATIONAL TEAM SIZE
                </label>
                <span className="font-bold text-[#080A09] px-2.5 py-0.5 rounded-full bg-[#F3F0E8] border border-[rgba(8,45,45,0.14)]">
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
                className="w-full accent-[#082D2D] bg-[#E5D6C2] rounded-full h-2 cursor-pointer touch-target focus-ring"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#5C5953]">
                <span>1</span>
                <span>12</span>
                <span>25+</span>
              </div>
            </div>

            {/* Slider 3: Hourly Cost */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <label htmlFor={costInputId} className="flex items-center gap-1.5 text-[#5C5953] font-medium">
                  <DollarSign className="h-3.5 w-3.5 text-[#082D2D]" /> AVERAGE HOURLY COST ($ USD)
                </label>
                <span className="font-bold text-[#080A09] px-2.5 py-0.5 rounded-full bg-[#F3F0E8] border border-[rgba(8,45,45,0.14)]">
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
                className="w-full accent-[#082D2D] bg-[#E5D6C2] rounded-full h-2 cursor-pointer touch-target focus-ring"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#5C5953]">
                <span>$15/hr</span>
                <span>$75/hr</span>
                <span>$150/hr</span>
              </div>
            </div>

            {/* Slider 4: Target Automation Percentage */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <label htmlFor={autoInputId} className="flex items-center gap-1.5 text-[#5C5953] font-medium">
                  <Zap className="h-3.5 w-3.5 text-[#082D2D]" /> TARGET AUTOMATION RATIO (%)
                </label>
                <span className="font-bold text-[#082D2D] px-2.5 py-0.5 rounded-full bg-[#F3F0E8] border border-[rgba(8,45,45,0.14)]">
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
                className="w-full accent-[#082D2D] bg-[#E5D6C2] rounded-full h-2 cursor-pointer touch-target focus-ring"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#5C5953]">
                <span>20%</span>
                <span>55%</span>
                <span>90%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Visual Output Telemetry Card in Deep Teal */}
        <div className="lg:col-span-5 rounded-3xl border border-[rgba(184,181,172,0.22)] bg-[#082D2D] p-7 sm:p-9 shadow-xl flex flex-col justify-between space-y-6 text-[#F3F0E8]">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#5FD8CD] font-bold mb-4">
              <TrendingUp className="w-4 h-4" />
              <span>PROJECTED ANNUAL IMPACT</span>
            </div>

            <div className="space-y-1">
              <div className="font-serif font-normal text-4xl sm:text-5xl lg:text-[54px] text-[#F3F0E8] tracking-tight leading-none">
                ${annualDollarSavings}
              </div>
              <p className="text-xs font-mono text-[#B8B5AC] pt-1">
                ESTIMATED ANNUAL CAPITAL RECOVERED (USD)
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-[rgba(184,181,172,0.14)]">
              <div>
                <span className="font-serif font-normal text-2xl sm:text-3xl text-[#5FD8CD] block">
                  {weeklyHoursSaved}h
                </span>
                <span className="font-mono text-[11px] text-[#B8B5AC]">
                  RECOVERED / WEEK
                </span>
              </div>

              <div>
                <span className="font-serif font-normal text-2xl sm:text-3xl text-[#5FD8CD] block">
                  {annualHoursSaved}h
                </span>
                <span className="font-mono text-[11px] text-[#B8B5AC]">
                  RECOVERED / YEAR
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[rgba(184,181,172,0.14)] space-y-3">
            <a
              href="#contact"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#F3F0E8] hover:bg-white text-[#080A09] font-mono text-xs uppercase tracking-wider font-bold py-4 rounded-full shadow-md transition-all active:scale-[0.98] focus-ring cursor-pointer"
            >
              <span>Capture this ROI in your operations</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <p className="text-[11px] font-mono text-center text-[#B8B5AC]">
              Zero upfront commitment. Guaranteed custom architecture.
            </p>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

