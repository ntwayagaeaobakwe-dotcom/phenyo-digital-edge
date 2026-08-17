import React from "react";
import { cn } from "@/lib/utils";

interface NygLogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  showWordmark?: boolean;
}

export function NygLogo({ className, showWordmark = false, ...props }: NygLogoProps) {
  return (
    <div className={cn("inline-flex items-center gap-3 select-none", className)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 36 36"
        fill="none"
        className="w-9 h-9 shrink-0 transition-transform duration-300 group-hover:scale-105"
        aria-hidden="true"
        {...props}
      >
        {/* NYG Geometric Signal Router Mark */}
        {/* Outer subtle structural frame */}
        <rect
          x="1"
          y="1"
          width="34"
          height="34"
          rx="9"
          fill="#100C1D"
          stroke="rgba(196, 190, 255, 0.2)"
          strokeWidth="1.2"
        />

        {/* N Path - Continuous routing line from bottom-left to top-center */}
        <path
          d="M8 26V10L18 26V10"
          stroke="#F5F6FA"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Y-G Connecting Convergence Junction */}
        <path
          d="M18 10L24 18L30 10"
          stroke="#78E7FF"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24 18V26H29V21.5H25.5"
          stroke="#7657FF"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Active Signal Pulse Point */}
        <circle cx="24" cy="18" r="2" fill="#FF5577" />
      </svg>

      {showWordmark && (
        <span className="flex flex-col text-left leading-none">
          <span className="font-display font-bold text-sm tracking-tight text-text-primary">
            NYG<span className="text-[#78E7FF] font-sans font-light ml-1.5 text-xs tracking-normal">DIGITAL</span>
          </span>
        </span>
      )}
    </div>
  );
}
