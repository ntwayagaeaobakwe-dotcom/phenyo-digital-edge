# Design System: NYG Editorial Systems

## 1. Visual Theme & Atmosphere

**Thesis:** A bespoke Dubai-based business automation and technology atelier presented through the visual lens of a luxury architectural journal and cinematic technology publication.

The atmosphere is:

- **Editorial over SaaS:** Composed like a physical broadsheet or architectural folio with monumental serif display type, compact editorial spreads, and disciplined negative space.
- **Precise over Decorative:** Free from gratuitous neon glows, floating card clusters, rainbow gradients, and generic AI templates.
- **Cinematic & Atmospheric:** Alternating between full-bleed cinematic dark teal bands and crisp warm paper spreads.
- **Human-Centric & Controlled:** Highlighting how technology serves human intention rather than replacing human agency.

### Narrative Architecture: "Portal → Signal → System"

1. **The Portal (Act I):** The rotating cyan-ring hero media acts as the technological gateway into NYG Digital.
2. **The Signal (Act II):** The portal's cyan light transitions into an architectural signal line that guides the eye through the operational workflow.
3. **The System (Act III & IV):** Editorial paper and bone spreads represent organized operational clarity, while the liquid-wall depth reveals itself selectively between chapters.
4. **Resolution (Act V):** The journey resolves into a direct human conversation with the founder.

---

## 2. Color Palette & Roles

### Core Palette

- **NYG Ink** (`#080A09`): Primary text on light paper, dark button fills, and near-black baseline surfaces.
- **NYG Deep Teal** (`#082D2D`): Major dark narrative sections, case-study bands, and media overlays.
- **NYG Petroleum** (`#123E3D`): Raised dark surfaces, secondary teal bands, and navigation background.
- **NYG Paper** (`#F3F0E8`): Primary warm light canvas for editorial spreads.
- **NYG Bone** (`#FAF8F2`): Cards, interactive modules, and lighter editorial surfaces.
- **NYG Graphite** (`#282B29`): Secondary dark text on light surfaces.
- **NYG Stone** (`#B8B5AC`): Hairline dividers (`1px`), muted labels, and technical brackets.

### Signal Color (Strictly Constrained)

- **NYG Aqua** (`#5FD8CD`): Sparingly used signal accent for active operational paths, focus rings, and live status dots. Treated like an illuminated signal on an architectural blueprint—never a neon background fill.

### Muted Mineral Accents (Section Fields & Badges)

- **Mineral Mist** (`#CEDDD9`): Diagnostic and assessment field background.
- **Desert Sand** (`#E5D6C2`): ROI Estimator feature canvas.
- **Fog Blue** (`#C9D6DF`): Accent borders and tags.
- **Soft Clay** (`#D9BEB0`): Muted callout surfaces.

_Rule: Never display more than two mineral accents in the same viewport._

---

## 3. Typography Architecture

### Font Families

- **Display Serif:** `Newsreader Variable` (`"Newsreader Variable", "Newsreader", "Instrument Serif", Georgia, serif`)
  - Used for: Hero headline, major section statements, monumental ROI numbers, and case-study titles.
  - Weight: 400–500.
  - Line height: 0.88–1.05.
  - Letter spacing: `-0.04em` to `-0.025em`.
  - Italic treatment: Used selectively for single accent words or phrases, never decorative blocks.
- **Interface Sans:** `Manrope Variable` (`"Manrope Variable", "Manrope", -apple-system, sans-serif`)
  - Used for: Navigation, body copy, button labels, form controls, and descriptive paragraphs.
  - Weight: 400 (regular) / 600 (semibold).
  - Line height: 1.5–1.65.
  - Max reading width: 58–68 characters.
- **Technical Mono:** `JetBrains Mono Variable` (`"JetBrains Mono Variable", "JetBrains Mono", monospace`)
  - Strictly reserved for: System steps (`01/`, `02/`), timestamps, Dubai clock (`DXB`), diagnostic outputs, and data telemetry.

### Typographic Scale

