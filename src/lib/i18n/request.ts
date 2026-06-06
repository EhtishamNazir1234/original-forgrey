import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import { appConfig, type Locale } from "@/lib/config/app.config";

/**
 * next-intl per-request config. Locale is resolved from the `NEXT_LOCALE`
 * cookie (cookie-based switching, no `[locale]` URL segment). Messages are
 * loaded from `src/messages/<locale>.json`.
 */
function resolveLocale(value: string | undefined): Locale {
  return appConfig.locales.includes(value as Locale)
    ? (value as Locale)
    : appConfig.defaultLocale;
}

export default getRequestConfig(async () => {
  const store = await cookies();
  const locale = resolveLocale(store.get(appConfig.localeCookie)?.value);

  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});
