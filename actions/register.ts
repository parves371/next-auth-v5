"use server";

import * as z from "zod";
import becrypt from "bcrypt";

import { Registerchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

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
  // sent varification email

  return {
    success: "User created successfully!",
  };
};