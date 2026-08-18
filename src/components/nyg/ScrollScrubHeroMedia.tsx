import { useEffect, useRef, useState, useCallback } from "react";

interface ScrollScrubHeroMediaProps {
  /** Scroll progress from 0 (top of hero) to 1 (end of hero scroll container) */
  scrollProgress: number;
  className?: string;
}

const DESKTOP_FRAME_COUNT = 72;
const MOBILE_FRAME_COUNT = 48;

function getFrameUrl(isMobile: boolean, index: number): string {
  const dir = isMobile ? "mobile" : "desktop";
  const numStr = String(index + 1).padStart(4, "0");
  return `/hero-sequence/${dir}/frame-${numStr}.webp`;
}

export function ScrollScrubHeroMedia({
  scrollProgress,
  className = "",
}: ScrollScrubHeroMediaProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Storage for loaded HTMLImageElements (keyed by frame index)
  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const loadingSetRef = useRef<Set<number>>(new Set());

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [canvasReady, setCanvasReady] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  const lastDrawnFrameRef = useRef<number>(-1);
  const isVisibleRef = useRef<boolean>(true);
  const isTabActiveRef = useRef<boolean>(true);
  const rafIdRef = useRef<number | null>(null);

  const totalFrames = isMobile ? MOBILE_FRAME_COUNT : DESKTOP_FRAME_COUNT;

  // 1. Detect media queries (Mobile & Reduced Motion)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    const checkMotion = () => {
      setPrefersReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    };

    checkMobile();
    checkMotion();

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener("change", handleMotionChange);

    const handleResize = () => {
      checkMobile();
    };
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 2. Clear image cache when switching between mobile/desktop sequences
  useEffect(() => {
    imagesRef.current.clear();
    loadingSetRef.current.clear();
    lastDrawnFrameRef.current = -1;
  }, [isMobile]);

  // 3. Helper to load a single frame
  const loadFrame = useCallback(
    (index: number, priority: "high" | "low" = "low"): Promise<HTMLImageElement> => {
      if (imagesRef.current.has(index)) {
        return Promise.resolve(imagesRef.current.get(index)!);
      }

      if (loadingSetRef.current.has(index)) {
        return new Promise((resolve) => {
          const checkInterval = setInterval(() => {
            if (imagesRef.current.has(index)) {
              clearInterval(checkInterval);
              resolve(imagesRef.current.get(index)!);
            }
          }, 40);
        });
      }

      loadingSetRef.current.add(index);

      return new Promise((resolve, reject) => {
        const img = new Image();
        if (priority === "high") {
          img.fetchPriority = "high";
        }
        img.src = getFrameUrl(isMobile, index);
        img.onload = () => {
          imagesRef.current.set(index, img);
          loadingSetRef.current.delete(index);
          resolve(img);
        };
        img.onerror = (err) => {
          loadingSetRef.current.delete(index);
          reject(err);
        };
      });
    },
    [isMobile],
  );

  // 4. Draw frame onto canvas with cover-fit
  const drawFrame = useCallback(
    (targetIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      // Find best available image: exact frame or nearest loaded frame
      let img = imagesRef.current.get(targetIndex);
      if (!img) {
        // Nearest neighbor search
        let minDiff = Infinity;
        let nearestIndex = -1;
        for (const [idx, loadedImg] of imagesRef.current.entries()) {
          const diff = Math.abs(idx - targetIndex);
          if (diff < minDiff && loadedImg.complete) {
            minDiff = diff;
            nearestIndex = idx;
          }
        }
        if (nearestIndex !== -1) {
          img = imagesRef.current.get(nearestIndex);
        }
      }

      if (!img || !img.complete || img.naturalWidth === 0) {
        // Still loading nearest, request frame load
        loadFrame(targetIndex, "high")
          .then(() => {
            if (isVisibleRef.current && isTabActiveRef.current) {
              drawFrame(targetIndex);
            }
          })
          .catch(() => {});
        return;
      }

      // Compute cover aspect ratio
      const canvasW = canvas.width;
      const canvasH = canvas.height;
      const imgW = img.naturalWidth;
      const imgH = img.naturalHeight;

      const imgAspect = imgW / imgH;
      const canvasAspect = canvasW / canvasH;

      let drawW = canvasW;
      let drawH = canvasH;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasAspect > imgAspect) {
        // Canvas is wider than image (fit width, crop height)
        drawW = canvasW;
        drawH = canvasW / imgAspect;
        offsetY = (canvasH - drawH) / 2;
      } else {
        // Canvas is taller than image (fit height, crop width)
        drawH = canvasH;
        drawW = canvasH * imgAspect;
        // Keep subject slightly to the right on desktop, center on mobile
        offsetX = isMobile ? (canvasW - drawW) / 2 : (canvasW - drawW) * 0.65;
      }

      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
      lastDrawnFrameRef.current = targetIndex;

      if (!canvasReady) {
        setCanvasReady(true);
      }
    },
    [isMobile, loadFrame, canvasReady],
  );

  // 5. Intelligent Frame Loading Engine (Immediate priority + Progressive idle loading)
  useEffect(() => {
    if (prefersReducedMotion) return;

    let cancelled = false;

    // Step A: Load initial keyframes immediately (first frame, middle, last)
    const criticalFrames = [0, 1, 2, Math.floor(totalFrames / 2), totalFrames - 1];
    criticalFrames.forEach((idx) => {
      loadFrame(idx, "high")
        .then(() => {
          if (!cancelled && lastDrawnFrameRef.current === -1) {
            drawFrame(0);
          }
        })
        .catch(() => {});
    });

    // Step B: Progressively preload remaining frames in idle time
    let queueIndex = 0;
    const idlePreload = () => {
      if (cancelled || !isVisibleRef.current || !isTabActiveRef.current) return;

      // Prioritize window around current scroll position
      const currentTargetFrame = Math.min(
        Math.max(0, Math.round(scrollProgress * (totalFrames - 1))),
        totalFrames - 1,
      );

      // Radial window outwards from current frame
      const unvisited: number[] = [];
      for (let dist = 1; dist < totalFrames; dist++) {
        const left = currentTargetFrame - dist;
        const right = currentTargetFrame + dist;
        if (left >= 0 && !imagesRef.current.has(left)) unvisited.push(left);
        if (right < totalFrames && !imagesRef.current.has(right)) unvisited.push(right);
      }

      if (unvisited.length > 0) {
        const nextIdx = unvisited[0];
        loadFrame(nextIdx, "low").finally(() => {
          if (!cancelled) {
            if ("requestIdleCallback" in window) {
              (window as any).requestIdleCallback(idlePreload, { timeout: 150 });
            } else {
              setTimeout(idlePreload, 30);
            }
          }
        });
      }
    };

    const timer = setTimeout(() => {
      idlePreload();
    }, 100);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [totalFrames, isMobile, loadFrame, drawFrame, prefersReducedMotion]);

  // 6. Resize handling with capped DPR (max 1.5) for crisp rendering without huge VRAM
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width || container.clientWidth;
        const height = entry.contentRect.height || container.clientHeight;
        if (width === 0 || height === 0) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);

        const targetFrame = Math.min(
          Math.max(0, Math.round(scrollProgress * (totalFrames - 1))),
          totalFrames - 1,
        );
        drawFrame(targetFrame);
      }
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, [scrollProgress, totalFrames, drawFrame]);

  // 7. Render scrubbing upon scrollProgress updates via rAF
  useEffect(() => {
    if (prefersReducedMotion || !isVisibleRef.current || !isTabActiveRef.current) return;

    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }

    rafIdRef.current = requestAnimationFrame(() => {
      const targetFrame = Math.min(
        Math.max(0, Math.round(scrollProgress * (totalFrames - 1))),
        totalFrames - 1,
      );

      if (targetFrame !== lastDrawnFrameRef.current) {
        drawFrame(targetFrame);
      }
    });

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [scrollProgress, totalFrames, drawFrame, prefersReducedMotion]);

  // 8. Visibility & Tab state listeners to pause rendering when offscreen
  useEffect(() => {
    const handleVisibilityChange = () => {
      isTabActiveRef.current = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          const targetFrame = Math.min(
            Math.max(0, Math.round(scrollProgress * (totalFrames - 1))),
            totalFrames - 1,
          );
          drawFrame(targetFrame);
        }
      },
      { threshold: 0.05 },
    );
    observer.observe(container);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      observer.disconnect();
    };
  }, [scrollProgress, totalFrames, drawFrame]);

  const posterSrc = isMobile ? "/hero-sequence/poster-mobile.webp" : "/hero-sequence/poster.webp";

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* 1. Poster Image (Instant visible fallback for no-JS, loading, and reduced-motion) */}
      <img
        src={posterSrc}
        alt=""
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover object-[center_right] sm:object-[65%_center] transition-opacity duration-700 ease-out"
        style={{
          opacity: prefersReducedMotion || !canvasReady ? 1 : 0,
        }}
      />

      {/* 2. Interactive Scroll-Scrubbed Canvas */}
      {!prefersReducedMotion && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block transition-opacity duration-700 ease-out"
          style={{
            opacity: canvasReady ? 1 : 0,
          }}
        />
      )}

      {/* 3. Restrained cinematic dark gradient overlay for text readability on left side */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#080A09]/95 via-[#080A09]/70 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080A09] via-transparent to-[#080A09]/60 pointer-events-none" />
    </div>
  );
}
