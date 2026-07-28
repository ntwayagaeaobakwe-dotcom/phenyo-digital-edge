import { PERSONAL_INFO, NAV_LINKS } from "@/data/portfolio-data";

export function FooterSection() {
  return (
    <footer className="border-t border-border/60 py-12 bg-black/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-3">
          <a
            href="#top"
            className="flex items-center gap-2 font-display font-bold text-foreground text-base group"
            aria-label="Back to top"
          >
            <span className="grid h-7 min-w-7 px-1.5 place-items-center rounded-md bg-primary text-primary-foreground text-[10px] font-bold tracking-wider group-hover:scale-105 transition-transform">
              NYG
            </span>
            {PERSONAL_INFO.name}
            <span className="text-primary">.</span>
          </a>
          <span className="text-border">|</span>
          <span className="text-xs font-mono">{PERSONAL_INFO.title}</span>
        </div>

        <nav
          className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium"
          aria-label="Footer navigation"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="text-xs text-muted-foreground font-mono text-center md:text-right">
          © {new Date().getFullYear()} {PERSONAL_INFO.name}. Business Automation & Web Development.
        </div>
      </div>
    </footer>
  );
}
