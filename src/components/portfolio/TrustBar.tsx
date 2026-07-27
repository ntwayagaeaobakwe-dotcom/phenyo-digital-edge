import { Clock, FileCheck, MessageSquare, Workflow } from "lucide-react";
import { TRUST_SIGNALS } from "@/data/portfolio-data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Clock,
  FileCheck,
  MessageSquare,
  Workflow,
};

export function TrustBar() {
  return (
    <div className="border-b border-border/40 py-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {TRUST_SIGNALS.map((item) => {
            const Icon = iconMap[item.iconName] ?? Clock;
            return (
              <div
                key={item.label}
                className="glass rounded-xl px-4 py-3 flex items-center gap-3 border border-border/60"
              >
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary shrink-0 border border-primary/20">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-foreground leading-tight">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
