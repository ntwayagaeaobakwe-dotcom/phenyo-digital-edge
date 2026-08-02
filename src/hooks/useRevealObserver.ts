import { useEffect, useRef } from "react";

let sharedObserver: IntersectionObserver | null = null;
const observedElements = new Map<Element, number>();

function getSharedObserver(): IntersectionObserver | null {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) return null;

  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = observedElements.get(el) ?? 0;

            if (prefersReducedMotion) {
              el.style.opacity = "1";
              el.style.transform = "none";
              el.style.willChange = "auto";
            } else {
              el.style.transitionDelay = `${delay}ms`;
              el.classList.add("is-visible");

              const handleTransitionEnd = () => {
                el.style.willChange = "auto";
                el.removeEventListener("transitionend", handleTransitionEnd);
              };
              el.addEventListener("transitionend", handleTransitionEnd);
            }

            sharedObserver?.unobserve(el);
            observedElements.delete(el);
          }
        });
      },
      { threshold: 0.15 },
    );
  }

  return sharedObserver;
}

/**
 * Hook to observe an individual element for reveal on scroll with custom delay.
 */
export function useRevealRef<T extends HTMLElement = HTMLDivElement>(delayMs: number = 0) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      el.style.opacity = "1";
      el.style.transform = "none";
      el.style.willChange = "auto";
      return;
    }

    const observer = getSharedObserver();
    if (observer) {
      observedElements.set(el, delayMs);
      observer.observe(el);
    } else {
      // Fallback if IntersectionObserver is unsupported
      el.style.opacity = "1";
      el.style.transform = "none";
    }

    return () => {
      if (observer && el) {
        observer.unobserve(el);
        observedElements.delete(el);
      }
    };
  }, [delayMs]);

  return ref;
}
