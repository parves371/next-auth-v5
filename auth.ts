import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";

import authConfig from "@/auth.config";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
import { getTwofactorConfirmationById } from "@/data/two-factor-confirmation";

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },

  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },

  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id as string);

      if (!existingUser?.emailVerified) return false;

      // add two factor authentication check
      if (existingUser?.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwofactorConfirmationById(
          existingUser.id as string
        );
        if (!twoFactorConfirmation) return false;

        // delete two factor conformation for next sign in
        await db.twoFactorConfirmation.delete({
          where: {
            id: twoFactorConfirmation.id,
          },
        });
      }

      return true;
    },

    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub!;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;
      token.role = existingUser.role;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
