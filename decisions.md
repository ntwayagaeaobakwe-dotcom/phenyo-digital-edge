# Design Decisions — NYG Digital Cinematic Redesign

- Entry mode: Surprise me (Director & Film curation)
- Genre: Sci-Fi / Monolithic Architecture
- Director: Denis Villeneuve (*Blade Runner 2049*, *Dune*, *Arrival*)
- Film: *Blade Runner 2049* (Volumetric light, 100vh scale, deep atmospheric void)
- Niche: Business Automation & Conversion Web Engineering
- Pages: Home (Single-page cinematic experience with modular interactive scenes)
- Major page roles: Monolithic Stage (Hero), Kinetic Console (System Studio), Service Vault (Capabilities), Project Archives (Case Studies), Metric Simulator (ROI Calculator), Transmission Terminal (Contact)
- Image placeholders: Yes, art-directed cinematic visuals and generated images

## Demo Uniqueness Audit

- Previous-work audit: Infographic-style stacked cards, step circles, light borders, small icon blocks.
- Recurring traits to avoid: Generic SaaS product grid, text-heavy infographic step boxes, small colored icons in circles.
- Shell-ban list:
  - 3-column icon-grid rows
  - Round step badges (01, 02, 03) inside small white boxes
  - Generic cards-inside-cards layout
- Primary composition family: Monolithic Widescreen Stage + Volumetric Atmospheric Void + Architectural Serif-Sans Typographic Scale.
- Why this family differs from the most recent output: Shifts from an "infographic report" feel into a film-like cinematic stage with widescreen media viewports, film-noir shadows, and cinematic editorial typography.
- Wireframe-level uniqueness test: Removing copy and colors reveals a 21:9 cinematic aspect ratio stage with filmic letterboxing and architectural composition.

## Research Notes

### Research Boundary
- Film research is observational input, not a spec.
- What is being translated into web language: Massive scale, dramatic volumetric lighting, high-contrast dark space, editorial serif typography (Fraunces), film letterboxing.
- What must not be flattened into product-template logic: Replacing bespoke section stages with repetitive grid cards.

### Film Palette
- Primary: `oklch(0.82 0.15 85)` (Amber / Metallic Gold Volumetric Light)
- Secondary: `oklch(0.18 0.015 260)` (Slate Void Monolith)
- Accent: `oklch(0.78 0.16 195)` (Cyan Cyber Signal)
- Shadow: `oklch(0.09 0.01 260)` (Deep Cinematic Black)
- Text: `oklch(0.98 0.005 250)` (Razor Platinum White)

### Director Signatures (Denis Villeneuve)
1. **Monolithic Scale & Viewport Framing**: 100vh stages with full-bleed dramatic scale and letterboxed widescreen media.
2. **Volumetric Atmospheric Light**: Fog, light rays, and gradient glows piercing deep shadow voids.
3. **Architectural Restraint**: Minimalist geometric precision, zero clutter, high-impact serif typography (Fraunces).
