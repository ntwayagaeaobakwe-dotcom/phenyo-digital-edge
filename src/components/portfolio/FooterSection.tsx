import { PERSONAL_INFO, NAV_LINKS } from "@/data/portfolio-data";

export function FooterSection() {
  return (
    <footer className="border-t border-border/30 py-12 bg-slate-950/60 font-mono text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-muted-foreground/70">
        <div className="flex items-center gap-3">
          <a
            href="#top"
            className="flex items-center gap-2 font-sans font-semibold text-foreground text-sm group"
            aria-label="Back to top"
          >
            <span className="grid h-6 min-w-6 px-1.5 place-items-center rounded-full bg-primary text-primary-foreground font-mono text-[10px] font-bold">
              NYG
            </span>
            <span className="font-mono text-xs uppercase tracking-widest">
              {PERSONAL_INFO.name}<span className="text-primary">.</span>
            </span>
          </a>
          <span className="text-border/50">|</span>
          <span className="uppercase tracking-widest text-[11px] text-muted-foreground/50">
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
              className="hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="uppercase tracking-widest text-[10px] text-muted-foreground/50 text-center md:text-right">
          © {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
