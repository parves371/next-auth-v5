"use server";
import bcrypt from "bcryptjs";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";
import { SettingsSchema } from "@/schemas";
import * as z from "zod";

export const updateSettings = async (data: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();
  if (!user) {
    return {
      error: "You must be logged in to update your settings!.",
    };
  }

  const dbUser = await getUserById(user.id as string);
  if (!dbUser) {
    return {
      error: "User not found!",
    };
  }

  if (user.isOauth) {
    data.email = undefined;
    data.password = undefined;
    data.newPassword = undefined;
    data.isTwoFactorEnabled = undefined;
  }

  if (data.email && data.email !== user.email) {
    const existingUserByEmail = await getUserByEmail(data.email);
    if (existingUserByEmail && existingUserByEmail.id !== user.id) {
      return {
        error: "Email already in use!",
      };
    }

    const verificationToken = await generateVerificationToken(data.email);
    await sendVerificationEmail(data.email, verificationToken.token);

    return {
      success: "Verification email sent!",
    };
  }

  if (data.password && data.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(data.password, dbUser.password);

    if (!passwordsMatch) {
      return { error: "Incorrect password!" };
    }
    const hashedPassword = await bcrypt.hash(data.newPassword, 10);
    data.password = hashedPassword;
    data.newPassword = undefined;
  }

  await db.user.update({
    where: {
      id: user.id as string,
    },
    data: {
      ...data,
    },
  });

  return {
    success: "Settings updated successfully!",
  };
};
