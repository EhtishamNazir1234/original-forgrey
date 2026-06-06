"use client";

import { useLocale } from "@/hooks/useLocale";
import type { Locale } from "@/lib/config/app.config";
import { cn } from "@/lib/utils/cn";

export function LocaleSwitcher() {
  const { locale, locales, setLocale, isPending } = useLocale();

  return (
    <select
      value={locale}
      disabled={isPending}
      onChange={(e) => setLocale(e.target.value as Locale)}
      aria-label="Select language"
      className={cn(
        "h-9 rounded-[var(--radius)] border border-input bg-background px-2 text-sm text-foreground",
        isPending && "opacity-60",
      )}
    >
      {locales.map((l) => (
        <option key={l} value={l}>
          {l.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
