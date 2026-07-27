import { useState } from "react";
import { Workflow, Rocket, Target, Terminal, CheckCircle2 } from "lucide-react";
import { DEMO_TERMINAL_TABS } from "@/data/portfolio-data";

export function BusinessSystemsDemo() {
  const [activeTab, setActiveTab] = useState(DEMO_TERMINAL_TABS[0].id);

  const activeTabData = DEMO_TERMINAL_TABS.find((t) => t.id === activeTab) || DEMO_TERMINAL_TABS[0];

  return (
    <div className="relative glass rounded-3xl p-5 border border-primary/20 shadow-[var(--shadow-elegant)] overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-border/60 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500/80" aria-hidden="true" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/80" aria-hidden="true" />
          <div className="h-3 w-3 rounded-full bg-green-500/80" aria-hidden="true" />
          <span className="ml-2 text-xs font-mono text-muted-foreground flex items-center gap-1.5">
            <Terminal className="h-3.5 w-3.5 text-primary" aria-hidden="true" /> systems.preview
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
          <span className="text-[11px] font-mono text-primary font-medium">AUTOMATION READY</span>
        </div>
      </div>

      {/* Interactive Tabs */}
      <div className="grid grid-cols-3 gap-1.5 p-1 bg-black/40 rounded-xl mb-4 text-xs font-sans" role="tablist" aria-label="Business Solution Previews">
        {DEMO_TERMINAL_TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`demo-panel-${tab.id}`}
            id={`demo-tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`py-2 px-2 rounded-lg font-medium transition-all text-center truncate cursor-pointer ${
              activeTab === tab.id
                ? "bg-primary text-primary-foreground font-bold shadow-md"
                : "text-muted-foreground hover:text-foreground hover:bg-white/5"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Tab Panel Output */}
      <div
        id={`demo-panel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`demo-tab-${activeTab}`}
        className="space-y-3 text-xs animate-in fade-in duration-200"
      >
        {activeTabData.items.map((item) => (
          <div key={item.label} className="glass rounded-xl p-3 border border-border/50 flex flex-col gap-1">
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-mono">{item.label}</div>
            <div className="text-foreground font-medium text-sm flex items-center justify-between">
              <span>{item.value}</span>
              {activeTab === "tasks" && item.label === "Automated solution" && (
                <Workflow className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
              )}
              {activeTab === "websites" && item.label === "Automated solution" && (
                <Rocket className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
              )}
              {activeTab === "leads" && item.label === "Automated solution" && (
                <Target className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Demo Footer */}
      <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
        <span className="flex items-center gap-1">
          <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Outcome Focused
        </span>
        <span className="text-primary font-sans">n8n · Web Design · APIs</span>
      </div>
    </div>
  );
}
