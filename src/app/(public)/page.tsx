import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { routes } from "@/lib/routes/routes";

export default async function HomePage() {
  const t = await getTranslations("home");
  return (
    <section className="mx-auto flex max-w-2xl flex-1 flex-col items-center justify-center gap-6 px-6 text-center animate-slide-up">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        {t("title")}
      </h1>
      <p className="text-lg text-muted-foreground">{t("subtitle")}</p>
      <Link href={routes.private.user.dashboard}>
        <Button size="lg">{t("cta")}</Button>
      </Link>
    </section>
  );
}
