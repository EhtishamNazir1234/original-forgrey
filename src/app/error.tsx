"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/feedback/ErrorState";
import { logger } from "@/lib/logger/logger";

/** Route-segment error boundary (recoverable via reset). */
export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error("route error boundary", {
      message: error.message,
      digest: error.digest,
    });
  }, [error]);

  return (
    <div className="flex flex-1 items-center justify-center p-12">
      <ErrorState
        title="Something went wrong"
        description={error.message}
        onRetry={reset}
      />
    </div>
  );
}
