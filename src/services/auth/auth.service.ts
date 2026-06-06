import { API } from "../endpoints";
import { http } from "../http";
import {
  type LoginRequest,
  type Session,
  SessionSchema,
  type User,
  UserSchema,
} from "./auth.types";

/**
 * Auth domain module. Pure endpoint functions — no fetch details, no React.
 * Consumed by server actions / hooks, never imported directly into client
 * components.
 */
export const authService = {
  login: (body: LoginRequest) =>
    http.post<Session>(API.auth.login, body, { schema: SessionSchema }),

  logout: () => http.post<void>(API.auth.logout, undefined, { raw: true }),

  me: () => http.get<User>(API.auth.me, { schema: UserSchema }),
};
