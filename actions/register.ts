"use server";

import * as z from "zod";
import becrypt from "bcryptjs";

import { Registerchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof Registerchema>) => {
  const validatedFeilds = Registerchema.safeParse(values);
  if (!validatedFeilds.success) {
    return {
      error: "invalid fields!",
    };
  }

  const { email, password, name } = validatedFeilds.data;
  const hashedPassword = await becrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      error: "Email already in use!",
    };
  }

  await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });
  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return {
    success: "emial send successfully!",
  };
};
