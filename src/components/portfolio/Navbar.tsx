import { useState, useEffect, useRef } from "react";
import { Hexagon, Menu, X } from "lucide-react";
import { PROJECTS } from "@/data/portfolio-data";
import { useRevealRef } from "@/hooks/useRevealObserver";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const wordmarkRef = useRevealRef<HTMLAnchorElement>(0);
  const workLinkRef = useRevealRef<HTMLAnchorElement>(100);
  const servicesLinkRef = useRevealRef<HTMLAnchorElement>(200);
  const aboutLinkRef = useRevealRef<HTMLAnchorElement>(300);
  const contactLinkRef = useRevealRef<HTMLAnchorElement>(400);
  const ctaRef = useRevealRef<HTMLAnchorElement>(500);

  const projectCount = PROJECTS.length;

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
    <header className="fixed top-0 inset-x-0 z-50 w-full border-b border-border-glass bg-surface-glass backdrop-blur-md transition-colors duration-300">
      <div className="w-full px-5 sm:px-8 md:px-12 py-4">
        <div className="flex items-center justify-between">
          {/* Wordmark (Left) */}
          <a
            ref={wordmarkRef}
            href="#top"
            className="reveal-item flex items-center gap-2.5 group focus-ring rounded-lg py-1 px-1 -ml-1"
            aria-label="nyg digital home"
          >
            <Hexagon className="h-6 w-6 text-accent shrink-0" strokeWidth={1.5} />
            <span className="font-medium text-lg sm:text-xl text-text-primary tracking-tight">
              <span className="tracking-tighter">nyg</span> digital
            </span>
          </a>

          {/* Center Links (md+) */}
          <nav
            className="hidden md:flex items-center gap-8 lg:gap-10 text-sm font-normal"
            aria-label="Main navigation"
          >
            <a
              ref={workLinkRef}
              href="#projects"
              className="reveal-item text-text-muted hover:text-text-primary transition-colors focus-ring rounded-xs py-1"
            >
              Work
              <sup className="font-mono text-[10px] text-text-subtle ml-1">{projectCount}</sup>
            </a>
            <a
              ref={servicesLinkRef}
              href="#services"
              className="reveal-item text-text-muted hover:text-text-primary transition-colors focus-ring rounded-xs py-1"
            >
              Services
            </a>
            <a
              ref={aboutLinkRef}
              href="#about"
              className="reveal-item text-text-muted hover:text-text-primary transition-colors focus-ring rounded-xs py-1"
            >
              About
            </a>
            <a
              ref={contactLinkRef}
              href="#contact"
              className="reveal-item text-text-muted hover:text-text-primary transition-colors focus-ring rounded-xs py-1"
            >
              Contact
            </a>
          </nav>

          {/* CTA Right (Desktop & Mobile trigger) */}
          <div className="flex items-center gap-3">
            <a
              ref={ctaRef}
              href="#contact"
              className="reveal-item hidden sm:inline-flex items-center justify-center rounded-md bg-surface-glass border border-border-glass px-4 py-2 text-xs sm:px-5 sm:text-sm font-medium text-text-primary hover:bg-surface-glass-strong transition-colors focus-ring"
            >
              Book a call
            </a>

            {/* Mobile Toggle Button */}
            <button
              ref={menuButtonRef}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden grid h-10 w-10 place-items-center rounded-md border border-border-glass bg-surface-glass text-text-primary active:scale-95 transition-all focus-ring cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="md:hidden mt-3 rounded-xl border border-border-glass bg-surface-base/95 p-5 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <nav className="flex flex-col gap-3 text-sm" aria-label="Mobile navigation">
              <a
                href="#projects"
                onClick={closeMobileMenu}
                className="text-text-muted hover:text-text-primary transition-colors py-2 flex items-center justify-between border-b border-border-glass focus-ring rounded-xs"
              >
                <span>Work</span>
                <span className="font-mono text-xs text-text-subtle">{projectCount}</span>
              </a>
              <a
                href="#services"
                onClick={closeMobileMenu}
                className="text-text-muted hover:text-text-primary transition-colors py-2 border-b border-border-glass focus-ring rounded-xs"
              >
                Services
              </a>
              <a
                href="#about"
                onClick={closeMobileMenu}
                className="text-text-muted hover:text-text-primary transition-colors py-2 border-b border-border-glass focus-ring rounded-xs"
              >
                About
              </a>
              <a
                href="#contact"
                onClick={closeMobileMenu}
                className="text-text-muted hover:text-text-primary transition-colors py-2 border-b border-border-glass focus-ring rounded-xs"
              >
                Contact
              </a>
              <a
                href="#contact"
                onClick={closeMobileMenu}
                className="mt-2 inline-flex items-center justify-center rounded-md bg-surface-glass border border-border-glass px-4 py-2.5 text-sm font-medium text-text-primary hover:bg-surface-glass-strong transition-colors focus-ring"
              >
                Book a call
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
