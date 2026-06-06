import { env } from "@/lib/config/env";
import { logger } from "@/lib/logger/logger";
import { ApiError } from "./error";

/**
 * THE single configured fetch instance. Owns base URL, headers, auth injection,
 * timeout, error normalization. Nothing else in the app touches `fetch`.
 */
const log = logger.child({ scope: "api" });

export interface RequestOptions extends Omit<RequestInit, "body"> {
  /** JSON body — serialized automatically. */
  body?: unknown;
  /** Query params appended to the URL. */
  params?: Record<string, string | number | boolean | undefined>;
  /** Per-request timeout (ms). Default 15s. */
  timeoutMs?: number;
  /** Skip JSON parsing (e.g. for 204 / blobs). */
  raw?: boolean;
}

/**
 * Hook for injecting auth. On the server this can read cookies/headers; on the
 * client it can read an in-memory token. Override per-project.
 */
type TokenProvider = () => string | undefined | Promise<string | undefined>;
let getToken: TokenProvider = () => undefined;
export function setTokenProvider(provider: TokenProvider) {
  getToken = provider;
}

function buildUrl(path: string, params?: RequestOptions["params"]): string {
  const base = path.startsWith("http")
    ? path
    : `${env.NEXT_PUBLIC_API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  if (!params) return base;
  const url = new URL(base);
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined) url.searchParams.set(k, String(v));
  }
  return url.toString();
}

export async function request<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { body, params, timeoutMs = 15_000, raw, headers, ...rest } = options;
  const url = buildUrl(path, params);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  const token = await getToken();

  try {
    const res = await fetch(url, {
      ...rest,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) {
      const payload = await safeJson(res);
      const message =
        (payload as { message?: string })?.message ?? res.statusText;
      log.warn("request failed", { url, status: res.status, message });
      throw new ApiError({
        message,
        status: res.status,
        code: (payload as { code?: string })?.code,
        details: payload,
      });
    }

    if (raw || res.status === 204) return undefined as T;
    return (await res.json()) as T;
  } catch (err) {
    if (err instanceof ApiError) throw err;
    if (err instanceof DOMException && err.name === "AbortError") {
      throw new ApiError({
        message: "Request timed out",
        status: 0,
        code: "TIMEOUT",
      });
    }
    log.error("network error", { url, err: String(err) });
    throw new ApiError({
      message: "Network error",
      status: 0,
      code: "NETWORK",
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function safeJson(res: Response): Promise<unknown> {
  try {
    return await res.json();
  } catch {
    return undefined;
  }
}
