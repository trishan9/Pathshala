import client from "@/db";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Prisma } from "@prisma/client";

export interface GetTeacherParams {
  page?: number;
  classId?: number;
  search?: string;
}

export const getAllTeachers = async (params: GetTeacherParams) => {
  const { page = 1, classId, search } = params;

  const whereClause: Prisma.TeacherWhereInput = {
    ...(classId && { lessons: { some: { classId: +classId } } }),
    ...(search && {
      name: {
        contains: search,
        mode: "insensitive",
      },
    }),
  };

  const [teachers, teachersCount] = await client.$transaction([
    client.teacher.findMany({
      where: whereClause,
      include: {
        subjects: true,
        classes: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (page - 1),
    }),
    client.teacher.count({ where: whereClause }),
  ]);

  return { teachers, teachersCount };
};

export const getTeacherById = async (id: string) => {
  return await client.teacher.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          subjects: true,
          lessons: true,
          classes: true,
        },
      },
    },
  });
};
