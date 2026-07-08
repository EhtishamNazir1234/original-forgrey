import type { ReactNode } from "react";
import { MarketingLayout } from "@/components/layout/MarketingLayout";

/** Shell for unauthenticated (public) routes. */
export default function PublicLayout({ children }: { children: ReactNode }) {
  return <MarketingLayout>{children}</MarketingLayout>;
}
