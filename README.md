# original-forgrey Creator Studio

Next.js 16 (App Router) · React 19 + React Compiler · Tailwind v4 · TypeScript (strict) · Biome.
A clone-and-go starter with centralized config, theming, i18n, state, and modular API services.

See [`docs/adr/ADR-001-startup-kit-architecture.md`](docs/adr/ADR-001-startup-kit-architecture.md) for the full design.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

## Project structure

```
src/
├── app/                      # Routing only (thin shells)
│   ├── (public)/             # unauthenticated group  → "/"
│   ├── (private)/            # authenticated group + auth guard
│   │   └── (user)/dashboard/ # role subgroup → "/dashboard" (+ loading.tsx)
│   ├── layout.tsx            # providers, fonts, splash, i18n, metadata
│   ├── loading.tsx           # global Suspense fallback
│   ├── error.tsx             # route error boundary
│   ├── global-error.tsx      # root error boundary
│   ├── not-found.tsx
│   └── globals.css           # CENTRALIZED color tokens + animations
├── components/
│   ├── ui/                   # shadcn-style primitives (Button, Card, Input, ThemeToggle…)
│   ├── layout/               # Header, SplashScreen
│   ├── feedback/             # Spinner, Skeleton, ErrorState
│   ├── providers/            # AppProviders, ThemeProvider
│   └── [pagename]/[section].tsx   # page-scoped sections (e.g. dashboard/Overview.tsx)
├── services/                 # MODULAR API layer (top-level, not under lib)
│   ├── client.ts             # configured fetch (auth, timeout, errors)
│   ├── http.ts               # get/post/put/patch/del (+ zod validation)
│   ├── endpoints.ts          # centralized API paths
│   ├── error.ts              # ApiError
│   └── <domain>/             # one folder per backend domain (auth/, user/)
├── stores/                   # Zustand — STATE only (auth.store, ui.store)
├── hooks/                    # LOGIC only (useAuth, useTheme, useLocale)
├── lib/
│   ├── config/               # env (zod), app.config, theme.config
│   ├── routes/               # typed route map
│   ├── i18n/                 # next-intl request config
│   ├── logger/               # server/client logger
│   └── utils/                # cn()
└── messages/                 # i18n dictionaries (en.json, ur.json)
```

## How to re-skin / re-configure (the whole point)

| Want to change… | Edit only… |
|---|---|
| Colors / dark mode / add a scheme | `src/app/globals.css` (token values + `[data-theme]` blocks) → register id in `src/lib/config/theme.config.ts` |
| App name, locales, roles, feature flags | `src/lib/config/app.config.ts` |
| Page routes | `src/lib/routes/routes.ts` |
| API base URL / env | `.env` + `src/lib/config/env.ts` |
| API endpoints | `src/services/endpoints.ts` |

## Key conventions

- **State vs logic split:** `stores/*.store.ts` = Zustand state only. `hooks/*.ts` = logic/effects/service calls. Components import hooks, never stores directly.
- **API modules:** one folder per backend domain in `src/services/<domain>/`. Server code imports the service directly; client code goes through a hook → (server action) → store.
- **No hardcoded colors:** use semantic Tailwind classes (`bg-primary`, `text-foreground`, …). This is what makes re-skinning a one-file change.
- **Splash vs loading:** `SplashScreen.tsx` = one-time boot (gated by `ui.store.appReady`). `loading.tsx` = per-navigation Suspense fallback.

## Adding a feature

1. **New API domain:** add `src/services/<domain>/` (`.service.ts` + `.types.ts` + `index.ts`), register paths in `endpoints.ts`.
2. **New page:** add a folder under the right route group; add `components/<page>/<Section>.tsx` for its sections.
3. **New client state:** add `src/stores/<name>.store.ts` (state) + `src/hooks/use<Name>.ts` (logic).
4. **New locale:** add `src/messages/<locale>.json` + register in `app.config.ts` `locales`.

## Wiring real auth (placeholder today)

`src/app/(private)/layout.tsx` is a permissive guard. Drop in NextAuth/Clerk/custom:
read the session, `redirect(routes.public.login)` when missing, enforce role per subgroup.
The `auth.store` and `useAuth` hook are ready to hold the session.
