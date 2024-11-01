"use server";

import { signIn } from "@/auth";
import { getTwofactorConfirmationById } from "@/data/two-factor-confirmation";
import { getTwofactorTokenByEmail } from "@/data/two-factor-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { sendTwoFactorConfirmation, sendVerificationEmail } from "@/lib/mail";
import { generateTwofactorToken, generateVerificationToken } from "@/lib/token";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { Loginchema } from "@/schemas";
import { AuthError } from "next-auth";
import * as z from "zod";

export const login = async (values: z.infer<typeof Loginchema>) => {
  const validatedFields = Loginchema.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return {
      error: "Email dose not exist",
    };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return {
      success: "Please check your email for verification.",
    };
  }
  // two fFA
  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwofactorTokenByEmail(existingUser.email);

      if (!twoFactorToken || twoFactorToken.token !== code) {
        return { error: "Invalid code" };
      }

      const isExpired = new Date(twoFactorToken.expires) < new Date();
      if (isExpired) {
        return { error: "Two-factor code has expired" };
      }

      // Delete the used token
      await db.twofactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      // Remove any existing two-factor confirmations for the user
      const existingConfirmation = await getTwofactorConfirmationById(
        existingUser.id
      );
      if (existingConfirmation) {
        await db.twofactorToken.delete({
          where: { id: existingConfirmation.id },
        });
      }

      // Create a new confirmation record for the user
      await db.twoFactorConfirmation.create({
        data: { userId: existingUser.id },
      });
    } else {
      // Generate and send a new two-factor token if no code is provided
      const twoFactorToken = await generateTwofactorToken(existingUser.email);
      await sendTwoFactorConfirmation(
        twoFactorToken.email,
        twoFactorToken.token
      );

      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong during login" };
      }
    }
    throw error; // Re-throw other errors for further handling (e.g., logging)
  }
};
