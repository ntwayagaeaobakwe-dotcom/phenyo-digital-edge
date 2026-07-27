/**
 * IndustryAutomationDemo
 *
 * Animated demonstration of an automated inquiry workflow for two industries.
 * - Customer messages: LEFT-aligned, dark glass surface
 * - Automated responses: RIGHT-aligned, gold-accented surface
 * - Typing indicator: RIGHT-aligned (bot is composing)
 * - Four workflow steps activate in sync with conversation events
 * - Decorative chat panel is aria-hidden; a static sr-only transcript is
 *   always available for screen readers
 * - A single aria-live region announces tab or replay changes (once)
 * - prefers-reduced-motion: all messages and steps appear instantly
 * - All timers are flushed on tab change, replay, and unmount
 */
import { useState, useRef, useEffect } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import {
  RotateCcw,
  CheckCircle2,
  Circle,
  MessageSquare,
  ArrowRight,
  X,
} from "lucide-react";
import {
  INDUSTRY_DEMOS,
  type DemoMessage,
  type IndustryDemoIndustry,
} from "@/data/portfolio-data";

// ─── Scroll to contact + set sessionStorage context ──────────────────────────

function scrollToContactWith(industryContext: string): void {
  try {
    sessionStorage.setItem("pendingIndustryContext", industryContext);
    window.dispatchEvent(new CustomEvent("industryContextSet"));
  } catch {
    // sessionStorage may be restricted in some browser contexts
  }
  const el = document.getElementById("contact");
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// ─── Pure animation runner (defined outside component to avoid stale closures) ─

type Setter<T> = React.Dispatch<React.SetStateAction<T>>;

interface AnimSetters {
  setVisibleCount: Setter<number>;
  setActiveStep: Setter<number>;
  setShowTyping: Setter<boolean>;
  setShowReplay: Setter<boolean>;
}

function getMaxStep(messages: DemoMessage[]): number {
  return messages.reduce(
    (max, m) =>
      m.activatesStep !== undefined && m.activatesStep > max ? m.activatesStep : max,
    -1,
  );
}

function runAnimation(
  messages: DemoMessage[],
  timers: React.MutableRefObject<ReturnType<typeof setTimeout>[]>,
  prefersReducedMotion: boolean,
  s: AnimSetters,
): void {
  // Cancel any existing sequence
  timers.current.forEach(clearTimeout);
  timers.current = [];

  // Synchronous state reset
  s.setVisibleCount(0);
  s.setActiveStep(-1);
  s.setShowTyping(false);
  s.setShowReplay(false);

  // Reduced-motion: show everything immediately
  if (prefersReducedMotion) {
    s.setVisibleCount(messages.length);
    s.setActiveStep(getMaxStep(messages));
    s.setShowReplay(true);
    return;
  }

  function sched(delay: number, fn: () => void): void {
    timers.current.push(setTimeout(fn, delay));
  }

  // Build schedule: customer messages appear faster, bot messages preceded by
  // a 1.2 s typing indicator
  let t = 0;
  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];
    const isBot = msg.from === "bot" || msg.from === "system";

    if (isBot) {
      // Show typing indicator
      const tShow = t;
      sched(tShow, () => s.setShowTyping(true));
      t += 1200;
      // Hide just before message appears
      const tHide = t;
      sched(tHide, () => s.setShowTyping(false));
    }

    // Show message (and optionally activate a workflow step)
    const tMsg = t;
    const idx = i;
    const step = msg.activatesStep;
    sched(tMsg, () => {
      s.setVisibleCount(idx + 1);
      if (step !== undefined) s.setActiveStep(step);
    });

    // Inter-message gap
    if (i < messages.length - 1) {
      t += isBot ? 900 : 700;
    }
  }

  // Replay button appears after the last message
  sched(t + 800, () => s.setShowReplay(true));
}

// ─── ChatPanel ───────────────────────────────────────────────────────────────

interface ChatPanelProps {
  messages: DemoMessage[];
  visibleCount: number;
  showTyping: boolean;
}

