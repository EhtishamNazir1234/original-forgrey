import type { ReactNode } from "react";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
// import { routes } from "@/lib/routes/routes";
import { Header } from "@/components/layout/Header";

/**
 * Shell + AUTH GUARD for authenticated routes.
 *
 * Placeholder: wire a real provider (NextAuth/Clerk/custom) here. The pattern:
 *
 *   const session = await getServerSession();         // read httpOnly cookie
 *   if (!session) redirect(routes.public.login);
 *   // optionally enforce role per (admin)/(user) subgroup
 *
 * Left permissive so the example dashboard is viewable out of the box.
 */
export default async function PrivateLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 p-6">
        {children}
      </main>
    </>
  );
}
