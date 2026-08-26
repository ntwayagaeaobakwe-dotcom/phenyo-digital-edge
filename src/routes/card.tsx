import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Hexagon, Menu, Play, X } from "lucide-react";
import { getSiteUrl } from "@/lib/seo";

/**
 * /card — single locked-viewport identity page.
 *
 * Link-in-bio / WhatsApp signature / email footer destination. No scroll,
 * no sections, one composition. The scrolling homepage is untouched; the
 * global AmbientBackground suppresses itself on this route.
 */

const SITE_URL = getSiteUrl();
const PAGE_TITLE = "NYG Digital — Software Development & Systems Consultancy, UAE";
const PAGE_DESC =
  "NYG Digital is the trading brand of NYG Digital FZE LLC, a software-development and computer-systems consultancy registered in Ajman, UAE, serving businesses across the UAE.";

// Background media. Files are not in the repo yet — the backdrop renders
// solid surface-base until they exist (see onError handling below).
// Supply: /public/card-bg-poster.avif (1280x720), /public/card-bg.webm +
// /public/card-bg.mp4 (1280x720, 8s loop, silent, <3MB combined).
const POSTER_SRC = "/card-bg-poster.avif";
const VIDEO_WEBM_SRC = "/card-bg.webm";
const VIDEO_MP4_SRC = "/card-bg.mp4";

// Showreel for the primary CTA. Not in the repo yet — the modal shows a
// pending notice until /public/n8n-workflow-demo.mp4 exists (30–60s silent
// screen recording of an n8n workflow executing).
const SHOWREEL_SRC = "/n8n-workflow-demo.mp4";

// TODO(user): real figures required before shipping — do not invent.
// Suggested shape: workflows shipped / hours recovered per month / average
// lead response time. Set to null to omit the row entirely (empty space
// beats a fabricated stat).
const PROOF_CHIPS: { figure: string; label: string }[] | null = [
  { figure: "{{CHIP_1_FIGURE}}", label: "{{CHIP_1_LABEL}}" },
  { figure: "{{CHIP_2_FIGURE}}", label: "{{CHIP_2_LABEL}}" },
  { figure: "{{CHIP_3_FIGURE}}", label: "{{CHIP_3_LABEL}}" },
];

// The spec asks for five links (WORK · SERVICES · PROCESS · ABOUT · CONTACT),
// but the current homepage only renders three anchor targets: #work, #about,
// #contact. SERVICES and PROCESS have no live section to land on, and a link
// that scrolls nowhere is a placeholder in disguise — so those two are
// omitted until the homepage grows the sections back (add ids `services` /
// `process` there and extend this list).
const NAV_ITEMS = [
  { label: "WORK", hash: "work" },
  { label: "ABOUT", hash: "about" },
  { label: "CONTACT", hash: "contact" },
] as const;

const SERVICES_LIST = [
  "Workflow Automation (n8n)",
  "AI Agents & Integrations",
  "Lead Capture & Routing",
  "Web Platforms (React)",
  "CRM & Data Pipelines",
  "Reporting Dashboards",
] as const;

