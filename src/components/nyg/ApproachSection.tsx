import { useSyncExternalStore, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MagneticButton } from "@/components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      if (typeof window === "undefined") return () => {};
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => (typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false),
    () => false
  );
}

export function ApproachSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const desktopRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Desktop row children stagger
      if (desktopRowRef.current) {
        gsap.from(desktopRowRef.current.children, {
          scrollTrigger: {
            trigger: desktopRowRef.current,
            start: "top 75%",
          },
          y: 40,
          opacity: 0,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Dark technical abstract node graph / terminal placeholder fallback
  const techImg1 = "/about-1.avif";
  const techImg2 = "/about-2.avif";

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-surface-raised pt-16 sm:pt-20 lg:pt-32 pb-12 sm:pb-16 lg:pb-24 overflow-hidden border-t border-[--color-border-subtle]"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Badge Row */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[--color-accent] text-surface-base text-[11px] sm:text-[12px] font-semibold flex items-center justify-center shrink-0">
            1
          </span>
          <span className="text-[12px] sm:text-[13px] font-medium border border-[--color-border-subtle] rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-text-muted">
            How it works
          </span>
        </div>

        {/* Heading H2: Two-Tone */}
        <h2 ref={headingRef} className="font-display font-medium leading-[1.12] tracking-[-0.02em] text-[clamp(1.5rem,4vw,3.2rem)] mb-12 sm:mb-16 lg:mb-28 max-w-4xl">
          <span className="text-text-primary block">
            Every engagement starts with a working demo
          </span>
          <span className="text-text-muted block">
            built on your actual process.
          </span>
        </h2>

        {/* MOBILE / TABLET LAYOUT (lg:hidden) */}
        <div className="lg:hidden flex flex-col gap-8">
          <p className="text-[15px] sm:text-[17px] leading-[1.6] font-medium text-text-primary">
            I map where your hours actually go, rebuild the worst three steps as automations, and hand you a system your team can run without me.
          </p>

          <div>
            <MagneticButton asChild>
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 bg-[--color-accent] hover:bg-[--color-accent-hover] text-[--color-action-primary-foreground] text-[13px] sm:text-[14px] font-medium rounded-full pl-5 sm:pl-6 pr-2 py-2 transition-colors duration-300 focus-ring"
              >
                <div className="overflow-hidden h-[20px] relative">
                  <div
                    className={`flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                      prefersReducedMotion ? "" : "group-hover:-translate-y-1/2"
                    }`}
                  >
                    <span className="h-[20px] flex items-center font-semibold text-surface-base">
                      How I work
                    </span>
                    <span className="h-[20px] flex items-center font-semibold text-surface-base" aria-hidden="true">
                      How I work
                    </span>
                  </div>
                </div>
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-surface-glass flex items-center justify-center shrink-0">
                  <ArrowRight
                    className={`w-4 h-4 text-surface-base transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                      prefersReducedMotion ? "" : "group-hover:-rotate-45"
                    }`}
                    aria-hidden="true"
                  />
                </span>
              </a>
            </MagneticButton>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 pt-4">
            <div className="sm:w-[45%] aspect-[438/346] rounded-xl sm:rounded-2xl overflow-hidden bg-surface-base border border-[--color-border-subtle] relative group">
              <img
                src={techImg1}
                alt="Technical workflow node graph diagram"
                width={438}
                height={346}
                loading="lazy"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback dark technical canvas placeholder if avif file missing
                  (e.target as HTMLElement).style.display = "none";
                  (e.currentTarget.parentElement as HTMLElement).classList.add("dark-tech-placeholder-1");
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-base/90 via-transparent to-transparent pointer-events-none p-4 flex flex-col justify-end">
                <span className="font-mono text-[10px] text-text-subtle uppercase tracking-widest">
                  System Architecture // 01
                </span>
              </div>
            </div>

            <div className="sm:w-[55%] aspect-[900/600] rounded-xl sm:rounded-2xl overflow-hidden bg-surface-base border border-[--color-border-subtle] relative group">
              <img
                src={techImg2}
                alt="Automated operational dispatch telemetry pane"
                width={900}
                height={600}
                loading="lazy"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                  (e.currentTarget.parentElement as HTMLElement).classList.add("dark-tech-placeholder-2");
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-base/90 via-transparent to-transparent pointer-events-none p-4 flex flex-col justify-end">
                <span className="font-mono text-[10px] text-text-subtle uppercase tracking-widest">
                  Execution Pipeline // 02
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* DESKTOP LAYOUT (hidden lg:grid) */}
        <div ref={desktopRowRef} className="hidden lg:grid grid-cols-[26%_1fr_48%] items-end gap-6 xl:gap-8">
          {/* Left Image: Small aspect-[438/346] */}
          <div className="self-end aspect-[438/346] rounded-2xl overflow-hidden bg-surface-base border border-[--color-border-subtle] relative group">
            <img
              src={techImg1}
              alt="Technical workflow node graph diagram"
              width={438}
              height={346}
              loading="lazy"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = "none";
                (e.currentTarget.parentElement as HTMLElement).classList.add("dark-tech-placeholder-1");
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-base/90 via-transparent to-transparent pointer-events-none p-4 flex flex-col justify-end">
              <span className="font-mono text-[10px] text-text-subtle uppercase tracking-widest">
                System Architecture // 01
              </span>
            </div>
          </div>

          {/* Center Column: Text & CTA (Self-Start, Flex End) */}
          <div className="self-start flex flex-col justify-end gap-8 pr-2">
            <p className="text-[16px] xl:text-[18px] leading-[1.65] font-medium text-text-primary max-w-sm">
              I map where your hours actually go,
              <br />
              rebuild the worst three steps as automations,
              <br />
              and hand you a system your team can run without me.
            </p>

            <div>
              <MagneticButton asChild>
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-3 bg-[--color-accent] hover:bg-[--color-accent-hover] text-[--color-action-primary-foreground] text-[13px] sm:text-[14px] font-medium rounded-full pl-5 sm:pl-6 pr-2 py-2 transition-colors duration-300 focus-ring"
                >
                  <div className="overflow-hidden h-[20px] relative">
                    <div
                      className={`flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                        prefersReducedMotion ? "" : "group-hover:-translate-y-1/2"
                      }`}
                    >
                      <span className="h-[20px] flex items-center font-semibold text-surface-base">
                        How I work
                      </span>
                      <span className="h-[20px] flex items-center font-semibold text-surface-base" aria-hidden="true">
                        How I work
                      </span>
                    </div>
                  </div>
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-surface-glass flex items-center justify-center shrink-0">
                    <ArrowRight
                      className={`w-4 h-4 text-surface-base transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                        prefersReducedMotion ? "" : "group-hover:-rotate-45"
                      }`}
                      aria-hidden="true"
                    />
                  </span>
                </a>
              </MagneticButton>
            </div>
          </div>

          {/* Right Image: Large aspect-[3/2] */}
          <div className="self-end aspect-[3/2] rounded-2xl overflow-hidden bg-surface-base border border-[--color-border-subtle] relative group">
            <img
              src={techImg2}
              alt="Automated operational dispatch telemetry pane"
              width={900}
              height={600}
              loading="lazy"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = "none";
                (e.currentTarget.parentElement as HTMLElement).classList.add("dark-tech-placeholder-2");
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-base/90 via-transparent to-transparent pointer-events-none p-5 flex flex-col justify-end">
              <span className="font-mono text-[10px] text-text-subtle uppercase tracking-widest">
                Execution Pipeline // 02
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
