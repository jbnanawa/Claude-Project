# Glow Within

Client-only React 19 + TypeScript + Vite 8 wellness/manifestation SPA (goals, daily affirmations, vision board). All state persists in the browser via `localStorage` — there is no backend, database, or API.

## Cursor Cloud specific instructions

- Standard commands live in `package.json` (`dev`, `build`, `lint`, `preview`) and `README.md`; use those.
- Dev server: `npm run dev` serves on port `5173` (Vite default). Use `npm run dev -- --host` if you need to reach it from outside the VM.
- Lint uses oxlint (`npm run lint`), not ESLint. Config: `.oxlintrc.json`.
- `npm run build` runs `tsc -b` (typecheck) then `vite build`; a build failure may be a type error, not a bundling error.
- No test runner is configured (no `test` script).
- No env vars, secrets, or external services are required to run or test the app.