function ChatPanel({ messages, visibleCount, showTyping }: ChatPanelProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll when new content appears
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [visibleCount, showTyping]);

  return (
    <div className="relative glass rounded-3xl overflow-hidden border border-primary/20 shadow-[var(--shadow-elegant)]">
      {/* Chat header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border/60 bg-black/40">
        <div className="grid h-8 w-8 place-items-center rounded-full bg-primary/20 border border-primary/30 shrink-0">
          <MessageSquare className="h-4 w-4 text-primary" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <div className="text-xs font-medium text-foreground truncate">Automated Assistant</div>
          <div className="text-[10px] text-muted-foreground font-mono">Example Workflow</div>
        </div>
        <div className="ml-auto flex items-center gap-1.5 shrink-0">
          <span className="h-1.5 w-1.5 rounded-full bg-primary/50" />
          <span className="text-[10px] font-mono text-muted-foreground hidden sm:block">
            Interactive Example
          </span>
        </div>
      </div>

      {/* Message area */}
      <div
        className="flex flex-col gap-3 p-4 min-h-[300px] max-h-[380px] overflow-y-auto"
        role="presentation"
      >
        {messages.slice(0, visibleCount).map((msg, i) => {
          const isBot = msg.from === "bot" || msg.from === "system";
          return (
            <div
              key={`${msg.from}-${i}`}
              className={`flex flex-col gap-1 chat-msg ${isBot ? "items-end" : "items-start"}`}
            >
              {/* Speaker label */}
              <span
                className={`text-[10px] font-mono uppercase tracking-wider ${
                  isBot ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {msg.label}
              </span>

              {/* Bubble */}
              <div
                className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  isBot
                    ? "glass-gold border border-primary/30 text-foreground rounded-tr-sm"
                    : "glass border border-border/60 text-muted-foreground rounded-tl-sm"
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}

        {/* Typing indicator — RIGHT-aligned, decorative */}
        {showTyping && (
          <div className="flex flex-col items-end gap-1 chat-msg">
            <span className="text-[10px] font-mono uppercase tracking-wider text-primary">
              Automated Assistant
            </span>
            <div className="glass-gold border border-primary/30 rounded-2xl rounded-tr-sm px-4 py-3 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-primary animate-typing-dot-1" />
              <span className="h-2 w-2 rounded-full bg-primary animate-typing-dot-2" />
              <span className="h-2 w-2 rounded-full bg-primary animate-typing-dot-3" />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}

// ─── WorkflowSteps ────────────────────────────────────────────────────────────

interface WorkflowStepsProps {
  steps: IndustryDemoIndustry["workflowSteps"];
  activeStep: number;
}

function WorkflowSteps({ steps, activeStep }: WorkflowStepsProps) {
  return (
    <div className="glass rounded-3xl p-5 border border-border/60 shadow-[var(--shadow-elegant)]">
      <div className="text-xs font-mono uppercase tracking-widest text-primary font-semibold mb-5">
        How It Works
      </div>
      <div className="flex flex-col">
        {steps.map((step, i) => {
          const isDone = i <= activeStep;
          const isCurrent = i === activeStep;
          return (
            <div key={step.label} className="flex gap-3">
              {/* Timeline dot + connector */}
              <div className="flex flex-col items-center">
                <div
                  className={`h-7 w-7 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-500 ${
                    isDone
                      ? "border-primary bg-primary/20 text-primary"
                      : "border-border/40 text-border/40"
                  } ${isCurrent ? "shadow-[0_0_14px_oklch(0.82_0.15_85/0.45)]" : ""}`}
                  aria-hidden="true"
                >
                  {isDone ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : (
                    <Circle className="h-3.5 w-3.5 opacity-40" />
                  )}
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`w-px flex-1 min-h-[20px] my-1 transition-colors duration-700 ${
                      isDone ? "bg-primary/40" : "bg-border/30"
                    }`}
                    aria-hidden="true"
                  />
                )}
              </div>

              {/* Step text */}
              <div
                className={`pb-5 pt-0.5 transition-opacity duration-400 ${
                  isDone ? "opacity-100" : "opacity-35"
                }`}
              >
                <div
                  className={`text-sm font-display font-bold ${
                    isDone ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  {step.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── ComparisonSection ────────────────────────────────────────────────────────

const WITHOUT_ITEMS = [
  "Inquiries wait until someone becomes available",
  "Staff repeatedly ask the same questions",
  "Customer details remain scattered across chats",
  "Follow-ups depend on memory",
  "Requests can be forgotten during busy periods",
] as const;

const WITH_ITEMS = [
  "The customer receives an immediate acknowledgment",
  "Essential information is collected consistently",
  "Lead details are organized automatically",
  "The correct person is notified",
  "The next follow-up step can be prepared",
] as const;

function ComparisonSection() {
  return (
    <div className="mt-10 border-t border-border/40 pt-10">
      <h3 className="font-display text-2xl sm:text-3xl font-bold text-center mb-8">
        What changes when the first response is{" "}
        <span className="text-gradient-gold">handled automatically?</span>
      </h3>
      <div className="grid sm:grid-cols-2 gap-5">
        {/* Without */}
        <div className="glass rounded-2xl p-6 border border-red-500/20 bg-red-500/5">
          <div className="text-xs font-mono uppercase tracking-widest text-red-400 font-semibold mb-4">
            Without a connected system
          </div>
          <ul className="space-y-2.5" role="list">
            {WITHOUT_ITEMS.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <X
                  className="mt-0.5 h-3.5 w-3.5 text-red-400/70 shrink-0"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* With */}
        <div className="glass-gold rounded-2xl p-6 border border-primary/30">
          <div className="text-xs font-mono uppercase tracking-widest text-primary font-semibold mb-4">
            With a connected system
          </div>
          <ul className="space-y-2.5" role="list">
            {WITH_ITEMS.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 text-primary shrink-0"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ─── IndustryAutomationDemo (main export) ────────────────────────────────────

export function IndustryAutomationDemo() {
  // ── State ──────────────────────────────────────────────────────────────────
  const [activeTabId, setActiveTabId] = useState<string>(INDUSTRY_DEMOS[0].id);
  const [visibleCount, setVisibleCount] = useState(0);
  const [activeStep, setActiveStep] = useState(-1);
  const [showTyping, setShowTyping] = useState(false);
  const [showReplay, setShowReplay] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  // ── Refs ───────────────────────────────────────────────────────────────────
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const statusTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasPlayedRef = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotionRef = useRef(false);

  // Always-current reference to the active industry (used inside stable closures)
  const activeIndustry = INDUSTRY_DEMOS.find((d) => d.id === activeTabId) ?? INDUSTRY_DEMOS[0];
  const activeIndustryRef = useRef<IndustryDemoIndustry>(activeIndustry);
  activeIndustryRef.current = activeIndustry;

  // Stable state setters reference (useState setters are guaranteed stable)
  const setters: AnimSetters = { setVisibleCount, setActiveStep, setShowTyping, setShowReplay };

  // ── Helpers ────────────────────────────────────────────────────────────────

  function announce(msg: string): void {
    setStatusMsg(msg);
    if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
    statusTimerRef.current = setTimeout(() => setStatusMsg(""), 2500);
  }

  function showAllInstantly(industry: IndustryDemoIndustry): void {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setVisibleCount(industry.messages.length);
    setActiveStep(getMaxStep(industry.messages));
    setShowTyping(false);
    setShowReplay(true);
  }

  // ── Event handlers ─────────────────────────────────────────────────────────

  function handleTabChange(id: string): void {
    const industry = INDUSTRY_DEMOS.find((d) => d.id === id) ?? INDUSTRY_DEMOS[0];
    announce(`Showing ${industry.label} example.`);
    setActiveTabId(id);
    if (prefersReducedMotionRef.current) {
      showAllInstantly(industry);
    } else {
      runAnimation(industry.messages, timersRef, false, setters);
    }
  }

  function handleReplay(): void {
    announce("Replaying example.");
    if (prefersReducedMotionRef.current) {
      showAllInstantly(activeIndustryRef.current);
    } else {
      runAnimation(activeIndustryRef.current.messages, timersRef, false, setters);
    }
  }

  // ── Effects ────────────────────────────────────────────────────────────────

  // Reduced-motion detection + IntersectionObserver for auto-play (mount only)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotionRef.current = mq.matches;

    // Show everything immediately if reduced motion already active
    if (mq.matches && !hasPlayedRef.current) {
      hasPlayedRef.current = true;
      showAllInstantly(activeIndustryRef.current);
    }

    // React to OS-level changes during the session
    const mqHandler = (e: MediaQueryListEvent): void => {
      prefersReducedMotionRef.current = e.matches;
      if (e.matches) showAllInstantly(activeIndustryRef.current);
    };
    mq.addEventListener("change", mqHandler);

    // Auto-play once when section scrolls into view
    const el = sectionRef.current;
    if (!el) {
      return () => mq.removeEventListener("change", mqHandler);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !hasPlayedRef.current) {
            hasPlayedRef.current = true;
            runAnimation(
              activeIndustryRef.current.messages,
              timersRef,
              prefersReducedMotionRef.current,
              // State setters are stable — safe to pass from initial render
              { setVisibleCount, setActiveStep, setShowTyping, setShowReplay },
            );
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);

    return () => {
      mq.removeEventListener("change", mqHandler);
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cleanup all timers on unmount
  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
      if (statusTimerRef.current) clearTimeout(statusTimerRef.current);
    };
  }, []);

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <section
      ref={sectionRef}
      id="industry-demo"
      className="relative py-20 sm:py-28 border-t border-border/40"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-80 w-[600px] rounded-full bg-primary/5 blur-3xl opacity-60" />
      </div>

      {/* ── Accessibility: single aria-live region for tab/replay announcements ── */}
      <div aria-live="polite" aria-atomic="true" className="sr-only" role="status">
        {statusMsg}
      </div>

      {/* ── Accessibility: always-available static conversation transcript ────── */}
      <div className="sr-only">
        <h2>Interactive example: {activeIndustry.label} inquiry workflow</h2>
        <p>
          This is a simulated example of how an automated inquiry response system could work.
          It is not a live customer conversation.
        </p>
        <dl>
          {activeIndustry.messages.map((msg, i) => (
            <div key={i}>
              <dt>{msg.label}</dt>
              <dd>{msg.text}</dd>
            </div>
          ))}
        </dl>
        <p>
          Workflow steps: {activeIndustry.workflowSteps.map((s) => s.label).join(", ")}.
        </p>
        <p>Benefit: {activeIndustry.benefitStatement}</p>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section header */}
        <div className="mb-10 max-w-3xl">
          <div className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-primary font-semibold">
            <span className="h-px w-8 bg-gradient-to-r from-primary to-transparent" />
            See the System in Action
          </div>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl font-bold leading-[1.05] tracking-tight">
            From New Inquiry to the{" "}
            <span className="text-gradient-gold">Next Action</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Choose an industry to see how a routine customer inquiry could be acknowledged,
            organized, and prepared for follow-up.
          </p>
          <p className="mt-2 text-xs font-mono text-muted-foreground/60">
            Interactive Example — Example workflow, not a live customer conversation.
          </p>
        </div>

        {/* ── Industry tabs ─────────────────────────────────────────────────── */}
        <Tabs.Root value={activeTabId} onValueChange={handleTabChange}>
          <Tabs.List
            className="inline-flex items-center p-1 bg-black/50 rounded-xl border border-border/60 gap-1 mb-8"
            aria-label="Choose an industry example"
          >
            {INDUSTRY_DEMOS.map((industry) => (
              <Tabs.Trigger
                key={industry.id}
                value={industry.id}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                  activeTabId === industry.id
                    ? "bg-primary text-primary-foreground font-bold shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
              >
                {industry.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {INDUSTRY_DEMOS.map((industry) => (
            <Tabs.Content
              key={industry.id}
              value={industry.id}
              className="outline-none"
            >
              <div className="grid lg:grid-cols-[1fr_310px] gap-6 items-start">
                {/* Left: animated chat (decorative — hidden from screen readers) */}
                <div>
                  <div aria-hidden="true">
                    <ChatPanel
                      messages={industry.messages}
                      visibleCount={visibleCount}
                      showTyping={showTyping}
                    />
                  </div>

                  {/* Replay row — outside aria-hidden so screen readers can use it */}
                  <div className="mt-3 flex items-center justify-between px-1">
                    <p className="text-[11px] text-muted-foreground/50 font-mono">
                      Interactive Example
                    </p>
                    {showReplay && (
                      <button
                        type="button"
                        onClick={handleReplay}
                        aria-label="Replay demonstration"
                        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-mono cursor-pointer"
                      >
                        <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                        Replay
                      </button>
                    )}
                  </div>
                </div>

                {/* Right: workflow steps + benefit + CTA */}
                <div className="flex flex-col gap-4">
                  <WorkflowSteps
                    steps={industry.workflowSteps}
                    activeStep={activeStep}
                  />

                  {/* Benefit statement */}
                  <div className="glass-gold rounded-2xl p-4 border border-primary/25">
                    <div className="text-xs font-mono uppercase tracking-widest text-primary mb-2 font-semibold">
                      Practical Benefit
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {industry.benefitStatement}
                    </p>
                  </div>

                  {/* Industry-specific CTA */}
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToContactWith(industry.ctaIndustryContext);
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:opacity-95 transition-all shadow-[var(--shadow-gold)] hover:shadow-[var(--shadow-gold-hover)] font-display"
                  >
                    {industry.ctaLabel}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </Tabs.Content>
          ))}
        </Tabs.Root>

        {/* Comparison section */}
        <ComparisonSection />

        {/* Bottom disclaimer */}
        <p className="mt-8 text-center text-xs font-mono text-muted-foreground/50">
          Examples shown for real estate and cleaning services. Similar systems can be adapted to
          other service businesses.
        </p>
      </div>
    </section>
  );
}
