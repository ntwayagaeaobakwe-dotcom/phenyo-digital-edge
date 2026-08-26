import { NygLogo } from "./NygLogo";
import { PERSONAL_INFO, COMPANY_INFO } from "@/data/portfolio-data";

export function FooterSection() {
  return (
    <footer className="bg-[#080A09] border-t border-[rgba(184,181,172,0.16)] pt-16 pb-12 text-[#B8B5AC]">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-[rgba(184,181,172,0.12)] items-start">
          {/* Logo & Overview */}
          <div className="md:col-span-6 space-y-4">
            <NygLogo showWordmark={true} />
            <p className="font-serif italic font-normal text-lg text-[#F3F0E8] max-w-md leading-relaxed">
              {COMPANY_INFO.headline}
            </p>
            <p className="text-xs text-[#B8B5AC] max-w-md leading-relaxed font-sans font-normal">
              {COMPANY_INFO.subheadline}
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <span className="text-[#F3F0E8] uppercase tracking-widest font-semibold block">
              [ EXPLORE ]
            </span>
            <ul className="space-y-2 text-[#B8B5AC]">
              <li>
                <a href="#systems" className="hover:text-[#5FD8CD] transition-colors">
                  Interactive Demo
                </a>
              </li>
              <li>
                <a href="#diagnostic" className="hover:text-[#5FD8CD] transition-colors">
                  Identify Bottlenecks
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-[#5FD8CD] transition-colors">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-[#5FD8CD] transition-colors">
                  How We Work
                </a>
              </li>
            </ul>
          </div>

          {/* Registered Entity & Location */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <span className="text-[#F3F0E8] uppercase tracking-widest font-semibold block">
              [ REGISTERED ENTITY ]
            </span>
            <p className="text-[#B8B5AC] leading-relaxed">
              <strong className="text-[#F3F0E8] font-normal">{COMPANY_INFO.legalName}</strong>
              <br />
              {COMPANY_INFO.registeredJurisdiction}
              <br />
              {COMPANY_INFO.registeredLocality}, {COMPANY_INFO.registeredCountry}
              <br />
              <span className="text-[#B8B5AC]/70">Asia/Dubai (GST UTC+4)</span>
            </p>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="text-[#5FD8CD] hover:underline block pt-1"
            >
              {PERSONAL_INFO.email}
            </a>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-[#B8B5AC]">
          <p className="leading-relaxed text-center md:text-left max-w-2xl">
            {COMPANY_INFO.legalFooter}
          </p>
          <div className="flex items-center gap-6 shrink-0">
            <a href="#hero-stage" className="hover:text-[#F3F0E8] transition-colors">
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
