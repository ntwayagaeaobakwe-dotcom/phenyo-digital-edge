---
name: NYG Agency — Compact NYG
description: A precise Carbon / Platinum identity for connected digital services.
colors:
  canvas: "#0b0c0e"
  panel: "#15171b"
  raised: "#25282d"
  text: "#f2f2ef"
  muted: "#aeb4bd"
  signal: "#c7ccd2"
  line: "#34383f"
  field: "#1f2124"
  field-border: "#4d4f52"
  field-placeholder: "#a8aaad"
  error: "#f6a8a1"
typography:
  display:
    fontFamily: '"Manrope Variable", Manrope, sans-serif'
    fontSize: "clamp(50px, 5.15vw, 78px)"
    fontWeight: 500
    lineHeight: 1.12
    letterSpacing: "-0.04em"
  headline:
    fontFamily: '"Manrope Variable", Manrope, sans-serif'
    fontSize: "clamp(34px, 4vw, 54px)"
    lineHeight: 1.15
    letterSpacing: "-0.035em"
  body:
    fontFamily: '"Source Sans 3", -apple-system, BlinkMacSystemFont, sans-serif'
    fontSize: "18px"
    lineHeight: 1.7
  label:
    fontFamily: '"Manrope Variable", Manrope, sans-serif'
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0.12em"
  button:
    fontFamily: '"Manrope Variable", Manrope, sans-serif'
    fontSize: "13px"
    fontWeight: 600
rounded:
  control: "4px"
  workflow: "8px"
  panel: "12px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "40px"
  xl: "64px"
  section: "clamp(80px, 8vw, 128px)"
components:
  button-primary:
    backgroundColor: "{colors.text}"
    textColor: "{colors.canvas}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "16px 23px"
  button-primary-hover:
    backgroundColor: "{colors.signal}"
  button-outline:
    backgroundColor: transparent
    textColor: "{colors.text}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "16px 23px"
  button-outline-hover:
    backgroundColor: "{colors.signal}"
  input:
    backgroundColor: "{colors.field}"
    textColor: "{colors.text}"
    rounded: "{rounded.control}"
    padding: "14px"
  project-preview:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.text}"
    rounded: "{rounded.panel}"
  navigation:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.muted}"
  service-row:
    backgroundColor: transparent
    textColor: "{colors.text}"
    padding: "30px 0"
---

# Design System: NYG Agency

## Overview

**Creative North Star: "Compact NYG"**

The finalized identity pairs the supplied NYG artwork with carbon surfaces, platinum signals, and clear sans-serif typography. Its character is precise, restrained, and confident. Strong headings, generous section spacing, and practical controls keep the six connected services readable.

NYG Agency is the public brand; NYG Digital FZE LLC remains the legal entity. The supplied logo letterforms are binding assets. The interface supports the artwork through proportion and space, without redrawing its geometry.

**Key Characteristics:**

- Carbon and platinum tonal contrast.
- Manrope display type with Source Sans 3 reading text.
- Supplied artwork, preserved proportions, and responsive lockups.
- Flat surfaces, fine dividers, and restrained interaction feedback.

Implementation authority: `src/brand.css` extends `src/studio.css`; `src/styles.css` supplies fonts, semantic compatibility tokens, and global focus behavior. Older token names such as “aqua” and “deep-teal” remain compatibility aliases with neutral values; they do not establish a teal identity.

## Colors

The palette is a cool neutral range with platinum reserved for emphasis and interaction.

### Primary

- **Platinum signal:** selected paths, highlighted words, focus treatment, and primary hover feedback.
- **Soft white:** primary text and the standard primary action fill.

### Neutral

- **Carbon canvas:** the page foundation and navigation.
- **Dark panel:** alternating sections and interactive modules.
- **Raised charcoal:** project previews and supporting surfaces.
- **Muted silver:** secondary copy, labels, and metadata.
- **Graphite line:** structural dividers and outlined controls.
- **Field charcoal, field border, and placeholder gray:** the contact form's distinct input states.

The error token is reserved for validation feedback. It is not a brand accent.

**The Neutral Identity Rule.** New brand surfaces use the Carbon / Platinum system; retained compatibility names do not authorize restoring teal or mint.

## Typography

**Display Font:** Manrope Variable, with Manrope and sans-serif fallbacks.

**Body Font:** Source Sans 3, with system sans-serif fallbacks. Both primary fonts are self-hosted. JetBrains Mono remains available for existing technical annotations; it is not the general body or display face.

Manrope gives headings and controls a compact, geometric presence. Source Sans 3 keeps longer descriptions and forms readable. The frontmatter records the default desktop hierarchy; responsive overrides are described below.

### Hierarchy

- **Display:** hero statement, medium weight and tight tracking; its emphasized span uses Platinum signal.
- **Headline:** section headings, balanced wrapping, and a maximum width of 710px.
- **Body:** reading text; service and project paragraphs use the body scale, while the hero lead uses 20px with 1.65 line height and a 500px maximum width.
- **Label:** uppercase section eyebrows; navigation uses 12px Manrope without eyebrow tracking.
- **Button:** semibold Manrope, with compact variants at 12px.

