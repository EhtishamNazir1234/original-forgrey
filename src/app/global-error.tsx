"use client";

import { useEffect } from "react";
import { logger } from "@/lib/logger/logger";

/**
 * Root error boundary — catches errors in the root layout itself. Must render
 * its own <html>/<body> and cannot rely on providers/i18n.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.fatal("global error boundary", {
      message: error.message,
      digest: error.digest,
    });
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          display: "flex",
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: 20, fontWeight: 600 }}>
            Something went wrong
          </h1>
          <p style={{ marginTop: 8, color: "#6b7280" }}>{error.message}</p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: 16,
              padding: "8px 16px",
              borderRadius: 8,
              border: "1px solid #e5e7eb",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
