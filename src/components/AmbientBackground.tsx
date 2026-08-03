import { useEffect, useRef, useState } from "react";
import { useLocation } from "@tanstack/react-router";

export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const { pathname } = useLocation();
  // /card is a locked-viewport page with its own (video) backdrop covering the
  // whole viewport — this layer would be invisible there yet still burn GPU.
  const suppressed = pathname === "/card";

  useEffect(() => {
    if (suppressed) return;
    let cleanupFn: (() => void) | undefined;
    let isCancelled = false;

    const scheduleInit = () => {
      const requestIdle =
        typeof window !== "undefined" && "requestIdleCallback" in window
          ? window.requestIdleCallback
          : (cb: () => void) => setTimeout(cb, 100);

      requestIdle(async () => {
        if (isCancelled || !canvasRef.current) return;

        try {
          const { initAmbientRenderer, isSupportedHardware } =
            await import("@/lib/ambient-renderer");

          if (isCancelled || !isSupportedHardware()) return;

          cleanupFn = initAmbientRenderer(canvasRef.current, () => {
            if (!isCancelled) {
              setIsInitialized(true);
            }
          });
        } catch (err) {
          console.warn("Ambient WebGL background skipped:", err);
        }
      });
    };

    scheduleInit();

    return () => {
      isCancelled = true;
      if (cleanupFn) {
        cleanupFn();
      }
    };
  }, [suppressed]);

  if (suppressed) return null;

  return (
    <div
      className="ambient-bg-layer1 fixed inset-0 -z-50 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className={`h-full w-full transition-opacity duration-600 ease-out ${
          isInitialized ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
