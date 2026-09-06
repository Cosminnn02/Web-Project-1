# Change log

## 2026-07-07 — About + Process: new interactive language (v2)
User: "use the skills to find NEW animations/interactive ways — don't reuse
the main page's patterns, they get stale." Research via design-research
skill (Codrops Motion Highlights #17 + tutorials; web_search still 401):
kept the pointer-driven / kinetic-type / direct-manipulation family,
dropped Three.js noise. Result — no pinning, no scrub, no marquee:

- **About → drag rail (direct manipulation).** "What we keep" is a rail you
  pull: pointer/touch drag with velocity, release coasts and snaps to the
  nearest pillar (GSAP `power3.out`), arrows + live `01 / 03` counter,
  grab/grabbing cursor, `touch-action: pan-y` so vertical scroll survives.
  (Fixed: drag math compounded the pointer delta each event — now anchored
  to the position captured at `pointerdown`, tracks 1:1.)
  Heading uses **scramble-decode** (new `components/Scramble.tsx` — kinetic
  typography, resolves left→right in view; verbatim under reduced motion).
  Reduced motion: rail → plain `overflow-x: auto`, arrows hidden.
- ~~Scramble-decode headings~~ — user: "it does not fit the website." Removed;
  headings are plain text, `components/Scramble.tsx` deleted.
- **Process top → interactive index.** Big ghost word (Listen/Write/Hold)
  crossfades as you hover the three-row step ledger; rows slide + gold on
  hover and smooth-scroll (Lenis `scrollTo`) to the matching card (`#pr-step-N`).
  Replaced the plain centered intro (user: "too simple").
- **Process → cards that live under your hand.** Three full cards, each:
  **3D tilt** follows the cursor (±7°, damped), **spotlight** radial
  follows the pointer, and a **180° flip** turns the card over to the
  "fine detail" (3 new micro-copy lines per step, `BACKS`). Flip = click or
  Enter/Space, aria-pressed synced; back flips back. Step titles scramble-
  decode in view. "What you never see" ledger, testimonial, turn unchanged.
  Reduced motion: tilt/scramble skip, flip stays as an instant state change.
- **globals.css:** new `pr-flip / pr-flip-inner / pr-face / pr-back /
  pr-glow` 3D block (perspective on the article, preserve-3d chain) +
  `ab-rail` grab cursor + reduced-motion fallbacks.
- Superseded today's earlier v1 (horizontal scroll journey + stacked sticky
  cards) — that one still leaned on the pin/scrub family the user wanted gone.
- Verified: build ✓, lint ✓, 7 routes 200, new markup served (old pin/act
  markup gone), CSS bundle contains all new rules.

## Project facts (quick reference)
- Next.js 16.3.4 App Router, React 19, TS, Tailwind v4, GSAP via `@/lib/gsap`,
  `useReveal<T>` hook, tokens charcoal/ivory/cream/ink/gold/line,
  `tracking-luxe`, `font-serif` (Fraunces) + Inter.
- `images.unoptimized: true`; assets in `public/images` + `public/pics` +
  `public/videos` (5 mp4s). Experiences keeps its old-git pinned video version.
- `lib/data.ts`: `SIGNATURE_SLUGS` (7), `EXPERIENCES` (5 w/ video), `STEPS`
  (3 w/ image), `DESTINATIONS` (18).
- Server: `npx next start -p 3000` from this dir (background job).
  Stale-server trap: kill the :3000 listener before starting.
- Build/lint need full-access sandbox (npm/next child spawns EPERM confined).
- Rules: AGENTS.md — compact chat, save important content to files,
  no git commit unless asked.
