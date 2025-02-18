import client from "@/db";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { ApiError } from "@/utils/apiError";
import { Prisma, User } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";

export interface GetEventParams {
  page?: number;
  search?: string;
}

export const getAllEvents = async (params: GetEventParams, currUser: User) => {
  const { page = 1, search } = params;

  const whereClause: Prisma.EventWhereInput = {
    ...(currUser.role === "teacher" && {
      OR: [
        {
          classId: null,
        },
        {
          class: { lessons: { some: { teacherId: currUser.id } } },
        },
      ],
    }),
    ...(currUser.role === "student" && {
      OR: [
        {
          classId: null,
        },
        {
          class: { students: { some: { id: currUser.id } } },
        },
      ],
    }),
    ...(search && {
      title: {
        contains: search,
        mode: "insensitive",
      },
    }),
  };

  const [events, eventsCount] = await client.$transaction([
    client.event.findMany({
      where: whereClause,
      include: {
        class: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (page - 1),
    }),
    client.event.count({ where: whereClause }),
  ]);

  return { events, eventsCount };
};

export const getEventsCalendar = async (dateParam: string, currUser: User) => {
  const date = dateParam ? new Date(dateParam) : new Date();

  const whereClause: Prisma.EventWhereInput = {
    ...(currUser.role === "teacher" && {
      OR: [
        {
          classId: null,
        },
        {
          class: { lessons: { some: { teacherId: currUser.id } } },
        },
      ],
    }),
    ...(currUser.role === "student" && {
      OR: [
        {
          classId: null,
        },
        {
          class: { students: { some: { id: currUser.id } } },
        },
      ],
    }),
  };

  return await client.event.findMany({
    where: {
      ...whereClause,
      startTime: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lte: new Date(date.setHours(23, 59, 59, 999)),
      },
    },
  });
};

export const getClassGrades = async () => {
  return await client.grade.findMany({
    select: { id: true, level: true },
  });
};

const eventSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, { message: "Title is required!" }),
  description: z.string().min(1, { message: "Description is required!" }),
  startTime: z.coerce.date({ message: "Start date is required!" }),
  endTime: z.coerce.date({ message: "End date is required!" }),
  classId: z.coerce.number().min(1, { message: "Class is required!" }),
});
export type EventSchema = z.infer<typeof eventSchema>;

export const createEvent = async (params: EventSchema) => {
  return await client.event.create({
    data: {
      title: params.title,
      description: params.description,
      startTime: params.startTime,
      endTime: params.endTime,
      classId: params.classId,
    },
  });
};

export const updateEvent = async (id: string, params: EventSchema) => {
  const existingEvent = await client.event.findFirst({
    where: {
      id,
    },
  });

  if (!existingEvent) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "This event doesn't exist!");
  }

  return await client.event.update({
    where: {
      id,
    },
    data: {
      title: params.title,
      description: params.description,
      startTime: params.startTime,
      endTime: params.endTime,
      classId: params.classId,
    },
  });
};

export const deleteEvent = async (id: string) => {
  const existingEvent = await client.event.findFirst({
    where: {
      id,
    },
  });

  if (!existingEvent) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "This event doesn't exist!");
  }

  return await client.event.delete({
    where: {
      id,
    },
  });
};
