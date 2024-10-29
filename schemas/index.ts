import * as z from "zod";

export const Loginchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(1, {
    message: "Password is required",
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