import client from "@/db";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Prisma, User } from "@prisma/client";

export interface GetExamParams {
  page?: number;
  classId?: number;
  teacherId?: string;
  search?: string;
}

export const getAllExams = async (params: GetExamParams, currUser: User) => {
  const { page = 1, classId, teacherId, search } = params;

  const whereClause: Prisma.ExamWhereInput = {
    lesson: {
      ...(currUser.role === "teacher" && {
        teacherId: currUser.id,
      }),
      ...(currUser?.role === "student" && {
        class: {
          students: {
            some: { id: currUser.id },
          },
        },
      }),
      ...(teacherId && {
        teacherId,
      }),
      ...(classId && {
        classId: +classId,
      }),
      subject: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
    },
  };

  const [exams, examsCount] = await client.$transaction([
    client.exam.findMany({
      where: whereClause,
      include: {
        lesson: {
          select: {
            subject: { select: { name: true } },
            teacher: { select: { name: true } },
            class: { select: { name: true } },
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (page - 1),
    }),
    client.exam.count({ where: whereClause }),
  ]);

  return { exams, examsCount };
};
