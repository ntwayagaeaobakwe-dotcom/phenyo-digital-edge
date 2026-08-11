import { Settings, Share2, Users, Briefcase } from "lucide-react";

const services = [
  {
    id: 1,
    title: "Web application",
    icon: Settings,
    image: "/service_card_bg.png"
  },
  {
    id: 2,
    title: "Web marketing",
    icon: Share2,
    image: "/service_card_bg.png"
  },
  {
    id: 3,
    title: "IT Management",
    icon: Users,
    image: "/service_card_bg.png"
  },
  {
    id: 4,
    title: "Tech Solutions",
    icon: Briefcase,
    image: "/service_card_bg.png"
  }
];

export function WorkSection() {
  return (
    <section id="work" className="bg-surface-base py-24 sm:py-32 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 relative z-10">
        
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[12px] uppercase tracking-widest text-[--color-accent] font-bold">
                WHAT WE'RE OFFERING
              </span>
            </div>
            <h2 className="font-display font-bold leading-[1.15] text-[clamp(2rem,4vw,3.5rem)] text-white">
              Get the best IT technology<br />services <span className="text-[--color-accent]">&</span> solutions
            </h2>
          </div>
          <div>
             {/* Optional: Add a 'View All' button here if desired */}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div 
                key={service.id} 
                className="group relative bg-surface-raised rounded-[--radius] overflow-hidden border border-border/10 shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* Top orange border indicator */}
                <div className="absolute top-0 left-0 w-full h-1 bg-[--color-accent] z-20" />
                
                {/* Image Background */}
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-surface-base/80 group-hover:bg-surface-base/40 transition-colors duration-300 z-10" />
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-700" />
                </div>

                {/* Content */}
                <div className="relative z-20 p-8 h-[380px] flex flex-col justify-end">
                  {/* Icon */}
                  <div className="w-14 h-14 bg-black/50 backdrop-blur-sm rounded-lg flex items-center justify-center mb-6 group-hover:bg-[--color-accent] transition-colors duration-300 border border-white/10 group-hover:border-transparent">
                     <Icon className="w-6 h-6 text-[--color-accent] group-hover:text-white transition-colors duration-300" />
                  </div>
                  
                  <div className="text-[12px] text-[--color-accent] font-bold mb-2 tracking-widest uppercase">
                    SERVICES //
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-0 group-hover:text-[--color-accent] transition-colors duration-300">
                    {service.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
