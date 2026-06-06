/**
 * Centralized theme registry.
 *
 * Colors live as CSS variables in `globals.css` (the single source of truth for
 * actual values). This file describes the *available* schemes and modes so the
 * UI (theme switcher) and tooling can enumerate them. To re-skin a project:
 *   1. Edit the token values in `globals.css`, and/or
 *   2. Add a new `[data-theme="..."]` block there and register its id below.
 */

export type ThemeMode = "light" | "dark" | "system";

export interface ThemeScheme {
  /** Maps to `[data-theme="id"]` in globals.css. `default` uses :root. */
  id: string;
  label: string;
}

export const themeSchemes: ThemeScheme[] = [
  { id: "default", label: "Default" },
  { id: "ocean", label: "Ocean" },
  { id: "sunset", label: "Sunset" },
];

export const themeModes: ThemeMode[] = ["light", "dark", "system"];

export const defaultScheme = "default";
