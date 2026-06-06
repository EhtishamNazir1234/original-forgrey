import { env } from "@/lib/config/env";

/**
 * Single logging interface for the whole app. Call sites never know the
 * backend, so it can be swapped (pino / Sentry / Datadog) in one place.
 *
 * - Server: structured pino logger.
 * - Client: namespaced console wrapper (kept tiny; no pino in the bundle).
 */
export type LogLevel = "fatal" | "error" | "warn" | "info" | "debug" | "trace";

export interface Logger {
  fatal: (msg: string, meta?: unknown) => void;
  error: (msg: string, meta?: unknown) => void;
  warn: (msg: string, meta?: unknown) => void;
  info: (msg: string, meta?: unknown) => void;
  debug: (msg: string, meta?: unknown) => void;
  trace: (msg: string, meta?: unknown) => void;
  child: (bindings: Record<string, unknown>) => Logger;
}

const LEVEL_ORDER: Record<LogLevel, number> = {
  fatal: 60,
  error: 50,
  warn: 40,
  info: 30,
  debug: 20,
  trace: 10,
};

function createClientLogger(bindings: Record<string, unknown> = {}): Logger {
  const threshold = LEVEL_ORDER[env.LOG_LEVEL as LogLevel] ?? LEVEL_ORDER.info;

  const log =
    (level: LogLevel, fn: (...args: unknown[]) => void) =>
    (msg: string, meta?: unknown) => {
      if (LEVEL_ORDER[level] < threshold) return;
      const prefix = `[${level}]`;
      if (meta !== undefined) fn(prefix, msg, { ...bindings, meta });
      else if (Object.keys(bindings).length) fn(prefix, msg, bindings);
      else fn(prefix, msg);
    };

  return {
    fatal: log("fatal", console.error),
    error: log("error", console.error),
    warn: log("warn", console.warn),
    info: log("info", console.info),
    debug: log("debug", console.debug),
    trace: log("trace", console.debug),
    child: (childBindings) =>
      createClientLogger({ ...bindings, ...childBindings }),
  };
}

let logger: Logger;

if (typeof window === "undefined") {
  // Lazy require keeps pino out of the client bundle.

  const pino = require("pino");
  const base = pino({ level: env.LOG_LEVEL });

  const wrap = (p: ReturnType<typeof pino>): Logger => ({
    fatal: (m, meta) => p.fatal(meta ?? {}, m),
    error: (m, meta) => p.error(meta ?? {}, m),
    warn: (m, meta) => p.warn(meta ?? {}, m),
    info: (m, meta) => p.info(meta ?? {}, m),
    debug: (m, meta) => p.debug(meta ?? {}, m),
    trace: (m, meta) => p.trace(meta ?? {}, m),
    child: (b) => wrap(p.child(b)),
  });

  logger = wrap(base);
} else {
  logger = createClientLogger();
}

export { logger };
