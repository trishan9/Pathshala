import client from "@/db";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Prisma, User } from "@prisma/client";

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
