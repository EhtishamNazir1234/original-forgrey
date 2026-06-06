"use client";

import { useCallback } from "react";
import { useShallow } from "zustand/react/shallow";
import { logger } from "@/lib/logger/logger";
import { setTokenProvider } from "@/services";
import type { LoginRequest } from "@/services/auth";
import { authService } from "@/services/auth";
import { toApiError } from "@/services/error";
import {
  selectIsAuthenticated,
  selectRole,
  useAuthStore,
} from "@/stores/auth.store";

/**
 * LOGIC layer for auth. Orchestrates services + store; components use this, not
 * the store directly. In a real app, swap the direct `authService` calls for
 * server actions and httpOnly-cookie sessions.
 */
const log = logger.child({ scope: "useAuth" });

export function useAuth() {
  const { user, isAuthenticated, role, status } = useAuthStore(
    useShallow((s) => ({
      user: s.user,
      isAuthenticated: selectIsAuthenticated(s),
      role: selectRole(s),
      status: s.status,
    })),
  );
  const setSession = useAuthStore((s) => s.setSession);
  const clearSession = useAuthStore((s) => s.clearSession);

  const login = useCallback(
    async (credentials: LoginRequest) => {
      try {
        const session = await authService.login(credentials);
        setTokenProvider(() => session.token);
        setSession(session);
        log.info("login success", { userId: session.user.id });
        return session;
      } catch (err) {
        const apiErr = toApiError(err);
        log.warn("login failed", { code: apiErr.code });
        throw apiErr;
      }
    },
    [setSession],
  );

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (err) {
      log.warn("logout request failed", { err: String(err) });
    } finally {
      setTokenProvider(() => undefined);
      clearSession();
    }
  }, [clearSession]);

  return { user, isAuthenticated, role, status, login, logout };
}
