import { TICKER_ITEMS } from "@/data/portfolio-data";

export function TickerBar() {
  return (
    <div className="border-y border-border/60 py-5 overflow-hidden bg-black/30 backdrop-blur-sm">
      <div className="flex gap-10 whitespace-nowrap animate-ticker">
        {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, index) => (
          <span key={index} className="text-sm text-muted-foreground flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="font-display font-semibold uppercase tracking-widest text-xs">
              {item}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
