import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { LocaleSwitcher } from "@/components/ui/LocaleSwitcher";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { routes } from "@/lib/routes/routes";

export async function Header() {
  const t = await getTranslations("common");
  return (
    <header className="flex h-14 items-center justify-between border-b border-border px-6">
      <Link href={routes.public.home} className="font-bold text-primary">
        {t("appName")}
      </Link>
      <div className="flex items-center gap-2">
        <LocaleSwitcher />
        <ThemeToggle />
      </div>
    </header>
  );
}
