import client from "@/db";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { ApiError } from "@/utils/apiError";
import { Prisma, User } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";

export interface GetAssignmentParams {
  page?: number;
  classId?: number;
  teacherId?: string;
  search?: string;
}

export const getAllAssignments = async (
  params: GetAssignmentParams,
  currUser: User,
) => {
  const { page = 1, classId, teacherId, search } = params;

  const whereClause: Prisma.AssignmentWhereInput = {
    lesson: {
      ...(currUser.role === "teacher" && {
        teacherId: currUser.id,
      }),
      ...(currUser?.role === "student" && {
        class: {
          students: {
            some: { id: currUser.id! },
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

export const assignmentSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, { message: "Title name is required!" }),
  startDate: z.coerce.date({ message: "Start date is required!" }),
  dueDate: z.coerce.date({ message: "Due date is required!" }),
  lessonId: z.coerce.string({ message: "Lesson is required!" }),
  question: z.coerce.string().optional(),
});

export type AssignmentSchema = z.infer<typeof assignmentSchema>;

export const createAssignment = async (params: AssignmentSchema) => {
  return await client.assignment.create({
    data: {
      title: params.title,
      startDate: params.startDate,
      dueDate: params.dueDate,
      lessonId: params.lessonId,
      question: params.question
    },
  });
};

export const updateAssignment = async (
  id: string,
  params: AssignmentSchema,
) => {
  const existingAssignment = await client.assignment.findFirst({
    where: {
      id,
    },
  });

  if (!existingAssignment) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "This assignment doesn't exist!",
    );
  }

  return await client.assignment.update({
    where: {
      id,
    },
    data: {
      title: params.title,
      startDate: params.startDate,
      dueDate: params.dueDate,
      lessonId: params.lessonId,
      question: params.question
    },
  });
};

export const deleteAssignment = async (id: string) => {
  const existingAssignment = await client.assignment.findFirst({
    where: {
      id,
    },
  });

  if (!existingAssignment) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "This assignment doesn't exist!",
    );
  }

  return await client.assignment.delete({
    where: {
      id,
    },
  });
};
