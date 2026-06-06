import { env } from "./env";

/**
 * App-wide constants and feature flags. One place to brand/configure a project
 * cloned from this kit.
 */
export const appConfig = {
  name: "Startup Kit",
  description: "Reusable Next.js startup kit",
  url: env.NEXT_PUBLIC_APP_URL,

  // Localization
  locales: ["en", "ur"] as const,
  defaultLocale: "en" as const,
  localeCookie: "NEXT_LOCALE",

  // Theming
  themeStorageKey: "theme",
  defaultTheme: "system" as const, // "light" | "dark" | "system"

  // Auth roles (placeholder until a real provider is wired)
  roles: ["admin", "user"] as const,

  // Splash screen minimum visible time (ms) so it never flickers
  splashMinDurationMs: 600,

  // Feature flags
  features: {
    i18n: true,
    splashScreen: true,
    animations: true,
  },
} as const;

export type AppConfig = typeof appConfig;
export type Locale = (typeof appConfig.locales)[number];
export type Role = (typeof appConfig.roles)[number];
