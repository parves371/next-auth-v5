import { UserRole } from "@prisma/client";
import { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  isTwoFactorEnabled: boolean; // Add this property
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
