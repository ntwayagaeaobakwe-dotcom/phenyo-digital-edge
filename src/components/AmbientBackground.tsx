import { useLocation } from "@tanstack/react-router";

export function AmbientBackground() {
  const { pathname } = useLocation();
  const suppressed = pathname === "/card";

  if (suppressed) return null;

  return (
    <div
      className="fixed inset-0 -z-50 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Hexagon pattern background */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='103.923' viewBox='0 0 60 103.923' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 17.32v34.641L30 69.282 0 51.961V17.32zM30 103.923l30-17.32V51.961L30 34.641 0 51.961v34.641z' fill-opacity='0' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 103.923px",
        }}
      />
      {/* Orange accent glow */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,var(--color-accent),transparent_60%)] opacity-[0.08] blur-3xl rounded-full translate-x-1/3 -translate-y-1/3" />
    </div>
  );
}
