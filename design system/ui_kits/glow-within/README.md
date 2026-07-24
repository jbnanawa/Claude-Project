# Glow Within — App UI Kit

An interactive recreation of the Glow Within wellness web app: a gentle daily
companion for goals, gratitude, affirmations, and vision boards.

## Screens
- **Today** (`TodayScreen.jsx`) — greeting, daily affirmation, Growth Journey with the weekly watering streak, monthly-intentions preview, and goal/vision summary cards.
- **Garden** (`GardenScreen.jsx`) — add a gratitude ("water your plant"), growth calendar, past waters list.
- **Intentions** (`IntentionsScreen.jsx`) — daily/monthly segmented tabs, a goal form (Input + Select + Textarea), and the growing goals list.
- **Vision Board** (`VisionScreen.jsx`) — getting-started steps, add-a-pin form (upload / link / quote), and the board grid.

`App.jsx` is the shell: sticky `TopNav`, a simple tab router, and shared state
(streak, gratitudes, goals, visions) threaded to each screen. Watering in Today
or adding a gratitude in Garden advances the same streak.

## Run
Open `index.html`. It loads `styles.css` + `_ds_bundle.js`, then each screen
script (which reads components from `window.GlowWithinDesignSystem_5614ce` and
registers itself on `window`), then `App.jsx`.

## Notes
The source Figma has both a wide (top-nav) layout and a narrow (bottom-tab-bar)
layout of these screens; this kit implements the wide layout and reuses the
`BottomNav` component for the mobile variant. Image/photo areas are gradient
placeholders — the source ships no real photography beyond a faint paper grain.
