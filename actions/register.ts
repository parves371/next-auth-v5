"use server";
import * as z from "zod";
import { Registerchema } from "@/schemas";

export const register = async (values: z.infer<typeof Registerchema>) => {
  const validatedFeilds = Registerchema.safeParse(values);
  if (!validatedFeilds.success) {
    return {
      error: "invalid fields!",
    };
  }

  return {
    success: "Email sent!",
  };
};
