"use client";

import { useRouter } from "next/navigation";
import { useLocale as useNextIntlLocale } from "next-intl";
import { useCallback, useTransition } from "react";
import { appConfig, type Locale } from "@/lib/config/app.config";

/**
 * LOGIC layer for localization. Reads the active locale and switches it by
 * writing the locale cookie, then refreshing so server components re-render
 * with the new messages.
 */
export function useLocale() {
  const active = useNextIntlLocale() as Locale;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const setLocale = useCallback(
    (locale: Locale) => {
      // Standard, widely-supported way to persist the locale for the server to read.
      // biome-ignore lint/suspicious/noDocumentCookie: Cookie Store API lacks broad support
      document.cookie = `${appConfig.localeCookie}=${locale}; path=/; max-age=31536000; samesite=lax`;
      startTransition(() => router.refresh());
    },
    [router],
  );

  return {
    locale: active,
    locales: appConfig.locales,
    setLocale,
    isPending,
  };
}
