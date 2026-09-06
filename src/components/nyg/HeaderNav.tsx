import { useEffect, useState } from "react";
import { ArrowUpRight, Menu } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NygLogo } from "./NygLogo";
import { navigateToSection } from "@/lib/navigation";

export const AVAILABILITY_STATUS = "Available for select projects";
const links = [
  { name: "Services", id: "services" },
  { name: "Work", id: "projects" },
  { name: "Studio", id: "about" },
  { name: "Process", id: "process" },
];

export function HeaderNav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -60% 0px" },
    );
    ["hero-stage", ...links.map((link) => link.id), "systems", "diagnostic", "contact"].forEach(
      (id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      },
    );
    const desktop = window.matchMedia("(min-width: 900px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      window.removeEventListener("scroll", update);
      observer.disconnect();
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, []);
  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <nav className="page-width nav-inner" aria-label="Main navigation">
        <a href="#hero-stage" aria-label="NYG Digital home" className="brand-link">
          <NygLogo showWordmark />
        </a>
        <div className="desktop-links">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              aria-current={active === link.id ? "location" : undefined}
            >
              {link.name}
            </a>
          ))}
        </div>
        <div className="nav-actions">
          <a href="#contact" className="button button-small">
            Start a project <ArrowUpRight size={15} />
          </a>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button className="menu-toggle" aria-label="Open navigation menu">
                <Menu size={22} />
              </button>
            </DialogTrigger>
            <DialogContent className="mobile-menu">
              <DialogTitle>
                <NygLogo showWordmark />
              </DialogTitle>
              <DialogDescription className="sr-only">
                Explore NYG Digital and start a project.
              </DialogDescription>
              <nav aria-label="Mobile navigation">
                {[
                  ...links,
                  { name: "Interactive demo", id: "systems" },
                  { name: "Contact", id: "contact" },
                ].map((link, i) => (
                  <a
                    href={`#${link.id}`}
                    key={link.id}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen(false);
                      window.setTimeout(() => navigateToSection(link.id), 150);
                    }}
                  >
                    <span className="menu-index">0{i + 1}</span>
                    {link.name}
                    <ArrowUpRight size={24} />
                  </a>
                ))}
              </nav>
              <p className="availability">
                <span />
                {AVAILABILITY_STATUS}
              </p>
            </DialogContent>
          </Dialog>
        </div>
      </nav>
    </header>
  );
}
