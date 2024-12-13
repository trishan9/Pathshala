import token from "@/lib/token";
import { Prisma } from "@prisma/client";

export const generateAccessToken = (user: Prisma.AdminCreateInput) => {
  const { id, name, email, username, role } = user;

  const accessToken = token.generate({
    payload: {
      id,
      name,
      email,
      username,
      role,
    },
    tokenType: "access",
  });

  return accessToken;
};

export const generateRefreshToken = (user: Prisma.AdminCreateInput) => {
  const { id, name, email, username, role } = user;

  const accessToken = token.generate({
    payload: {
      id,
      name,
      email,
      username,
      role,
    },
    tokenType: "refresh",
  });

  return accessToken;
};
