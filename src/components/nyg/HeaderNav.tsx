import { useState, useEffect, useRef } from "react";
import { Clock, ArrowUpRight, Menu, X } from "lucide-react";
import { NygLogo } from "./NygLogo";

export const AVAILABILITY_STATUS = "Available for selected projects";

function formatUaeTime(): string {
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

export function HeaderNav() {
  const [uaeTime, setUaeTime] = useState<string>("--:--");
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);

  // Time & Scroll Listener
  useEffect(() => {
    setUaeTime(formatUaeTime());
    const interval = setInterval(() => {
      setUaeTime(formatUaeTime());
    }, 10000);

    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Track active section for indicator
      const sections = ["hero", "systems", "diagnostic", "projects", "studio", "process", "contact"];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 240 && rect.bottom >= 240) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "Systems", href: "#systems", id: "systems" },
    { name: "Diagnostic", href: "#diagnostic", id: "diagnostic" },
    { name: "Case Studies", href: "#projects", id: "projects" },
    { name: "Capabilities", href: "#studio", id: "studio" },
    { name: "Process", href: "#process", id: "process" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full pt-3 sm:pt-4 px-4 sm:px-6 transition-all duration-300 pointer-events-none">
        <div className="max-w-[1320px] mx-auto pointer-events-auto">
          <nav
            aria-label="Main Navigation"
            className={`px-4 sm:px-5 py-2.5 rounded-full flex items-center justify-between transition-all duration-300 ${
              isScrolled
                ? "bg-[#080A09]/92 backdrop-blur-md border border-[rgba(184,181,172,0.22)] shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                : "bg-transparent border border-transparent"
            }`}
          >
            {/* LEFT: NYG Logo & Identity */}
            <div className="flex items-center gap-8">
              <a
                href="#"
                className="group flex items-center gap-3 focus-ring rounded-full py-1 pr-2"
                aria-label="NYG Digital Home"
              >
                <NygLogo showWordmark={true} />
              </a>

              {/* Desktop Nav Links */}
              <div className="hidden md:flex items-center gap-1 lg:gap-2">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      className={`relative px-3 py-1.5 rounded-full text-xs font-medium tracking-normal transition-all duration-150 focus-ring ${
                        isActive
                          ? "text-[#F3F0E8] font-semibold"
                          : "text-[#B8B5AC] hover:text-[#F3F0E8] hover:bg-white/[0.04]"
                      }`}
                    >
                      {link.name}
                      {isActive && (
                        <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#5FD8CD]" />
                      )}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* RIGHT: Availability, UAE Clock & Pill CTA */}
            <div className="hidden lg:flex items-center gap-5">
              {/* Availability Indicator */}
              <div className="flex items-center gap-2 text-xs font-mono text-[#B8B5AC]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#5FD8CD] animate-pulse" />
                <span className="text-[11px] uppercase tracking-wider">{AVAILABILITY_STATUS}</span>
              </div>

              {/* UAE Clock */}
              <div className="flex items-center gap-1.5 font-mono text-xs text-[#B8B5AC] border-l border-[rgba(184,181,172,0.18)] pl-4">
                <Clock className="w-3.5 h-3.5 text-[#B8B5AC]" />
                <span className="text-[#F3F0E8] font-medium">{uaeTime}</span>
                <span className="text-[#B8B5AC] text-[10px]">UAE · GST</span>
              </div>

              {/* Primary Pill CTA */}
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 bg-[#F3F0E8] hover:bg-white text-[#080A09] text-xs font-semibold px-4.5 py-2 rounded-full transition-all duration-150 active:scale-[0.97] focus-ring"
              >
                <span>Audit Workflow</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* Mobile / Tablet Toggle CTA */}
            <div className="flex lg:hidden items-center gap-3">
              <a
                href="#contact"
                className="hidden sm:inline-flex items-center gap-1.5 bg-[#F3F0E8] text-[#080A09] text-xs font-semibold px-3.5 py-1.5 rounded-full focus-ring"
              >
                <span>Audit</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <button
                ref={toggleBtnRef}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                className="p-2 rounded-full bg-[#082D2D] border border-[rgba(184,181,172,0.25)] text-[#F3F0E8] focus-ring active:scale-95 cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav"
          className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end bg-black/75 backdrop-blur-md animate-in fade-in-50 duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative z-10 m-4 p-6 rounded-2xl bg-[#080A09] border border-[rgba(184,181,172,0.25)] shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[rgba(184,181,172,0.15)] pb-4">
              <NygLogo showWordmark={true} />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full bg-white/5 text-[#B8B5AC] hover:text-white"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-2 font-sans">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-base font-medium text-[#F3F0E8] hover:bg-[#082D2D] hover:text-[#5FD8CD] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-2 border-t border-[rgba(184,181,172,0.15)] flex flex-col gap-4">
              <div className="flex items-center justify-between text-xs text-[#B8B5AC] font-mono">
                <span className="text-[11px] uppercase tracking-wider">{AVAILABILITY_STATUS}</span>
                <span className="text-[#F3F0E8]">{uaeTime} UAE · GST</span>
              </div>

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#F3F0E8] text-[#080A09] font-semibold py-3.5 rounded-full shadow-md"
              >
                <span>Tell me what is slowing you down</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
