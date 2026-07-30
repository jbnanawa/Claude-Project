# Drift — bundle vs. shipping app

Comparison of this design system against the live app's `src/index.css` and
`index.html`, recorded 2026-07-23.

**Resolution: the bundle is canonical.** Nothing in `src/` has been changed — this file
records what would need to move if/when the app adopts the system.

---

## 1. The core palette already matches exactly

Every shared colour is byte-identical; only the *names* differ. No reconciliation
needed beyond aliasing.

| Bundle token | App token (`@theme`) | Value |
|---|---|---|
| `--gw-ink` | `--color-ink` | `#3d3230` |
| `--gw-ink-2` | `--color-ink-soft` | `#6b5c59` |
| `--gw-ink-3` | `--color-ink-muted` | `#9a8a86` |
| `--gw-green` | `--color-sage-600` | `#5f735f` |
| `--gw-sage` | `--color-sage-400` | `#8fa68e` |
| `--gw-sage-tint` | `--color-sage-200` | `#d5e0d6` |
| `--gw-sage-tint-2` | `--color-sage-100` | `#eef3ee` |
| `--gw-cream` | `--color-blush-50` | `#fff8f5` |
| `--gw-cream-2` | `--color-blush-100` | `#fdf0eb` |
| `--gw-blush` | `--color-blush-200` | `#f3d6d0` |

## 2. Amber is the biggest gap

The bundle defines `--gw-amber: rgb(158, 100, 25)` (`#9E6419`) plus
`--gw-amber-soft`. **The app defines no amber token at all** — the literal `#9E6419`
appears hardcoded **20 times** across `src/`, plus `#7d4f14` twice as an ad-hoc hover
shade. This is the highest-value single fix.

## 3. The aura is ~45% lighter in the bundle

Radial-gradient *positions* are identical in both. Only the alphas differ — the bundle
sits at ~55% of the app's opacity across the board, a deliberate "toned down" pass noted
in `readme.md`.

| Aura stop | Bundle | App | Aura stop | Bundle | App |
|---|---|---|---|---|---|
| coral | `0.12` | `0.22` | mint | `0.10` | `0.18` |
| gold | `0.11` | `0.20` | blue | `0.11` | `0.20` |
| olive | `0.08` | `0.14` | cyan | `0.08` | `0.14` |
| teal | `0.09` | `0.16` | terra | `0.09` | `0.16` |
| magenta | `0.07` | `0.12` | orange | `0.10` | `0.18` |

**Adopting this makes the page visibly paler and calmer.** It is the one change here
with an obvious on-screen effect.

Two further differences in the same background:

- **Base gradient.** Bundle `159deg, rgb(255,252,250) 16% → rgb(255,249,246) 43% →
  rgb(252,250,247) 84%`. App `160deg, #fff8f5 8.49% → #fdf0eb 41.7% → #f7f3ef 91.51%`.
  The app's base is warmer and deeper; the bundle's is nearly white.
- **Gradient sizing.** Bundle uses fixed px extents (`1008px 761px`), the app uses
  viewport percentages (`ellipse 70% 55%`). The app's technique scales better across
  breakpoints and is worth keeping even under "bundle wins" — port the alphas, not the
  units.

## 4. Glass card — near-identical, two small deltas

Border (`1px rgba(255,255,255,0.65)`), radius (`24px`) and shadow
(`0 8px 32px rgba(61,50,48,0.08)` + both insets) match exactly.

| | Bundle | App |
|---|---|---|
| fill angle | `107deg` | `135deg` |
| fill alphas | `.494 / .306 / .44` | `.496 / .304 / .44` (negligible) |
| backdrop-filter | `blur(20px)` | `blur(20px) saturate(1.6)` |

The app also ships a `.glass-menu` variant (more opaque, for floating menus) and a
`@supports not (backdrop-filter)` solid fallback. **Neither exists in the bundle** —
keep both; they are genuine additions.

## 5. Grain texture — different technique

Bundle ships `assets/texture-grain.png` (41 KB raster) for a ~5% overlay. The app
generates the same effect from an inline `feTurbulence` SVG data-URI at `opacity: 0.05`
with `mix-blend-mode: soft-light`, costing zero requests. **Keep the app's approach.**

## 6. Fonts

Both load Fraunces + Figtree from Google Fonts, but the axes differ:

| | Fraunces | Figtree |
|---|---|---|
| Bundle | 400, 500 | 400, 500, 600, 700 |
| App | 400, 500, **600** | 400, 500, 600 |

The app is missing Figtree 700; the bundle is missing Fraunces 600. A union of both is
the safe target.

## 7. Tokens the app has that the bundle doesn't

Not covered by the design system — decide whether to fold in or retire:

- `--color-mist-100/200/600` (`#edf2f7`, `#d3e0ea`, `#56718a`) — a cool blue-grey ramp
  with no bundle equivalent.
- `--color-blush-300..700` (`#e8b8b0` → `#8a4a4e`) — the bundle stops at blush-200.
- `--color-surface` / `--color-surface-solid`.

## 8. Tokens the bundle has that the app never names

The bundle formalizes a full type scale (`--text-display` 48px → `--text-2xs` 10.4px),
spacing (`--space-1..12`), radii (`--radius-sm..full`), layout (`--page-max` 1024px,
`--header-h` 65px), and tracking (`--tracking-serif` -0.5px, `--tracking-eyebrow`
0.16em). The app names none of these, relying on Tailwind defaults and arbitrary values.

The radius scale happens to line up with Tailwind already — `rounded-xl` (12px) =
`--radius-md`, `rounded-2xl` (16px) = `--radius-lg`, `rounded-3xl` (24px) =
`--radius-xl` — so the 44 `rounded-xl` and 11 `rounded-2xl` usages in `src/` are already
on-system.

