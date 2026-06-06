/**
 * Normalized API error. Every failure from the API layer becomes an ApiError so
 * UI/error boundaries handle one shape.
 */
export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details?: unknown;

  constructor(params: {
    message: string;
    status: number;
    code?: string;
    details?: unknown;
  }) {
    super(params.message);
    this.name = "ApiError";
    this.status = params.status;
    this.code = params.code ?? "UNKNOWN";
    this.details = params.details;
  }

  get isNetwork() {
    return this.status === 0;
  }
  get isUnauthorized() {
    return this.status === 401;
  }
  get isForbidden() {
    return this.status === 403;
  }
  get isNotFound() {
    return this.status === 404;
  }
  get isServer() {
    return this.status >= 500;
  }
}

/** Coerce any thrown value into an ApiError. */
export function toApiError(err: unknown): ApiError {
  if (err instanceof ApiError) return err;
  if (err instanceof Error) {
    return new ApiError({ message: err.message, status: 0, code: "NETWORK" });
  }
  return new ApiError({ message: "Unknown error", status: 0 });
}
