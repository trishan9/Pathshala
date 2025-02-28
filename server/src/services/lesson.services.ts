import client from "@/db";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { ApiError } from "@/utils/apiError";
import { Day, Prisma } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";

export interface GetLessonParams {
  page?: number;
  teacherId?: string;
  classId?: number;
  search?: string;
}

export const getAllLessons = async (params: GetLessonParams) => {
  const { page = 1, teacherId, classId, search } = params;

  const whereClause: Prisma.LessonWhereInput = {
    ...(teacherId && {
      teacherId,
    }),
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

export const getSchedule = async (params: GetLessonParams) => {
  const { teacherId, classId } = params;

  const whereClause: Prisma.LessonWhereInput = {
    ...(teacherId && {
      teacherId,
    }),
    ...(classId && {
      classId: +classId,
    }),
  };

  return await client.lesson.findMany({
    where: whereClause,
  });
};

export const getExamLessons = async (role: string, currUserId: string) => {
  return await client.lesson.findMany({
    where: {
      ...(role === "teacher" ? { teacherId: currUserId! } : {}),
    },
    select: { id: true, name: true },
  });
};


export const lessonSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Lesson name is required!" }),
  day: z.string().min(1, { message: "Weekday is required!" }),
  startTime: z.coerce.date({ message: "Start time is required!" }),
  endTime: z.coerce.date({ message: "End time is required!" }),
  subjectId: z.coerce.string({ message: "Subject is required!" }),
  classId: z.coerce.number({ message: "Class is required!" }),
  teacherId: z.coerce.string({ message: "Teacher is required!" }),
});

export type LessonSchema = z.infer<typeof lessonSchema>;

export const createLesson = async (params: LessonSchema) => {
  return await client.lesson.create({
    data: {
      name: params.name,
      day: params.day as Day,
      startTime: params.startTime,
      endTime: params.endTime,
      subjectId: params.subjectId,
      classId: params.classId,
      teacherId: params.teacherId,
    },
  });
};

export const updateLesson = async (
  id: string,
  params: Partial<LessonSchema>,
) => {
  const existingLesson = await client.lesson.findFirst({
    where: {
      id,
    },
  });

  if (!existingLesson) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "This lesson doesn't exist!",
    );
  }

  return await client.lesson.update({
    where: {
      id,
    },
    data: {
      name: params.name,
      day: params.day as Day,
      startTime: params.startTime,
      endTime: params.endTime,
      subjectId: params.subjectId,
      classId: params.classId,
      teacherId: params.teacherId,
    },
  });
};

export const deleteLesson = async (id: string) => {
  const existingLesson = await client.lesson.findFirst({
    where: {
      id,
    },
  });

  if (!existingLesson) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "This lesson doesn't exist!",
    );
  }

  return await client.lesson.delete({
    where: {
      id,
    },
  });
}