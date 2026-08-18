import { useState, useEffect, useRef } from "react";
import { RotateCcw, Play, Pause, CheckCircle2, ArrowUpRight, Activity } from "lucide-react";

export type SignalStage = "received" | "organized" | "routed" | "prepared";

const STAGES: { id: SignalStage; label: string; step: string; desc: string; color: string }[] = [
  {
    id: "received",
    label: "Received",
    step: "01",
    desc: "Inquiry captured & schema validated",
    color: "#78E7FF", // Frozen cyan
  },
  {
    id: "organized",
    label: "Organized",
    step: "02",
    desc: "Intent classified, CRM deduplicated",
    color: "#7657FF", // Electric iris
  },
  {
    id: "routed",
    label: "Routed",
    step: "03",
    desc: "Owner assigned, WhatsApp / Email triggered",
    color: "#FF5577", // Signal coral
  },
  {
    id: "prepared",
    label: "Prepared",
    step: "04",
    desc: "System ready for executive action",
    color: "#78E7FF", // Frozen cyan
  },
];

export function SignalSculpture() {
  const [currentStageIndex, setCurrentStageIndex] = useState(3); // Start settled at final state
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasSettled, setHasSettled] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeStage = STAGES[currentStageIndex];

  // Run the sequence step-by-step
  const startSequence = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrentStageIndex(0);
    setIsPlaying(true);
    setHasSettled(false);

    let step = 0;
    timerRef.current = setInterval(() => {
      step++;
      if (step < STAGES.length) {
        setCurrentStageIndex(step);
      } else {
        if (timerRef.current) clearInterval(timerRef.current);
        setIsPlaying(false);
        setHasSettled(true);
        setCurrentStageIndex(3);
      }
    }, 1200);
  };

  const replay = () => {
    startSequence();
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div
      className="relative w-full max-w-[560px] mx-auto select-none"
      aria-label="NYG Signal Sculpture Visual"
    >
      {/* Outer Atmospheric Aura */}
      <div
        className="absolute -inset-4 rounded-3xl opacity-60 blur-3xl pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(ellipse at center, ${activeStage.color}25 0%, rgba(16,12,29,0) 70%)`,
        }}
      />

      {/* Main Structural Frame */}
      <div className="relative rounded-2xl border border-[rgba(196,190,255,0.18)] bg-[#100C1D]/90 backdrop-blur-xl p-5 sm:p-7 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Top Telemetry Header */}
        <div className="flex items-center justify-between border-b border-[rgba(196,190,255,0.12)] pb-4 mb-5">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isPlaying ? "bg-[#FF5577]" : "bg-[#78E7FF]"
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  isPlaying ? "bg-[#FF5577]" : "bg-[#78E7FF]"
                }`}
              />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-widest text-text-muted">
              SIGNAL SCULPTURE //{" "}
              <span className="text-[#F5F6FA] font-medium">{activeStage.label.toUpperCase()}</span>
            </span>
          </div>

          {/* Replay / Interactive Control */}
          <button
            type="button"
            onClick={replay}
            className="group inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[rgba(196,190,255,0.2)] bg-[#05060A]/70 text-[11px] font-mono text-text-muted hover:text-[#F5F6FA] hover:border-[#7657FF]/60 hover:bg-[#7657FF]/15 transition-all cursor-pointer focus-ring"
            aria-label="Replay signal routing sequence"
          >
            <RotateCcw className="w-3 h-3 group-hover:-rotate-90 transition-transform duration-300 text-[#78E7FF]" />
            <span>Replay</span>
          </button>
        </div>

        {/* The 3D-styled SVG Signal Sculpture Graphic */}
        <div className="relative h-[260px] sm:h-[300px] w-full flex items-center justify-center my-2">
          <svg
            viewBox="0 0 500 300"
            className="w-full h-full overflow-visible"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Gradients */}
              <linearGradient id="sculptureGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7657FF" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#FF5577" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#78E7FF" stopOpacity="0.9" />
              </linearGradient>

              <linearGradient id="pathGradientA" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#78E7FF" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#7657FF" stopOpacity="0.3" />
              </linearGradient>

              <linearGradient id="pathGradientB" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#7657FF" />
                <stop offset="100%" stopColor="#FF5577" />
              </linearGradient>

              <linearGradient id="pathGradientC" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#FF5577" />
                <stop offset="100%" stopColor="#78E7FF" />
              </linearGradient>

              {/* Glow Filter */}
              <filter id="signalGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Geometric Grid Alignment Backdrop */}
            <g stroke="rgba(196,190,255,0.06)" strokeWidth="1">
              <line x1="60" y1="40" x2="60" y2="260" strokeDasharray="4 4" />
              <line x1="180" y1="40" x2="180" y2="260" strokeDasharray="4 4" />
              <line x1="320" y1="40" x2="320" y2="260" strokeDasharray="4 4" />
              <line x1="440" y1="40" x2="440" y2="260" strokeDasharray="4 4" />
              <circle cx="250" cy="150" r="110" fill="none" strokeWidth="0.8" />
              <circle cx="250" cy="150" r="70" fill="none" strokeWidth="0.8" />
            </g>

            {/* Dimensional Interlocking Sculpture Ribbons */}
            {/* Ribbon 1: Upper Swirl */}
            <path
              d="M 60 150 C 120 70, 190 60, 250 110 C 310 160, 380 230, 440 150"
              fill="none"
              stroke={currentStageIndex >= 1 ? "url(#pathGradientB)" : "rgba(118,87,255,0.2)"}
              strokeWidth={currentStageIndex >= 1 ? "3" : "1.5"}
              strokeLinecap="round"
              className="transition-all duration-700"
            />

            {/* Ribbon 2: Center Highway */}
            <path
              d="M 60 150 C 130 150, 180 180, 250 150 C 320 120, 370 150, 440 150"
              fill="none"
              stroke={currentStageIndex >= 2 ? "url(#sculptureGradient)" : "rgba(196,190,255,0.25)"}
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#signalGlow)"
            />

            {/* Ribbon 3: Lower Branch */}
            <path
              d="M 60 150 C 120 230, 190 240, 250 190 C 310 140, 380 70, 440 150"
              fill="none"
              stroke={currentStageIndex >= 2 ? "url(#pathGradientC)" : "rgba(120,231,255,0.2)"}
              strokeWidth={currentStageIndex >= 2 ? "3" : "1.5"}
              strokeLinecap="round"
              className="transition-all duration-700"
            />

            {/* Core Volumetric Sculpture Node (Geometric Diamond Prism) */}
            <g transform="translate(250, 150)">
              {/* Outer halo */}
              <polygon
                points="0,-48 42,-12 36,36 0,48 -36,36 -42,-12"
                fill="rgba(16,12,29,0.85)"
                stroke="#7657FF"
                strokeWidth="1.5"
                strokeDasharray="6 3"
                className="animate-spin-very-slow"
              />
              {/* Inner faceted prism */}
              <polygon
                points="0,-32 28,0 0,32 -28,0"
                fill="url(#sculptureGradient)"
                opacity="0.85"
                filter="url(#signalGlow)"
              />
              <circle cx="0" cy="0" r="8" fill="#F5F6FA" />
            </g>

            {/* Stage Nodes on the Sculpture */}
            {/* 1. Ingestion Node */}
            <g
              transform="translate(60, 150)"
              className="cursor-pointer"
              onClick={() => setCurrentStageIndex(0)}
            >
              <circle
                r="16"
                fill="#100C1D"
                stroke={currentStageIndex >= 0 ? "#78E7FF" : "rgba(196,190,255,0.2)"}
                strokeWidth="2"
              />
              <circle r="6" fill={currentStageIndex >= 0 ? "#78E7FF" : "rgba(196,190,255,0.4)"} />
              <text
                y="32"
                textAnchor="middle"
                fill="#9D9AAF"
                fontSize="10"
                fontFamily="JetBrains Mono, monospace"
              >
                01.RECV
              </text>
            </g>

            {/* 2. Organization Junction */}
            <g
              transform="translate(180, 110)"
              className="cursor-pointer"
              onClick={() => setCurrentStageIndex(1)}
            >
              <circle
                r="14"
                fill="#100C1D"
                stroke={currentStageIndex >= 1 ? "#7657FF" : "rgba(196,190,255,0.2)"}
                strokeWidth="2"
              />
              <circle r="5" fill={currentStageIndex >= 1 ? "#7657FF" : "rgba(196,190,255,0.4)"} />
              <text
                y="-22"
                textAnchor="middle"
                fill="#9D9AAF"
                fontSize="10"
                fontFamily="JetBrains Mono, monospace"
              >
                02.ORGN
              </text>
            </g>

            {/* 3. Routing Nexus */}
            <g
              transform="translate(320, 190)"
              className="cursor-pointer"
              onClick={() => setCurrentStageIndex(2)}
            >
              <circle
                r="14"
                fill="#100C1D"
                stroke={currentStageIndex >= 2 ? "#FF5577" : "rgba(196,190,255,0.2)"}
                strokeWidth="2"
              />
              <circle r="5" fill={currentStageIndex >= 2 ? "#FF5577" : "rgba(196,190,255,0.4)"} />
              <text
                y="28"
                textAnchor="middle"
                fill="#9D9AAF"
                fontSize="10"
                fontFamily="JetBrains Mono, monospace"
              >
                03.ROUT
              </text>
            </g>

            {/* 4. Resolved Output Station */}
            <g
              transform="translate(440, 150)"
              className="cursor-pointer"
              onClick={() => setCurrentStageIndex(3)}
            >
              <circle
                r="18"
                fill="#100C1D"
                stroke={currentStageIndex >= 3 ? "#78E7FF" : "rgba(196,190,255,0.2)"}
                strokeWidth="2.5"
                filter="url(#signalGlow)"
              />
              <circle r="8" fill={currentStageIndex >= 3 ? "#78E7FF" : "rgba(196,190,255,0.4)"} />
              <text
                y="34"
                textAnchor="middle"
                fill="#78E7FF"
                fontSize="10"
                fontWeight="bold"
                fontFamily="JetBrains Mono, monospace"
              >
                04.EXEC
              </text>
            </g>

            {/* Luminous Signal Pulse travelling across paths when playing */}
            {isPlaying && (
              <circle r="6" fill="#FFF" filter="url(#signalGlow)">
                <animateMotion
                  dur="4.8s"
                  repeatCount="1"
                  path="M 60 150 C 130 150, 180 180, 250 150 C 320 120, 370 150, 440 150"
                />
              </circle>
            )}
          </svg>
        </div>

        {/* Bottom State Bar & Stage Sequence Readout */}
        <div className="grid grid-cols-4 gap-2 pt-4 border-t border-[rgba(196,190,255,0.12)]">
          {STAGES.map((s, idx) => {
            const isActive = idx === currentStageIndex;
            const isPassed = idx <= currentStageIndex;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setCurrentStageIndex(idx);
                  setIsPlaying(false);
                }}
                className={`p-2 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#7657FF]/15 border border-[#7657FF]/40"
                    : isPassed
                      ? "bg-[#05060A]/40 border border-transparent hover:border-[rgba(196,190,255,0.15)]"
                      : "opacity-40 border border-transparent"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[10px] text-text-muted">{s.step}</span>
                  {isPassed && (
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: s.color }}
                    />
                  )}
                </div>
                <div
                  className={`text-xs font-semibold ${isActive ? "text-[#F5F6FA]" : "text-text-muted"}`}
                >
                  {s.label}
                </div>
              </button>
            );
          })}
        </div>

        {/* Micro-telemetry description panel */}
        <div className="mt-3.5 px-3 py-2 rounded-lg bg-[#05060A]/60 border border-[rgba(196,190,255,0.08)] flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-[11px] text-text-muted truncate">
            <Activity className="w-3.5 h-3.5 text-[#78E7FF] shrink-0" />
            <span className="truncate">{activeStage.desc}</span>
          </div>
          <span className="font-mono text-[10px] uppercase text-[#78E7FF] font-semibold shrink-0 ml-2">
            [ READY ]
          </span>
        </div>
      </div>
    </div>
  );
}
