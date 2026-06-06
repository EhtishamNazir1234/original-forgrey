/**
 * Centralized, typed route map for PAGE navigation.
 *
 * Never hardcode a path string in a component or <Link>. Import `routes` here.
 * Static routes are strings; dynamic routes are functions returning a string.
 *
 * Grouping mirrors the app-router structure:
 *   public  → unauthenticated
 *   private → authenticated, namespaced by role
 */
export const routes = {
  public: {
    home: "/",
    login: "/login",
    register: "/register",
  },
  private: {
    admin: {
      dashboard: "/admin/dashboard",
      users: "/admin/users",
      user: (id: string) => `/admin/users/${id}`,
    },
    user: {
      dashboard: "/dashboard",
      profile: "/profile",
      settings: "/settings",
    },
  },
} as const;

/** Paths that do not require authentication. */
export const publicPaths: string[] = [
  routes.public.home,
  routes.public.login,
  routes.public.register,
];

export function isPublicPath(pathname: string): boolean {
  return publicPaths.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
}

export type Routes = typeof routes;
