import { PERSONAL_INFO, NAV_LINKS } from "@/data/portfolio-data";

export function FooterSection() {
  return (
    <footer className="border-t border-border-subtle py-12 bg-surface-base/80 font-mono text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-text-muted">
        <div className="flex items-center gap-3">
          <a
            href="#top"
            className="flex items-center gap-2 font-sans font-semibold text-text-primary text-sm group focus-ring rounded-full px-2 py-1 min-h-[44px]"
            aria-label="Back to top"
          >
            <span className="grid h-6 min-w-6 px-1.5 place-items-center rounded-full bg-action-primary text-action-primary-foreground font-mono text-[10px] font-bold">
              NYG
            </span>
            <span className="font-mono text-xs uppercase tracking-widest">
              {PERSONAL_INFO.name}
              <span className="text-action-primary">.</span>
            </span>
          </a>
          <span className="text-border-subtle">|</span>
          <span className="uppercase tracking-widest text-[11px] text-text-muted">
            {PERSONAL_INFO.title}
          </span>
        </div>

        <nav
          className="flex flex-wrap items-center justify-center gap-6 text-[11px] uppercase tracking-widest"
          aria-label="Footer navigation"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-2.5 min-h-[44px] flex items-center hover:text-text-primary transition-colors focus-ring rounded-xs"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="uppercase tracking-widest text-[10px] text-text-muted text-center md:text-right">
          © {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
