interface ProjectImageFrameProps {
  images: string[];
  title: string;
}

// Browser-chrome-framed screenshot/diagram display, shared by the project card
// and the project detail modal.
export function ProjectImageFrame({ images, title }: ProjectImageFrameProps) {
  if (images.length === 0) return null;

  return (
    <div className="grid gap-4">
      {images.map((src, i) => (
        <div
          key={src}
          className="gold-border rounded-2xl overflow-hidden shadow-[var(--shadow-elegant)]"
        >
          <div className="flex items-center gap-2 border-b border-border/60 bg-black/40 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" aria-hidden="true" />
            <span className="ml-2 truncate text-[11px] font-mono text-muted-foreground">
              {images.length > 1 ? `${title} — view ${i + 1}` : title}
            </span>
          </div>
          <div className="aspect-[16/10] overflow-hidden bg-black/30">
            <img
              src={src}
              alt={`${title} — screenshot or workflow diagram`}
              width={1280}
              height={800}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
