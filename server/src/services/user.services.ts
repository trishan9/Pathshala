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

export const getStudentsCountBySex = async (currUser: User) => {
  if (currUser.role !== "admin") {
    throw new ApiError(
      StatusCodes.FORBIDDEN,
      "You are not allowed to perform this action!",
    );
  }

  const data = await client.student.groupBy({
    by: ["sex"],
    _count: true,
  });

  const boys = data.find((d) => d.sex === "MALE")?._count || 0;
  const girls = data.find((d) => d.sex === "FEMALE")?._count || 0;

  return {
    boys,
    girls,
  };
};
