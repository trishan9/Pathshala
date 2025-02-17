import client from "@/db";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { ApiError } from "@/utils/apiError";
import { Prisma } from "@prisma/client";
import { StatusCodes } from "http-status-codes";

export interface GetSubjectParams {
  page?: number;
  search?: string;
}

export const getAllSubjects = async (params: GetSubjectParams) => {
  const { page = 1, search } = params;

  const whereClause: Prisma.SubjectWhereInput = {
    ...(search && {
      name: {
        contains: search,
        mode: "insensitive",
      },
    }),
  };

  const [subjects, subjectsCount] = await client.$transaction([
    client.subject.findMany({
      where: whereClause,
      include: {
        teachers: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (page - 1),
    }),
    client.subject.count({ where: whereClause }),
  ]);

  return { subjects, subjectsCount };
};

export const createSubject = async (name: string) => {
  const existingSubject = await client.subject.findFirst({
    where: {
      name,
    },
  });

  if (existingSubject) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Subject with this name already exists",
    );
  }

  return await client.subject.create({
    data: {
      name,
    },
  });
};

export const updateSubject = async (id: string, name: string) => {
  const existingSubject = await client.subject.findFirst({
    where: {
      id,
    },
  });

  if (!existingSubject) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Subject doesn't exists");
  }

  return await client.subject.update({
    data: {
      name,
    },
    where: {
      id,
    },
  });
};

export const deleteSubject = async (id: string) => {
  const existingSubject = await client.subject.findFirst({
    where: {
      id,
    },
  });

  if (!existingSubject) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Subject doesn't exists");
  }

  return await client.subject.delete({
    where: {
      id,
    },
  });
};

export const getTeacherSubjects = async () => {
  return await client.subject.findMany({
    select: { id: true, name: true },
  });
};
