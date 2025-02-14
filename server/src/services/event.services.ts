import client from "@/db";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Prisma } from "@prisma/client";

export interface GetEventParams {
  page?: number;
  search?: string;
}

export const getAllEvents = async (params: GetEventParams) => {
  const { page = 1, search } = params;

  const whereClause: Prisma.EventWhereInput = {
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
