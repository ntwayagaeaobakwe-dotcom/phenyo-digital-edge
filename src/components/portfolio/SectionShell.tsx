import React from "react";

interface SectionShellProps {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function SectionShell({
  id,
  eyebrow,
  title,
  children,
  className = "",
}: SectionShellProps) {
  return (
    <section id={id} className={`py-24 sm:py-32 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary">
            <span className="h-px w-8 bg-primary" /> {eyebrow}
          </div>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05]">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}
