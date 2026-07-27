import { useState } from "react";
import { TrendingUp, Cpu, Workflow, Terminal } from "lucide-react";
import { HERO_TERMINAL_TABS } from "@/data/portfolio-data";

export function MarketAutomationTerminal() {
  const [activeTab, setActiveTab] = useState(HERO_TERMINAL_TABS[0].id);

  const activeTabData = HERO_TERMINAL_TABS.find((t) => t.id === activeTab) || HERO_TERMINAL_TABS[0];

  return (
    <div className="relative glass rounded-3xl p-5 border border-primary/20 shadow-[var(--shadow-elegant)] overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-border/60 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500/80" aria-hidden="true" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/80" aria-hidden="true" />
          <div className="h-3 w-3 rounded-full bg-green-500/80" aria-hidden="true" />
          <span className="ml-2 text-xs font-mono text-muted-foreground flex items-center gap-1.5">
            <Terminal className="h-3.5 w-3.5 text-primary" aria-hidden="true" /> status.terminal
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
          <span className="text-[11px] font-mono text-primary font-medium">LIVE OPERATOR</span>
        </div>
      </div>

      {/* Interactive Tabs */}
      <div className="grid grid-cols-3 gap-1.5 p-1 bg-black/40 rounded-xl mb-4 text-xs font-mono" role="tablist" aria-label="Status Terminal Tabs">
        {HERO_TERMINAL_TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`terminal-panel-${tab.id}`}
            id={`terminal-tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className={`py-2 px-2.5 rounded-lg font-medium transition-all text-center truncate cursor-pointer ${
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
        id={`terminal-panel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`terminal-tab-${activeTab}`}
        className="space-y-3 font-mono text-xs animate-in fade-in duration-200"
      >
        {activeTabData.items.map((item) => (
          <div key={item.label} className="glass rounded-xl p-3 border border-border/50 flex flex-col gap-1">
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{item.label}</div>
            <div className="text-foreground font-medium text-sm flex items-center justify-between">
              <span>{item.value}</span>
              {activeTab === "xauusd" && item.label === "Market focus" && (
                <TrendingUp className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
              )}
              {activeTab === "workflow" && item.label === "Stack" && (
                <Cpu className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
              )}
              {activeTab === "content" && item.label === "Channels" && (
                <Workflow className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Terminal Footer */}
      <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
        <span>Execution mode: ACTIVE</span>
        <span className="text-primary">n8n · Claude · XAUUSD</span>
      </div>
    </div>
  );
}
