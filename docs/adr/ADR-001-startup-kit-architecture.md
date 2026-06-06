# ADR-001: Reusable Next.js Startup Kit Architecture

**Status:** Accepted — implemented (build + lint green)
**Date:** 2026-06-06
**Deciders:** Project owner (team@cubixsoft.com)
**Stack baseline:** Next.js 16.2.7 (App Router) · React 19.2.4 + React Compiler · Tailwind CSS v4 · TypeScript (strict) · Biome

## Context

We have a fresh `create-next-app`. The goal is a **reusable startup kit** that every new project can be cloned from. It must lean on Next.js built-in features (App Router, route groups, `loading.tsx`/`error.tsx`, RSC, `next/font`, metadata) instead of reinventing them, while adding a thin, centralized layer for the cross-cutting concerns every app needs:

- Route grouping by access level → role → page: `public` / `private (role)` / pagename
- Component organization as `components/[pagename]/[sectionname]`
- Global error handling, global API client, modular API services
- State management via **Zustand**, with **state and logic in separate files** (stores vs hooks)
- Logging, localization (i18n), loading states, splash screen
- Dark/light mode, basic animation
- **Centralized** colors/themes (easy re-skin), config, and routes

Forces at play: keep it idiomatic to Next.js 16 (this version has breaking changes vs older docs — see `AGENTS.md`), keep dependencies minimal and swappable, and make the structure obvious enough that a new project just deletes the example pages and starts building.

## Decision

Adopt the layered structure below. Each cross-cutting concern gets **one canonical home** so re-skinning, re-configuring, or re-localizing is a single-file change. Server-owned data uses React Server Components + the service layer; client interactivity uses Zustand stores with logic isolated in hooks.

### Folder structure

```
src/
├── app/                              # Routing only — thin route shells
│   ├── (public)/                     # Route group: unauthenticated
│   │   ├── (marketing)/page          # landing, pricing...
│   │   └── (auth)/login, register
│   ├── (private)/                    # Route group: authenticated
│   │   ├── (admin)/
│   │   │   └── dashboard/
│   │   │       ├── page.tsx
│   │   │       └── loading.tsx       # ← LOADING: per-page skeleton (segment Suspense)
│   │   ├── (user)/...                # role subgroup
│   │   └── layout.tsx                # auth guard + shell
│   ├── api/                          # Route handlers (BFF endpoints)
│   ├── layout.tsx                    # root: providers, fonts, theme, i18n + <SplashScreen/> gate
│   ├── loading.tsx                   # ← LOADING: global fallback (top-level Suspense)
│   ├── error.tsx                     # route-segment error boundary
│   ├── global-error.tsx              # root error boundary
│   ├── not-found.tsx
│   └── globals.css                   # Tailwind v4 + theme tokens
│
├── components/
│   ├── ui/                           # shadcn-style primitives (Radix, themed, copy-in)
│   ├── layout/                       # Header, Sidebar, Footer, Shell
│   │   └── SplashScreen.tsx          # ← SPLASH: branded boot overlay (app-ready gate)
│   ├── feedback/                     # Spinner, Skeleton, ErrorState (loading building blocks)
│   └── [pagename]/                   # page-scoped sections
│       └── [sectionname].tsx
│
├── lib/
│   ├── api/
│   │   ├── client.ts                 # global fetch client (interceptors, errors)
│   │   ├── error.ts                  # ApiError type + normalizer
│   │   ├── http.ts                   # low-level verbs (get/post/put/del) over client
│   │   ├── endpoints.ts              # centralized API path registry (like routes.ts, for API)
│   │   └── services/                 # ── MODULAR: one folder per backend domain ──
│   │       ├── auth/
│   │       │   ├── auth.service.ts   # endpoint functions (login, logout, refresh)
│   │       │   ├── auth.types.ts     # request/response DTOs (zod-validated)
│   │       │   └── index.ts          # barrel export
│   │       ├── user/
│   │       │   ├── user.service.ts
│   │       │   ├── user.types.ts
│   │       │   └── index.ts
│   │       └── index.ts              # re-exports all modules
│   ├── config/
│   │   ├── env.ts                    # validated env (zod)
│   │   ├── app.config.ts             # app constants, feature flags
│   │   └── theme.config.ts           # color schemes / theme registry
│   ├── routes/
│   │   └── routes.ts                 # centralized typed route map
│   ├── i18n/                         # localization config + dictionaries
│   ├── logger/                       # logger abstraction (server/client)
│   └── utils/                        # cn(), formatters, guards
│
├── stores/                           # Zustand: STATE only (one slice per file)
│   ├── auth.store.ts
│   ├── ui.store.ts
│   └── index.ts
│
├── hooks/                            # LOGIC only (orchestration, effects)
│   ├── useAuth.ts
│   ├── useTheme.ts
│   └── useLocale.ts
│
├── types/                            # shared TS types
└── messages/                         # i18n dictionaries (en.json, ...)
```

