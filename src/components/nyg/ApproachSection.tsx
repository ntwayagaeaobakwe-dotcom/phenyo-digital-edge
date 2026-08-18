import { useRef } from "react";
import { CheckCircle2 } from "lucide-react";

export function ApproachSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const checkItems = [
    "Top business applications",
    "Top business applications",
    "Innovative working strategy",
    "Innovative working strategy",
    "Solutions for cheap overviews",
    "Solutions for cheap overviews",
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-surface-raised pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-hidden border-t border-border/10"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side: Images & Stats */}
          <div className="relative">
            <div className="rounded-[--radius] overflow-hidden border border-border/20 shadow-xl">
              <img
                src="/it_expert_about.png"
                alt="IT Expert working"
                className="w-full h-auto object-cover aspect-square sm:aspect-[4/5] lg:aspect-square"
              />
            </div>

            {/* Floating Stat Badge */}
            <div className="absolute -bottom-8 -left-8 sm:-bottom-12 sm:-left-12 bg-surface-base p-6 sm:p-8 rounded-[--radius] border border-border/20 shadow-2xl flex items-center gap-6">
              <div className="w-12 h-12 rounded-full border-2 border-[--color-accent] flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border border-[--color-accent] flex items-center justify-center">
                  <span className="w-4 h-4 bg-[--color-accent] rounded-full"></span>
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold font-display text-white">87450</div>
                <div className="text-text-muted text-sm mt-1">Project completed</div>
              </div>
            </div>
          </div>

          {/* Right side: Content */}
          <div className="flex flex-col pt-12 lg:pt-0">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[12px] uppercase tracking-widest text-[--color-accent] font-bold">
                ABOUT OUR COMPANY
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-display font-bold leading-[1.15] text-[clamp(2rem,4vw,3.5rem)] mb-6 text-white">
              Professional IT Experts
              <br />
              for Tech Solutions
            </h2>

            {/* Paragraph */}
            <p className="text-[15px] leading-relaxed text-text-muted mb-8">
              Web designing in a powerful way of just not an only professions, however, in a passion
              for our Company. We have to a tendency to believe the idea that smart looking of any
              website is the first impression on visitors.
            </p>

            {/* Checkmark List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 mb-10">
              {checkItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[--color-accent] shrink-0" />
                  <span className="text-[14px] font-medium text-text-primary">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA & Author */}
            <div className="flex flex-wrap items-center gap-8">
              <a
                href="#contact"
                className="inline-flex items-center justify-center bg-[--color-accent] hover:bg-[--color-accent-hover] text-[--color-action-primary-foreground] text-[14px] font-bold px-8 py-3.5 rounded-[--radius] uppercase tracking-wide transition-colors duration-300"
              >
                Discover More
              </a>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-[--color-accent]">
                  <img
                    src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                    alt="Kevin Martin"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-bold text-[15px]">Kevin Martin</span>
                  <span className="text-text-muted text-[13px]">Co Founder</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
