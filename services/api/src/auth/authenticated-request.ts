import type { Request } from "express";
import type { UserWithProfile } from "../users/users.service";

export type AuthenticatedUser = NonNullable<UserWithProfile>;

export interface AuthenticatedRequest extends Request {
  user: AuthenticatedUser;
}
