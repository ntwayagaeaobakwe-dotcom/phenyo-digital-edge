import { useEffect, useRef, type ReactNode } from "react";
interface SectionShellProps {
  id: string;
  eyebrow: string;
  title?: ReactNode;
  declarativeTitle?: string;
  qualifierTitle?: string;
  children: ReactNode;
  className?: string;
  hasDivider?: boolean;
  themeVariant?:
    | "paper"
    | "mineral"
    | "sand"
    | "teal"
    | "ink"
    | "dark"
    | "light"
    | "midnight"
    | "iris";
  iconGlyph?: string;
  maxWidthClass?: string;
}
export function SectionShell({
  id,
  title,
  declarativeTitle,
  qualifierTitle,
  children,
  className = "",
}: SectionShellProps) {
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          el.classList.add("section-entered");
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <section ref={sectionRef} id={id} className={`studio-section ${className}`}>
      <div className="page-width">
        <div className="section-heading">
          <h2 tabIndex={-1}>{declarativeTitle || title}</h2>
          {qualifierTitle && <p>{qualifierTitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
