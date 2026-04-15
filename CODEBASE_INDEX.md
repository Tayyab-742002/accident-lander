# Codebase Index

## Repository Snapshot

- **Type:** Next.js App Router landing funnel application
- **Language:** TypeScript + React
- **Core concerns:** Multi-locale landing pages, lead intake, conversion tracking, legal disclosures

## Top-Level Structure

| Path | Purpose |
| --- | --- |
| `app/` | App Router routes, API handlers, global styles, app metadata/assets |
| `components/` | UI sections (hero, quiz, reviews, footer), legal modals, tracking injector |
| `lib/` | Domain logic for lead posting, tracking helpers, pixel config, locale variants |
| `i18n/` | Locale routing and request-time message loading |
| `messages/` | Translation content (`en`, `es`, `ca`) for UI + legal copy |
| `public/` | Static assets served directly |
| `package.json` | Build/dev/lint scripts and dependencies |
| `next.config.ts` | Next.js configuration with `next-intl` plugin |
| `tsconfig.json` | TypeScript strict config + path aliases |
| `eslint.config.mjs` | ESLint flat config for Next.js + TypeScript |
| `postcss.config.mjs` | PostCSS/Tailwind v4 plugin wiring |

## Runtime Entry Points

### App Pages and Layouts

- `app/layout.tsx` - Root layout wrapper delegating document rendering to locale layout.
- `app/page.tsx` - Redirects root `/` traffic to `/en/`.
- `app/[locale]/layout.tsx` - Locale-scoped document shell, metadata, provider setup, tracking injection.
- `app/[locale]/page.tsx` - Main page composer for sections and locale/variant behavior.

### API Routes

- `app/api/capi/route.ts` - Receives browser conversion payloads and forwards normalized events to Meta CAPI.
- `app/api/lead-sold/route.ts` - Receives sold-lead webhook and emits Meta `Lead` with value/currency.

### NPM Scripts

- `npm run dev` -> `next dev`
- `npm run build` -> `next build`
- `npm run start` -> `next start`
- `npm run lint` -> `eslint`

## Application Architecture

### Request/Render Flow

1. User hits `/` -> redirected by `app/page.tsx` to default locale route.
2. Locale route resolves via `app/[locale]/layout.tsx` + `i18n/request.ts`.
3. `app/[locale]/page.tsx` renders section components based on variant flags.
4. Client tracking and lead flow run from components + API routes.

### Locale and Variant Flow

- `i18n/routing.ts` defines supported locales and default locale.
- `i18n/request.ts` dynamically imports `messages/<locale>.json`.
- `lib/variants.ts` controls variant-specific visibility/state behavior.
- Components consume translations through `next-intl`.

## Domain Modules

### Lead Intake

- `lib/leadpost.ts`
  - Builds outbound lead payload.
  - Reads TrustedForm certificate values.
  - Fetches visitor IP.
  - Posts to LeadProsper endpoint.

### Browser Tracking

- `components/tracking/Pixels.tsx` - Pixel/GTM bootstrap + initial pageview behavior.
- `lib/fbq.ts` - Safe `window.fbq` wrapper with event dedupe support.
- `lib/capi.ts` - Client-side event sender to `/api/capi`, event ID helpers, cookie extraction.

### Server Tracking

- `app/api/capi/route.ts` - PII hashing and forwarding to Meta Graph API.
- `app/api/lead-sold/route.ts` - Sold-lead event relay with monetary metadata.

### Variant + Integration Configuration

- `lib/pixels.ts` - Locale -> Pixel/GTM IDs mapping.
- `lib/variants.ts` - Locale variant toggles, state options, and section controls.

## UI Component Map

