import client from "@/db";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { ApiError } from "@/utils/apiError";
import { Prisma, User } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";

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

export const resultSchema = z.object({
  id: z.coerce.string(),
  score: z.coerce.number(),
  examId: z.coerce.string().optional(),
  assignmentId: z.coerce.string().optional(),
  studentId: z.coerce.string({ message: "Student is required!" }),
});

export type ResultSchema = z.infer<typeof resultSchema>;

export const createResult = async (params: ResultSchema) => {
  return await client.result.create({
    data: {
      score: params.score,
      ...(params.examId != "" && { examId: params.examId }),
      ...(params.assignmentId != "" && { assignmentId: params.assignmentId }),
      studentId: params.studentId,
    },
  });
};

export const updateResult = async (
  id: string,
  params: ResultSchema,
) => {
  const existingResult = await client.result.findFirst({
    where: {
      id,
    },
  });

  if (!existingResult) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "This result doesn't exist!",
    );
  }

  return await client.result.update({
    where: {
      id,
    },
    data: {
      score: params.score,
      ...(params.examId != "" && { examId: params.examId }),
      ...(params.assignmentId != "" && { assignmentId: params.assignmentId }),
      studentId: params.studentId,
    },
  });
};

export const deleteResult = async (id: string) => {
  const existingResult = await client.result.findFirst({
    where: {
      id,
    },
  });

  if (!existingResult) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "This result doesn't exist!",
    );
  }

  return await client.result.delete({
    where: {
      id,
    },
  });
};

export const getStudentsList = async () => {
  return await client.student.findMany({
    select: {
      id: true,
      name: true
    }
  })
};

export const getExamsList = async () => {
  return await client.exam.findMany({
    select: {
      id: true,
      title: true
    }
  })
};

export const getAssignmentsList = async () => {
  return await client.assignment.findMany({
    select: {
      id: true,
      title: true
    }
  })
};