export const Route = createFileRoute("/card")({
  component: CardPage,
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: "description", content: PAGE_DESC },
      { property: "og:title", content: PAGE_TITLE },
      { property: "og:description", content: PAGE_DESC },
      { property: "og:url", content: `${SITE_URL}/card` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/card` }],
  }),
});

// ─── Shared hooks ────────────────────────────────────────────────────────────

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

// ─── Mark ────────────────────────────────────────────────────────────────────

// Same mark as the homepage navbar (Hexagon + lowercase wordmark), at the
// 28px size this page specifies.
function Mark() {
  return (
    <span className="flex items-center gap-2.5">
      <Hexagon className="h-7 w-7 shrink-0 text-accent" strokeWidth={1.5} aria-hidden="true" />
      <span className="text-lg font-medium tracking-tight text-text-primary">
        <span className="tracking-tighter">nyg</span> digital
      </span>
    </span>
  );
}

// ─── Background ──────────────────────────────────────────────────────────────

function CardBackdrop() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);
  const [posterOk, setPosterOk] = useState(true);
  const [videoEligible, setVideoEligible] = useState(false);
  const [videoVisible, setVideoVisible] = useState(false);

  // The poster is server-rendered; if it 404s before React hydrates, the
  // onError prop never fires. Re-check the settled state after hydration.
  useEffect(() => {
    const img = posterRef.current;
    if (img && img.complete && img.naturalWidth === 0) {
      setPosterOk(false);
    }
  }, []);

  // Gate the video, then flip preload inside an idle callback so it never
  // competes with first paint. The poster (when present) is the LCP.
  useEffect(() => {
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean };
      deviceMemory?: number;
    };
    const gated =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      nav.connection?.saveData === true ||
      navigator.hardwareConcurrency <= 4 ||
      (nav.deviceMemory !== undefined && nav.deviceMemory <= 4) ||
      window.innerWidth < 768;
    if (gated) return;

    const requestIdle =
      "requestIdleCallback" in window
        ? window.requestIdleCallback
        : (cb: () => void) => window.setTimeout(cb, 200);
    const idleId = requestIdle(() => setVideoEligible(true));

    return () => {
      if ("cancelIdleCallback" in window && typeof idleId === "number") {
        window.cancelIdleCallback(idleId);
      }
    };
  }, []);

  // Once eligible: load, crossfade in when decodable, pause while hidden.
  useEffect(() => {
    if (!videoEligible) return;
    const el = videoRef.current;
    if (!el) return;

    const onCanPlay = () => {
      el.play()
        .then(() => setVideoVisible(true))
        .catch(() => {
          /* Autoplay refused — poster stays. */
        });
    };
    const onError = () => setVideoEligible(false);
    const onVisibility = () => {
      if (document.hidden) {
        el.pause();
      } else if (videoRef.current && el.readyState >= 3) {
        el.play().catch(() => {});
      }
    };

    el.addEventListener("canplaythrough", onCanPlay);
    el.addEventListener("error", onError, true);
    document.addEventListener("visibilitychange", onVisibility);
    el.preload = "auto";
    el.load();

    return () => {
      el.removeEventListener("canplaythrough", onCanPlay);
      el.removeEventListener("error", onError, true);
      document.removeEventListener("visibilitychange", onVisibility);
      el.pause();
      // Release the decoder.
      el.removeAttribute("src");
      while (el.firstChild) el.removeChild(el.firstChild);
      el.load();
    };
  }, [videoEligible]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-surface-base" aria-hidden="true">
      {posterOk && (
        <img
          ref={posterRef}
          src={POSTER_SRC}
          alt=""
          width={1280}
          height={720}
          fetchPriority="high"
          onError={() => setPosterOk(false)}
          className="absolute inset-0 h-full w-full object-cover lg:scale-[1.2]"
        />
      )}
      {videoEligible && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          poster={posterOk ? POSTER_SRC : undefined}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 lg:scale-[1.2] ${
            videoVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={VIDEO_WEBM_SRC} type="video/webm" />
          <source src={VIDEO_MP4_SRC} type="video/mp4" />
        </video>
      )}
    </div>
  );
}

// ─── UAE clock ───────────────────────────────────────────────────────────────
function UaeClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Dubai",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();

    // Update on the minute boundary, then every minute.
    let intervalId: number | undefined;
    const timeoutId = window.setTimeout(
      () => {
        tick();
        intervalId = window.setInterval(tick, 60_000);
      },
      60_000 - (Date.now() % 60_000),
    );

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId !== undefined) window.clearInterval(intervalId);
    };
  }, []);

  return (
    <span className="tabular-nums">
      UAE • <span className="inline-block min-w-[5ch]">{time ?? "--:--"}</span> GST
    </span>
  );
}

// ─── Showreel modal ──────────────────────────────────────────────────────────

function ShowreelModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [videoMissing, setVideoMissing] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (!open && dialog.open) {
      dialog.close();
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  if (!open) {
    // Keep the dialog out of the DOM when closed — nothing to trap or hide.
    return null;
  }

  return (
    <dialog
      ref={dialogRef}
      aria-label="Live n8n workflow recording"
      onClose={onClose}
      onClick={(e) => {
        // Click on the backdrop (the dialog element itself) closes.
        if (e.target === dialogRef.current) onClose();
      }}
      className="m-auto w-[min(92vw,960px)] border border-border-subtle bg-surface-base p-0 backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-center justify-between border-b border-border-subtle px-4 py-3">
        <span className="font-mono text-xs uppercase tracking-widest text-text-faint">
          n8n workflow — live run
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close showreel"
          className="focus-ring p-2 text-text-muted transition-opacity hover:opacity-70"
        >
          <X size={20} aria-hidden="true" />
        </button>
      </div>
      <div className="aspect-video w-full bg-surface-sunken">
        {videoMissing ? (
          <div className="flex h-full items-center justify-center px-8 text-center">
            <p className="max-w-md text-sm leading-relaxed text-text-muted">
              Recording pending — supply{" "}
              <code className="font-mono text-xs text-text-primary">
                /public/n8n-workflow-demo.mp4
              </code>{" "}
              (30–60s silent screen capture of a workflow executing).
            </p>
          </div>
        ) : (
          <video
            controls
            autoPlay
            muted
            playsInline
            onError={() => setVideoMissing(true)}
            className="h-full w-full"
            src={SHOWREEL_SRC}
          />
        )}
      </div>
    </dialog>
  );
}

// ─── Mobile fullscreen menu ──────────────────────────────────────────────────

function MobileMenu({
  open,
  onClose,
  triggerRef,
}: {
  open: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // Focus trap + Escape + body scroll lock while open.
  useEffect(() => {
    if (!open) return;

    const triggerEl = triggerRef.current;
    document.documentElement.style.overflow = "hidden";
    const focusable = overlayRef.current?.querySelectorAll<HTMLElement>("a, button");
    focusable?.[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && overlayRef.current) {
        const items = Array.from(overlayRef.current.querySelectorAll<HTMLElement>("a, button"));
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = "";
      triggerEl?.focus();
    };
  }, [open, onClose, triggerRef]);

  return (
    <div
      ref={overlayRef}
      inert={!open}
      aria-hidden={!open}
      className={`fixed inset-0 z-50 flex flex-col bg-surface-base/95 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-opacity md:hidden ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-6">
        <Mark />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation menu"
          className="focus-ring p-2 transition-opacity hover:opacity-70"
        >
          <X size={24} aria-hidden="true" />
        </button>
      </div>
      <nav
        aria-label="Card page navigation"
        className="flex flex-1 flex-col items-center justify-center gap-8"
      >
        {NAV_ITEMS.map((item, i) => (
          <Link
            key={item.hash}
            to="/"
            hash={item.hash}
            onClick={onClose}
            style={{
              transitionDelay: open && !reducedMotion ? `${100 + i * 60}ms` : "0ms",
            }}
            className={`focus-ring text-2xl tracking-widest transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:translate-y-0 motion-reduce:transition-opacity ${
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

function CardPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showreelOpen, setShowreelOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const showreelButtonRef = useRef<HTMLButtonElement>(null);

  const closeShowreel = () => {
    setShowreelOpen(false);
    showreelButtonRef.current?.focus();
  };

  return (
    // Route-scoped grade: this page runs hotter text alphas than the homepage
    // (muted 80%, subtle 60%, border 30%) because copy sits directly on video.
    <div className="relative h-screen w-full overflow-hidden bg-surface-base text-text-primary supports-[height:100svh]:h-[100svh] [--color-border-subtle:oklch(0.98_0_0/0.30)] [--color-text-muted:oklch(0.96_0.005_260/0.80)] [--color-text-subtle:oklch(0.96_0.005_260/0.60)]">
      <a
        href="#card-main"
        className="focus-ring sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-surface-base focus:px-4 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>

      <CardBackdrop />

      <div className="relative z-10 flex h-full flex-col px-5 sm:px-6 md:px-10 lg:px-14">
        {/* ── Navbar ── */}
        <header className="flex items-center justify-between py-6">
          <Link to="/" aria-label="nyg digital home" className="focus-ring">
            <Mark />
          </Link>

          <nav aria-label="Card page navigation" className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.hash}
                to="/"
                hash={item.hash}
                className="focus-ring text-sm tracking-wide transition-opacity hover:opacity-70"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            className="focus-ring p-2 transition-opacity hover:opacity-70 md:hidden"
          >
            <Menu size={24} aria-hidden="true" />
          </button>
        </header>

        <main id="card-main" className="flex min-h-0 flex-1 flex-col">
          {/* ── Four-column meta grid ── */}
          <div className="mt-4 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
            <div>
              <h2 className="text-lg leading-tight tracking-wide drop-shadow-md md:text-xl">
                <span className="block font-display font-normal">NYG</span>
                <span className="block font-mono text-2xl md:text-3xl">DIGITAL</span>
              </h2>
              <div className="mt-3 text-[10px] text-text-faint" aria-hidden="true">
                *
              </div>
              <p className="mt-1 font-mono text-xs leading-relaxed text-text-subtle drop-shadow-md">
                NYG Digital is the trading brand of
                <br />
                NYG Digital FZE LLC — we build
                <br />
                the connected systems that remove
                <br />
                manual work from your business
              </p>
            </div>

            <div className="text-right lg:text-left">
              <h2 className="text-lg leading-tight tracking-wide drop-shadow-md md:text-xl">
                <span className="block font-display font-normal">AUTOMATION &</span>
                <span className="block font-mono text-2xl md:text-3xl">SYSTEMS</span>
              </h2>
            </div>

            <div>
              <h3 className="mb-3 font-mono text-base uppercase tracking-widest text-text-faint drop-shadow-md">
                What I Build
              </h3>
              <p className="max-w-[220px] text-sm leading-relaxed text-text-muted drop-shadow-md">
                Operations that run without anyone remembering to run them
              </p>
            </div>

            <div className="text-right lg:text-left">
              <h3 className="mb-3 font-mono text-base uppercase tracking-widest text-text-faint drop-shadow-md">
                Services
              </h3>
              <ul className="space-y-0.5 text-sm leading-relaxed text-text-muted drop-shadow-md">
                {SERVICES_LIST.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex-1" />

          {/* ── Bottom section ── */}
          <div className="pb-4">
            <div className="grid grid-cols-1 items-end gap-4 sm:gap-6 lg:grid-cols-2">
              <h1
                className="font-display text-3xl font-normal uppercase tracking-wide drop-shadow-md sm:text-4xl md:text-5xl lg:text-[3.75rem] xl:text-[4.25rem]"
                style={{ lineHeight: 0.78 }}
              >
                I BUILD THE
                <br />
                <span className="inline-block align-baseline font-mono text-[1.25em] font-normal leading-none">
                  SYSTEMS
                </span>{" "}
                THAT
                <br />
                RUN GROWING
                <br />
                <span className="inline-block align-baseline font-mono text-[1.25em] font-normal leading-none">
                  OPERATIONS
                </span>
              </h1>

              <div className="flex flex-col justify-end gap-4 sm:gap-6">
                <button
                  ref={showreelButtonRef}
                  type="button"
                  onClick={() => setShowreelOpen(true)}
                  className="focus-ring flex items-center gap-3 self-start border border-border-subtle bg-surface-glass px-6 py-3 backdrop-blur-sm transition-colors hover:bg-white/10"
                >
                  <Play size={14} fill="currentColor" aria-hidden="true" />
                  <span className="text-sm tracking-wider">SEE A LIVE WORKFLOW</span>
                </button>

                {PROOF_CHIPS && (
                  <div className="flex flex-wrap items-stretch gap-2 self-start text-sm text-text-muted sm:gap-3 lg:self-end">
                    {PROOF_CHIPS.map((chip) => (
                      <div
                        key={chip.label}
                        className="flex items-center gap-2 bg-surface-chip px-3 py-2 sm:px-4"
                      >
                        <span>{chip.figure}</span>
                        <span className="font-mono text-xs text-text-faint">{chip.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* ── Footer strip ── */}
            <div className="mt-4 grid grid-cols-1 gap-2 pt-4 sm:mt-5 sm:grid-cols-2 sm:gap-4">
              <p className="text-xs text-text-subtle drop-shadow-md">
                Available for automation and web projects.{" "}
                <Link
                  to="/"
                  hash="contact"
                  className="focus-ring text-accent transition hover:brightness-125"
                >
                  Request a systems review
                </Link>
              </p>
              <p className="text-xs text-text-subtle drop-shadow-md sm:text-right">
                <UaeClock />
              </p>
            </div>
          </div>
        </main>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} triggerRef={menuButtonRef} />
      <ShowreelModal open={showreelOpen} onClose={closeShowreel} />
    </div>
  );
}