**Rule — state vs logic separation:** `stores/*.store.ts` holds *only* the Zustand state + setters (the "what"). `hooks/*.ts` holds the *logic* that consumes stores, calls services, and runs effects (the "how"). Components import hooks, not stores directly. This keeps stores pure/testable and side effects out of the state layer.

## Options Considered

### Decision 1 — Server data fetching & API layer

#### Option A: RSC + service layer + thin fetch client (Recommended)
| Dimension | Assessment |
|-----------|------------|
| Complexity | Low–Med |
| Cost | Zero deps |
| Scalability | High — uses Next caching/streaming |
| Team familiarity | High |

Server Components call `lib/api/services/*` directly; services use `lib/api/client.ts` (typed `fetch` wrapper with base URL, auth header, timeout, error normalization). Client mutations go through the same services via route handlers or server actions.

**Pros:** Idiomatic Next 16; no extra runtime; one error path; cache via `fetch` options.
**Cons:** No automatic client cache/dedupe for heavy client-side data apps.

#### Option B: Add TanStack Query for client server-state
**Pros:** Best-in-class caching/refetch/optimistic updates.
**Cons:** Overlaps with RSC; extra concept; most reusable-kit pages are server-rendered. **Defer** — add only in projects that are client-data heavy. Keep Zustand strictly for *client* state.

### Decision 2 — Localization

#### Option A: `next-intl` (DECIDED ✓)
| Dimension | Assessment |
|-----------|------------|
| Complexity | Low |
| App Router support | First-class (RSC + client) |
| Scalability | High |

**Pros:** Built for App Router, server+client, typed messages, locale routing.
**Cons:** One dependency. **Chosen** over hand-rolled context (no pluralization/formatting) and `next-i18next` (Pages-router oriented).

### Decision 3 — Theming / dark-light mode

#### Option A: `next-themes` + Tailwind v4 CSS variables (Recommended)
Centralize every color as a CSS variable in `globals.css` under `@theme`, grouped into named schemes in `theme.config.ts`. `next-themes` toggles `class="dark"`/`data-theme`. Re-skin = edit token values in one file; switch scheme = swap a `data-theme` attribute.

**Pros:** No FOUC, SSR-safe, system preference, zero per-component color literals.
**Cons:** Tailwind v4 token discipline required (no raw hex in components).

### Decision 4 — Animation

`tailwindcss-animate` utilities for the common cases (fades, slides, splash); add `motion` (Framer Motion successor) only where gestures/layout animation are needed. Keep it optional and lazy-loaded.

### Decision 5 — Logging

Thin `lib/logger` abstraction: structured `pino` on the server, namespaced `console` wrapper on the client, no-op in test. One interface (`logger.info/warn/error`) so the backend is swappable (Sentry/Datadog) without touching call sites.

### Decision 7 — Modular API services (how the "modules" work)

The API layer is **three stacked tiers**, so a module is a self-contained domain folder and nothing else knows how `fetch` works:

```
client.ts   → ONE configured fetch instance: base URL, auth header injection,
              timeout, retry, response parsing, error normalization → ApiError.
http.ts     → thin verbs over the client: get<T>(), post<T>(), put<T>(), del<T>().
endpoints.ts→ centralized path registry: API.auth.login, API.user.byId(id) — no
              raw URL strings inside services (mirrors routes.ts for pages).
services/<domain>/  → the MODULE. Pure domain functions + its own DTO types.
```

**A module = one backend domain = one folder.** Example `services/user/`:

```ts
// user.types.ts — DTOs, validated with zod
export const UserDto = z.object({ id: z.string(), name: z.string(), email: z.string() });
export type User = z.infer<typeof UserDto>;

// user.service.ts — endpoint functions, no fetch details leak in
import { http } from "@/lib/api/http";
import { API } from "@/lib/api/endpoints";
import { UserDto, type User } from "./user.types";

export const userService = {
  getById: (id: string) => http.get<User>(API.user.byId(id), { schema: UserDto }),
  update:  (id: string, body: Partial<User>) => http.put<User>(API.user.byId(id), body),
};

// index.ts — barrel
export * from "./user.service";
export * from "./user.types";
```

**Consumption rules (keeps modules reusable & swappable):**
| Caller | How it calls the module |
|--------|-------------------------|
| Server Component | `import { userService } from "@/lib/api/services/user"` → call directly |
| Server Action / Route handler | same import, same functions |
| Client component | **never imports the service directly** → goes through a `hooks/useUser.ts` which calls a server action; client state lands in a Zustand store |

| Dimension | Assessment |
|-----------|------------|
| Complexity | Low — flat, predictable per-domain |
| Coupling | Each module isolated; shared concerns live in `client.ts` only |
| Reuse | Copy a `services/<domain>/` folder between projects unchanged |
| Testability | Mock `http` once; test service functions purely |

**Why folder-per-domain over one big `services.ts`:** modules grow independently, types stay co-located with their endpoints, and a new project can delete `services/user/` without touching anything else. Adding a backend feature = add one folder + register its paths in `endpoints.ts`.

