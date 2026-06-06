import { Spinner } from "@/components/feedback/Spinner";

/** Global top-level Suspense fallback (per-navigation). */
export default function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center p-12">
      <Spinner className="h-7 w-7" />
    </div>
  );
}
