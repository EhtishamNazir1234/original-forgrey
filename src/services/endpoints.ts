/**
 * Centralized API path registry (the API counterpart of `routes.ts`).
 * Services reference these — never raw URL strings.
 */
export const API = {
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
    me: "/auth/me",
  },
  user: {
    list: "/users",
    byId: (id: string) => `/users/${id}`,
  },
} as const;
