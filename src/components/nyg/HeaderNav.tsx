import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { Clock, ArrowRight, Menu, X } from "lucide-react";

export const AVAILABILITY_STATUS = "Taking on projects for Q4 2026";

function formatDubaiTime(): string {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Dubai",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date());
  } catch {
    return "--:--";
  }
}

// Hook to check reduced motion preference SSR-safely
function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      if (typeof window === "undefined") return () => {};
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => (typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false),
    () => false
  );
}

export function HeaderNav() {
  const [dubaiTime, setDubaiTime] = useState<string>("--:--");
  const [isMounted, setIsMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const mobileSheetRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  // SSR-safe Dubai clock update loop
  useEffect(() => {
    setIsMounted(true);
    setDubaiTime(formatDubaiTime());

    const interval = setInterval(() => {
      setDubaiTime(formatDubaiTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Handle Escape key and body scroll lock for mobile drawer
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        toggleBtnRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Work", href: "#work" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header className="relative z-20 w-full pt-4 sm:pt-6 px-3 sm:px-6">
        <div className="max-w-[1440px] mx-auto">
          <nav
            aria-label="Main navigation"
            className="p-[5px] rounded-full bg-[--color-surface-nav] backdrop-blur-md border border-[--color-border-subtle] flex items-center justify-between transition-all duration-300"
          >
            {/* LEFT: Mark & Links */}
            <div className="flex items-center gap-6 pl-1">
              <a
                href="#"
                className="flex items-center gap-3 group focus-ring rounded-full"
                aria-label="NYG Digital Home"
              >
                <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[--color-accent] flex items-center justify-center text-surface-base font-bold text-[9px] sm:text-[10px] tracking-tight shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-105">
                  NYG
                </span>
                <span className="font-mono text-xs tracking-wider text-text-primary uppercase hidden sm:inline-block">
                  nyg digital
                </span>
              </a>

              <div className="hidden md:flex items-center gap-6 pl-2" role="menubar">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    role="menuitem"
                    className="text-sm text-text-muted hover:text-text-primary transition-colors duration-300 focus-ring rounded-md px-1 py-0.5"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* RIGHT: Availability, Clock & Audit CTA */}
            <div className="hidden md:flex items-center gap-4 sm:gap-6 pr-1">
              <span className="text-[13px] text-text-muted hidden lg:inline-block">
                {AVAILABILITY_STATUS}
              </span>

              {/* Live Dubai Clock */}
              <div
                className="flex items-center gap-1.5 text-[13px] text-text-muted min-w-[95px]"
                aria-label="Current time in Dubai"
              >
                <Clock className="w-3.5 h-3.5 text-text-muted shrink-0" aria-hidden="true" />
                <span className="font-mono text-xs">{isMounted ? dubaiTime : "--:--"}</span>
                <span className="text-text-subtle font-sans">in Dubai</span>
              </div>

              {/* CTA Button with Text Roll */}
              <a
                href="#contact"
                className="group relative inline-flex items-center gap-3 bg-[--color-accent] hover:bg-[--color-accent-hover] text-surface-base text-[13px] font-medium rounded-full pl-5 pr-2 py-2 transition-colors duration-300 focus-ring"
              >
                <div className="overflow-hidden h-[20px] relative">
                  <div
                    className={`flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                      prefersReducedMotion ? "" : "group-hover:-translate-y-1/2"
                    }`}
                  >
                    <span className="h-[20px] flex items-center font-semibold text-surface-base">
                      Book a systems audit
                    </span>
                    <span className="h-[20px] flex items-center font-semibold text-surface-base" aria-hidden="true">
                      Book a systems audit
                    </span>
                  </div>
                </div>
                <span className="w-6 h-6 rounded-full bg-surface-glass flex items-center justify-center shrink-0">
                  <ArrowRight
                    className={`w-3.5 h-3.5 text-surface-base transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                      prefersReducedMotion ? "" : "group-hover:-rotate-45"
                    }`}
                    aria-hidden="true"
                  />
                </span>
              </a>
            </div>

            {/* MOBILE MENU TOGGLE */}
            <button
              ref={toggleBtnRef}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-[--color-accent] text-surface-base focus-ring transition-transform duration-300 active:scale-95 mr-1"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </nav>
        </div>
      </header>

      {/* MOBILE NAVIGATION DRAWER OVERLAY */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden flex flex-col justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => {
              setMobileMenuOpen(false);
              toggleBtnRef.current?.focus();
            }}
            aria-hidden="true"
          />

          {/* Bottom Sheet Modal */}
          <div
            ref={mobileSheetRef}
            id="mobile-navigation-drawer"
            className={`relative z-10 mx-3 mb-3 p-6 sm:p-8 rounded-2xl bg-surface-raised border border-[--color-border-subtle] shadow-2xl flex flex-col gap-6 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              prefersReducedMotion ? "translate-y-0" : "animate-in slide-in-from-bottom duration-500"
            }`}
          >
            {/* Close Bar & Dubai Time */}
            <div className="flex items-center justify-between pb-4 border-b border-[--color-border-subtle]">
              <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
                <Clock className="w-3.5 h-3.5 text-text-muted" />
                <span>{isMounted ? dubaiTime : "--:--"} in Dubai</span>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  toggleBtnRef.current?.focus();
                }}
                className="w-8 h-8 rounded-full bg-surface-glass flex items-center justify-center text-text-primary focus-ring"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <nav className="flex flex-col gap-4 my-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[28px] sm:text-[32px] font-medium text-text-primary hover:text-[--color-accent] transition-colors focus-ring rounded-lg py-1"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Mobile Audit CTA Button */}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 w-full flex items-center justify-between bg-[--color-accent] text-surface-base text-base font-semibold rounded-full px-6 py-3.5 focus-ring transition-transform active:scale-[0.99]"
            >
              <span>Book a systems audit</span>
              <span className="w-7 h-7 rounded-full bg-surface-glass flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-surface-base" />
              </span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
