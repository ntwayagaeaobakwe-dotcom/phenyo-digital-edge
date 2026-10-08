import { lazy, Suspense, type ReactNode } from "react";
import "./line-waves.css";

const LineWaves = lazy(() => import("./LineWaves"));

export function SiteBackdrop({ children, paused }: { children: ReactNode; paused: boolean }) {
  return (
    <div className="services-waves site-waves nyg-site">
      <Suspense fallback={null}>
        <LineWaves paused={paused} />
      </Suspense>
      {children}
    </div>
  );
}
