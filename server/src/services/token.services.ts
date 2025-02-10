import token from "@/lib/token";
import { Prisma } from "@prisma/client";

export const generateAccessToken = (user: Prisma.UserCreateInput) => {
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

export const generateRefreshToken = (user: Prisma.UserCreateInput) => {
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
