import "./policies.css";
import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { PERSONAL_INFO, COMPANY_INFO } from "@/data/portfolio-data";
export function FooterSection() {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Dubai",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    tick();
    const interval = setInterval(tick, 60000);
    return () => clearInterval(interval);
  }, []);
  return (
    <footer className="site-footer">
      <div className="page-width">
        <div className="footer-top">
          <div>
            <p>
              Professional websites.
              <br />
              Built around the customer journey.
            </p>
            <span className="footer-clock">
              UAE <span>{time}</span> GST / UTC+4
            </span>
          </div>
          <div className="footer-links">
            <a href="/services/web-design">Website design</a>
            <a href="/services/website-redesign">Website redesign</a>
            <a href="/services/custom-web-development">Custom development</a>
            <a href="/services/booking-websites">Booking websites</a>
            <a href="/#approach">Our process</a>
            <a href="/work/lead-generation-automation">Lead-generation automation</a>
          </div>
          <div className="footer-entity">
            <p>{`${COMPANY_INFO.registeredJurisdiction}, ${COMPANY_INFO.registeredLocality}, ${COMPANY_INFO.registeredCountry}.`}</p>
            <a href={`mailto:${PERSONAL_INFO.email}`}>
              {PERSONAL_INFO.email}
              <ArrowUpRight size={14} />
            </a>
            <div className="social-links">
              {PERSONAL_INFO.socials.map((social) => (
                <a href={social.href} key={social.label} target="_blank" rel="noopener noreferrer">
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <nav className="footer-policies" aria-label="Website policies">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Website Terms</a>
          <a href="/cancellations">Cancellations &amp; Refunds</a>
          <a href="/cookies">Cookies &amp; Storage</a>
        </nav>
        <div className="footer-bottom">
          <p>© 2026 {COMPANY_INFO.legalName}. All rights reserved.</p>
          <a href="/#hero-stage">
            Back to top <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
