import { getTranslations } from "next-intl/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

/**
 * Page-scoped SECTION for the dashboard page.
 * Convention: components/[pagename]/[sectionname].tsx
 *
 * Server component — in a real app it would fetch via a service:
 *   import { userService } from "@/services/user";
 *   const users = await userService.list();
 */
export async function Overview() {
  const t = await getTranslations("dashboard");

  const stats = [
    { label: "Users", value: "1,248" },
    { label: "Sessions", value: "3,902" },
    { label: "Revenue", value: "$12.4k" },
  ];

  return (
    <section className="animate-slide-up">
      <h2 className="mb-4 text-xl font-semibold">{t("overviewTitle")}</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">
                {s.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">{s.value}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
