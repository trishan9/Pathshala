import client from "@/db";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Prisma } from "@prisma/client";

export interface GetClassParams {
  page?: number;
  supervisorId?: string;
  search?: string;
}

export const getAllClasses = async (params: GetClassParams) => {
  const { page = 1, supervisorId, search } = params;

  const whereClause: Prisma.ClassWhereInput = {
    ...(supervisorId && {
      supervisorId,
    }),
    ...(search && {
      name: {
        contains: search,
        mode: "insensitive",
      },
    }),
  };

  const [classes, classesCount] = await client.$transaction([
    client.class.findMany({
      where: whereClause,
      include: {
        supervisor: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (page - 1),
    }),
    client.class.count({ where: whereClause }),
  ]);

  return { classes, classesCount };
};
