import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, Pause, Play } from "lucide-react";
import { navigateToSection } from "@/lib/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const links = [
  { name: "Services", href: "/#services", id: "services" },
  { name: "Process", href: "/#approach", id: "approach" },
  { name: "Work", href: "/#work", id: "work" },
  { name: "About", href: "/#about", id: "about" },
];

function handleReviewClick(event: React.MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  navigateToSection("#contact", { focusInput: true });
}

function handleWorkClick(event: React.MouseEvent<HTMLAnchorElement>) {
  if (window.location.pathname !== "/") return;
  event.preventDefault();
  navigateToSection("#work");
}

function BrandLockup() {
  return (
    <span className="brand-lockup-digital">
      <img src="/brand/nyg-agency-monogram.svg" alt="" width="38" height="38" aria-hidden="true" />
      <span>NYG Digital</span>
    </span>
  );
}

export function HeaderNav({
  motionPaused = false,
  onToggleMotion,
}: {
  motionPaused?: boolean;
  onToggleMotion?: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero-stage");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: "-20% 0px -65% 0px" },
    );
    links.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      window.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <nav className="page-width nav-inner" aria-label="Main navigation">
        <a href="/#hero-stage" aria-label="NYG Digital home" className="brand-link">
          <BrandLockup />
        </a>
        <div className="desktop-links">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              aria-current={active === link.id ? "location" : undefined}
              onClick={link.id === "work" ? handleWorkClick : undefined}
            >
              {link.name}
            </a>
          ))}
        </div>
        <div className="nav-actions">
          {onToggleMotion && (
            <button
              className="header-motion-toggle"
              onClick={onToggleMotion}
              aria-pressed={motionPaused}
              aria-label={motionPaused ? "Resume background motion" : "Pause background motion"}
              title={motionPaused ? "Resume background motion" : "Pause background motion"}
            >
              {motionPaused ? (
                <Play size={15} aria-hidden="true" />
              ) : (
                <Pause size={15} aria-hidden="true" />
              )}
            </button>
          )}
          <a href="/#contact" onClick={handleReviewClick} className="button button-small">
            Request a Website Review
          </a>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button
                className="menu-toggle"
                aria-label="Open navigation menu"
                aria-expanded={open}
              >
                <Menu size={22} aria-hidden="true" />
              </button>
            </DialogTrigger>
            <DialogContent className="mobile-menu">
              <DialogTitle>
                <BrandLockup />
              </DialogTitle>
              <DialogDescription className="sr-only">
                Explore NYG Digital web design and development services.
              </DialogDescription>
              <nav aria-label="Mobile navigation">
                {links.map((link) => (
                  <a
                    href={link.href}
                    key={link.id}
                    onClick={(event) => {
                      setOpen(false);
                      if (link.id === "work") handleWorkClick(event);
                    }}
                  >
                    {link.name}
                    <ArrowUpRight size={22} aria-hidden="true" />
                  </a>
                ))}
                <a
                  href="/#contact"
                  className="mobile-menu-review"
                  onClick={(event) => {
                    setOpen(false);
                    handleReviewClick(event);
                  }}
                >
                  Request a Website Review
                </a>
              </nav>
            </DialogContent>
          </Dialog>
        </div>
      </nav>
    </header>
  );
}
