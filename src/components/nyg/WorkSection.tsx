import { useEffect, useRef, useState } from "react";
import { Link as LinkIcon, ArrowRight } from "lucide-react";

export const CASE_1_TITLE = "{{CASE_1_TITLE}}";
export const CASE_2_TITLE = "{{CASE_2_TITLE}}";

// Helper function to check if device capability allows WebGL / Card Video playback
function checkCanPlayVideo(): boolean {
  if (typeof window === "undefined" || typeof navigator === "undefined") return false;

  // 1. Reduced motion preference
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;

  // 2. Mobile/Tablet viewport < 768px -> poster only
  if (window.innerWidth < 768) return false;

  // 3. Network SaveData mode
  // @ts-expect-error saveData is Chrome/Edge non-standard network info property
  if (navigator.connection && navigator.connection.saveData) return false;

  // 4. Hardware CPU cores <= 4
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) return false;

  // 5. Device RAM memory <= 4GB
  // @ts-expect-error deviceMemory is Chrome/Edge non-standard navigator property
  if (navigator.deviceMemory && navigator.deviceMemory <= 4) return false;

  return true;
}

export function WorkSection() {
  const [canPlayVideo, setCanPlayVideo] = useState(false);
  const card1VideoRef = useRef<HTMLVideoElement | null>(null);
  const card2VideoRef = useRef<HTMLVideoElement | null>(null);

  // Check hardware capability after mount
  useEffect(() => {
    setCanPlayVideo(checkCanPlayVideo());
  }, []);

  // Shared IntersectionObserver for both cards
  useEffect(() => {
    if (!canPlayVideo) return;

    const videoElements = [card1VideoRef.current, card2VideoRef.current].filter(Boolean) as HTMLVideoElement[];
    if (videoElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting && !document.hidden) {
            video.play().catch(() => {
              // Ignore autoplay restrictions
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.2 }
    );

    videoElements.forEach((vid) => observer.observe(vid));

    // Handle document visibility change (pause on tab switch)
    const handleVisibilityChange = () => {
      videoElements.forEach((video) => {
        if (document.hidden) {
          video.pause();
        } else {
          // Play only if video container is currently visible in viewport
          const rect = video.getBoundingClientRect();
          const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
          if (inViewport) {
            video.play().catch(() => {});
          }
        }
      });
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      videoElements.forEach((vid) => {
        vid.pause();
        vid.removeAttribute("src");
        vid.load();
      });
    };
  }, [canPlayVideo]);

  const title1 = CASE_1_TITLE === "{{CASE_1_TITLE}}" ? "Dubai Brokerage Lead Routing System" : CASE_1_TITLE;
  const title2 = CASE_2_TITLE === "{{CASE_2_TITLE}}" ? "Facility Operations Dispatch & Reporting" : CASE_2_TITLE;

  return (
    <section
      id="work"
      className="bg-surface-sunken pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-28 border-t border-[--color-border-subtle]"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Badge Row */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[--color-accent] text-surface-base text-[11px] sm:text-[12px] font-semibold flex items-center justify-center shrink-0">
            2
          </span>
          <span className="text-[12px] sm:text-[13px] font-medium border border-[--color-border-subtle] rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-text-muted">
            Selected work
          </span>
        </div>

        {/* Heading H2 */}
        <h2 className="font-display font-medium leading-[1.08] tracking-[-0.03em] text-[clamp(1.75rem,7vw,4.2rem)] sm:text-[clamp(2.5rem,5vw,4.2rem)] text-text-primary mb-10 sm:mb-14 lg:mb-16">
          Systems in production.
        </h2>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-7">
          {/* CARD 1 — Lead Response Automation */}
          <article className="flex flex-col">
            <a
              href="#contact"
              className="group relative aspect-[329/246] rounded-2xl overflow-hidden bg-surface-base border border-[--color-border-subtle] focus-ring block cursor-pointer"
              aria-label={`View details for ${title1}`}
            >
              {/* Poster Image (LCP Safe Default) */}
              <img
                src="/work/lead-response-poster.avif"
                alt="Lead response automation system flow"
                width={658}
                height={492}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                  (e.currentTarget.parentElement as HTMLElement).classList.add("dark-tech-placeholder-1");
                }}
              />

              {/* Optional Gated Video Layer */}
              {canPlayVideo && (
                <video
                  ref={card1VideoRef}
                  preload="none"
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                >
                  <source src="/work/lead-response.mp4" type="video/mp4" />
                  <source src="/work/lead-response.webm" type="video/webm" />
                </video>
              )}

              {/* Hover & Focus Expanding Pill (bottom-4 left-4) */}
              <div className="absolute bottom-4 left-4 z-10 flex items-center">
                <div className="flex items-center gap-2.5 h-9 px-3 rounded-full bg-surface-glass backdrop-blur-md border border-[--color-border-subtle] group-hover:w-[148px] group-focus-visible:w-[148px] transition-all duration-300 ease-in-out overflow-hidden shadow-lg">
                  <LinkIcon className="w-3.5 h-3.5 text-text-primary shrink-0 transition-transform duration-300 group-hover:rotate-0 -rotate-45" />
                  <span className="text-[13px] font-medium text-text-primary whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 delay-75">
                    Learn more
                  </span>
                </div>
              </div>
            </a>

            {/* Description & Title Below Card */}
            <p className="text-[13px] sm:text-[14px] text-text-muted mt-4 leading-relaxed">
              Portal, form, and WhatsApp enquiries qualified and routed to the right agent in seconds.
            </p>
            <h3 className="text-[14px] sm:text-[15px] font-semibold text-text-primary mt-1">
              {title1}
            </h3>
          </article>

          {/* CARD 2 — Operations Dispatch */}
          <article className="flex flex-col">
            <a
              href="#contact"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-surface-base border border-[--color-border-subtle] focus-ring block cursor-pointer"
              aria-label={`View details for ${title2}`}
            >
              {/* Poster Image */}
              <img
                src="/work/ops-dispatch-poster.avif"
                alt="Facility operations dispatch and reporting system"
                width={600}
                height={600}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                  (e.currentTarget.parentElement as HTMLElement).classList.add("dark-tech-placeholder-2");
                }}
              />

              {/* Optional Gated Video Layer */}
              {canPlayVideo && (
                <video
                  ref={card2VideoRef}
                  preload="none"
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                >
                  <source src="/work/ops-dispatch.mp4" type="video/mp4" />
                  <source src="/work/ops-dispatch.webm" type="video/webm" />
                </video>
              )}

              {/* Hover & Focus Expanding Accent Pill */}
              <div className="absolute bottom-4 left-4 z-10 flex items-center">
                <div className="flex items-center gap-2.5 h-9 px-3 rounded-full bg-[--color-accent] text-surface-base group-hover:w-[168px] group-focus-visible:w-[168px] transition-all duration-300 ease-in-out overflow-hidden shadow-lg">
                  <ArrowRight className="w-3.5 h-3.5 text-surface-base shrink-0 transition-transform duration-300 group-hover:rotate-0 -rotate-45" />
                  <span className="text-[13px] font-semibold text-surface-base whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 delay-75">
                    View case study
                  </span>
                </div>
              </div>
            </a>

            {/* Description & Title Below Card */}
            <p className="text-[13px] sm:text-[14px] text-text-muted mt-4 leading-relaxed">
              Scheduling, job dispatch, and recurring reporting running unattended — exceptions only.
            </p>
            <h3 className="text-[14px] sm:text-[15px] font-semibold text-text-primary mt-1">
              {title2}
            </h3>
          </article>
        </div>
      </div>
    </section>
  );
}
