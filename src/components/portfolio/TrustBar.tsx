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
    <div className="border-y border-border-subtle py-8 bg-surface-raised/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-6 sm:gap-10">
          {TRUST_SIGNALS.map((item) => {
            const Icon = iconMap[item.iconName] ?? Clock;
            return (
              <div
                key={item.label}
                className="flex items-center gap-3 text-text-muted hover:text-text-primary transition-colors"
              >
                <Icon className="h-4 w-4 shrink-0 text-action-primary" aria-hidden="true" />
                <span className="font-mono text-xs uppercase tracking-wider font-medium">
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
