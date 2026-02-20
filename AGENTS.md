# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Aksara Cakra Research and Consulting (ACRC) website — a bilingual (English/Indonesian) corporate website for a Jakarta-based research and consulting firm. Built with Next.js 16 (App Router), React 19, Tailwind CSS v4, and shadcn/ui (new-york style).

## Build & Development Commands

- `npm run dev` — Start development server
- `npm run build` — Production build (TypeScript errors are ignored via `next.config.mjs`)
- `npm run lint` — Run ESLint
- `npm run start` — Start production server

Package manager: npm (uses `package-lock.json`). Do not use pnpm or yarn.

## Architecture

### Internationalization (i18n)

All user-facing text is managed through a custom client-side i18n system — **not** Next.js i18n routing:

- `lib/translations.ts` — Single large object containing all translations keyed by locale (`en` | `id`). This is the **largest file in the codebase** (~200KB). All text content lives here, including team member bios, page content, and navigation labels.
- `contexts/locale-context.tsx` — React context providing `locale`, `setLocale`, `toggleLocale`, and `t(key)` helper. The `t()` function resolves dot-notation keys (e.g. `t("nav.home")`) against the translations object.
- Every page and component accesses translations via `useLocale()` hook. Locale state is client-side only (defaults to `"en"`).

When adding new text content, add translation keys to **both** `en` and `id` sections in `lib/translations.ts`, then reference them using `t("section.key")`.

### Routing & Page Structure

Uses Next.js App Router. All pages are `"use client"` components. Every page follows the same layout pattern: `<Navbar />` → page content → `<Footer />`.

Routes:
- `/` — Home (app/page.tsx)
- `/about` — About with hash sections (#who-we-are, #vision-mission, #values, #how-we-work)
- `/services` — Services overview, plus sub-pages: `/services/policy-research`, `/services/corporate-consulting`, `/services/political-consulting`
- `/issues` — Issues & Sectors overview, plus sub-pages: `/issues/defence-security`, `/issues/politics-governance`, `/issues/economy-business`, `/issues/elections-democracy`, `/issues/esg-sustainability`
- `/insights` — Article listing with category/date filtering
- `/insights/[id]` — Individual article detail (renders PDF link + abstract from translations)
- `/insights/concern` — ACRC's Concern page
- `/team` — Team members with modal bios
- `/contact` — Contact form (client-side only, no backend)

### Articles / Insights Data Model

Articles are defined in `lib/articles.ts` as a simple array with `id`, `pdfFile`, `date`, and `categoryKey`. The actual title, excerpt, and category text come from `lib/translations.ts` under `articles.<id>` and `nav.articles.<id>` keys. PDF files are stored in `public/artikel/`.

### Component Architecture

- `components/navbar.tsx` — Sticky navbar with desktop dropdowns (hover) and mobile accordion menu. Includes theme toggle (light/dark) and locale switcher.
- `components/footer.tsx` — Site footer with navigation columns and locale switcher.
- `components/nav-link.tsx` — Wrapper around Next.js `<Link>` that handles scroll-to-top on navigation and hash-based scrolling to page sections.
- `components/cards.tsx` — Reusable card components: `ArticleCard`, `ServiceCard`, `SectorCard`, `TeamMemberCard`.
- `components/public-comments.tsx` — Client-side-only comment section (no persistence, uses dummy data).
- `components/testimonials-section.tsx` — Testimonials carousel on the home page.
- `components/ui/` — shadcn/ui primitives (do not manually edit; use `npx shadcn@latest add <component>` to add new ones).

### Styling

- Tailwind CSS v4 with `@tailwindcss/postcss` plugin
- Theme variables defined in `app/globals.css` using CSS custom properties (light: warm neutral, dark: deep navy `#01172c`)
- Light mode primary color: `#470605` (dark maroon). Dark mode uses oklch-based blues.
- `tw-animate-css` for animation utilities
- Typography: `font-serif` for headings (Georgia), `font-sans` (Geist) for body text
- shadcn/ui configured with `components.json` — aliases: `@/components`, `@/lib`, `@/hooks`, `@/components/ui`

### Path Aliases

TypeScript paths configured in `tsconfig.json`: `@/*` maps to `./*` (project root).

### Static Assets

- `public/picture/` — Site images (logos, hero images, illustrations)
- `public/tim/` — Team member photos
- `public/artikel/` — Article PDF files

### Key Patterns

- All pages are client components (`"use client"`) — there are no server components beyond the root layout.
- Theme switching uses `next-themes` with `ThemeProvider` wrapping the app. The navbar conditionally renders different logo images based on the active theme.
- The `NavLink` component should be used instead of raw `<Link>` for internal navigation to ensure scroll-to-top behavior.
- Images use `unoptimized: true` in next.config.mjs (no Next.js image optimization).
- Vercel Analytics is integrated via `@vercel/analytics`.
