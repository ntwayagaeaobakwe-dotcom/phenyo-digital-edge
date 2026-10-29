import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import type { MarketingPage } from "@/data/web-agency-content";
import { HeaderNav } from "@/components/nyg/HeaderNav";
import { FooterSection } from "@/components/nyg/FooterSection";
import { SiteBackdrop } from "@/components/nyg/ServicesBackdrop";

export function IntentPage({ page }: { page: MarketingPage }) {
  const [motionPaused, setMotionPaused] = useState(false);
  const contactHref = page.formService
    ? `/?service=${encodeURIComponent(page.formService)}&source=${encodeURIComponent(page.path)}#contact`
    : "/#contact";
  const ctaLabel = page.ctaLabel ?? "Discuss your website";
  return (
    <SiteBackdrop paused={motionPaused} className="marketing-page">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <HeaderNav
        motionPaused={motionPaused}
        onToggleMotion={() => setMotionPaused((paused) => !paused)}
      />
      <main id="main-content" tabIndex={-1}>
        <section className="intent-hero page-width" aria-labelledby="page-title">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true">/</span>
            <a href={`/#${page.section.toLowerCase()}`}>{page.section}</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{page.eyebrow}</span>
          </nav>
          <div className="intent-hero-grid">
            <h1 id="page-title">{page.h1}</h1>
            <div>
              <p className="intent-lead">{page.intro}</p>
              <p>{page.audience}</p>
              <a className="button" href={contactHref}>
                {ctaLabel}
              </a>
            </div>
          </div>
        </section>

        <section className="intent-section intent-dark" aria-labelledby="challenge-title">
          <div className="page-width intent-split">
            <div>
              <h2 id="challenge-title">{page.challengeTitle}</h2>
            </div>
            <ul className="challenge-list">
              {page.challenges.map((challenge) => (
                <li key={challenge}>
                  <span />
                  <p>{challenge}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="intent-section page-width" aria-labelledby="deliverable-title">
          <div className="intent-heading-row">
            <h2 id="deliverable-title">{page.deliverableTitle}</h2>
            <p>{page.outcome}</p>
          </div>
          <div className="deliverable-grid">
            {page.deliverables.map((item, index) => (
              <article key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="intent-section process-panel" aria-labelledby="process-title">
          <div className="page-width">
            <h2 id="process-title">A clear route from requirements to launch.</h2>
            <ol className="intent-process">
              {page.process.map((step, index) => (
                <li key={step.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          className="intent-section page-width related-section"
          aria-labelledby="related-title"
        >
          <h2 id="related-title">Continue exploring.</h2>
          <div className="related-links">
            {page.related.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
                <ArrowRight size={16} />
              </a>
            ))}
          </div>
        </section>

        <section className="intent-cta page-width" aria-labelledby="intent-cta-title">
          <div>
            <h2 id="intent-cta-title">Tell us what your website needs to make easier.</h2>
          </div>
          <div>
            <p>
              Share the current situation, the audience and the outcome you want. We’ll reply with a
              practical next step.
            </p>
            <a className="button" href={contactHref}>
              {ctaLabel}
            </a>
          </div>
        </section>
      </main>
      <FooterSection />
    </SiteBackdrop>
  );
}
