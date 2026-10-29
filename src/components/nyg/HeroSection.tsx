import { navigateToSection } from "@/lib/navigation";
import "./hero-section.css";

export function HeroSection() {
  const handleContactClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigateToSection("#contact", { focusInput: true });
  };

  const handleServicesClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    navigateToSection("#services");
  };

  return (
    <section id="hero-stage" className="hero-contractor-section" aria-labelledby="hero-title">
      <div className="page-width hero-contractor-container">
        <div className="hero-copy-column">
          <h1 id="hero-title" className="hero-main-heading">
            Websites for contractors who build{" "}
            <span className="hero-heading-highlight">exceptional commercial spaces.</span>
          </h1>

          <p className="hero-sub-description">
            NYG Digital designs and develops premium websites for{" "}
            <strong>
              tenant improvement, commercial build-out, and interior fit-out contractors.
            </strong>
          </p>

          <div className="hero-cta-group">
            <a
              href="#contact"
              onClick={handleContactClick}
              className="hero-btn-primary"
              id="hero-cta-review"
            >
              <span>Request a Website Review</span>
            </a>

            <a
              href="#services"
              onClick={handleServicesClick}
              className="hero-btn-secondary"
              id="hero-cta-services"
            >
              <span>Explore Services</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
