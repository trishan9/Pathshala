import client from "@/db";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { ApiError } from "@/utils/apiError";
import { Prisma } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";

export interface GetClassParams {
  page?: number;
  supervisorId?: string;
  search?: string;
}

export const getAllClasses = async (params: GetClassParams) => {
  const { page = 1, supervisorId, search } = params;

  const whereClause: Prisma.ClassWhereInput = {
    ...(supervisorId && {
      supervisorId,
    }),
    ...(search && {
      name: {
        contains: search,
        mode: "insensitive",
      },
    }),
  };

  const [classes, classesCount] = await client.$transaction([
    client.class.findMany({
      where: whereClause,
      include: {
        supervisor: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (page - 1),
    }),
    client.class.count({ where: whereClause }),
  ]);

  return { classes, classesCount };
};

export const getClassByStudentId = async (studentId: string) => {
  const classItem = await client.class.findMany({
    where: {
      students: { some: { id: studentId! } },
    },
  });
  return classItem?.[0];
};

export const getStudentClasses = async () => {
  return await client.class.findMany({
    include: { _count: { select: { students: true } } },
  });
};

export const getStudentGrades = async () => {
  return await client.grade.findMany({
    include: { _count: { select: { students: true } } },
  });
};

export const getClassGrades = async () => {
  return await client.grade.findMany({
    select: { id: true, level: true },
  });
};

export const classSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Class name is required!" }),
  capacity: z.coerce.number().min(1, { message: "Capacity name is required!" }),
  gradeId: z.coerce.string().min(1, { message: "Grade name is required!" }),
  supervisorId: z.coerce.string().optional(),
});

type ClassSchema = z.infer<typeof classSchema>;

export const createClass = async (params: ClassSchema) => {
  const existingClass = await client.class.findFirst({
    where: {
      name: params.name,
    },
  });

  // if (existingClass) {
  //   throw new ApiError(
  //     StatusCodes.BAD_REQUEST,
  //     "Class with this name already exists",
  //   );
  // }

  return await client.class.create({
    data: {
      name: params.name,
      capacity: params.capacity,
      gradeId: params.gradeId,
      supervisorId: params.supervisorId,
    },
  });
};

export const updateClass = async (id: number, params: Partial<ClassSchema>) => {
  const existingClass = await client.class.findFirst({
    where: {
      id,
    },
  });

  if (!existingClass) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "This class doesn't exist!");
  }

  return await client.class.update({
    where: {
      id,
    },
    data: {
      name: params.name,
      capacity: params.capacity,
      gradeId: params.gradeId,
      supervisorId: params.supervisorId,
    },
  });
};

export const deleteClass = async (id: number) => {
  const existingClass = await client.class.findFirst({
    where: {
      id,
    },
  });

  if (!existingClass) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "This class doesn't exist!");
  }

  return await client.class.delete({
    where: {
      id,
    },
  });
};
