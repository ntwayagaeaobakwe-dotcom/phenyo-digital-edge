import { useState, useEffect, useRef } from "react";
import { Clock, ArrowUpRight, Menu, X } from "lucide-react";
import { NygLogo } from "./NygLogo";

export const AVAILABILITY_STATUS = "Available for selected projects";

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

export function HeaderNav() {
  const [dubaiTime, setDubaiTime] = useState<string>("--:--");
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);

  // Time & Scroll Listener
  useEffect(() => {
    setDubaiTime(formatDubaiTime());
    const interval = setInterval(() => {
      setDubaiTime(formatDubaiTime());
    }, 10000);

    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Track active section for indicator
      const sections = ["hero", "systems", "diagnostic", "projects", "studio", "roi", "contact"];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
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
    { name: "ROI Calculator", href: "#roi", id: "roi" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full pt-3 sm:pt-4 px-4 sm:px-6 transition-all duration-300 pointer-events-none">
        <div className="max-w-[1400px] mx-auto pointer-events-auto">
          <nav
            aria-label="Main Navigation"
            className={`px-4 sm:px-5 py-2.5 rounded-2xl flex items-center justify-between transition-all duration-300 ${
              isScrolled
                ? "bg-[#100C1D]/90 backdrop-blur-xl border border-[rgba(196,190,255,0.16)] shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
                : "bg-transparent border border-transparent"
            }`}
          >
            {/* LEFT: NYG Logo & Identity */}
            <div className="flex items-center gap-8">
              <a
                href="#"
                className="group flex items-center gap-3 focus-ring rounded-xl py-1 pr-2"
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
                      className={`relative px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 focus-ring ${
                        isActive
                          ? "text-[#F5F6FA] font-semibold"
                          : "text-text-muted hover:text-[#F5F6FA] hover:bg-white/[0.04]"
                      }`}
                    >
                      {link.name}
                      {isActive && (
                        <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-[#7657FF] to-[#78E7FF]" />
                      )}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* RIGHT: Availability, Dubai Clock & CTA */}
            <div className="hidden lg:flex items-center gap-5">
              {/* Availability Indicator */}
              <div className="flex items-center gap-2 text-xs text-text-muted">
                <span className="h-2 w-2 rounded-full bg-[#78E7FF] animate-pulse" />
                <span>{AVAILABILITY_STATUS}</span>
              </div>

              {/* Dubai Clock */}
              <div className="flex items-center gap-1.5 font-mono text-xs text-text-muted border-l border-[rgba(196,190,255,0.12)] pl-4">
                <Clock className="w-3.5 h-3.5 text-[#9D9AAF]" />
                <span className="text-[#F5F6FA]">{dubaiTime}</span>
                <span className="text-text-muted text-[11px]">DXB</span>
              </div>

              {/* Primary CTA */}
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 bg-[#7657FF] hover:bg-[#8A6EFF] text-white text-xs font-semibold px-4.5 py-2.5 rounded-xl transition-all duration-200 shadow-[0_4px_20px_rgba(118,87,255,0.35)] active:scale-[0.97] focus-ring"
              >
                <span>Audit Workflow</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* Mobile / Tablet Toggle CTA */}
            <div className="flex lg:hidden items-center gap-3">
              <a
                href="#contact"
                className="hidden sm:inline-flex items-center gap-1.5 bg-[#7657FF] text-white text-xs font-semibold px-3.5 py-2 rounded-xl focus-ring"
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
                className="p-2 rounded-xl bg-[#100C1D] border border-[rgba(196,190,255,0.18)] text-[#F5F6FA] focus-ring active:scale-95"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav"
          className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end bg-black/70 backdrop-blur-md animate-in fade-in-50 duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative z-10 m-4 p-6 rounded-2xl bg-[#100C1D] border border-[rgba(196,190,255,0.2)] shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-[rgba(196,190,255,0.12)] pb-4">
              <NygLogo showWordmark={true} />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg bg-white/5 text-text-muted hover:text-white"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-lg font-medium text-text-primary hover:bg-[#7657FF]/15 hover:text-[#78E7FF] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-2 border-t border-[rgba(196,190,255,0.12)] flex flex-col gap-4">
              <div className="flex items-center justify-between text-xs text-text-muted">
                <span>{AVAILABILITY_STATUS}</span>
                <span className="font-mono text-[#F5F6FA]">{dubaiTime} DXB</span>
              </div>

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#7657FF] text-white font-semibold py-3.5 rounded-xl shadow-lg"
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
