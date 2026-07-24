---
name: glow-within-design
description: Use this skill to generate well-branded interfaces and assets for Glow Within, a tender wellness & self-growth app, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Quick orientation:
- `styles.css` is the single CSS entry point (imports all tokens in `tokens/`). Link it and use the CSS custom properties (`--gw-green`, `--gw-amber`, `--surface-page`, `--glass-fill`, `--shadow-card`, `--font-serif`, `--font-sans`, …).
- Fonts are Fraunces (serif display/headings) and Figtree (sans UI), loaded via Google Fonts from `tokens/fonts.css`.
- Components live in `components/` as React `.jsx` with `.d.ts` + `.prompt.md`; read the prompt files for usage. Icons are Lucide-based via the `Icon` component.
- The full app recreation is in `ui_kits/glow-within/`.
- Signature look: warm cream "aura" gradient background, translucent glass cards (24px radius, soft cocoa shadow, white hairline), sage-green actions, one amber accent, gentle/reassuring copy, occasional 🌱💧 growth emoji.
