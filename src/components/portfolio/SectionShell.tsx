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
  isPale?: boolean;
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
  isPale = false,
  iconGlyph = "+",
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
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [revealState]);

  const revealClasses =
    revealState === "visible"
      ? "opacity-100 translate-y-0 scale-100"
      : "opacity-0 translate-y-6 scale-[0.985]";

  const bgClasses = isPale
    ? "bg-[#edf2f7] text-slate-900 border-slate-300/60"
    : "text-foreground border-border/30";

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`scroll-target relative py-24 sm:py-36 ${
        hasDivider ? "border-t" : ""
      } ${bgClasses} ${className} transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,transform] ${revealClasses}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Anatomy: Centered narrow heading block (max ~600px) */}
        <div className="mx-auto max-w-[620px] text-center mb-16 sm:mb-20">
          {/* (a) Small technical glyph or icon */}
          <div className="inline-flex items-center justify-center font-mono text-xs text-muted-foreground/50 mb-3 select-none">
            <span>[ {iconGlyph} ]</span>
          </div>

          {/* Eyebrow Label */}
          <div className="block font-mono text-[11px] uppercase tracking-widest text-muted-foreground/70 mb-3">
            {eyebrow}
          </div>

          {/* Two-tone Heading: declarative clause (full opacity) + qualifying clause (muted gray), same line */}
          <h2
            tabIndex={-1}
            className="font-sans text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.12] outline-none"
          >
            {declarativeTitle ? (
              <>
                <span className={isPale ? "text-slate-950" : "text-foreground"}>
                  {declarativeTitle}
                </span>{" "}
                {qualifierTitle && (
                  <span className={isPale ? "text-slate-500 font-normal" : "text-muted-foreground/60 font-normal"}>
                    {qualifierTitle}
                  </span>
                )}
              </>
            ) : (
              title
            )}
          </h2>
        </div>

        {/* (d) Wide or asymmetric visual panel container below */}
        <div className={`mx-auto ${maxWidthClass}`}>{children}</div>
      </div>
    </section>
  );
}
