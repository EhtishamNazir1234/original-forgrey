import type { ZodType } from "zod";
import { type RequestOptions, request } from "./client";

/**
 * Thin verb helpers over the configured client. Optionally validate responses
 * with a zod schema so DTOs are guaranteed at the boundary.
 */
async function withSchema<T>(
  promise: Promise<unknown>,
  schema?: ZodType<T>,
): Promise<T> {
  const data = await promise;
  return schema ? schema.parse(data) : (data as T);
}

type Opts<T> = Omit<RequestOptions, "method" | "body"> & {
  schema?: ZodType<T>;
};
type BodyOpts<T> = Omit<RequestOptions, "method"> & { schema?: ZodType<T> };

export const http = {
  get: <T>(path: string, opts: Opts<T> = {}) =>
    withSchema<T>(request<T>(path, { ...opts, method: "GET" }), opts.schema),

  post: <T>(path: string, body?: unknown, opts: BodyOpts<T> = {}) =>
    withSchema<T>(
      request<T>(path, { ...opts, method: "POST", body }),
      opts.schema,
    ),

  put: <T>(path: string, body?: unknown, opts: BodyOpts<T> = {}) =>
    withSchema<T>(
      request<T>(path, { ...opts, method: "PUT", body }),
      opts.schema,
    ),

  patch: <T>(path: string, body?: unknown, opts: BodyOpts<T> = {}) =>
    withSchema<T>(
      request<T>(path, { ...opts, method: "PATCH", body }),
      opts.schema,
    ),

  del: <T>(path: string, opts: Opts<T> = {}) =>
    withSchema<T>(request<T>(path, { ...opts, method: "DELETE" }), opts.schema),
};
