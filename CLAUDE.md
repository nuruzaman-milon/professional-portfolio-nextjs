# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev     # Start dev server
npm run build   # Production build
npm run start   # Serve production build
npm run lint    # next lint
```

There are no tests. Both `package-lock.json` and `yarn.lock` exist; npm is the safer default.

The contact API requires a `RESEND_API_KEY` env var (`.env.local`). `NEXT_PUBLIC_BASE_URL` is optionally used for canonical/OG URLs on blog pages.

## Architecture

Personal portfolio site (Nuruzaman Milon) on Next.js App Router (v16, React 19, TypeScript strict). No database and no CMS — all content is hardcoded in TypeScript data files. There is no `next.config` file and no `src/` directory; the path alias `@/*` maps to the repo root.

### Content as data files

- `data/projects.ts` — `Project` interface + array, with helpers `getProjectBySlug`, `getFeaturedProjects`, `getAdjacentProjects`. Project images are statically imported from `public/images/projects/` so Next can optimize them.
- `data/blog.ts` — `BlogPost` interface + array, with helpers `getBlogPost`, `getRelatedPosts`. `content` is a raw HTML string rendered via `dangerouslySetInnerHTML` in `app/blog/[slug]/page.tsx`, styled by `@tailwindcss/typography` (`prose` overrides live in `app/globals.css`).

Adding a project or blog post means editing these files, not creating routes.

### Routes

- `app/page.tsx` — single-page homepage composed of section components: `Hero`, `About`, `Skills`, `Projects`, `Blog`, `Contact` (all in `components/`, all `"use client"` with framer-motion animations).
- `app/blog/[slug]` and `app/projects/[slug]` — detail pages; server components that look up data by slug and render a custom 404 state inline (no `notFound()`). Note `params` is a `Promise` (Next 15+ style) and must be awaited.
- `app/api/contact/route.ts` — the only API route; sends the contact-form email via Resend. `components/Contact.tsx` POSTs to it.

### Theming

Dark/light mode is handled by a **custom** `ThemeProvider` in `contexts/ThemeContext.tsx` (class-based, persisted to `localStorage`), paired with an inline anti-flash script in `app/layout.tsx` that sets the `dark`/`light` class before hydration. `components/theme-provider.tsx` (next-themes) is leftover shadcn scaffolding and is not wired up — use `useTheme` from `@/contexts/ThemeContext`.

Dark mode is `class`-based in Tailwind, so components style both modes explicitly (`dark:` variants). Default theme is dark.

### Styling

- `app/globals.css` is the active stylesheet (`styles/globals.css` is unused scaffold leftover). It defines custom `pf-*` utility classes (`pf-mesh`, `pf-noise`, `pf-grid`, `pf-sans`, `pf-serif`) used throughout for the site's background/texture visual system.
- Fonts: Plus Jakarta Sans (`--font-sans`) and Instrument Serif (`--font-serif`) loaded via `next/font` in the layout and mapped in `tailwind.config.ts`.
- `components/ui/` is the full shadcn/ui set (see `components.json`), but most page sections use raw Tailwind + framer-motion rather than these primitives. Prefer matching the existing section style when editing homepage components.

### Other notes

- The repo was scaffolded from v0 (`"name": "my-v0-project"`); unused artifacts from that (e.g. `components/Test.tsx`, duplicate images) still exist.
- Some code comments are written in Bengali.
