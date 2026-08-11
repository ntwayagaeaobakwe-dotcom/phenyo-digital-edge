export function StatsSection() {
  const stats = [
    { number: "886", label: "Project completed" },
    { number: "601", label: "Satisfied Customers" },
    { number: "960", label: "Repeat Customers" },
    { number: "486", label: "Project completed" },
  ];

  return (
    <section className="bg-surface-base py-20 relative overflow-hidden border-b border-border/10">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 justify-items-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center text-center">
              {/* Circular border */}
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border border-border/20 flex flex-col items-center justify-center mb-6 relative group">
                {/* Outer dashed/glow ring effect on hover */}
                <div className="absolute inset-[-4px] rounded-full border border-[--color-accent] opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-95 group-hover:scale-100" />
                
                <h4 className="text-[--color-accent] font-display text-4xl md:text-5xl font-bold">
                  {stat.number}
                </h4>
              </div>
              <p className="text-text-primary text-sm font-medium tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-white text-lg md:text-xl font-medium">
            www.phenyo-digital-edge.com
          </p>
        </div>
      </div>
    </section>
  );
}
