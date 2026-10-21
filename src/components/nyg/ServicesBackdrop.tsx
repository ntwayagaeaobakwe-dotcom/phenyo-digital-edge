import { lazy, Suspense, type ReactNode } from "react";
import "./line-waves.css";

const LineWaves = lazy(() => import("./LineWaves"));

export function SiteBackdrop({
  children,
  paused = false,
  className = "",
}: {
  children: ReactNode;
  paused?: boolean;
  className?: string;
}) {
  return (
    <div className={`services-waves site-waves nyg-site ${className}`}>
      <Suspense fallback={null}>
        <LineWaves paused={paused} />
      </Suspense>
      {children}
    </div>
  );
}
