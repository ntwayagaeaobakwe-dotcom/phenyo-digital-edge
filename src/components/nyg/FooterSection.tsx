import { NygLogo } from "./NygLogo";
import { PERSONAL_INFO } from "@/data/portfolio-data";

export function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#05060A] border-t border-[rgba(196,190,255,0.12)] pt-16 pb-12 text-[#9D9AAF]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-[rgba(196,190,255,0.1)] items-start">
          {/* Logo & Manifesto */}
          <div className="md:col-span-6 space-y-4">
            <NygLogo showWordmark={true} />
            <p className="text-sm text-[#9D9AAF] max-w-md leading-relaxed font-normal">
              NYG Digital designs automation, client tools, and conversion-focused websites that turn scattered work into connected systems.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <span className="text-[#F5F6FA] uppercase tracking-widest font-semibold block">SYSTEMS</span>
            <ul className="space-y-2 text-[#9D9AAF]">
              <li><a href="#systems" className="hover:text-[#78E7FF] transition-colors">Interactive Studio</a></li>
              <li><a href="#diagnostic" className="hover:text-[#78E7FF] transition-colors">Bottleneck Diagnostic</a></li>
              <li><a href="#projects" className="hover:text-[#78E7FF] transition-colors">Case Studies</a></li>
              <li><a href="#roi" className="hover:text-[#78E7FF] transition-colors">ROI Estimator</a></li>
            </ul>
          </div>

          {/* Location & Contact */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <span className="text-[#F5F6FA] uppercase tracking-widest font-semibold block">HEADQUARTERS</span>
            <p className="text-[#9D9AAF]">
              Dubai, United Arab Emirates<br />
              Asia/Dubai (GST UTC+4)
            </p>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="text-[#78E7FF] hover:underline block pt-1"
            >
              {PERSONAL_INFO.email}
            </a>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#9D9AAF]/70">
          <p>© {currentYear} NYG Digital. Precision systems & engineering.</p>
          <div className="flex items-center gap-6">
            <a href="#hero" className="hover:text-[#F5F6FA] transition-colors">Back to top ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
