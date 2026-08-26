import { useEffect, useRef, useState, useCallback } from "react";
import { Check, Play, RotateCcw } from "lucide-react";

interface ScrollScrubWorkflowFilmProps {
  onReplayClick?: () => void;
}

const VIDEO_MP4 = "/workflow-studio/workflow-lead-routing.mp4";
const VIDEO_WEBM = "/workflow-studio/workflow-lead-routing.webm";
const POSTER_START = "/workflow-studio/workflow-lead-routing-poster.webp";
const POSTER_COMPLETE = "/workflow-studio/workflow-lead-routing-complete.webp";

const WORKFLOW_STAGES = [
  {
    num: "01",
    title: "Inquiry Received",
    detail: "Website, WhatsApp, or form",
  },
  {
    num: "02",
    title: "Details Organized",
    detail: "Contact, service needed, & urgency",
  },
  {
    num: "03",
    title: "Lead Qualified",
    detail: "Checked against your criteria",
  },
  {
    num: "04",
    title: "Team Notified",
    detail: "Instant alert to the right person",
  },
  {
    num: "05",
    title: "Next Step Prepared",
    detail: "Follow-up scheduled & logged",
  },
] as const;

export function ScrollScrubWorkflowFilm({ onReplayClick }: ScrollScrubWorkflowFilmProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const [isVideoReady, setIsVideoReady] = useState<boolean>(false);
  const [isReplaying, setIsReplaying] = useState<boolean>(false);
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const [liveAnnouncement, setLiveAnnouncement] = useState<string>("");

  // Mutable refs for scroll-scrub loop (zero React state updates during scroll)
  const targetTimeRef = useRef<number>(0);
  const currentTimeRef = useRef<number>(0);
  const durationRef = useRef<number>(8.0);
  const isReplayingRef = useRef<boolean>(false);
  const rafIdRef = useRef<number | null>(null);
  const isSeekingRef = useRef<boolean>(false);
  const lastActiveStageRef = useRef<number>(0);

  // 1. Device and Accessibility detection
  useEffect(() => {
    const checkMedia = () => {
      // Mobile check (< 768px)
      setIsMobile(window.innerWidth < 768);
      setPrefersReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    };
    checkMedia();

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener("change", handleMotionChange);

    window.addEventListener("resize", checkMedia, { passive: true });
    return () => {
      motionQuery.removeEventListener("change", handleMotionChange);
      window.removeEventListener("resize", checkMedia);
    };
  }, []);

  // 2. Video metadata & event setup
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";

    const handleLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        durationRef.current = video.duration;
      }
    };

    const handleCanPlay = () => {
      setIsVideoReady(true);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("canplay", handleCanPlay);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, []);

  // 3. Scroll tracking & Choreography (Desktop & Tablet)
  useEffect(() => {
    if (isMobile || prefersReducedMotion) return;

    const handleScroll = () => {
      // If user scrolls during replay, immediately cancel replay and resume scroll control
      if (isReplayingRef.current) {
        isReplayingRef.current = false;
        setIsReplaying(false);
        const video = videoRef.current;
        if (video) video.pause();
      }

      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;

      if (totalScrollable <= 0) return;

      const currentScrolled = -rect.top;
      const rawProgress = Math.min(Math.max(0, currentScrolled / totalScrollable), 1);

      // Choreography curve:
      // 0 - 10%: Hold at 0 (Stage 1 starting state)
      // 10 - 85%: Scrub through Stages 1 -> 5
      // 85 - 100%: Hold at 1.0 (Completed route state)
      let scrubProgress = 0;
      if (rawProgress < 0.1) {
        scrubProgress = 0;
      } else if (rawProgress > 0.85) {
        scrubProgress = 1;
      } else {
        scrubProgress = (rawProgress - 0.1) / 0.75;
      }

      targetTimeRef.current = scrubProgress * durationRef.current;

      // Update active stage indicator (0 to 4) for accessible transcript
      const stageIdx = Math.min(4, Math.floor(scrubProgress * 5));
      if (stageIdx !== lastActiveStageRef.current) {
        lastActiveStageRef.current = stageIdx;
        setActiveStageIndex(stageIdx);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, prefersReducedMotion]);

  // 4. Smooth seeking rAF loop
  useEffect(() => {
    if (isMobile || prefersReducedMotion) return;

    const scrubLoop = () => {
      rafIdRef.current = requestAnimationFrame(scrubLoop);

      if (isReplayingRef.current) return;

      const video = videoRef.current;
      if (!video || !video.readyState) return;

      const target = targetTimeRef.current;
      const current = currentTimeRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.01 && !isSeekingRef.current) {
        // Fast responsive lerp for keyframe-dense video
        currentTimeRef.current += diff * 0.22;
        video.currentTime = currentTimeRef.current;
      }
    };

    rafIdRef.current = requestAnimationFrame(scrubLoop);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isMobile, prefersReducedMotion]);

  // 5. Replay Flow Handler
  const handleReplay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    setLiveAnnouncement("Replaying lead-routing workflow");
    setIsReplaying(true);
    isReplayingRef.current = true;

    video.currentTime = 0;
    currentTimeRef.current = 0;

    const startTime = performance.now();
    const duration = durationRef.current * 1000; // in ms

    const stepReplay = (now: number) => {
      if (!isReplayingRef.current) return;

      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const timeSec = progress * durationRef.current;

      video.currentTime = timeSec;
      currentTimeRef.current = timeSec;

      const stageIdx = Math.min(4, Math.floor(progress * 5));
      setActiveStageIndex(stageIdx);

      if (progress < 1) {
        requestAnimationFrame(stepReplay);
      } else {
        isReplayingRef.current = false;
        setIsReplaying(false);
      }
    };

    requestAnimationFrame(stepReplay);
    onReplayClick?.();
  }, [onReplayClick]);

  // Case A: Reduced Motion view
  if (prefersReducedMotion) {
    return (
      <div className="w-full">
        {/* Completed Poster */}
        <div className="relative overflow-hidden rounded-2xl border border-[rgba(8,45,45,0.16)] bg-[#FAF8F2] shadow-xs">
          <img
            src={POSTER_COMPLETE}
            alt="Completed 5-stage Lead Routing workflow"
            className="w-full h-auto aspect-[1280/412] object-contain block select-none"
            loading="lazy"
          />
        </div>

        {/* Real HTML Transcript */}
        <div className="mt-6">
          <AccessibleTranscript activeIndex={4} />
        </div>
      </div>
    );
  }

  // Case B: Mobile view (clean normal document flow with clear HTML transcript)
  if (isMobile) {
    return (
      <div className="w-full flex flex-col gap-5">
        {/* Supporting Visual Container */}
        <div className="relative overflow-hidden rounded-2xl border border-[rgba(8,45,45,0.14)] bg-[#FAF8F2] shadow-xs">
          <img
            src={POSTER_COMPLETE}
            alt="Lead Routing workflow diagram overview"
            className="w-full h-auto aspect-[1280/412] object-contain block select-none"
            loading="eager"
          />
        </div>

        {/* Primary Mobile Presentation: Real HTML 5-Stage Transcript */}
        <AccessibleTranscript activeIndex={4} />

        {/* Replay / Interactive Control */}
        <div className="flex items-center justify-between pt-2 border-t border-[rgba(8,45,45,0.1)]">
          <p className="font-mono text-xs text-[#5C5953]">5 connected stages</p>
          <button
            type="button"
            onClick={handleReplay}
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(8,45,45,0.2)] bg-[#082D2D] px-4 py-2 min-h-[40px] font-mono text-xs uppercase tracking-wider font-semibold text-[#F3F0E8] hover:bg-[#123E3D] transition-all focus-ring cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5 text-[#5FD8CD]" />
            Replay Flow
          </button>
        </div>
      </div>
    );
  }

  // Case C: Desktop & Tablet view (Sticky Scroll-Scrubbed Cinematic Film)
  return (
    <div
      ref={containerRef}
      className="relative w-full h-[170svh]"
      aria-label="Lead Routing Interactive Workflow Film"
    >
      {/* Accessible Live Region for Screen Readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {liveAnnouncement}
      </div>

      {/* Pinned Sticky Visual Viewport */}
      <div className="sticky top-0 h-[100svh] w-full flex flex-col justify-center py-4">
        {/* Bone Plate Workflow Enclosure */}
        <div className="rounded-3xl border border-[rgba(8,45,45,0.14)] bg-[#FAF8F2] p-5 sm:p-7 shadow-xs">
          {/* Header Bar inside Blueprint */}
          <div className="flex flex-col gap-4 border-b border-[rgba(8,45,45,0.1)] pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#082D2D] font-bold">
                [ WORKFLOW // LEAD_ROUTING ]
              </span>
              <p className="mt-1 text-xs text-[#282B29] font-sans">
                Scroll to see how an incoming lead moves through the 5 connected stages.
              </p>
            </div>

            <button
              type="button"
              onClick={handleReplay}
              aria-label="Replay lead routing workflow animation"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-[rgba(8,45,45,0.2)] bg-[#082D2D] px-4 py-2 min-h-[38px] font-mono text-xs uppercase tracking-wider font-semibold text-[#F3F0E8] hover:bg-[#123E3D] transition-all focus-ring cursor-pointer shrink-0"
            >
              {isReplaying ? (
                <RotateCcw className="h-3.5 w-3.5 text-[#5FD8CD] animate-spin" />
              ) : (
                <Play className="h-3.5 w-3.5 text-[#5FD8CD]" />
              )}
              <span>Replay flow</span>
            </button>
          </div>

          {/* Cinematic Workflow Video Frame */}
          <div className="relative mt-4 overflow-hidden rounded-2xl border border-[rgba(8,45,45,0.12)] bg-[#F3F0E8]">
            {/* Fallback & Initial Poster Image */}
            <img
              src={POSTER_START}
              alt=""
              aria-hidden="true"
              className={`absolute inset-0 w-full h-full object-contain pointer-events-none transition-opacity duration-200 ease-out ${
                isVideoReady ? "opacity-0" : "opacity-100"
              }`}
            />

            {/* Scroll-Scrubbed Video Source */}
            <video
              ref={videoRef}
              muted
              playsInline
              preload="auto"
              aria-hidden="true"
              tabIndex={-1}
              className={`w-full h-auto aspect-[1280/412] object-contain block pointer-events-none transition-opacity duration-200 ease-out ${
                isVideoReady ? "opacity-100" : "opacity-0"
              }`}
            >
              <source src={VIDEO_WEBM} type="video/webm" />
              <source src={VIDEO_MP4} type="video/mp4" />
            </video>
          </div>

          {/* Real HTML 5-Stage Live Progress Track & Transcript */}
          <div className="mt-4 pt-4 border-t border-[rgba(8,45,45,0.08)]">
            <AccessibleTranscript activeIndex={activeStageIndex} />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Accessible semantic transcript representing the 5 real stages
 */
function AccessibleTranscript({ activeIndex = 0 }: { activeIndex?: number }) {
  return (
    <ol
      className="grid grid-cols-1 sm:grid-cols-5 gap-2.5"
      aria-label="Lead Routing Workflow Stages"
    >
      {WORKFLOW_STAGES.map((stage, idx) => {
        const isCurrent = idx === activeIndex;
        const isCompleted = idx <= activeIndex;

        return (
          <li
            key={stage.num}
            aria-current={isCurrent ? "step" : undefined}
            className={`rounded-xl border p-2.5 sm:p-3 transition-all duration-200 ${
              isCurrent
                ? "border-[#082D2D] bg-[#F3F0E8] shadow-xs ring-1 ring-[#082D2D]/20"
                : isCompleted
                  ? "border-[rgba(8,45,45,0.2)] bg-[#F8F6F0]"
                  : "border-[rgba(8,45,45,0.08)] bg-[#FAF8F2] opacity-80"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] font-bold text-[#5C5953]">{stage.num}</span>
              <span
                className={`grid h-4 w-4 place-items-center rounded-full text-[9px] ${
                  isCompleted
                    ? "bg-[#082D2D] text-[#5FD8CD] font-bold"
                    : "border border-[rgba(8,45,45,0.2)] text-[#5C5953]"
                }`}
              >
                {isCompleted ? <Check className="h-2.5 w-2.5" /> : idx + 1}
              </span>
            </div>
            <p className="mt-1.5 font-mono text-[11px] uppercase tracking-wider font-bold text-[#080A09]">
              {stage.title}
            </p>
            <p className="mt-0.5 text-[11px] text-[#282B29] font-sans leading-tight">
              {stage.detail}
            </p>
          </li>
        );
      })}
    </ol>
  );
}
