import { useEffect, useRef, useState } from "react";

// Check performance & hardware gating criteria to skip video on low-tier devices
function shouldSkipVideo(): boolean {
  if (typeof window === "undefined" || typeof navigator === "undefined") return true;

  try {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return true;

    if (window.innerWidth < 768) return true;

    // @ts-expect-error connection property on navigator is non-standard
    if (navigator.connection && navigator.connection.saveData) return true;

    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) return true;

    // @ts-expect-error deviceMemory property on navigator is non-standard
    if (navigator.deviceMemory && navigator.deviceMemory <= 4) return true;

    const isTouchCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchCoarse && window.innerWidth < 1024) return true;
  } catch {
    return false;
  }

  return false;
}

export function ScrollVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isGated, setIsGated] = useState<boolean>(true);
  const [isFrameReady, setIsFrameReady] = useState<boolean>(false);
  const [isCacheReady, setIsCacheReady] = useState<boolean>(false);

  const framesRef = useRef<ImageBitmap[]>([]);
  const animFrameIdRef = useRef<number | null>(null);
  const lastSeekTimeRef = useRef<number>(0);

  useEffect(() => {
    // SSR Safe: Check gating inside useEffect
    const skip = shouldSkipVideo();
    setIsGated(skip);
    if (skip) return;

    let isUnmounted = false;
    let offscreenVideo: HTMLVideoElement | null = null;
    let idleTimer: number | null = null;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    // 1. Post-LCP network request deferral
    const requestIdle =
      "requestIdleCallback" in window
        ? window.requestIdleCallback
        : (cb: () => void) => setTimeout(cb, 300);

    const idleHandle = requestIdle(() => {
      if (isUnmounted || !video) return;
      video.preload = "auto";
      video.load();
    });

    const handleLoadedData = () => {
      if (isUnmounted) return;
      setIsFrameReady(true);

      // Start frame cache extraction after 300ms idle yield
      idleTimer = window.setTimeout(() => {
        if (isUnmounted) return;
        extractFrameCache();
      }, 300);
    };

    video.addEventListener("loadeddata", handleLoadedData, { once: true });

    // 2. Offscreen frame extraction logic
    const extractFrameCache = async () => {
      if (isUnmounted || !video.duration) return;

      const duration = video.duration;
      const totalFrames = Math.min(48, Math.max(20, Math.round(duration * 8)));
      const step = (duration - 0.05) / totalFrames;

      offscreenVideo = document.createElement("video");
      offscreenVideo.muted = true;
      offscreenVideo.playsInline = true;
      offscreenVideo.src = video.currentSrc || video.src;
      offscreenVideo.preload = "auto";

      await new Promise<void>((resolve) => {
        if (!offscreenVideo) return resolve();
        offscreenVideo.onloadedmetadata = () => resolve();
        offscreenVideo.onerror = () => resolve();
      });

      if (isUnmounted || !offscreenVideo.videoWidth) return;

      const nativeW = offscreenVideo.videoWidth;
      const nativeH = offscreenVideo.videoHeight;
      const targetW = 720;
      const targetH = Math.round(targetW * (nativeH / nativeW));

      const extracted: ImageBitmap[] = [];

      for (let i = 0; i < totalFrames; i++) {
        if (isUnmounted) break;
        const targetTime = Math.min(duration - 0.02, i * step);
        offscreenVideo.currentTime = targetTime;

        await new Promise<void>((resolve) => {
          if (!offscreenVideo) return resolve();
          const onSeeked = () => {
            offscreenVideo.removeEventListener("seeked", onSeeked);
            resolve();
          };
          offscreenVideo.addEventListener("seeked", onSeeked);
        });

        if (isUnmounted) break;

        try {
          const bitmap = await createImageBitmap(offscreenVideo, {
            resizeWidth: targetW,
            resizeHeight: targetH,
          });
          extracted.push(bitmap);
        } catch {
          // If createImageBitmap fails, abort extraction gracefully
          break;
        }
      }

      if (!isUnmounted && extracted.length >= 10) {
        framesRef.current = extracted;
        setIsCacheReady(true);
      } else {
        // Cleanup partial extraction on failure
        extracted.forEach((bmp) => bmp.close());
      }
    };

    // 3. Main rAF animation loop & scroll scrub mapping
    let smoothedProgress = 0;

    const renderLoop = () => {
      if (isUnmounted) return;

      if (document.hidden) {
        animFrameIdRef.current = requestAnimationFrame(renderLoop);
        return;
      }

      const scrollHeight = document.documentElement.scrollHeight;
      const innerHeight = window.innerHeight;
      const maxScroll = Math.max(1, scrollHeight - innerHeight);
      const targetProgress = Math.min(1, Math.max(0, window.scrollY / maxScroll));

      // Smoothed lerp
      smoothedProgress += (targetProgress - smoothedProgress) * 0.12;

      // Draw canvas or seek video
      if (canvas) {
        const ctx = canvas.getContext("2d");
        const frames = framesRef.current;

        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        const cw = window.innerWidth;
        const ch = window.innerHeight;

        if (canvas.width !== Math.floor(cw * dpr) || canvas.height !== Math.floor(ch * dpr)) {
          canvas.width = Math.floor(cw * dpr);
          canvas.height = Math.floor(ch * dpr);
        }

        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "medium";

          if (frames.length > 0) {
            const frameIdx = Math.min(
              frames.length - 1,
              Math.floor(smoothedProgress * frames.length),
            );
            const bitmap = frames[frameIdx];

            if (bitmap) {
              const sw = bitmap.width;
              const sh = bitmap.height;
              const containerAspect = (cw * dpr) / (ch * dpr);
              const sourceAspect = sw / sh;

              let renderW: number, renderH: number, offsetX: number, offsetY: number;
              if (sourceAspect > containerAspect) {
                renderH = ch * dpr;
                renderW = renderH * sourceAspect;
                offsetX = (cw * dpr - renderW) / 2;
                offsetY = 0;
              } else {
                renderW = cw * dpr;
                renderH = renderW / sourceAspect;
                offsetX = 0;
                offsetY = (ch * dpr - renderH) / 2;
              }

              ctx.clearRect(0, 0, canvas.width, canvas.height);
              ctx.drawImage(bitmap, offsetX, offsetY, renderW, renderH);
            }
          }
        }
      }

      // Fallback seek when frame cache is not ready
      if (!framesRef.current.length && video && video.duration) {
        const targetTime = smoothedProgress * (video.duration - 0.05);
        if (Math.abs(targetTime - lastSeekTimeRef.current) > 0.04) {
          video.currentTime = targetTime;
          lastSeekTimeRef.current = targetTime;
        }
      }

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    // 4. Teardown & cleanup
    return () => {
      isUnmounted = true;
      if (typeof idleHandle === "number" && "cancelIdleCallback" in window) {
        // @ts-expect-error cancelIdleCallback exists in standard browser window
        window.cancelIdleCallback(idleHandle);
      }
      if (idleTimer) clearTimeout(idleTimer);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);

      video.removeEventListener("loadeddata", handleLoadedData);

      if (offscreenVideo) {
        offscreenVideo.pause();
        offscreenVideo.removeAttribute("src");
        offscreenVideo.load();
        offscreenVideo = null;
      }

      // Explicitly close all ImageBitmap objects to free RAM
      framesRef.current.forEach((bitmap) => {
        try {
          bitmap.close();
        } catch {
          // Ignore close errors
        }
      });
      framesRef.current = [];
    };
  }, [isGated]);

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-surface-base"
      aria-hidden="true"
    >
      {/* Layer 1: LCP Poster (visible initially, fades out when canvas cache is ready) */}
      <picture>
        <source srcSet="/hero-poster.avif" type="image/avif" />
        <source srcSet="/hero-poster.webp" type="image/webp" />
        <img
          src="/hero-poster.avif"
          alt=""
          fetchPriority="high"
          decoding="sync"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            isCacheReady ? "opacity-0" : "opacity-100"
          }`}
        />
      </picture>

      {/* Layer 2 & Layer 3 (rendered only if device capability gating passes) */}
      {!isGated && (
        <>
          {/* Layer 2: Visible video element fallback before frame cache readiness */}
          <video
            ref={videoRef}
            muted
            playsInline
            preload="none"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              isFrameReady && !isCacheReady ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src="/hero.webm" type="video/webm" />
            <source src="/hero.mp4" type="video/mp4" />
          </video>

          {/* Layer 3: Canvas scrub layer (fades in once cache is ready) */}
          <canvas
            ref={canvasRef}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              isCacheReady ? "opacity-100" : "opacity-0"
            }`}
          />
        </>
      )}
    </div>
  );
}
