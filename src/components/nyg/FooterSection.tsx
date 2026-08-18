import { NygLogo } from "./NygLogo";
import { PERSONAL_INFO } from "@/data/portfolio-data";

export function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#080A09] border-t border-[rgba(184,181,172,0.16)] pt-16 pb-12 text-[#B8B5AC]">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-[rgba(184,181,172,0.12)] items-start">
          {/* Logo & Manifesto */}
          <div className="md:col-span-6 space-y-4">
            <NygLogo showWordmark={true} />
            <p className="font-serif italic font-normal text-lg text-[#F3F0E8] max-w-md leading-relaxed">
              Systems that run. Without you.
            </p>
            <p className="text-xs text-[#B8B5AC] max-w-md leading-relaxed font-sans font-normal">
              NYG Digital designs business automation, workflow tools, and conversion-focused websites that turn scattered work into connected systems.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <span className="text-[#F3F0E8] uppercase tracking-widest font-semibold block">[ SYSTEMS ]</span>
            <ul className="space-y-2 text-[#B8B5AC]">
              <li><a href="#systems" className="hover:text-[#5FD8CD] transition-colors">Interactive Studio</a></li>
              <li><a href="#diagnostic" className="hover:text-[#5FD8CD] transition-colors">Bottleneck Diagnostic</a></li>
              <li><a href="#projects" className="hover:text-[#5FD8CD] transition-colors">Case Studies</a></li>
              <li><a href="#roi" className="hover:text-[#5FD8CD] transition-colors">ROI Estimator</a></li>
            </ul>
          </div>

          {/* Location & Contact */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <span className="text-[#F3F0E8] uppercase tracking-widest font-semibold block">[ HEADQUARTERS ]</span>
            <p className="text-[#B8B5AC]">
              Dubai, United Arab Emirates<br />
              Asia/Dubai (GST UTC+4)
            </p>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="text-[#5FD8CD] hover:underline block pt-1"
            >
              {PERSONAL_INFO.email}
            </a>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#B8B5AC]">
          <p>© {currentYear} NYG Digital. Precision systems & engineering.</p>
          <div className="flex items-center gap-6">
            <a href="#hero-stage" className="hover:text-[#F3F0E8] transition-colors">Back to top ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

