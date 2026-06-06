import { z } from "zod";
import { UserSchema } from "../auth/auth.types";

// The canonical User type/schema lives in the auth module and is reused here.
export const UserListSchema = z.array(UserSchema);
export type UserList = z.infer<typeof UserListSchema>;

export const UpdateUserSchema = UserSchema.partial().omit({ id: true });
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
