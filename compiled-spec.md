# Compiled Spec — NYG Digital Cinematic Redesign

## Page: Home

- Page scene thesis: Monolithic Web Engineering & Systems Automation Stage
- Signature composition: Widescreen 21:9 ratio interactive flow stage with volumetric light sweep
- Signature composition source id: `comp-widescreen-stage-01`
- Why this cannot collapse into a default grid: Uses full-bleed framing, Fraunces serif editorial typography, and kinetic control consoles instead of generic 3-column card templates.
- Heavy interaction: Interactive System Studio & Live Bottleneck Configurator
- Heavy interaction source id: `int-kinetic-console-01`
- Showy reveals: Apple Spring Scroll Reveal (`opacity: 0, translateY(22px) scale(0.985)` -> `opacity: 1, translateY(0) scale(1)`)
- Showy reveal source id(s): `rev-apple-spring-01`
- Typography source id(s): `type-fraunces-editorial-01`
- Atmosphere/background source id(s): `bg-volumetric-void-01`

## Entrance Map

- Scene 1 (Hero): Monolithic Fade & Scale Up (700ms `cubic-bezier(0.16, 1, 0.3, 1)`)
- Scene 2 (Trust): Cinema Credits Ticker
- Scene 3 (Systems Studio): Glass Console Fade & Slide
- Scene 4 (Bottleneck Diagnostic): Interactive Content Crossfade (200ms `ease-out`)
- Scene 5 (Services): Staggered Glass Vault Elevation
- Scene 6 (ROI Calculator): Metric Glow Reveal
- Scene 7 (Projects): Film Frame Entrance
- Scene 8 (Contact): Terminal Focus Entrance

```css
/* Core Cinematic Utility Classes */
.font-display {
  font-family: var(--font-display);
  font-optical-sizing: auto;
  letter-spacing: -0.025em;
}

.text-gradient-gold {
  background: var(--gradient-gold);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-style: italic;
}

.studio-surface {
  background:
    linear-gradient(145deg, oklch(1 0 0 / 0.045), transparent 55%), oklch(0.155 0.014 260 / 0.92);
  border: 1px solid oklch(1 0 0 / 0.11);
  border-top: 1px solid oklch(1 0 0 / 0.18);
  border-radius: 1.5rem;
  box-shadow: 0 30px 80px -50px oklch(0 0 0 / 0.95);
}

.glass {
  background: color-mix(in oklab, var(--card) 70%, transparent);
  backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid oklch(1 0 0 / 0.09);
  border-top: 1px solid oklch(1 0 0 / 0.15);
  transition:
    transform 250ms var(--ease-apple),
    border-color 250ms var(--ease-apple),
    box-shadow 250ms var(--ease-apple);
}

.glass-gold {
  background: linear-gradient(135deg, oklch(1 0 0 / 0.05), oklch(0.82 0.15 85 / 0.08));
  backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid oklch(0.82 0.15 85 / 0.25);
  border-top: 1px solid oklch(0.82 0.15 85 / 0.4);
  transition:
    transform 250ms var(--ease-apple),
    border-color 250ms var(--ease-apple),
    box-shadow 250ms var(--ease-apple);
}

.reveal-on-scroll {
  opacity: 0;
  transform: translateY(22px) scale(0.985);
  transition:
    opacity 600ms var(--ease-apple),
    transform 600ms var(--ease-apple);
  will-change: opacity, transform;
}

.reveal-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}
```

## External Library Decision

- Q1: Core motion experience: Apple/Villeneuve fluid spring scroll reveals + kinetic control console transitions.
- Q2: Native CSS + Tailwind + Lucide React icons accomplish this with zero extra bundle bloat.
- Q3: Build natively using `IntersectionObserver`, CSS variable tokens, and hardware-accelerated transforms.
- Decision: Use native Vite + React + Tailwind CSS with custom spring tokens.
