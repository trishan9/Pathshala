import client from "@/db";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Prisma } from "@prisma/client";

export interface GetSubjectParams {
  page?: number;
  search?: string;
}

export const getAllSubjects = async (params: GetSubjectParams) => {
  const { page = 1, search } = params;

  const whereClause: Prisma.SubjectWhereInput = {
    ...(search && {
      name: {
        contains: search,
        mode: "insensitive",
      },
    }),
  };

  const [subjects, subjectsCount] = await client.$transaction([
    client.subject.findMany({
      where: whereClause,
      include: {
        teachers: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (page - 1),
    }),
    client.subject.count({ where: whereClause }),
  ]);

  return { subjects, subjectsCount };
};
