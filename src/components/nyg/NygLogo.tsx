import { cn } from "@/lib/utils";

/** Use the supplied artwork without redrawing the NYG letterforms. */
export function NygLogo({
  className,
  showWordmark = false,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  if (showWordmark) {
    return (
      <span className={cn("brand-lockup-digital", className)}>
        <img
          src="/brand/nyg-agency-monogram.svg"
          alt=""
          width="38"
          height="38"
          aria-hidden="true"
          decoding="async"
        />
        <span>NYG Digital</span>
      </span>
    );
  }
  return (
    <img
      className={cn("nyg-logo", "nyg-logo-monogram", className)}
      src="/brand/nyg-agency-monogram.svg"
      alt="NYG Digital"
      width={120}
      height={120}
      decoding="async"
    />
  );
}
