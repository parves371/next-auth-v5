import { db } from "@/lib/db";

export const getTwofactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await db.twofactorToken.findUnique({
      where: {
        token,
      },
    });
    return twoFactorToken;
  } catch {
    return null;
  }
};

export const getTwofactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await db.twofactorToken.findFirst({
      where: {
        email,
      },
    });
    return twoFactorToken;
  } catch {
    return null;
  }
};
