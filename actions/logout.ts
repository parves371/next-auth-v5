"use server";
import { signOut } from "@/auth";

export const logout = async () => {
  // do  something before sign out 

  await signOut();
};
