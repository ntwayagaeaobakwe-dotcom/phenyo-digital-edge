import { Settings } from "lucide-react";
import { HeaderNav } from "./HeaderNav";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] w-full flex flex-col pt-6 pb-48 bg-transparent overflow-visible">
      {/* NAVIGATION HEADER (z-20) */}
      <HeaderNav />

      {/* HERO CONTENT AREA (z-20) */}
      <div className="relative z-20 w-full max-w-[1200px] mx-auto px-5 sm:px-8 mt-24 sm:mt-32 flex-1 flex flex-col justify-center">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-[2px] bg-[--color-accent]" />
          <span className="text-[12px] uppercase tracking-widest text-text-primary font-semibold">
            SOLUTIONS FOR YOUR BUSINESSES
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display font-bold leading-[1.1] text-[clamp(2.5rem,6vw,5.5rem)] max-w-3xl">
          <span className="text-text-primary">IT Solutions</span>
          <br />
          <span className="text-[--color-accent]">& Technology</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-text-muted max-w-lg text-[15px] leading-relaxed">
          There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.
        </p>

        {/* CTA */}
        <div className="mt-10 flex items-center gap-6">
          <a
            href="#work"
            className="inline-flex items-center justify-center bg-[--color-accent] hover:bg-[--color-accent-hover] text-[--color-action-primary-foreground] text-[15px] font-semibold px-8 py-4 rounded-[--radius] transition-colors duration-300 focus-ring"
          >
            Discover More
          </a>
        </div>
      </div>

      {/* Overlapping Feature Cards */}
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-32 w-full max-w-[1200px] px-5 sm:px-8 z-30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-[--color-accent] p-10 rounded-[--radius] flex flex-col items-center justify-center text-center shadow-lg transform transition-transform hover:-translate-y-2">
            <h3 className="text-white text-4xl font-bold font-display mb-2">46+</h3>
            <p className="text-white font-medium mb-6">Internet & Cyber Security Solutions</p>
            <a href="#" className="bg-white text-[--color-accent] text-[13px] font-bold px-6 py-2 rounded-full uppercase hover:bg-black hover:text-white transition-colors">
              Find Your Solution
            </a>
          </div>
          {/* Card 2 */}
          <div className="rounded-[--radius] overflow-hidden shadow-lg h-[300px] hidden md:block">
            <img src="/it_team_working.png" alt="IT Team" className="w-full h-full object-cover" />
          </div>
          {/* Card 3 */}
          <div className="bg-[--color-accent] p-10 rounded-[--radius] flex flex-col items-center justify-center text-center shadow-lg transform transition-transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6">
              <Settings className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-white text-xl font-bold font-display mb-6">Expert IT Consultants Available</h3>
            <a href="#" className="bg-white text-[--color-accent] text-[13px] font-bold px-6 py-2 rounded-full uppercase hover:bg-black hover:text-white transition-colors">
              Find Your Solution
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
