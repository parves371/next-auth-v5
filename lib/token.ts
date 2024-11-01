import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getTwofactorTokenByEmail } from "@/data/two-factor-token";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { db } from "@/lib/db";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      token,
      expires,
      email,
    },
  });

  return verificationToken;
};

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.resetPasswordToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const passwordResetToken = await db.resetPasswordToken.create({
    data: {
      token,
      expires,
      email,
    },
  });

  return passwordResetToken;
};

export const generateTwofactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour
  const existingToken = await getTwofactorTokenByEmail(email);

  if (existingToken) {
    await db.twofactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const twoFactorToken = await db.twofactorToken.create({
    data: {
      token,
      expires,
      email,
    },
  });

  return twoFactorToken;
};
