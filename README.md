# Nitin Mohan, Portfolio

A single-page developer portfolio with a working "Ask me anything" AI chat box. The chat is a live GenAI demo: it answers questions about my background, experience, and projects, grounded in the same data file that renders the rest of the site.

Built with **Next.js 14 (App Router), TypeScript, and Tailwind CSS**. Dark only. Deploys free on Vercel.

## Features

- **AI chat box, as its own section.** Streams answers from OpenRouter (free LLM models, OpenAI-compatible streaming), grounded in a system prompt built from `data/profile.ts`. The key stays server-side; the endpoint is rate-limited per IP and output-token capped. Replies render as formatted Markdown (react-markdown + remark-gfm); the system prompt steers toward short bullets and forbids tables, since the chat column is narrow.
- **Sections.** Hero, About (with a Toolkit grid), Projects (alternating full-width rows plus a compact grid), Ask my AI, GitHub activity, Experience & Education, Contact. A fixed top nav tracks the active section as you scroll.
- **Live GitHub feed.** A server component fetches recent repos from the unauthenticated GitHub API with a 1-hour cache. It degrades gracefully and renders a fallback link if the API is unavailable.
- **Scroll-driven motion from one component.** Reveals, cursor glow, magnetic buttons, card tilt, nav condense, progress bar and scroll-spy all live in `components/MotionLayer.tsx`; sections stay server components and opt in with data-attributes. Everything is gated behind `prefers-reduced-motion`.

## Run locally

```bash
npm install
cp .env.example .env.local      # then add your key (see below)
npm run dev                     # http://localhost:3000
```

Other commands:

```bash
npm run build    # production build
npm run start    # serve the production build
```

Typecheck with `npx tsc --noEmit`. There is no test suite, and ESLint is not configured (`npm run lint` drops into Next's interactive setup).

## OpenRouter API key (powers the chat box)

The chat box calls OpenRouter, not the Anthropic API. `lib/anthropic.ts` is named for historical reasons and talks to OpenRouter over plain `fetch`.

1. Create a **free** key at <https://openrouter.ai/keys>. No billing card is needed for `:free` models.
2. Add it to `.env.local`:
   ```
   OPENROUTER_API_KEY=sk-or-...
   ```
3. Restart `npm run dev`.

Keep real keys out of `.env.example` — that file is committed.

Without a key the site still runs. The chat endpoint returns a 503 "not configured" message instead of live answers.

### Model fallback chain

Free models rate-limit constantly, so the chat does not depend on a single one. `CHAT_MODELS` in [`lib/anthropic.ts`](lib/anthropic.ts) is an ordered list of free model slugs; the route ([`app/api/chat/route.ts`](app/api/chat/route.ts)) tries each in turn until one streams a response. To change or reorder models, edit that array. Browse free slugs at <https://openrouter.ai/models?max_price=0>.

## Editing content

**Everything personal lives in one file: [`data/profile.ts`](data/profile.ts).** Name, tagline, bio, mindset, target roles, experience, education, skills, projects, socials, location, and GitHub username all live there. That object drives every section AND the chat system prompt (`buildSystemPrompt()` in `lib/anthropic.ts` serializes it at request time), so the rendered site and the AI answers never drift apart. Edit content here, not in the components.

- **Add or remove a project** → edit the `projects` array. The first three render as full rows with `metrics` and `tech` chips; the rest render in the compact grid. Set `repo` or `demo` to a URL, or to `null` to hide that link.
- **Add a project screenshot** → drop an image in `public/` and set that project's `image` field. `null` renders a hatched placeholder.
- **Swap the profile photo** → replace `public/avatar.jpg`, or point `photo` at another path.
- **Change the GitHub feed** → set `NEXT_PUBLIC_GITHUB_USERNAME`, or edit `githubUsername` in `profile.ts`.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import it at <https://vercel.com/new>. The framework is auto-detected as Next.js.
3. Add the env var **`OPENROUTER_API_KEY`** under *Project, Settings, Environment Variables*.
4. Deploy. Optionally add a custom domain under *Settings, Domains*.

## Tech notes

- **Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS. Chat replies render via react-markdown + remark-gfm. No animation library — motion is hand-rolled in `MotionLayer`.
- **Design system:** dark-only. Ground `#151a22`, one coral accent `#f9765d`, hairline 1px grids instead of shadows, Bricolage Grotesque / DM Sans / JetBrains Mono. Tokens live in `tailwind.config.ts`.
- **Rendering:** Server components by default; `"use client"` only where interactivity is needed (the chat section, Markdown, and MotionLayer).
- **Chat endpoint** (`app/api/chat/route.ts`, Node runtime): in-memory per-IP rate limit (8 requests/minute), trims to the last 10 messages, enforces an input character cap, and re-streams OpenRouter SSE deltas to the client as plain text.
- **GitHub section** (`components/GitHubActivity.tsx`): server component, unauthenticated GitHub API, `next: { revalidate: 3600 }` to stay under the rate limit; renders a fallback link if the API is down.