### Decision 8 — Splash screen vs Loading (two different things)

These were conflated; they are **separate mechanisms** with different homes:

| | **Splash screen** | **Loading states** |
|---|---|---|
| What | Branded full-screen shown once, on first app boot | Per-navigation / per-segment fallback while a page streams |
| Trigger | App not yet "ready" (fonts, theme resolved, initial auth check) | React Suspense during server render / route transition |
| Mechanism | `components/layout/SplashScreen.tsx` overlay, gated by `ui.store` `appReady` flag, mounted in root `layout.tsx`. To avoid a JS flash, the markup also sits as static HTML in `<body>` and is removed on hydration. | Next.js **built-in** `loading.tsx` files — `app/loading.tsx` (global) + a `loading.tsx` inside each route segment for page-specific skeletons. Plus manual `<Suspense fallback={<Skeleton/>}>` around slow sub-trees. |
| Frequency | Once per session (cold load) | Every navigation to an async segment |
| Reusable parts | `SplashScreen` component | `components/feedback/` → `Spinner`, `Skeleton`, used inside each `loading.tsx` |

**Rule of thumb:** if it's about *the app booting*, it's the splash (a component + store flag). If it's about *a page's data arriving*, it's `loading.tsx` (Next.js built-in). Never use `loading.tsx` as a boot splash — it re-renders on every navigation.

### Decision 6 — UI primitive layer (DECIDED ✓)

`components/ui/` ships **shadcn-style primitives** (Radix-based, copy-in/owned, no runtime lock-in) wired to the centralized theme tokens — Button, Input, Card, Dialog, etc. Re-skinning a project never touches a primitive's JSX, only the token values in `theme.config.ts`/`globals.css`.

## Recommended dependencies

```
# runtime
zustand                       # client state
next-themes                   # theme switching
next-intl                     # localization (DECIDED)
zod                           # env + schema validation
clsx tailwind-merge           # cn() utility
pino                          # server logging
tailwindcss-animate           # animation utilities
# UI primitives (shadcn-style, DECIDED)
@radix-ui/react-*             # per-primitive (dialog, dropdown, etc.)
class-variance-authority      # variant styling for primitives
lucide-react                  # icons
# optional / per-project
motion                        # advanced animation
@tanstack/react-query         # only for client-data-heavy apps
```

## Trade-off Analysis

- **Built-in over libraries:** Loading (`loading.tsx`/Suspense), error boundaries (`error.tsx`/`global-error.tsx`), routing groups, fonts, and metadata are all Next.js native — we add libraries only where Next has no answer (state, i18n, theme persistence, logging).
- **Zustand vs Context/Redux:** Zustand gives minimal boilerplate, slice-per-file, no providers, selector-based re-render control. Redux is heavier than a kit needs; Context doesn't scale for frequent updates.
- **Stores-vs-hooks split** adds one indirection layer but pays off in testability and keeps the "optimized state management" goal real (selectors + isolated effects prevent over-rendering).
- **Centralization** (routes, config, theme tokens) trades a little upfront wiring for single-file re-skin/re-config — the core value of a reusable kit.

## Consequences

**Easier:** spinning up a new app (clone, edit `theme.config.ts` + `app.config.ts` + `routes.ts`, delete example pages); re-theming; adding a locale; swapping API base or logging backend.
**Harder / discipline required:** contributors must keep colors as tokens (no hex in JSX), keep effects out of stores, and register new routes in `routes.ts`.
**To revisit:** add TanStack Query if a project becomes client-data heavy; add auth provider (NextAuth/Clerk) when real auth is wired — the `(private)` guard and `auth.store` are placeholders today; add Sentry behind the logger interface.

## Action Items

1. [ ] Install dependencies (zustand, next-themes, next-intl, zod, clsx, tailwind-merge, pino, tailwindcss-animate)
2. [ ] `lib/config/env.ts` — zod-validated env; `app.config.ts`; `theme.config.ts` (named color schemes)
3. [ ] `globals.css` — migrate colors to centralized `@theme` tokens (light/dark + scheme support)
4. [ ] `lib/routes/routes.ts` — typed centralized route map + helpers
5. [ ] `lib/api/` — `client.ts` (fetch wrapper + interceptors), `error.ts`, `services/` modules
6. [ ] `lib/logger/` — server/client logger abstraction
7. [ ] `lib/i18n/` + `messages/en.json` — next-intl setup
8. [ ] `stores/` — auth + ui slices; `hooks/` — useAuth, useTheme, useLocale
9. [ ] `components/providers/` — Theme + I18n providers; wire into root `layout.tsx`
10. [ ] Route groups `(public)` / `(private)/(role)`; `loading.tsx`, `error.tsx`, `global-error.tsx`, `not-found.tsx`; splash screen component
11. [ ] One example page (`dashboard`) demonstrating `components/dashboard/[section]` + store + hook + service end to end
12. [ ] README documenting the "clone & re-skin" workflow
```
