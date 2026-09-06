import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { NygLogo } from "./NygLogo";
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
            <a href="#hero-stage" aria-label="NYG Digital home">
              <NygLogo showWordmark />
            </a>
            <p>
              Digital systems.
              <br />
              Built for what comes next.
            </p>
            <span className="footer-clock">
              UAE <span>{time}</span> GST / UTC+4
            </span>
          </div>
          <div className="footer-links">
            <a href="#services">Services</a>
            <a href="#projects">Selected work</a>
            <a href="#systems">Interactive demo</a>
            <a href="#diagnostic">Find your next step</a>
            <a href="#process">Our process</a>
            <a href="/card">
              Digital business card <ArrowUpRight size={13} />
            </a>
          </div>
          <div className="footer-entity">
            <p>
              {COMPANY_INFO.legalName}
              <br />
              {COMPANY_INFO.registeredJurisdiction}
              <br />
              {COMPANY_INFO.registeredLocality}, {COMPANY_INFO.registeredCountry}
            </p>
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
        <div className="footer-bottom">
          <p>{COMPANY_INFO.legalFooter}</p>
          <a href="#hero-stage">
            Back to top <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
