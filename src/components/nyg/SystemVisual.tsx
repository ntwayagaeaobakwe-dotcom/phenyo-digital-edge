import { useId, useRef, useState, type PointerEvent } from "react";
import { ArrowUpRight, Braces, Workflow, Sparkles } from "lucide-react";
const layers = [
  {
    name: "Web",
    icon: Braces,
    title: "A better first impression.",
    detail: "Fast, considered web experiences that turn interest into action.",
  },
  {
    name: "AI",
    icon: Sparkles,
    title: "Intelligence with a purpose.",
    detail: "Practical AI that understands information and supports your team.",
  },
  {
    name: "Automation",
    icon: Workflow,
    title: "Everything, connected.",
    detail: "Tools, data, and workflows moving together with less manual work.",
  },
];
export function SystemVisual({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const id = useId().replace(/:/g, "");
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (
      event.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const rect = event.currentTarget.getBoundingClientRect();
    stage.current?.style.setProperty(
      "--pointer-x",
      `${(event.clientX - rect.left - rect.width / 2) / 45}px`,
    );
    stage.current?.style.setProperty(
      "--pointer-y",
      `${(event.clientY - rect.top - rect.height / 2) / 45}px`,
    );
  };
  return (
    <div
      className={`system-visual ${compact ? "system-visual-compact" : ""}`}
      onPointerMove={move}
      onPointerLeave={() => {
        stage.current?.style.setProperty("--pointer-x", "0px");
        stage.current?.style.setProperty("--pointer-y", "0px");
      }}
    >
      <div className="system-art" ref={stage}>
        <svg
          className="system-svg"
          viewBox="0 0 600 520"
          fill="none"
          role="img"
          aria-label="Three connected layers representing web experiences, AI intelligence, and business automation"
        >
          <defs>
            <linearGradient
              id={`${id}-metal`}
              x1="100"
              y1="120"
              x2="430"
              y2="380"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#f2f5f3" />
              <stop offset=".35" stopColor="#7d7f82" />
              <stop offset=".65" stopColor="#2a2c2f" />
              <stop offset="1" stopColor="#dfe1e4" />
            </linearGradient>
            <linearGradient
              id={`${id}-plate`}
              x1="300"
              y1="100"
              x2="300"
              y2="430"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#35373a" />
              <stop offset="1" stopColor="#131518" />
            </linearGradient>
            <radialGradient id={`${id}-halo`}>
              <stop stopColor="#acaeb1" stopOpacity=".14" />
              <stop offset="1" stopColor="#acaeb1" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="300" cy="290" rx="290" ry="220" fill={`url(#${id}-halo)`} />
          <g stroke="#96989b" strokeOpacity=".12">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <path
                key={i}
                d={`M${60 + i * 50} 150L${300 + i * 50} 390M${60 + i * 50} 390L${300 + i * 50} 150`}
              />
            ))}
            <path d="M300 32V470M30 270H570" strokeDasharray="3 7" />
          </g>
          {[2, 1, 0].map((layer) => (
            <g
              key={layer}
              className={`system-layer ${active === layer ? "active" : ""}`}
              style={{ transform: `translateY(${layer * 69}px)` }}
            >
              <path
                d="M300 83L512 190Q527 198 512 207L315 308Q300 317 285 308L88 207Q73 199 88 190L285 83Q300 75 315 83"
                fill={`url(#${id}-plate)`}
                stroke={`url(#${id}-metal)`}
                strokeWidth="1.3"
              />
              <path
                d="M80 199V215Q80 222 91 228L287 328Q300 334 313 328L511 228Q521 222 521 215V199"
                fill="#141619"
                stroke="#6f7174"
                strokeOpacity=".5"
              />
              <path
                className="layer-outline"
                d="M300 95L498 199L300 302L102 199Z"
                stroke="#c5c7ca"
                strokeOpacity=".15"
              />
              <path d="M174 199L300 134L427 199L300 265Z" stroke="#c5c7ca" strokeOpacity=".22" />
              <path
                className="data-path"
                d="M103 199L300 302L498 199"
                pathLength="1"
                stroke="#d7d9dc"
                strokeWidth="2"
              />
              <path
                d="M298 169L357 199L298 230L241 199Z"
                fill="#181a1d"
                stroke={`url(#${id}-metal)`}
              />
              {layer === 0 && (
                <image
                  href="/brand/nyg-agency-monogram.svg"
                  x="270"
                  y="171"
                  width="56"
                  height="56"
                />
              )}
              <circle cx="103" cy="199" r="4" fill={active === layer ? "#e2e4e7" : "#6d6f72"} />
              <circle cx="498" cy="199" r="3" fill={active === layer ? "#e2e4e7" : "#6d6f72"} />
            </g>
          ))}
          <g
            className="system-annotation"
            fontFamily="Manrope Variable, sans-serif"
            fontSize="11"
            fill="#b0b2b5"
          >
            <path d="M449 139H517V112" stroke="#7c7e81" strokeWidth=".7" fill="none" />
            <text x="477" y="101">
              WEB LAYER
            </text>
            <path d="M140 300H60V323" stroke="#7c7e81" strokeWidth=".7" fill="none" />
            <text x="35" y="344">
              INTELLIGENCE
            </text>
            <path d="M453 373H521V400" stroke="#7c7e81" strokeWidth=".7" fill="none" />
            <text x="453" y="421">
              AUTOMATION
            </text>
          </g>
        </svg>
        <span className="system-coordinate">NYG / CONNECTED SYSTEMS</span>
      </div>
      {!compact && (
        <div className="system-controls">
          <div className="system-tabs" role="group" aria-label="Explore the connected system">
            {layers.map((layer, i) => (
              <button
                key={layer.name}
                type="button"
                aria-pressed={active === i}
                onClick={() => setActive(i)}
              >
                <layer.icon size={14} />
                {layer.name}
              </button>
            ))}
          </div>
          <div className="system-caption" aria-live="polite">
            <span>{layers[active].title}</span>
            <p>{layers[active].detail}</p>
            <ArrowUpRight size={17} />
          </div>
        </div>
      )}
    </div>
  );
}
