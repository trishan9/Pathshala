import client from "@/db";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Prisma } from "@prisma/client";

export interface GetAssignmentParams {
  page?: number;
  classId?: number;
  teacherId?: string;
  search?: string;
}

export const getAllAssignments = async (params: GetAssignmentParams) => {
  const { page = 1, classId, teacherId, search } = params;

  const whereClause: Prisma.AssignmentWhereInput = {
    lesson: {
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

  const [assignments, assignmentsCount] = await client.$transaction([
    client.assignment.findMany({
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
    client.assignment.count({ where: whereClause }),
  ]);

  return { assignments, assignmentsCount };
};