- **Hero Display:** `clamp(2.75rem, 6vw, 5.25rem)` (mobile: `2.5rem`)
- **Major Display:** `clamp(2.25rem, 4.5vw, 3.75rem)`
- **Section Heading:** `clamp(1.75rem, 3.5vw, 2.75rem)`
- **Subsection Heading:** `clamp(1.25rem, 2vw, 1.75rem)`
- **Lead Paragraph:** `clamp(1.05rem, 1.4vw, 1.25rem)`
- **Body Copy:** `1rem` – `1.0625rem` (16px–17px)
- **Interface UI:** `0.8125rem` – `0.875rem` (13px–14px)
- **Technical Metadata:** `0.6875rem` – `0.75rem` (11px–12px)

---

## 4. Component Rules

- **Buttons:**
  - Shape: Pill-shaped (`rounded-full` / `rounded-xl`).
  - Primary CTA: NYG Paper (`#F3F0E8`) background with NYG Ink (`#080A09`) text, directional arrow icon, subtle active scale (`0.97`). Zero drop shadow or purple glow.
  - Secondary CTA: Deep Teal or transparent with 1px Stone hairline border (`#B8B5AC` / `rgba(184, 181, 172, 0.2)`).
- **Cards & Plates:**
  - Radius: 16px–24px for structural panels; 28px for large editorial plates.
  - Elevation: Zero default drop shadows. Depth achieved through tonal contrast (Bone on Paper, Petroleum on Deep Teal) and 1px hairline borders.
  - No nested cards inside cards.
- **Dividers & Hairlines:**
  - 1px solid hairline borders using `rgba(184, 181, 172, 0.25)` on dark or `rgba(8, 45, 45, 0.12)` on light.
- **Forms & Inputs:**
  - Paper or dark-teal input surfaces with 1px border.
  - NYG Aqua (`#5FD8CD`) focus visible rings (`2px` solid, `2px` offset).

---

## 5. Section Color Rhythm

1. **Hero:** Full-bleed cinematic Deep Teal media (`#080A09` / `#082D2D`) with Paper White Newsreader headline.
2. **System Studio:** Warm NYG Paper (`#F3F0E8`) editorial spread with Ink lines and Aqua signal paths.
3. **Bottleneck Diagnostic:** Mineral Mist (`#CEDDD9`) / Bone (`#FAF8F2`) field with high-contrast Deep Teal solution panel.
4. **Case Studies:** Full-bleed NYG Deep Teal (`#082D2D`) narrative band.
5. **Capabilities:** Warm NYG Paper (`#F3F0E8`) with publication-style numbered index.
6. **ROI Estimator:** Desert Sand (`#E5D6C2`) feature field with monumental serif number.
7. **Contact:** NYG Ink (`#080A09`) / Deep Teal (`#082D2D`) closing composition.
8. **Footer:** Restrained NYG Ink (`#080A09`) surface with warm-white typography.

---

## 6. Motion & Performance Architecture

- **Interaction Speeds:**
  - Micro-interactions & button feedback: `120ms`–`160ms`.
  - Hover states & color transitions: `160ms`–`220ms`.
  - Section reveals: `400ms`–`600ms` with easing `cubic-bezier(0.23, 1, 0.32, 1)`.
- **Media Render Orchestration:**
  - Hero active (0–85%) $\rightarrow$ liquid background WebGL & video seeking paused.
  - Content sections active $\rightarrow$ hero canvas render loop idle.
  - Dense opaque paper sections $\rightarrow$ liquid shader drawing idle.
  - Tab hidden $\rightarrow$ all media loops cancelled.
  - No continuous 60 FPS loop when user is stationary.
- **Accessibility:**
  - Full `prefers-reduced-motion: reduce` support with high-quality static poster frames.

---

## 7. Anti-Patterns (Explicitly Banned)

- ❌ NO purple-to-pink gradient text or rainbow fills.
- ❌ NO electric-purple buttons or glowing outer box-shadows.
- ❌ NO generic 3-column floating glass card grids.
- ❌ NO heavy backdrop blur layers stacking over text.
- ❌ NO fake client logos, fabricated metrics, or invented awards.
- ❌ NO `transition: all` or layout-property animations (`top`, `left`, `width`, `height`).
- ❌ NO Playfair Display or generic serif replacements.
- ❌ NO Unbounded as primary display heading.
- ❌ NO full-page scroll hijacking or custom mouse cursors.
