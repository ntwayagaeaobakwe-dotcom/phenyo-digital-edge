import "./featured-portfolio.css";

const northlineDemo = {
  url: "https://demo.nygagency.com/",
} as const;

const capabilities = [
  "Custom UI/UX",
  "Responsive development",
  "Interactive Scope Lens",
  "Project-led architecture",
] as const;

export function FeaturedPortfolioSection() {
  return (
    <section
      id="work"
      className="home-section featured-portfolio-section"
      aria-labelledby="featured-work-heading"
    >
      <div className="page-width">
        <header className="home-heading-row featured-portfolio-heading">
          <div>
            <h2 id="featured-work-heading">Built to show what better looks like.</h2>
          </div>
          <p>
            Explore an interactive website concept for commercial renovation contractors, where
            architectural presentation, clear services, and a thoughtful customer journey work
            together.
          </p>
        </header>

        <article className="featured-project" aria-labelledby="northline-project-heading">
          <figure className="featured-project-visual">
            <div className="featured-project-frame">
              <picture>
                <source
                  media="(max-width: 760px)"
                  srcSet="/portfolio/northline-commercial-mobile.webp"
                  width="390"
                  height="590"
                />
                <img
                  src="/portfolio/northline-commercial-desktop.webp"
                  alt="Northline Commercial concept website, featuring a commercial renovation headline and a warm lobby design."
                  width="1440"
                  height="900"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>
            <figcaption className="featured-project-caption">
              <span>Independent concept project</span>
              <span>Commercial renovation · tenant improvement</span>
            </figcaption>
          </figure>

          <div className="featured-project-copy">
            <p className="featured-project-category">Commercial contractor website concept</p>
            <h3 id="northline-project-heading">Northline Commercial</h3>
            <p className="featured-project-description">
              A fully interactive website concept for North American commercial renovation and
              tenant improvement contractors, designed around project storytelling, clear
              capabilities, and a more intuitive path from discovery to inquiry.
            </p>
            <p className="featured-project-disclosure">
              Northline and its construction projects are fictional. The website, responsive build,
              and Scope Lens interaction are NYG Digital demonstration work.
            </p>

            <ul
              className="featured-project-capabilities"
              aria-label="Demonstrated website capabilities"
            >
              {capabilities.map((capability) => (
                <li key={capability}>{capability}</li>
              ))}
            </ul>

            <div className="featured-project-actions">
              <a
                className="button featured-project-demo-link"
                href={northlineDemo.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Explore the Northline Commercial live demo (opens in a new tab)"
              >
                Explore Live Demo
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
