import { useState, useEffect, useRef } from "react";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import { HeaderNav } from "./HeaderNav";
import { ScrollScrubHeroMedia } from "./ScrollScrubHeroMedia";

export function HeroSection() {
  const heroWrapperRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [portraitError, setPortraitError] = useState<boolean>(false);
  const whatsappHref = `https://wa.me/${PERSONAL_INFO.phone.replace(/[^0-9]/g, "")}`;

  // Track scroll progress within the 200svh hero scroll stage
  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        rafId = null;
        const el = heroWrapperRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const totalScrollable = rect.height - window.innerHeight;

        if (totalScrollable <= 0) {
          setScrollProgress(0);
          return;
        }

        const currentScrolled = -rect.top;
        const progress = Math.min(Math.max(0, currentScrolled / totalScrollable), 1);
        setScrollProgress(progress);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Subtle choreography: text remains calm and fully visible from 0-85%, then very soft exit near 85-100%
  const textOpacity = scrollProgress > 0.85 ? Math.max(0.2, 1 - (scrollProgress - 0.85) * 5) : 1;
  const textTranslateY = scrollProgress > 0.85 ? (scrollProgress - 0.85) * -16 : 0;

  return (
    <div
      ref={heroWrapperRef}
      id="hero-stage"
      className="relative w-full h-[170svh] sm:h-[200svh]"
      aria-label="NYG Digital Interactive Hero"
    >
      {/* Sticky Hero Viewport */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col justify-between bg-[#080A09]">
        {/* Full-Bleed Cinematic Scroll-Scrubbed Canvas & Fallback Poster */}
        <ScrollScrubHeroMedia scrollProgress={scrollProgress} />

        {/* Top Header Navigation */}
        <HeaderNav />

        {/* Main Hero Content (Left-Aligned, Non-Obtrusive to the Luminous Ring on the Right) */}
        <div
          className="max-w-[1320px] mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-20 my-auto transition-transform duration-150 ease-out"
          style={{
            opacity: textOpacity,
            transform: `translateY(${textTranslateY}px)`,
          }}
        >
          <div className="max-w-2xl flex flex-col justify-center space-y-6">
            {/* Context Eyebrow Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#082D2D]/90 border border-[rgba(184,181,172,0.22)] backdrop-blur-md w-fit shadow-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#5FD8CD] animate-pulse" />
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#B8B5AC]">
                PRECISION AUTOMATION ATELIER // DUBAI
              </span>
            </div>

            {/* Monumental Newsreader Serif Headline */}
            <h1 className="font-serif font-normal text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.94] tracking-[-0.04em] text-[#F3F0E8] drop-shadow-xl">
              Systems that run.{" "}
              <span className="block font-serif italic font-normal text-[#F3F0E8]">
                Without you.
              </span>
            </h1>

            {/* Supporting Copy in Manrope */}
            <p className="text-base sm:text-lg text-[#F3F0E8]/90 leading-relaxed max-w-xl font-sans font-normal">
              NYG Digital designs business automation, workflow tools, and conversion-focused
              websites that turn scattered work into connected systems.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2.5 bg-[#F3F0E8] hover:bg-white text-[#080A09] font-semibold text-xs uppercase tracking-wider px-6 py-4 rounded-full transition-all duration-150 active:scale-[0.97] focus-ring text-center shadow-md cursor-pointer"
              >
                <span>Tell me what is slowing you down</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="#systems"
                className="inline-flex items-center justify-center gap-2 bg-[#082D2D]/80 hover:bg-[#123E3D] text-[#F3F0E8] border border-[rgba(184,181,172,0.25)] backdrop-blur-md font-medium text-xs uppercase tracking-wider px-5 py-4 rounded-full transition-all duration-150 active:scale-[0.97] focus-ring text-center cursor-pointer"
              >
                <span>See the system work</span>
                <ArrowDown className="w-4 h-4 text-[#5FD8CD]" />
              </a>
            </div>

            {/* Founder Direct Access Strip */}
            <div className="pt-3 border-t border-[rgba(184,181,172,0.18)] flex items-center justify-between gap-4 max-w-lg bg-[#082D2D]/60 p-3 rounded-2xl backdrop-blur-md border border-[rgba(184,181,172,0.16)]">
              <div className="flex items-center gap-3">
                {portraitError ? (
                  <div className="h-9 w-9 rounded-full bg-[#5FD8CD]/15 border border-[#5FD8CD]/30 flex items-center justify-center font-mono text-xs font-bold text-[#5FD8CD] shrink-0">
                    PN
                  </div>
                ) : (
                  <img
                    src="/phenyo.avif"
                    alt="Phenyo Ntwayagae"
                    onError={() => setPortraitError(true)}
                    className="h-9 w-9 rounded-full object-cover border border-[rgba(184,181,172,0.3)] shrink-0"
                  />
                )}
                <div className="flex flex-col text-xs leading-snug">
                  <span className="font-semibold text-[#F3F0E8] flex items-center gap-1.5">
                    Phenyo Ntwayagae
                    <span className="h-1.5 w-1.5 rounded-full bg-[#5FD8CD]" />
                  </span>
                  <span className="text-[#B8B5AC] font-mono text-[11px]">
                    Direct Architecture & Build
                  </span>
                </div>
              </div>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[#5FD8CD] hover:text-white px-3 py-1.5 rounded-full bg-[#5FD8CD]/10 border border-[#5FD8CD]/25 transition-colors shrink-0 focus-ring"
              >
                WhatsApp Direct
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Proof Rail */}
        <div className="max-w-[1320px] mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-20 pb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 border-t border-[rgba(184,181,172,0.18)] pt-3.5 text-xs font-mono text-[#B8B5AC] bg-[#080A09]/60 backdrop-blur-sm px-4 py-2.5 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="text-[#5FD8CD] font-bold">01/</span>
              <span className="text-[#F3F0E8] font-medium">Inquiry Ingestion</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#5FD8CD] font-bold">02/</span>
              <span className="text-[#F3F0E8] font-medium">Zero-Leak Lead Routing</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#5FD8CD] font-bold">03/</span>
              <span className="text-[#F3F0E8] font-medium">Dispatch & CRM Sync</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#5FD8CD] font-bold">04/</span>
              <span className="text-[#F3F0E8] font-medium">Automated Reporting</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
