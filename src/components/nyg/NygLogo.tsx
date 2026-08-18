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
        className="w-8 h-8 shrink-0 transition-transform duration-300 group-hover:scale-105"
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
          rx="8"
          fill="#082D2D"
          stroke="rgba(184, 181, 172, 0.25)"
          strokeWidth="1"
        />

        {/* N Path - Continuous routing line from bottom-left to top-center */}
        <path
          d="M8 26V10L18 26V10"
          stroke="#F3F0E8"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Y-G Connecting Convergence Junction */}
        <path
          d="M18 10L24 18L30 10"
          stroke="#5FD8CD"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24 18V26H29V21.5H25.5"
          stroke="#CEDDD9"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Active Signal Pulse Point */}
        <circle cx="24" cy="18" r="2" fill="#5FD8CD" />
      </svg>

      {showWordmark && (
        <span className="flex flex-col text-left leading-none">
          <span className="font-sans font-bold text-sm tracking-tight text-[#F3F0E8]">
            NYG<span className="text-[#5FD8CD] font-light ml-1 text-xs tracking-wider">DIGITAL</span>
          </span>
        </span>
      )}
    </div>
  );
}

