# Glow Within — User testing kit

Quick setup for a **moderated, think-aloud** study (best fit for this stage).

## What you’re testing

Glow Within is a soft self-care space for daily check-ins, intentions, goals, and a vision board. Data stays in the browser (`localStorage`) — nothing is sent to a server.

## Recommended format

| | Recommendation |
|---|---|
| **Format** | Moderated · 25–30 min · think-aloud |
| **People** | 5 participants (enough to spot repeated friction) |
| **Device** | Mix of phone + desktop if you can |
| **Product under test** | Live app (preferred) or Figma screens |

### How participants use the app

Pick one:

1. **Live link (best)** — Deploy a preview (e.g. Vercel/Netlify) and send the URL. Testers use a fresh browser / private window.
2. **You host on a call** — Share your screen or give them temporary access while you watch on Zoom/Meet.
3. **Figma only** — Walk through [desktop](https://www.figma.com/design/JKBlhw72H9rIvkcKSiKR14?node-id=11-2) / [mobile](https://www.figma.com/design/JKBlhw72H9rIvkcKSiKR14?node-id=30-2) screens (click-through prototype optional).

## Files in this folder

| File | Use |
|---|---|
| [recruitment.md](./recruitment.md) | Invite + short screener |
| [consent.md](./consent.md) | Privacy / recording consent |
| [facilitator-guide.md](./facilitator-guide.md) | Your session script |
| [tasks.md](./tasks.md) | Task list (share or read aloud) |
| [notes-template.md](./notes-template.md) | One copy per participant |

## Share links

| What | Link |
|---|---|
| **Live app** | Not deployed yet — say **“retry deploy”** after `npx vercel login`, or screen-share with `npm run preview`. |
| **Signup form** | Open locally: [signup.html](./signup.html) |
| **Figma prototype — desktop** | [Play from onboarding](https://www.figma.com/proto/JKBlhw72H9rIvkcKSiKR14?node-id=190-4&starting-point-node-id=190-4&scaling=scale-down-width) |
| **Figma prototype — mobile** | [Play from onboarding](https://www.figma.com/proto/JKBlhw72H9rIvkcKSiKR14?node-id=206-2&starting-point-node-id=206-2&scaling=scale-down-width) |
| **Scheduling kit** | [scheduling.md](./scheduling.md) · [notion-signups.csv](./notion-signups.csv) · [signup.html](./signup.html) |

### Deploy (permanent link)

1. In Terminal: `npx vercel login` and approve in the browser.
2. Tell me **“retry deploy”** — I’ll publish and paste the `*.vercel.app` URL here.

## Run checklist

- [ ] Recruit 5 people with [recruitment.md](./recruitment.md) or [signup.html](./signup.html)
- [ ] Send [consent.md](./consent.md) before the session
- [ ] Share live app (after deploy) and/or Figma prototype links above
- [ ] Seed or clear demo data so first-time flow is honest
- [ ] Print or open [facilitator-guide.md](./facilitator-guide.md) + [notes-template.md](./notes-template.md)
- [ ] After all sessions: cluster notes → top 5 issues → decide what to fix next

## Success signals (what to listen for)

- Do they understand **Garden** vs **Today** vs **Intentions**?
- Does onboarding feel worth it or skippable?
- Can they complete a check-in (plant gratitude) without help?
- Do they know where to go next after Today?
- Mobile: is the bottom tab bar clear?

## After testing

Synthesize with sticky themes (e.g. “language confusing”, “didn’t find X”). Prefer **repeated** issues from 2+ people over one-off opinions.
