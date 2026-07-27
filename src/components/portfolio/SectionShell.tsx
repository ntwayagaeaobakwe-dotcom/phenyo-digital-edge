import React from "react";

interface SectionShellProps {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  hasDivider?: boolean;
}

export function SectionShell({
  id,
  eyebrow,
  title,
  children,
  className = "",
  hasDivider = true,
}: SectionShellProps) {
  return (
    <section id={id} className={`relative py-24 sm:py-32 ${hasDivider ? "border-t border-border/40" : ""} ${className}`}>
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
          <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}
