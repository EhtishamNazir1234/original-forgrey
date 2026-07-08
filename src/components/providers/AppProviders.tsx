import { NextIntlClientProvider } from "next-intl";
import type { ReactNode } from "react";
import { SplashScreen } from "@/components/layout/SplashScreen";
import { ThemeProvider } from "./ThemeProvider";
import { ToastContainer } from "@/components/ui/ToastContainer";

/**
 * Single root provider tree. Server component so it can read messages/locale
 * from next-intl context; wraps client providers inside.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <NextIntlClientProvider>
      <ThemeProvider>
        <SplashScreen />
        <ToastContainer />
        {children}
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
