# Glow Within — Design System

Glow Within is a tender, personal **wellness & self-growth web app**. It's the
kind of quiet daily companion that greets you by name, offers an affirmation,
and invites tiny acts of showing up — a gratitude "watering" that grows a
garden, a monthly intention, a vision board for the life you're becoming.
The whole product feels like a warm, sunlit journal: soft, unhurried, and kind.

This design system captures that feeling as reusable tokens, components, and a
full app UI kit.

## Source
- **Figma:** "Glow Within Design System.fig" (mounted read-only). Page 1 holds
  14 frames — onboarding (Welcome, Name, Focus, Garden intro) plus the four core
  app screens (Today, Garden, Intentions, Vision Board) in both a wide top-nav
  layout and a narrow bottom-tab layout.
- The file defines **no formal component sets or Figma Variables** — the visual
  language lives in the screen frames. Components and tokens here were extracted
  by transcribing exact inline values from those frames (radii, colors, spacing,
  type). One raster asset ships: a faint paper-grain texture (`assets/texture-grain.png`).
- **No logo mark** exists in the source, so the brand renders as a wordmark:
  an amber "Gw" tile beside "Glow Within" set in Fraunces. See `Wordmark`.

---

## Content fundamentals
The voice is a **warm, second-person friend** — never clinical, never a
productivity taskmaster.

