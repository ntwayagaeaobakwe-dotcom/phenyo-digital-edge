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
            Web design &amp; development.
            <br />
            <span>Built for ambitious businesses.</span>
          </h1>
          <p className="hero-description">
            Fast, polished business websites that build credibility, clarify your services and make
            it easier for customers to enquire or book.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="button">
              Discuss your website <ArrowUpRight size={18} />
            </a>
            <a href="#work" className="text-link">
              Explore our work <ArrowDown size={16} />
            </a>
          </div>
        </div>
      </div>
      <div className="page-width hero-foot">
        <p>
          Based in Dubai. <span>Working with businesses internationally.</span>
        </p>
        <div>
          <a href="#services">Design</a>
          <a href="#services">Develop</a>
          <a href="#services">Improve</a>
        </div>
        <a href="#services" aria-label="Explore our capabilities">
          <ArrowDown size={20} />
        </a>
      </div>
    </section>
  );
}
