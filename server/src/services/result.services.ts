import client from "@/db";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Prisma, User } from "@prisma/client";

export interface GetResultParams {
  page?: number;
  studentId?: string;
  search?: string;
}

export const getAllResults = async (
  params: GetResultParams,
  currUser: User,
) => {
  const { page = 1, studentId, search } = params;

  const whereClause: Prisma.ResultWhereInput = {
    ...(currUser.role === "teacher" && {
      OR: [
        { exam: { lesson: { teacherId: currUser.id } } },
        { assignment: { lesson: { teacherId: currUser.id } } },
      ],
    }),
    ...(currUser.role === "student" && {
      studentId: currUser.id,
    }),
    ...(studentId && {
      studentId,
    }),
    ...(search && {
      OR: [
        {
          exam: {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
        {
          student: {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
      ],
    }),
  };

  const [resultsRes, resultsCount] = await client.$transaction([
    client.result.findMany({
      where: whereClause,
      include: {
        student: { select: { name: true } },
        exam: {
          include: {
            lesson: {
              select: {
                class: { select: { name: true } },
                teacher: { select: { name: true } },
              },
            },
          },
        },
        assignment: {
          include: {
            lesson: {
              select: {
                class: { select: { name: true } },
                teacher: { select: { name: true } },
              },
            },
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (page - 1),
    }),
    client.result.count({ where: whereClause }),
  ]);

  const results = resultsRes.map((item) => {
    const assessment = item.exam || item.assignment;

    if (!assessment) return null;

    const isExam = "startTime" in assessment;

    return {
      id: item.id,
      title: assessment.title,
      studentName: item.student.name,
      teacherName: assessment.lesson.teacher.name,
      score: item.score,
      className: assessment.lesson.class.name,
      startTime: isExam ? assessment.startTime : assessment.startDate,
    };
  });

  return { results, resultsCount };
};
