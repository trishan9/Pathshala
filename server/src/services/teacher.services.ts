import client from "@/db";
import { ITEM_PER_PAGE } from "@/lib/settings";

export const getAllTeachers = async (pageNumber: number) => {
  const [teachers, teachersCount] = await client.$transaction([
    client.teacher.findMany({
      include: {
        subjects: true,
        classes: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (pageNumber - 1),
    }),
    client.teacher.count(),
  ]);

  return { teachers, teachersCount };
};
