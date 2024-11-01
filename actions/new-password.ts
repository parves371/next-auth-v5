"use server";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { NewPAsswordSchema } from "@/schemas";
import * as z from "zod";

import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export const newPassword = async (
  values: z.infer<typeof NewPAsswordSchema>,
  token: string | null
) => {
  if (!token) {
    return {
      error: "Token is required!",
    };
  }

  const validatedField = NewPAsswordSchema.safeParse(values);
  if (!validatedField.success) {
    return {
      error: "invali Email!",
    };
  }

  const { password } = validatedField.data;

  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    return {
      error: "invali Token!",
    };
  }

  const hasExpires = new Date(existingToken.expires) < new Date();
  if (hasExpires) {
    return {
      error: "Token has expired!",
    };
  }

  const existingUserByEmail = await getUserByEmail(existingToken.email);
  if (!existingUserByEmail) {
    return {
      error: "Email does not exist!",
    };
  }

  const hassedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: existingUserByEmail.id },
    data: { password: hassedPassword },
  });

  await db.resetPasswordToken.delete({
    where: { id: existingToken.id },
  });

  return {
    success: "Password reset successfully!",
  };
};
