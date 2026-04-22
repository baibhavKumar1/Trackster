# Design System: High-Energy Editorial

## 1. Overview & Creative North Star
**Creative North Star: "The Electric Nocturne"**
This design system is built to feel like a high-end digital concierge within a neon-soaked midnight environment. We are moving away from the "SaaS-standard" dashboard look. Instead, we embrace a **High-End Editorial** approach where the UI feels like a living, breathing luxury publication.

We break the "template" through **Intentional Asymmetry**. Content should not always sit in a perfect center; we use the `20 (7rem)` and `24 (8.5rem)` spacing tokens to create dramatic gutters, allowing the `display-lg` typography to command the screen. We reject the grid when it feels too rigid, opting for overlapping "Frosted Glass" containers that suggest a tactile, layered physical space.

---

## 2. Colors & Tonal Depth
Our palette is rooted in the depth of `background (#131315)`. It is not just "dark mode"; it is a curated void designed to make our `secondary_fixed (Neon Lime)` and `primary (Deep Violet)` elements vibrate with energy.

### The "No-Line" Rule
**Explicit Instruction:** Use of 1px solid borders for sectioning is strictly prohibited. You must define boundaries through background color shifts or tonal transitions. To separate a profile section from a feed, place a `surface_container_low` card on top of a `surface` background. The eye should perceive the change in depth, not a line.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the `surface_container` tiers to create "nested" depth:
* **Base:** `surface` (#131315)
* **Primary Containers:** `surface_container` (#201f21)
* **Elevated Elements:** `surface_container_high` (#2a2a2c)
* **The "Glass" Layer:** For floating cards, use a semi-transparent `surface_variant` with a `backdrop-filter: blur(24px)`.

### The "Glass & Gradient" Rule
To achieve professional polish, main CTAs must use a linear gradient from `primary (#cdbdff)` to `inverse_primary (#6833ea)`. This provides a visual "soul" that flat colors lack. Floating elements must feel light; use an inner glow (a 1px inset box-shadow) using `primary` at 15% opacity to simulate light hitting the edge of a glass pane.

---

## 3. Typography
We use a high-contrast pairing: **Space Grotesk** (Display/Headline) for a technical, brutalist edge, and **Manrope** (Body/Label) for sophisticated readability.

* **Display & Headline:** Use `display-lg` (3.5rem) for Auth screens and 404 states. The tight tracking and bold weight of Space Grotesk convey authority.
* **Body:** `body-lg` (1rem) in Manrope provides a clean, neutral balance to the high-energy display type.
* **Labeling:** `label-md` (0.75rem) should be used for secondary data, often in `on_surface_variant` (#cbc3d9) to maintain a hierarchy that doesn't compete with the primary actions.

---

## 4. Elevation & Depth
Depth is achieved through **Tonal Layering**, not structural lines.

* **The Layering Principle:** Place a `surface_container_lowest` card on a `surface_container_low` section to create a soft, natural lift.
* **Ambient Shadows:** For floating elements (Modals, Ticket Previews), use an extra-diffused shadow: `box-shadow: 0 20px 80px rgba(0, 0, 0, 0.45)`. The shadow color should never be pure black; it should feel like a deep violet-tinted occlusion.
* **The "Ghost Border" Fallback:** If accessibility requires a container boundary, use a "Ghost Border": `outline_variant` (#494456) at **15% opacity**.

---

## 5. Components

### Floating Label Inputs
Standard inputs are too heavy. Use a `surface_container_highest` background with `md (1.5rem)` roundedness. Labels should sit inside the field, morphing to a smaller `label-sm` position on focus. The active state is signaled by a `secondary` (Neon Lime) 2px glow on the bottom edge only.

### Large Pill CTAs (Buttons)
* **Primary:** High-energy gradient (`primary` to `inverse_primary`). Shape: `full (9999px)`. Size: Height 56px (using `10` spacing scale).
* **Secondary:** Ghost style. Transparent background, `secondary` (Neon Lime) text, and a `Ghost Border`.
* **States:** On hover, the pill should slightly expand (scale: 1.02) and the `backdrop-filter` should intensify.

### Animated OTP Boxes
For Auth flows, use four individual `surface_container_high` squares with `md (1.5rem)` corners. When a digit is entered, the background should morph to `primary_container` with a subtle `secondary` pulse.

### Ticket Management Cards
**Forbid the use of divider lines.** Separate ticket details using vertical white space (`1.5 / 0.5rem` tokens) and `body-sm` labels. Use a `surface_bright` background for the "active" ticket to make it pop against the darker stack.

### Category Pill Buttons
Small, interactive chips using `surface_container_high`. On selection, they transition to `secondary_fixed` (Neon Lime) with `on_secondary_fixed` (Dark Green/Black) text.

---

## 6. Do’s and Don’ts

### Do:
* **Do** use `secondary_fixed` (Neon Lime) sparingly as a high-voltage accent for "Success" or "Primary Action."
* **Do** allow elements to overlap. A ticket card can partially obscure a background decorative element to create depth.
* **Do** use progressive transitions. When moving from a Login screen to a Waitlist screen, elements should "morph" or slide with a staggered delay.

### Don’t:
* **Don’t** use 100% opaque white for body text; use `on_surface` (#e5e1e4) to reduce eye strain against the dark background.
* **Don’t** use standard 4px or 8px corners. Our signature look requires the bold `md (1.5rem / 24px)` or `full` roundedness.
* **Don’t** use flat grey backgrounds. Always use the provided `surface` tokens which contain a subtle violet undertone to maintain the "Electric Nocturne" vibe.