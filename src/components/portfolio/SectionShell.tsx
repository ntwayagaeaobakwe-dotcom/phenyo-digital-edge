import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

interface SectionShellProps {
  id: string;
  eyebrow: string;
  title?: React.ReactNode;
  declarativeTitle?: string;
  qualifierTitle?: string;
  children: React.ReactNode;
  className?: string;
  hasDivider?: boolean;
  themeVariant?: "paper" | "mineral" | "sand" | "teal" | "ink" | "dark" | "light" | "midnight" | "iris";
  iconGlyph?: string;
  maxWidthClass?: string;
}

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function SectionShell({
  id,
  eyebrow,
  title,
  declarativeTitle,
  qualifierTitle,
  children,
  className = "",
  hasDivider = true,
  themeVariant = "paper",
  iconGlyph = "01",
  maxWidthClass = "max-w-6xl",
}: SectionShellProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealState, setRevealState] = useState<"visible" | "hidden">("visible");

  useIsomorphicLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const rect = el.getBoundingClientRect();
    const alreadyInView = rect.top < window.innerHeight && rect.bottom > 0;
    if (!alreadyInView) setRevealState("hidden");
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || revealState !== "hidden") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealState("visible");
            observer.disconnect();
          }
        }
      },
      { threshold: 0.06 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [revealState]);

  const revealClasses =
    revealState === "visible"
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-6";

  // Dynamic Theme Variant Styles
  let themeClasses = "bg-[#F3F0E8] text-[#080A09] border-[rgba(8,45,45,0.12)] editorial-paper";
  let isDarkTheme = false;

  if (themeVariant === "teal" || themeVariant === "midnight") {
    themeClasses = "bg-[#082D2D] text-[#F3F0E8] border-[rgba(184,181,172,0.18)] editorial-teal";
    isDarkTheme = true;
  } else if (themeVariant === "ink" || themeVariant === "dark") {
    themeClasses = "bg-[#080A09] text-[#F3F0E8] border-[rgba(184,181,172,0.16)] editorial-ink";
    isDarkTheme = true;
  } else if (themeVariant === "mineral") {
    themeClasses = "bg-[#CEDDD9] text-[#080A09] border-[rgba(8,45,45,0.16)] editorial-mineral";
    isDarkTheme = false;
  } else if (themeVariant === "sand" || themeVariant === "iris") {
    themeClasses = "bg-[#E5D6C2] text-[#080A09] border-[rgba(8,45,45,0.16)] editorial-sand";
    isDarkTheme = false;
  } else if (themeVariant === "light" || themeVariant === "paper") {
    themeClasses = "bg-[#F3F0E8] text-[#080A09] border-[rgba(8,45,45,0.12)] editorial-paper";
    isDarkTheme = false;
  }

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`scroll-target relative py-20 sm:py-28 lg:py-32 ${
        hasDivider ? "border-t" : ""
      } ${themeClasses} ${className} transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] will-change-[opacity,transform] ${revealClasses}`}
    >
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mx-auto max-w-[760px] text-center mb-12 sm:mb-16">
          {/* Section Number Glyph */}
          <div className="inline-flex items-center justify-center font-mono text-xs mb-3 tracking-widest select-none">
            <span
              className={`px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider ${
                isDarkTheme
                  ? "bg-white/5 text-[#5FD8CD] border border-[rgba(184,181,172,0.2)]"
                  : "bg-black/5 text-[#082D2D] border border-[rgba(8,45,45,0.16)]"
              }`}
            >
              [ {iconGlyph} ]
            </span>
          </div>

          {/* Eyebrow */}
          <div
            className={`block font-mono text-[11px] uppercase tracking-widest mb-3 font-semibold ${
              isDarkTheme ? "text-[#B8B5AC]" : "text-[#5C5953]"
            }`}
          >
            {eyebrow}
          </div>

          {/* Headline: Monumental Serif Statement + Manrope Qualifier */}
          <h2
            tabIndex={-1}
            className={`outline-none leading-[1.08] tracking-tight ${
              isDarkTheme ? "text-[#F3F0E8]" : "text-[#080A09]"
            }`}
          >
            {declarativeTitle ? (
              <>
                <span className="font-serif font-normal text-3xl sm:text-4xl lg:text-[46px] block mb-1">
                  {declarativeTitle}
                </span>
                {qualifierTitle && (
                  <span
                    className={`font-sans font-normal text-base sm:text-lg lg:text-xl block ${
                      isDarkTheme ? "text-[#B8B5AC]" : "text-[#282B29]"
                    }`}
                  >
                    {qualifierTitle}
                  </span>
                )}
              </>
            ) : (
              title
            )}
          </h2>
        </div>

        {/* Content Body */}
        <div className={`mx-auto ${maxWidthClass}`}>{children}</div>
      </div>
    </section>
  );
}

