"use server";
import * as z from "zod";
import { Loginchema } from "@/schemas";

export const login = async (values: z.infer<typeof Loginchema>) => {
  const validatedFeilds = Loginchema.safeParse(values);
  if (!validatedFeilds.success) {
    return {
      error: "invalid fields!",
    };
  }

  return {
    success: "Email sent!",
  };
};
