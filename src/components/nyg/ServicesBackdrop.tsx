import { lazy, Suspense, useState, type ReactNode } from "react";
import "./line-waves.css";

const LineWaves = lazy(() => import("./LineWaves"));

export function ServicesBackdrop({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(false);
  return (
    <div className="services-waves">
      <Suspense fallback={null}>
        <LineWaves paused={paused} />
      </Suspense>
      {children}
      <button className="waves-toggle" onClick={() => setPaused(!paused)} aria-pressed={paused}>
        {paused ? "Resume background motion" : "Pause background motion"}
      </button>
    </div>
  );
}
