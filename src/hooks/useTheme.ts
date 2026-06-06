"use client";

import { useTheme as useNextTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";
import { appConfig } from "@/lib/config/app.config";
import { defaultScheme, themeSchemes } from "@/lib/config/theme.config";

const SCHEME_KEY = "theme-scheme";

/**
 * LOGIC layer for theming. Wraps next-themes (light/dark/system) and adds the
 * color-scheme switch (`data-theme`) for centralized re-skinning.
 */
export function useTheme() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useNextTheme();
  const [scheme, setSchemeState] = useState<string>(defaultScheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(SCHEME_KEY) ?? defaultScheme;
    setSchemeState(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const setScheme = useCallback((id: string) => {
    setSchemeState(id);
    localStorage.setItem(SCHEME_KEY, id);
    document.documentElement.setAttribute("data-theme", id);
  }, []);

  const toggleMode = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  return {
    mode: theme ?? appConfig.defaultTheme,
    resolvedMode: resolvedTheme,
    systemTheme,
    setMode: setTheme,
    toggleMode,
    scheme,
    setScheme,
    schemes: themeSchemes,
    mounted, // guard against hydration mismatch before reading theme
  };
}
