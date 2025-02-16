import client from "@/db";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Prisma } from "@prisma/client";

export interface GetStudentParams {
  page?: number;
  teacherId?: string;
  search?: string;
}

export const getAllStudents = async (params: GetStudentParams) => {
  const { page = 1, teacherId, search } = params;

  const whereClause: Prisma.StudentWhereInput = {
    ...(teacherId && { class: { lessons: { some: { teacherId } } } }),
    ...(search && {
      name: {
        contains: search,
        mode: "insensitive",
      },
    }),
  };

  const [students, studentsCount] = await client.$transaction([
    client.student.findMany({
      where: whereClause,
      include: {
        class: true,
        grade: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (page - 1),
    }),
    client.student.count({ where: whereClause }),
  ]);

  return { students, studentsCount };
};

export const getStudentById = async (id: string) => {
  return await client.student.findUnique({
    where: { id },
    include: {
      class: {
        include: {
          _count: { select: { lessons: true } },
        },
      },
    },
  });
};
