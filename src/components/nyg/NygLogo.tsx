import type { SVGProps } from "react";
import { cn } from "@/lib/utils";
interface NygLogoProps extends SVGProps<SVGSVGElement> {
  showWordmark?: boolean;
}
export function NygLogo({ className, showWordmark = false, ...props }: NygLogoProps) {
  return (
    <span className={cn("nyg-logo", className)}>
      <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" {...props}>
        <path
          d="M7 37V11l18 26V11M23 11l8 10 8-10M31 21v16M40 25h-8v12h9V29h-5"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
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
