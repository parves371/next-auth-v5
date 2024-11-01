"use server";
import { getUserByEmail } from "@/data/user";
import { sendResetPassword } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/token";
import { ResetSchema } from "@/schemas";
import * as Z from "zod";

export const reset = async (values: Z.infer<typeof ResetSchema>) => {
  const validateField = ResetSchema.safeParse(values);
  if (!validateField.success) {
    return { error: "invali Email!" };
  }

  const { email } = validateField.data;

  const existingUserByEmail = await getUserByEmail(email);

  if (!existingUserByEmail) {
    return { error: "Email not found!" };
  }

  // todo send email to user
  const passwordResetToken = await generatePasswordResetToken(email);

  await sendResetPassword(passwordResetToken.email, passwordResetToken.token);

  return {
    success: "Reset email send successfully!",
  };
};
