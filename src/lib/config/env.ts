import { z } from "zod";

/**
 * Centralized, validated environment configuration.
 *
 * - Only `NEXT_PUBLIC_*` vars are available on the client.
 * - Validation runs once at import time; the app fails fast on misconfig.
 * - Never read `process.env` directly elsewhere — import `env` from here.
 */
const clientSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_API_BASE_URL: z
    .string()
    .url()
    .default("http://localhost:3000/api"),
  NEXT_PUBLIC_SUPABASE_URL: z
    .string()
    .url()
    .default("https://placeholder.supabase.co"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string()
    .default("placeholder-key"),
});

const serverSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  LOG_LEVEL: z
    .enum(["fatal", "error", "warn", "info", "debug", "trace"])
    .default("info"),
});

/**
 * Client vars must be referenced explicitly (not via dynamic keys) so the
 * Next.js bundler can statically inline them.
 */
const clientEnv = clientSchema.safeParse({
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
});

if (!clientEnv.success) {
  console.error(
    "❌ Invalid client environment variables:",
    clientEnv.error.flatten().fieldErrors,
  );
  throw new Error("Invalid client environment variables");
}

// Server vars are only validated on the server.
const isServer = typeof window === "undefined";
const serverEnv = isServer
  ? serverSchema.safeParse(process.env)
  : { success: true as const, data: serverSchema.parse({}) };

if (!serverEnv.success) {
  console.error(
    "❌ Invalid server environment variables:",
    serverEnv.error.flatten().fieldErrors,
  );
  throw new Error("Invalid server environment variables");
}

export const env = {
  ...clientEnv.data,
  ...serverEnv.data,
} as const;

export type Env = typeof env;
