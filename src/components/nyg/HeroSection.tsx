import { ArrowDown, ArrowUpRight } from "lucide-react";

export function HeroSection() {
  return (
    <section id="hero-stage" className="hero-section hero-sculpture" aria-labelledby="hero-title">
      <div className="page-width hero-layout">
        <picture className="hero-artwork" aria-hidden="true">
          <img
            src="/brand/platinum-sculpture.webp"
            srcSet="/brand/platinum-sculpture-960.webp 960w, /brand/platinum-sculpture.webp 1600w"
            sizes="(max-width: 639px) 100vw, (max-width: 899px) 65vw, 78vw"
            alt=""
            width="1600"
            height="1200"
            fetchPriority="high"
          />
        </picture>
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
        </div>
      </div>
      <div className="page-width hero-foot">
        <p>
          Based in Ajman. <span>Working across Dubai and the UAE.</span>
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
