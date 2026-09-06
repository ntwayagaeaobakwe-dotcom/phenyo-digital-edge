import type { SVGProps } from "react";
import { cn } from "@/lib/utils";
interface NygLogoProps extends SVGProps<SVGSVGElement> {
  showWordmark?: boolean;
}
export function NygLogo({ className, showWordmark = false, ...props }: NygLogoProps) {
  return (
    <span className={cn("nyg-logo", className)}>
      <svg viewBox="0 0 36 36" fill="none" aria-hidden="true" {...props}>
        <path
          d="M4 29V7L17 29V7M20 7L26 16L32 7M26 16V29H33V22H28"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </svg>
      {showWordmark && (
        <span>
          NYG<span className="wordmark-digital">DIGITAL</span>
        </span>
      )}
    </span>
  );
}
