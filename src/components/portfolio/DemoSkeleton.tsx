interface DemoSkeletonProps {
  className?: string;
}

// Loading placeholder shown while a lazy-loaded interactive demo chunk downloads.
// Mirrors the glass-card shape used by the real demos to avoid layout shift.
export function DemoSkeleton({ className = "h-[320px]" }: DemoSkeletonProps) {
  return (
    <div
      className={`glass rounded-3xl border border-primary/20 shadow-[var(--shadow-elegant)] animate-pulse ${className}`}
      role="status"
      aria-label="Loading interactive demo"
    />
  );
}
