# AGENTS.md

## Cursor Cloud specific instructions

Glow Within is a frontend-only React + TypeScript app built with Vite. It has no backend or database; all goals and vision entries persist in browser local storage.

- Dev server: `npm run dev` (Vite, serves on `http://localhost:5173/`).
- Lint: `npm run lint` (oxlint; no output means clean).
- Build: `npm run build` (runs `tsc -b` then `vite build`).
- Preview production build: `npm run preview`.

Notes:
- Uses npm (see `package-lock.json`). Node 22 works.
- Because state lives in local storage, a fresh browser/profile starts empty; there is no login or account.
