/**
 * Section Navigation & Focus Helper
 *
 * Provides smooth anchor scrolling, hash history updates without duplicates,
 * and reliable focus management to semantic destination headings or form fields.
 */

export interface NavigateOptions {
  context?: string;
  focusInput?: boolean;
}

export function navigateToSection(targetId: string, options?: NavigateOptions): void {
  const cleanId = targetId.replace(/^#/, "");

  // 1. Store industry context if provided
  if (options?.context) {
    try {
      sessionStorage.setItem("pendingIndustryContext", options.context);
      window.dispatchEvent(new CustomEvent("industryContextSet"));
    } catch {
      // Ignore storage restrictions
    }
  }

  const targetEl = document.getElementById(cleanId);
  const targetHash = `#${cleanId}`;

  // 2. Update hash only when destination hash differs from current hash
  if (typeof window !== "undefined" && window.location.hash !== targetHash) {
    window.history.pushState(null, "", targetHash);
  }

  if (!targetEl) return;

  // 3. Perform smooth scroll
  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  targetEl.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
  });

  // 4. Wait for scroll to settle with a reliable fallback timeout before moving focus
  let focusMoved = false;

  const performFocus = () => {
    if (focusMoved) return;
    focusMoved = true;

    if (cleanId === "contact" && (options?.focusInput ?? true)) {
      const inputEl = document.getElementById("form-name") || targetEl;
      inputEl.focus({ preventScroll: true });
    } else {
      const heading = targetEl.querySelector<HTMLElement>("h1, h2, h3") || targetEl;
      if (!heading.hasAttribute("tabIndex")) {
        heading.setAttribute("tabIndex", "-1");
      }
      heading.focus({ preventScroll: true });
    }
  };

  if (prefersReducedMotion) {
    performFocus();
    return;
  }

  // Reliable scroll completion detection with fallback timeout
  let scrollTimeout: ReturnType<typeof setTimeout>;

  const onScroll = () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(fallbackTimeout);
      performFocus();
    }, 100);
  };

  window.addEventListener("scroll", onScroll, { passive: true });

  // Reliable fallback timeout (max 800ms) so focus management never waits forever
  const fallbackTimeout = setTimeout(() => {
    window.removeEventListener("scroll", onScroll);
    clearTimeout(scrollTimeout);
    performFocus();
  }, 800);
}