**The Two-Font Rule.** Use Manrope for display and control emphasis, and Source Sans 3 for reading text. Do not restore the superseded serif display system.

## Layout

The centered page container is at most 1280px wide, with 56px desktop gutters. Gutters become 32px at 1100px and 20px at 639px. The spacing scale in the frontmatter governs the broad rhythm; sections use its fluid section spacing.

The desktop hero uses a 1.4:1 text/artwork grid, a 40px gap, and generous vertical padding. At 899px it becomes 1.5:1; at 639px it stacks, keeping text first and centering the artwork underneath. Mobile display type uses `clamp(38px, 9.1vw, 56px)` with 1.13 line height. Mobile section headings use 35px.

The fixed header is 88px high, 80px at 899px, and 72px at 639px. Desktop links give way to a dialog menu below 900px. The horizontal lockup stays in the header until 639px, when the 48px monogram replaces it. The menu dialog retains the horizontal lockup.

Service detail panels use two columns on larger screens and one column at 639px. Section headings stack their title and supporting copy at 899px. Keep the six service categories in the shared service data, rather than duplicating labels across surfaces.

## Elevation & Depth

The main page uses flat tonal layers and fine borders. Project previews gain distinction through Raised charcoal and clipped corners, while service rows rely on dividers. There is no general card-shadow vocabulary. The scrolled header uses a translucent carbon surface and a 12px backdrop blur; reserve this treatment for navigation rather than spreading it across reading surfaces.

Hero copy and identity arrive through a short fade and 10px translation over 500ms, with an 80ms identity delay. Controls use the fast duration (160ms) and navigation surface changes use the normal duration (240ms). Reduced-motion preferences remove entrance transforms and substantially suppress animations and transitions.

## Shapes

Controls use slight corner rounding; project previews use the panel radius and the workflow module retains its smaller workflow radius. Dividers and field borders are 1px. Preserve the native aspect ratio of logo artwork with contained sizing.

**The Artwork Rule.** Use the production SVG assets as supplied. Do not redraw the monogram, reconstruct its letters with text, distort its proportions, or substitute archived concept artwork.

## Components

### Buttons and text links

Primary buttons have a soft-white fill, carbon text, and a minimum height of 52px. The small navigation action has a minimum height of 44px. Outline buttons use a transparent surface and graphite border; their effective hover state uses Platinum signal through the shared brand override. Primary hover uses Platinum signal. Active buttons scale to 0.98; disabled buttons use 0.55 opacity and suppress the transform.

Directional arrows move subtly up and right on hover. Text links remain open, without a filled container, with a minimum height of 44px. Global focus styles provide a 2px platinum outline with a 2px offset; the global important rule is the effective source for offset.

### Inputs / Fields

Fields use their dedicated charcoal fill, light text, fine gray border, and control radius. Inputs, selects, and textareas have a minimum height of 52px through the brand override; textareas retain vertical resizing. Focus changes the border to platinum, and invalid fields use the error color alongside error text. Preserve visible labels and accessible validation wiring.

### Navigation

The fixed header places the supplied horizontal identity on the left, the Home / Services / About / Work / Contact links centrally, and the project action on the right. Active and hovered links brighten and reveal a thin platinum underline. Mobile navigation is a keyboard-accessible dialog with an explicit menu button and large numbered links. Preserve active-section indication, focus behavior, and closing on desktop resize.

### Service accordion

Six numbered service rows organize Web Development, Software & Digital Solutions, AI Automation, Business Consulting, Digital Marketing, and Creative Services. Each uses a real button with expanded state and a linked detail region. One panel starts open; activating the current row closes it. Desktop rows include the service pillar; mobile rows hide it to protect the title width.

### Project previews and workflow controls

Project previews use rounded, bordered surfaces and an explicit open affordance. Keep completion, demonstration, and concept labels accurate. The workflow explorer uses underlined tab-like buttons with a 44px minimum height; selected state changes color and border. These functional diagrams remain supporting material beneath the primary service story.

## Do's and Don'ts

### Do:

- **Do** use the Carbon / Platinum tokens for new brand surfaces.
- **Do** preserve supplied logo artwork and its native proportions.
- **Do** pair Manrope headings with Source Sans 3 reading text.
- **Do** keep focus, reduced-motion behavior, and mobile reading order intact.
- **Do** identify the public brand as NYG Agency and retain NYG Digital FZE LLC in legal disclosures.

### Don't:

- **Don't** restore the superseded teal, mint, or serif visual direction.
- **Don't** substitute archived logo concepts for the supplied production identity.
- **Don't** add ornamental shadows, glows, or gradients to routine controls.
- **Don't** invent client results, testimonials, awards, or business facts.
