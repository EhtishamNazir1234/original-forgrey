import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Overview } from "@/components/dashboard/Overview";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const t = await getTranslations("dashboard");
  return (
    <>
      <h1 className="text-2xl font-bold">{t("title")}</h1>
      <Overview />
    </>
  );
}
