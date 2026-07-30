---
name: glow-within-design
description: Use this skill to generate well-branded interfaces and assets for Glow Within, a tender wellness & self-growth app, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

The design system lives in the repo at **`design system/`** (note the space in the
folder name — quote it in shell commands). Read `design system/readme.md` first,
then explore the other files there.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets
out and create static HTML files for the user to view. If working on production code,
you can copy assets and read the rules here to become an expert in designing with this
brand. If the user invokes this skill without any other guidance, ask them what they
want to build or design, ask some questions, and act as an expert designer who outputs
HTML artifacts _or_ production code, depending on the need.

Quick orientation:
- `design system/styles.css` is the single CSS entry point (imports all tokens in
  `tokens/`). Link it and use the CSS custom properties (`--gw-green`, `--gw-amber`,
  `--surface-page`, `--glass-fill`, `--shadow-card`, `--font-serif`, `--font-sans`, …).
- Fonts are Fraunces (serif display/headings) and Figtree (sans UI), loaded via Google
  Fonts from `tokens/fonts.css`.
- Components live in `design system/components/` as React `.jsx` with `.d.ts` +
  `.prompt.md`; read the prompt files for usage. Icons are Lucide-based via the `Icon`
  component.
- The full app recreation is in `design system/ui_kits/glow-within/`.
- Signature look: warm cream "aura" gradient background, translucent glass cards (24px
  radius, soft cocoa shadow, white hairline), sage-green actions, one amber accent,
  gentle/reassuring copy, occasional 🌱💧 growth emoji.

## Relationship to the shipping app

The production app is a **React 19 + TypeScript + Tailwind v4** codebase in `src/`. It
predates this bundle and implements the same visual language independently, via a
`@theme` block in `src/index.css` and inline utility classes — there are **no shared
primitives**; `glass-card` is repeated across 12 files, the primary-button class string
15×, and amber `#9E6419` is hardcoded 20×.

The bundle's `.jsx` components are therefore a **specification, not an import target**.
Do not wire `design system/components/*.jsx` into `src/` — they are plain JSX against
raw CSS variables and would fight Tailwind. Port the *design* into TypeScript + Tailwind
primitives instead.

**Where the two disagree, the bundle is canonical** (the user's decision). See
`design system/DRIFT.md` for the itemized divergences — most visibly, the bundle's aura
is roughly 45% lighter than what `src/index.css` currently ships.
