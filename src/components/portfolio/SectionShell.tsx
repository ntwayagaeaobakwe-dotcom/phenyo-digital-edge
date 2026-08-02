import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

interface SectionShellProps {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  hasDivider?: boolean;
}

// Avoids a "useLayoutEffect does nothing on the server" warning during SSR.
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function SectionShell({
  id,
  eyebrow,
  title,
  children,
  className = "",
  hasDivider = true,
}: SectionShellProps) {
  const sectionRef = useRef<HTMLElement>(null);
  // Default to visible so SSR output and no-JS clients always show full content.
  const [revealState, setRevealState] = useState<"visible" | "hidden">("visible");

  // Before first paint: if the section starts off-screen, hide it so the reveal
  // animation can play when it scrolls into view. Runs pre-paint to avoid a
  // visible-then-hidden flash on load.
  useIsomorphicLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Reduced motion safeguard: keep visible if user prefers reduced motion
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
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [revealState]);

  const revealClasses = revealState === "visible" ? "opacity-100" : "opacity-0";

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`scroll-target relative py-24 sm:py-32 ${hasDivider ? "border-t border-border/40" : ""} ${className} transition-opacity duration-[400ms] ease-out ${revealClasses}`}
    >
      {/* Subtle radial glow in background */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-80 w-[600px] rounded-full bg-primary/5 blur-3xl opacity-60" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 max-w-3xl">
          <div className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-primary font-semibold">
            <span className="h-px w-8 bg-gradient-to-r from-primary to-transparent" />
            <span>{eyebrow}</span>
          </div>
          <h2
            tabIndex={-1}
            className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-[-0.01em] outline-none"
          >
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}
