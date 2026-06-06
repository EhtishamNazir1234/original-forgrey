import { create } from "zustand";
import type { User } from "@/services/auth";

/**
 * STATE ONLY. No side effects, no service calls. Logic that fills this store
 * lives in `hooks/useAuth.ts`. Components read via selectors, never set
 * directly outside the hook.
 */
export type AuthStatus = "idle" | "authenticated" | "unauthenticated";

interface AuthState {
  user: User | null;
  token: string | null;
  status: AuthStatus;
  setSession: (session: { user: User; token: string }) => void;
  clearSession: () => void;
  setStatus: (status: AuthStatus) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  status: "idle",
  setSession: ({ user, token }) =>
    set({ user, token, status: "authenticated" }),
  clearSession: () =>
    set({ user: null, token: null, status: "unauthenticated" }),
  setStatus: (status) => set({ status }),
}));

// Selectors (stable references; subscribe to the minimum slice).
export const selectUser = (s: AuthState) => s.user;
export const selectIsAuthenticated = (s: AuthState) =>
  s.status === "authenticated";
export const selectRole = (s: AuthState) => s.user?.role ?? null;
