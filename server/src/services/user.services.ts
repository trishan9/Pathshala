import client from "@/db";
import { ApiError } from "@/utils/apiError";
import { User } from "@prisma/client";
import { StatusCodes } from "http-status-codes";

export const getAdminsCount = async (currUser: User) => {
  if (currUser.role !== "admin") {
    throw new ApiError(
      StatusCodes.FORBIDDEN,
      "You are not allowed to perform this action!",
    );
  }

  return await client.user.count({
    where: {
      role: "admin",
    },
  });
};

export const getTeachersCount = async (currUser: User) => {
  if (currUser.role !== "admin") {
    throw new ApiError(
      StatusCodes.FORBIDDEN,
      "You are not allowed to perform this action!",
    );
  }

  return await client.teacher.count();
};

export const getStudentsCount = async (currUser: User) => {
  if (currUser.role !== "admin") {
    throw new ApiError(
      StatusCodes.FORBIDDEN,
      "You are not allowed to perform this action!",
    );
  }

  return await client.student.count();
};
