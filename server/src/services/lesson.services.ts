import client from "@/db";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Prisma } from "@prisma/client";

export interface GetLessonParams {
  page?: number;
  teacherId?: string;
  classId?: number;
  search?: string;
}

export const getAllLessons = async (params: GetLessonParams) => {
  const { page = 1, teacherId, classId, search } = params;

  const whereClause: Prisma.LessonWhereInput = {
    teacherId,
    ...(classId && {
      classId: +classId,
    }),
    ...(search && {
      OR: [
        {
          subject: {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
        {
          teacher: {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
      ],
    }),
  };

  const [lessons, lessonsCount] = await client.$transaction([
    client.lesson.findMany({
      where: whereClause,
      include: {
        subject: { select: { name: true } },
        class: { select: { name: true } },
        teacher: { select: { name: true } },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (page - 1),
    }),
    client.lesson.count({ where: whereClause }),
  ]);

  return { lessons, lessonsCount };
};
