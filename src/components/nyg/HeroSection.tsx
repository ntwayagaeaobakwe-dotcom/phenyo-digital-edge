import { ArrowDown, ArrowUpRight } from "lucide-react";
import { SystemVisual } from "./SystemVisual";
import { AVAILABILITY_STATUS } from "./HeaderNav";
export function HeroSection() {
  return (
    <section id="hero-stage" className="hero-section">
      <div className="page-width hero-layout">
        <div className="hero-copy">
          <h1>
            We build digital
            <br className="desktop-break" /> systems that
            <br className="desktop-break" /> <span>work smarter.</span>
          </h1>
          <p className="hero-description">
            Web development, practical AI solutions, and n8n workflow automation for businesses in
            Ajman, Dubai, and across the UAE.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="button">
              Start a project <ArrowUpRight size={18} />
            </a>
            <a href="#projects" className="text-link">
              Explore our work <ArrowDown size={16} />
            </a>
          </div>
          <p className="availability">
            <span />
            {AVAILABILITY_STATUS}
            <span className="availability-separator">/</span>Based in the UAE
          </p>
        </div>
        <SystemVisual />
      </div>
      <div className="page-width hero-foot">
        <p>
          From first impression.
          <br />
          <span>To everything that happens next.</span>
        </p>
        <div>
          <span>Web development</span>
          <span>AI solutions</span>
          <span>Business automation</span>
        </div>
        <a href="#services" aria-label="Scroll to services">
          <ArrowDown size={20} />
        </a>
      </div>
    </section>
  );
}
