"use client";

import { useEffect, useState } from "react";
import { Spinner } from "@/components/feedback/Spinner";
import { appConfig } from "@/lib/config/app.config";
import { useUIStore } from "@/stores/ui.store";

/**
 * Branded BOOT splash. Distinct from `loading.tsx` (which is per-navigation).
 * Shown once on first load until the app is "ready", then fades out. The
 * `appReady` flag lives in the UI store so any bootstrap step (auth check,
 * config fetch) can gate it.
 */
export function SplashScreen() {
  const appReady = useUIStore((s) => s.appReady);
  const setAppReady = useUIStore((s) => s.setAppReady);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!appConfig.features.splashScreen) {
      setAppReady(true);
      return;
    }
    // Bootstrap work would go here (e.g. restore session). We guarantee a
    // minimum visible time so it never flickers.
    const timer = setTimeout(
      () => setAppReady(true),
      appConfig.splashMinDurationMs,
    );
    return () => clearTimeout(timer);
  }, [setAppReady]);

  useEffect(() => {
    if (appReady) {
      const t = setTimeout(() => setHidden(true), 300); // allow fade-out
      return () => clearTimeout(t);
    }
  }, [appReady]);

  if (hidden) return null;

  return (
    <div
      aria-hidden={appReady}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-background ${
        appReady ? "animate-fade-out" : ""
      }`}
    >
      <span className="text-2xl font-bold text-primary">{appConfig.name}</span>
      <Spinner className="h-6 w-6 text-primary" />
    </div>
  );
}
