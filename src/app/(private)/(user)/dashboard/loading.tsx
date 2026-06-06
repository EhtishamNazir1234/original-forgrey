import { Skeleton } from "@/components/feedback/Skeleton";

/** Per-page (segment) loading skeleton — shown while the dashboard streams. */
export default function DashboardLoading() {
  return (
    <>
      <Skeleton className="h-8 w-40" />
      <div className="grid gap-4 sm:grid-cols-3">
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
      </div>
    </>
  );
}
