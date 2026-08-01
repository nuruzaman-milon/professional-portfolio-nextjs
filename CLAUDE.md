# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev     # Start dev server
npm run build   # Production build
npm run start   # Serve production build
npm run lint    # next lint
```

There are no tests. Both `package-lock.json` and `yarn.lock` exist; npm is the safer default, and `npm install` needs `--legacy-peer-deps` (react-day-picker@8 doesn't declare React 19 peer support).

Env vars (see `.env.example`): `MONGODB_URI` (Atlas), `AUTH_SECRET` + `ADMIN_PASSWORD` (admin panel), `RESEND_API_KEY` (contact form), `NEXT_PUBLIC_BASE_URL` (canonical URLs).

## Architecture

Personal portfolio site (Nuruzaman Milon) on Next.js App Router (v16, React 19, TypeScript strict) with a built-in backend: MongoDB (Mongoose) + a custom admin panel at `/admin`. No `src/` directory; the path alias `@/*` maps to the repo root.

### Content: DB-first with static fallback

All public content flows through `lib/content.ts` — the single data-access layer. It reads from MongoDB when `MONGODB_URI` is set and the DB has content, and **falls back to the static files `data/blog.ts` / `data/projects.ts`** when the DB is unconfigured, unreachable, or empty. The site therefore always renders, even with no database.

- `lib/db.ts` — cached Mongoose connection; `hasDb()` gates all DB paths.
- `lib/models.ts` — `Post` and `Project` schemas (both have `published`; projects have `sortOrder`).
- `lib/content.ts` — exports `PostDTO`/`ProjectDTO` and all getters. Public components take these DTOs as props.
- `POST /api/seed` (admin-only) upserts the static `data/` content into MongoDB by slug — the migration path; triggered from the admin dashboard.

Public pages are server components with `revalidate = 300`; every admin mutation also calls `revalidatePath` for instant updates. Client-side interactive pages are split: thin server `page.tsx` fetches data → passes to `components/BlogListClient.tsx`, `ProjectsListClient.tsx`, `ProjectDetailClient.tsx`. Note `params` is a `Promise` (Next 15+ style).

### Admin panel & auth

- `/admin` (dashboard with seed button), `/admin/posts`, `/admin/projects` — client pages calling the REST routes; forms in `components/admin/` (array fields edited as one-per-line textareas, blog content as raw HTML in a textarea).
- Auth is a single admin password: `POST /api/auth/login` compares against `ADMIN_PASSWORD`, sets a jose-signed JWT cookie (`admin_session`); `middleware.ts` guards `/admin/*` (redirects to `/admin/login`), and every mutating API route re-checks via `isAuthenticated()` from `lib/auth.ts`.
- API: `GET/POST /api/posts`, `GET/PUT/DELETE /api/posts/[id]`, same for `/api/projects`. All return `{error}` with 503 when no `MONGODB_URI`.
- Shared admin styling constants live in `components/admin/ui.ts`.

### Routes

- `app/page.tsx` — homepage composing section components (`Hero`, `About`, `Skills`, `Projects`, `Blog`, `Contact`); fetches featured projects + latest posts and passes them to `Projects`/`Blog`.
- `app/blog/[slug]` renders post `content` (an HTML string) via `dangerouslySetInnerHTML`, styled by `@tailwindcss/typography` (`prose` overrides in `app/globals.css`).
- `app/api/contact/route.ts` — contact-form email via Resend (client instantiated inside the handler so builds work without the key).

### Theming & styling

- Dark/light mode via **custom** `ThemeProvider` in `contexts/ThemeContext.tsx` (class-based, localStorage) + anti-flash inline script in `app/layout.tsx`. `components/theme-provider.tsx` (next-themes) is unwired shadcn leftover — don't use it. Dark is default; style both modes explicitly (`dark:` variants).
- `app/globals.css` is the active stylesheet (`styles/globals.css` is unused scaffold). Custom `pf-*` classes (`pf-mesh`, `pf-noise`, `pf-grid`, `pf-serif`) form the background/texture system; `.sc`, `.soc`, `.btn-p/.btn-g`, `.cta-link` etc. are the button/card primitives.
- Fonts via `next/font` in the layout: Plus Jakarta Sans (`--font-sans`), Instrument Serif (`--font-serif`, display headings via `.pf-serif`), JetBrains Mono (`--font-mono`). Body text convention: `text-gray-600 dark:text-gray-300`, normal weight (no `font-light`); 10–11px sizes are reserved for ornamental mono labels.
- `components/ui/` is the full shadcn/ui set but most sections use raw Tailwind + framer-motion; match the existing section style.
- Sections must NOT add their own horizontal padding — `components/Container.tsx` provides `px-4 sm:px-6 lg:px-8`.

### Other notes

- The repo was scaffolded from v0; unused artifacts remain (e.g. `components/Test.tsx`).
- Some code comments are written in Bengali.
- `next.config.ts` allows `next/image` from any https host (admin-entered image URLs).
