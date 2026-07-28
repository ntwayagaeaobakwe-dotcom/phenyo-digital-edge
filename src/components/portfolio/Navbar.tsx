import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { NAV_LINKS, PERSONAL_INFO } from "@/data/portfolio-data";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // 1. Fix TypeScript error in cleanup function
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 2. Mobile menu keyboard accessibility (Escape key, focus trap, return focus)
  useEffect(() => {
    if (!mobileMenuOpen) return;

    // Focus first focusable item inside dropdown on open
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
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300 py-3.5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 sm:px-6 py-3 transition-all duration-300 ${
            scrolled
              ? "glass shadow-[var(--shadow-elegant)] border border-primary/20"
              : "bg-black/20 backdrop-blur-md border border-white/5"
          }`}
        >
          <a
            href="#top"
            className="flex items-center gap-2.5 font-display font-bold text-lg group"
            aria-label="Phenyo Home"
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground font-bold group-hover:scale-105 transition-transform">
              {PERSONAL_INFO.name.charAt(0)}
            </span>
            <span className="tracking-tight">
              {PERSONAL_INFO.name}
              <span className="text-primary">.</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-7 text-sm font-medium text-muted-foreground"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-foreground transition-colors font-sans hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4.5 py-2 text-sm font-medium text-primary-foreground hover:opacity-95 transition-all shadow-[var(--shadow-gold)] font-display"
            >
              Tell Me What You Need <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            ref={menuButtonRef}
            onClick={() => {
              if (mobileMenuOpen) {
                closeMobileMenu();
              } else {
                setMobileMenuOpen(true);
              }
            }}
            className="md:hidden grid h-9 w-9 place-items-center rounded-xl glass text-foreground border border-border/60 cursor-pointer"
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
            className="md:hidden mt-2 glass rounded-2xl p-5 border border-primary/30 shadow-2xl animate-in fade-in slide-in-from-top-3"
          >
            <nav
              className="flex flex-col gap-3.5 text-base font-medium"
              aria-label="Mobile navigation"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="text-muted-foreground hover:text-foreground transition-colors py-1 flex items-center justify-between border-b border-border/40 pb-2"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="h-4 w-4 text-primary" />
                </a>
              ))}
              <a
                href="#contact"
                onClick={closeMobileMenu}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground font-display shadow-[var(--shadow-gold)]"
              >
                Tell Me What You Need <ArrowUpRight className="h-4 w-4" />
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
