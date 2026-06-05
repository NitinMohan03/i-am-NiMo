# Nitin Mohan — Portfolio

A fast, dark, single-page developer portfolio with a signature **"Ask me anything"
AI chat box** as the hero — a live GenAI demo that answers questions about my
background, experience, and projects.

Built with **Next.js (App Router) · TypeScript · Tailwind CSS · Framer Motion**.
Deploys free on Vercel.

## Features

- 🤖 **AI chat box** — streams answers from OpenRouter (free LLM models), grounded in a system prompt built from `data/profile.ts`. Server-side key, rate-limited, token-capped.
- ✨ **Cursor-reactive dot-grid** background (canvas, GPU-friendly, reduced-motion aware).
- 🧩 Bento **About**, card-grid **Projects**, **live GitHub** repos, orbit **Skills**, **Contact**.
- 🌗 Dark (default) / light toggle, fully responsive, accessible, SEO + Open Graph.

## Run locally

```bash
npm install
cp .env.example .env.local      # then add your key (see below)
npm run dev                     # http://localhost:3000
```

### OpenRouter API key (powers the chat box)

1. Create a **free** key at <https://openrouter.ai/keys> (no billing card needed for `:free` models).
2. Add it to `.env.local`:
   ```
   OPENROUTER_API_KEY=sk-or-...
   ```
3. Restart `npm run dev`.

Model is set in [`lib/anthropic.ts`](lib/anthropic.ts) (`CHAT_MODEL`) — defaults to a
free Llama model. Browse alternatives at <https://openrouter.ai/models>.

Without a key the site runs fine — the chat box just replies with a friendly
"not configured" message instead of live answers.

## Editing your content

**Everything personal lives in one file: [`data/profile.ts`](data/profile.ts).**
Name, tagline, bio, experience, education, skills, projects, socials, location,
GitHub username. Edit the arrays/objects there and the whole site (and the chat
assistant's knowledge) updates automatically.

- **Add/remove a project** → edit the `projects` array. Each card shows its `number` field; set `repo`/`demo` to a URL or `null` to hide the link button.
- **Swap the profile photo** → drop an image at `public/avatar.jpg` and set `photo: "/avatar.jpg"` in `profile.ts`. Until then a gradient/initials avatar is shown.
- **Chat model** → change `CHAT_MODEL` in [`lib/anthropic.ts`](lib/anthropic.ts).

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import it at <https://vercel.com/new> (framework auto-detected as Next.js).
3. Add the env var **`OPENROUTER_API_KEY`** under
   *Project → Settings → Environment Variables*.
4. Deploy. (Optional) add a custom domain under *Settings → Domains*.

## Tech notes

- GitHub repos are fetched server-side with a 1-hour cache (`revalidate: 3600`) to stay under the unauthenticated rate limit; the section degrades gracefully if the API is unavailable.
- The chat endpoint (`app/api/chat/route.ts`) enforces an in-memory per-IP rate limit and a max output-token cap.

## Open TODOs

- Add real repo / live-demo URLs per project in `profile.ts` (currently point to the GitHub profile).
- Drop in a real profile photo (see above).
- Optional add-ons: résumé-download button, Vercel Analytics, blog section.
