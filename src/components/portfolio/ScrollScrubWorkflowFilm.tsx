import { useEffect, useRef, useState } from "react";
import { Play, RotateCcw } from "lucide-react";
const stages = [
  ["Inquiry received", "Website, WhatsApp, or form"],
  ["Details organized", "Contact, service needed, and urgency"],
  ["Lead qualified", "Checked against your criteria"],
  ["Team notified", "Instant alert to the right person"],
  ["Next step prepared", "Follow-up scheduled and logged"],
];
/** Retains the existing film and replay; native playback also works on touch devices. */
export function ScrollScrubWorkflowFilm({ onReplayClick }: { onReplayClick?: () => void }) {
  const video = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(0);
  const [failed, setFailed] = useState(false);
  const [played, setPlayed] = useState(false);
  useEffect(() => {
    const pause = () => {
      if (document.hidden) video.current?.pause();
    };
    document.addEventListener("visibilitychange", pause);
    return () => document.removeEventListener("visibilitychange", pause);
  }, []);
  return (
    <div className="workflow-film">
      {failed ? (
        <p className="project-notice">
          The film could not load. You can follow all five stages below or try the interactive
          workflow above.
        </p>
      ) : (
        <video
          ref={video}
          controls
          muted
          playsInline
          preload="none"
          poster="/workflow-studio/workflow-lead-routing-complete.webp"
          aria-label="Lead routing workflow demonstration"
          onError={() => setFailed(true)}
          onTimeUpdate={() => {
            const el = video.current;
            if (el && el.duration)
              setActive(Math.min(4, Math.floor((el.currentTime / el.duration) * 5)));
          }}
        >
          <source src="/workflow-studio/workflow-lead-routing.webm" type="video/webm" />
          <source src="/workflow-studio/workflow-lead-routing.mp4" type="video/mp4" />
        </video>
      )}
      {!failed && (
        <button
          className="text-link"
          onClick={async () => {
            const el = video.current;
            if (!el) return;
            el.currentTime = 0;
            try {
              await el.play();
              setPlayed(true);
              onReplayClick?.();
            } catch {
              setFailed(true);
            }
          }}
        >
          {played ? <RotateCcw size={15} /> : <Play size={15} />}{" "}
          {played ? "Replay flow" : "Play workflow film"}
        </button>
      )}
      <ol className="film-transcript" aria-label="Lead routing workflow transcript">
        {stages.map(([title, detail], index) => (
          <li key={title} aria-current={index === active ? "step" : undefined}>
            <strong>
              {String(index + 1).padStart(2, "0")} / {title}
            </strong>
            <span>{detail}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
