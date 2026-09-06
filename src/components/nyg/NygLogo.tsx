import { cn } from "@/lib/utils";

/** Use the supplied artwork without redrawing the NYG letterforms. */
export function NygLogo({
  className,
  showWordmark = false,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <img
      className={cn(
        "nyg-logo",
        showWordmark ? "nyg-logo-horizontal" : "nyg-logo-monogram",
        className,
      )}
      src={showWordmark ? "/brand/nyg-agency-horizontal.svg" : "/brand/nyg-agency-monogram.svg"}
      alt="NYG Agency"
      width={showWordmark ? 1156 : 120}
      height={showWordmark ? 200 : 120}
      decoding="async"
    />
  );
}
