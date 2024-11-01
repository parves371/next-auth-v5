import * as z from "zod";

export const NewPAsswordSchema = z.object({
  password: z.string().min(6, {
    message: "min 6 characters required!",
  }),
});
export const Loginchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});
export const ResetSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});
export const Registerchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "minimum 6 characters required!",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});
