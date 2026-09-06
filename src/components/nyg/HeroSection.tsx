import { ArrowDown, ArrowUpRight } from "lucide-react";

export function HeroSection() {
  return (
    <section id="hero-stage" className="hero-section" aria-labelledby="hero-title">
      <div className="page-width hero-layout">
        <div className="hero-copy">
          <h1 id="hero-title">
            Better systems.
            <br />
            <span>Stronger business.</span>
          </h1>
          <p className="hero-description">
            Web development, AI automation, and digital strategy — connected around the way your
            business works.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="button">
              Start a project <ArrowUpRight size={18} />
            </a>
            <a href="#projects" className="text-link">
              Explore the work <ArrowDown size={16} />
            </a>
          </div>
          <p className="hero-location">Based in Ajman. Working across Dubai and the UAE.</p>
        </div>
        <div className="hero-identity" aria-hidden="true">
          <span className="identity-caption">NYG / AGENCY</span>
          <img
            src="/brand/nyg-agency-monogram.svg"
            alt=""
            width="120"
            height="120"
            fetchPriority="high"
          />
          <span className="identity-footnote">Clarity in every connection.</span>
        </div>
      </div>
      <div className="page-width hero-foot">
        <p>
          One considered approach.
          <br />
          <span>From strategy to working systems.</span>
        </p>
        <div>
          <a href="#services">Build</a>
          <a href="#services">Automate</a>
          <a href="#services">Grow</a>
        </div>
        <a href="#services" aria-label="Explore our capabilities">
          <ArrowDown size={20} />
        </a>
      </div>
    </section>
  );
}
