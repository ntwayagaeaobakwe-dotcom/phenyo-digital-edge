import { FooterSection } from "./FooterSection";
import "./policies.css";
export function PolicyPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: readonly (readonly [string, string])[];
}) {
  return (
    <>
      <a className="policy-home" href="/">
        ← NYG Agency home
      </a>
      <main className="policy-page" id="main-content">
        <h1>{title}</h1>
        <p className="policy-intro">{intro}</p>
        {sections.map(([heading, text]) => (
          <section key={heading}>
            <h2>{heading}</h2>
            <p>{text}</p>
          </section>
        ))}
        <nav aria-label="Website policies">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Website terms</a>
          <a href="/cancellations">Cancellations & refunds</a>
          <a href="/cookies">Cookies & storage</a>
        </nav>
      </main>
      <FooterSection />
    </>
  );
}