- **Person & tone.** Talks *to* you ("your little corner", "You've shown up 0
  days for yourself") and sometimes *as* a gentle guide using "I"/"me" ("Tell me
  what it represents"). Encouraging, soft, permission-giving.
- **Reassurance over pressure.** Empty states comfort rather than nag:
  "No goals yet — and that's okay", "Nothing planted yet", "No pressure — just
  small moments of showing up for yourself."
- **Nature & growth metaphors** run throughout: watering, seeds, seasons,
  blooming, gardens, "one drop of care".
- **Casing.** Page titles and card headings are Title/sentence case in serif;
  eyebrows are ALL-CAPS with wide tracking ("GOOD AFTERNOON", "THIS WEEK",
  "GETTING STARTED"). Buttons are sentence case ("Water with gratitude").
- **Emoji:** used sparingly and only as *organic* growth glyphs — 🌱 for the
  garden/season, 💧 for watering. No faces, no decorative emoji elsewhere.
- **Punctuation.** Em dashes for gentle asides; curly quotes around
  affirmations. Copy is short, tender, and low-stakes.

Example affirmation: *"Abundance finds me when I stay open, grounded, and true."*

---

## Visual foundations

**Palette.** Warm and low-saturation. Cocoa **ink** for text
(`--gw-ink` #3D3230 → `--gw-ink-2` → muted `--gw-ink-3`), **sage greens** for
action (`--gw-green` deep sage #5F735F, `--gw-sage` #8FA68E, pale tints), a
single **amber** accent (`--gw-amber` #9E6419) for eyebrows, links and the
wordmark, and **warm cream/blush** paper surfaces. See `tokens/colors.css`.

**The aura.** Every screen sits on `--surface-page`: ten very-low-opacity radial
gradients (coral, gold, olive, teal, magenta, mint, blue, cyan, terracotta,
orange) drifting over a warm cream base — a soft rainbow "aura". It's the single
most recognizable brand move. A faint paper-grain PNG can overlay at ~5% opacity.

**Type.** Two families:
- **Fraunces** (serif) — expressive, slightly old-style; all display &
  headings & affirmations. Weight 400, with **-0.5px** tracking. Sizes 48 / 36 /
  30 / 24 / 20 / 18.
- **Figtree** (sans) — all UI text, body, labels. 16 / 14 body, 12 eyebrow
  (semibold, 0.16em, uppercase), 10.4 nav labels. Body line-height is generous
  (~1.625).

**Cards.** The signature element: a **translucent glass card** — a warm
white-cream gradient fill (`--glass-fill`), a 1px `rgba(255,255,255,0.65)` white
hairline border, **24px** radius, and a soft cocoa shadow
`0 8px 32px rgba(61,50,48,0.08)` plus inset white highlights, over a 20px
backdrop-blur. Many cards carry faint blush + sage **orbs** bleeding off the
corners (`Card blobs`).

**Corners & radii.** 8 (small), **12** (buttons, nav pills, tabs), 16 (inputs),
**24** (cards), full (chips, day circles, progress).

**Borders.** Blush hairlines (`--border-soft`) on the header; white hairlines on
glass; pale-sage on inputs; and **dashed amber** for reassuring empty states and
"getting started" panels.

**Elevation.** Two shadows only: the soft card glow, and a barely-there header
shadow. Nothing heavy or dark.

**Buttons.** Rounded (12px). Primary = deep sage fill, white text; sage = soft
sage; secondary = white with a hairline; ghost = amber text link, usually with a
trailing ↗ arrow. Full-width primary/sage CTAs are common in forms.

**Motion & states.** Gentle and quick (~0.18s ease). Hover = a slight
brightness/opacity shift; press = a small 0.98 scale. Inputs light a sage focus
ring `0 0 0 3px rgba(143,166,142,0.18)`. Progress/width transitions ease over
~0.4s. Nothing bouncy or flashy — calm is the point.

**Imagery.** The source ships no photography; image regions are placeholders. If
adding imagery, keep it warm, soft, and natural-lit to match the aura.

---

## Iconography
- **Line icons**, 2px-equivalent weight, round joins, `currentColor` (recolorable).
  The `Icon` component is the icon system.
- **File-native glyphs.** The chevrons (`chevron-left`, `chevron-right`,
  `chevron-down`) and `arrow-up-right` carry the **exact geometry from the Glow
  Within Figma** (stroke-expanded fills), and the raw source SVGs are copied
  verbatim into `assets/icons/`.
- **Lucide (MIT) glyphs** fill the rest of the set — `sun`, `sprout`, `target`,
  `image` (the four nav icons), `plus`, `x`, `check`, `droplet`, `heart`,
  `sparkles`, `flower`. *(Substitution flag: the four bottom-nav icons resolved
  to a single instance-swap placeholder in the Figma export, so distinct source
  SVGs weren't recoverable for them; the Lucide equivalents match the file's
  visual style. If you have the exact source SVGs, drop them into
  `assets/icons/` and I'll wire them in.)*
- **Emoji** 🌱 💧 appear as organic growth glyphs inside the Garden / Growth
  Journey features (not as UI icons).

---

## Components
Reusable primitives extracted from the screen frames (grouped by concern):

**Forms** — `Button`, `Input`, `Textarea`, `Select`
**Content** — `Card`, `Tag`, `Eyebrow`, `ProgressBar`, `DayTracker`, `EmptyState`
**Navigation** — `TopNav` (+ `Wordmark`), `BottomNav`, `SegmentedTabs`
**Media** — `Icon`

### Intentional additions
- **`Icon`** — the source has no icon component, but the screens rely on a
  consistent Lucide glyph set; `Icon` wraps it so kits/slides don't hand-roll SVG.

## UI kits
- **`ui_kits/glow-within/`** — the full interactive app (Today, Garden,
  Intentions, Vision Board) with a shared streak/goals/visions state. Entry:
  `index.html`. Also registered as a Starting Point.

## Index / manifest
- `styles.css` — root entry; `@import`s all tokens.
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `effects.css`.
- `components/{forms,content,navigation,media}/` — primitives (`.jsx` + `.d.ts` + `.prompt.md` + card).
- `guidelines/*.card.html` — foundation specimen cards (Colors, Type, Spacing, Brand).
- `ui_kits/glow-within/` — the app UI kit.
- `assets/texture-grain.png` — the paper-grain overlay.
- `SKILL.md` — Agent-Skill wrapper.
