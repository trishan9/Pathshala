import client from "@/db";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { ApiError } from "@/utils/apiError";
import { Prisma, User } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { date, z } from "zod";

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

export const examSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, { message: "Title name is required!" }),
  startTime: z.coerce.date({ message: "Start time is required!" }),
  endTime: z.coerce.date({ message: "End time is required!" }),
  lessonId: z.coerce.string({ message: "Lesson is required!" }),
  instruction: z.coerce.string().optional(),
});

export type ExamSchema = z.infer<typeof examSchema>;

export const createExam = async (params: ExamSchema) => {
  return await client.exam.create({
    data: {
      title: params.title,
      startTime: params.startTime,
      endTime: params.endTime,
      lessonId: params.lessonId,
      instruction: params.instruction
    },
  });
};

export const updateExam = async (
  id: string,
  params: ExamSchema,
) => {
  const existingExam = await client.exam.findFirst({
    where: {
      id,
    },
  });

  if (!existingExam) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "This exam doesn't exist!",
    );
  }

  return await client.exam.update({
    where: {
      id,
    },
    data: {
      title: params.title,
      startTime: params.startTime,
      endTime: params.endTime,
      lessonId: params.lessonId,
      instruction: params.instruction
    },
  });
};

export const deleteExam = async (id: string) => {
  const existingExam = await client.exam.findFirst({
    where: {
      id,
    },
  });

  if (!existingExam) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "This exam doesn't exist!",
    );
  }

  return await client.exam.delete({
    where: {
      id,
    },
  });
};
