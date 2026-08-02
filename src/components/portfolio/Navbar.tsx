import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { NAV_LINKS, PERSONAL_INFO } from "@/data/portfolio-data";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#top");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    const setupTimer = window.setTimeout(() => {
      const targets = NAV_LINKS.map((link) => document.querySelector(link.href)).filter(
        (element): element is Element => Boolean(element),
      );
      if (targets.length === 0) return;

      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          if (visible?.target.id) setActiveSection(`#${visible.target.id}`);
        },
        { rootMargin: "-22% 0px -62% 0px", threshold: [0, 0.15, 0.5] },
      );

      targets.forEach((target) => observer?.observe(target));
    }, 400);

    return () => {
      window.clearTimeout(setupTimer);
      observer?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const focusable = mobileMenuRef.current?.querySelectorAll<HTMLElement>("a, button");
    if (focusable && focusable.length > 0) {
      focusable[0].focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (e.key === "Tab" && mobileMenuRef.current) {
        const items = Array.from(mobileMenuRef.current.querySelectorAll<HTMLElement>("a, button"));
        if (menuButtonRef.current) items.unshift(menuButtonRef.current);
        if (items.length === 0) return;

        const first = items[0];
        const last = items[items.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300 py-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div
          className={`flex items-center justify-between rounded-full px-5 py-2.5 transition-all duration-300 border ${
            scrolled
              ? "border-border-default bg-surface-base/90 backdrop-blur-xl shadow-lg"
              : "border-border-subtle bg-surface-base/50 backdrop-blur-md"
          }`}
        >
          <a
            href="#top"
            className="flex items-center gap-2.5 font-sans font-semibold text-sm group active:scale-95 transition-transform focus-ring rounded-full px-1.5 py-1"
            aria-label="NYG Digital Home"
          >
            <span className="grid h-7 min-w-7 px-2 place-items-center rounded-full bg-action-primary text-action-primary-foreground font-mono font-bold text-xs">
              NYG
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-text-primary">
              {PERSONAL_INFO.name}<span className="text-action-primary">.</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-7 font-mono text-xs uppercase tracking-widest"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={activeSection === link.href ? "location" : undefined}
                className={`py-2 px-1 transition-colors hover:text-text-primary focus-ring rounded-xs ${
                  activeSection === link.href ? "text-action-primary font-semibold" : "text-text-muted"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 rounded-full bg-action-primary px-5 py-2.5 min-h-[44px] font-mono text-xs uppercase tracking-widest font-semibold text-action-primary-foreground hover:bg-action-primary-hover active:scale-[0.97] transition-all focus-ring"
            >
              <span>Review Process</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            ref={menuButtonRef}
            onClick={() => {
              if (mobileMenuOpen) {
                closeMobileMenu();
              } else {
                setMobileMenuOpen(true);
              }
            }}
            className="md:hidden grid h-11 w-11 place-items-center rounded-full border border-border-default text-text-primary active:scale-95 transition-transform focus-ring cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="md:hidden mt-2 rounded-2xl border border-border-default bg-surface-base/95 p-5 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-3 duration-200"
          >
            <nav
              className="flex flex-col gap-2 font-mono text-xs uppercase tracking-widest"
              aria-label="Mobile navigation"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="text-text-muted hover:text-text-primary transition-colors py-3 min-h-[44px] flex items-center justify-between border-b border-border-subtle focus-ring rounded-xs"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="h-4 w-4 text-action-primary" />
                </a>
              ))}
              <a
                href="#contact"
                onClick={closeMobileMenu}
                className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-action-primary px-5 py-3.5 min-h-[44px] font-mono text-xs uppercase tracking-widest font-semibold text-action-primary-foreground active:scale-[0.97] transition-all focus-ring"
              >
                <span>Process Review</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