- `components/Hero.tsx` - Headline/intro and settlement cards.
- `components/QuizSection.tsx` - Multi-step quiz, validation, lead submit, conversion event firing.
- `components/HowItWorks.tsx` - Process explanation section.
- `components/Reviews.tsx` - Testimonial carousel.
- `components/Footer.tsx` - Footer + legal entry points.
- `components/AdvDisclosureBar.tsx` - Optional ad disclosure bar.
- `components/FirmHeader.tsx` - Optional firm branding/header block.
- `components/PrivacyModal.tsx` - Localized privacy policy modal.
- `components/TermsModal.tsx` - Localized terms modal.
- `components/DisclaimerModal.tsx` - Localized disclaimer modal.

## Internationalization

- `i18n/routing.ts` - Supported locales: `en`, `es`, `ca`.
- `i18n/request.ts` - Runtime locale resolution and dictionary loading.
- `messages/en.json` - English content.
- `messages/es.json` - Spanish content.
- `messages/ca.json` - California-focused variant/legal content.

## Configuration and Tooling

- `next.config.ts` - Next.js config wrapped with `next-intl` plugin.
- `tsconfig.json` - Strict mode, module settings, alias `@/*`.
- `eslint.config.mjs` - Lint rules and ignores.
- `postcss.config.mjs` - Tailwind/PostCSS integration.
- `.gitignore` - Excludes build outputs, envs, logs, dependency trees.
- `README.md` - Baseline project readme.

## Static Assets

- `public/*.svg` - Static icon/illustration assets.
- `public/web-app-manifest-192x192.png`
- `public/web-app-manifest-512x512.png`
- `app/favicon.ico`, `app/icon0.svg`, `app/icon1.png`, `app/apple-icon.png`
- `app/manifest.json`

## Testing Status

- No test suite detected (`__tests__`, `*.test.*`, `*.spec.*` not present).
- Recommended future test anchors:
  - API routes (`app/api/capi/route.ts`, `app/api/lead-sold/route.ts`)
  - Lead payload construction (`lib/leadpost.ts`)
  - Quiz validation and flow (`components/QuizSection.tsx`)

## Ignore / Generated Artifacts

- `node_modules/`
- `.next/`
- `out/`
- `build/`
- `coverage/`
- `.vercel/`
- `*.tsbuildinfo`
- `next-env.d.ts` (generated)
- `.env*` (local runtime config)

## Dependency Flow

```text
flowchart TD
A[app/page.tsx] --> B[app/[locale]/page.tsx]
B --> C[components/*]
B --> D[lib/variants.ts]
C --> E[messages/{en,es,ca}.json via next-intl]
app/[locale]/layout.tsx --> F[components/tracking/Pixels.tsx]
F --> G[lib/pixels.ts]
F --> H[lib/capi.ts] --> I[app/api/capi/route.ts] --> J[Meta Graph API]
components/QuizSection.tsx --> K[lib/fbq.ts]
components/QuizSection.tsx --> H
components/QuizSection.tsx --> L[lib/leadpost.ts] --> M[LeadProsper API]
N[LeadProsper webhook] --> O[app/api/lead-sold/route.ts] --> J
i18n/routing.ts --> i18n/request.ts --> app/[locale]/layout.tsx
```

## Fast Navigation Cheatsheet

- **Change quiz flow or lead fields:** `components/QuizSection.tsx`, `lib/leadpost.ts`
- **Change tracking behavior:** `components/tracking/Pixels.tsx`, `lib/fbq.ts`, `lib/capi.ts`, `app/api/capi/route.ts`
- **Change sold-lead conversion logic:** `app/api/lead-sold/route.ts`
- **Change locale routing or default locale:** `i18n/routing.ts`, `i18n/request.ts`, `app/page.tsx`
- **Change copy/translations:** `messages/en.json`, `messages/es.json`, `messages/ca.json`
- **Change section visibility by locale/variant:** `lib/variants.ts`, `app/[locale]/page.tsx`
- **Change legal modal content wiring:** `components/PrivacyModal.tsx`, `components/TermsModal.tsx`, `components/DisclaimerModal.tsx`, related `messages/*.json`
