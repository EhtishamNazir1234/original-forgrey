import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { routes } from "@/lib/routes/routes";

export default async function NotFound() {
  const t = await getTranslations("errors");
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-12 text-center">
      <h1 className="text-4xl font-bold text-primary">404</h1>
      <p className="text-lg font-medium">{t("notFound")}</p>
      <p className="max-w-sm text-sm text-muted-foreground">
        {t("notFoundDescription")}
      </p>
      <Link href={routes.public.home}>
        <Button variant="outline">Home</Button>
      </Link>
    </div>
  );
}
