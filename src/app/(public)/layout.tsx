import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";

/** Shell for unauthenticated (public) routes. */
export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">{children}</main>
    </>
  );
}
