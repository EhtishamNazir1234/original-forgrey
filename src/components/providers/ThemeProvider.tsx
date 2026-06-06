"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";
import { appConfig } from "@/lib/config/app.config";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={appConfig.defaultTheme}
      enableSystem
      storageKey={appConfig.themeStorageKey}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
