import { type User, UserSchema } from "../auth/auth.types";
import { API } from "../endpoints";
import { http } from "../http";
import { type UpdateUser, type UserList, UserListSchema } from "./user.types";

/** User domain module. */
export const userService = {
  list: () => http.get<UserList>(API.user.list, { schema: UserListSchema }),

  getById: (id: string) =>
    http.get<User>(API.user.byId(id), { schema: UserSchema }),

  update: (id: string, body: UpdateUser) =>
    http.patch<User>(API.user.byId(id), body, { schema: UserSchema }),

  remove: (id: string) => http.del<void>(API.user.byId(id), { raw: true }),
};
