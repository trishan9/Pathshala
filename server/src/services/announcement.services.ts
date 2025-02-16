import client from "@/db";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Prisma, User } from "@prisma/client";

export interface GetAnnouncementParams {
  page?: number;
  search?: string;
}

export const getAllAnnouncements = async (
  params: GetAnnouncementParams,
  currUser: User,
) => {
  const { page = 1, search } = params;

  const whereClause: Prisma.AnnouncementWhereInput = {
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

  const [announcements, announcementsCount] = await client.$transaction([
    client.announcement.findMany({
      where: whereClause,
      include: {
        class: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (page - 1),
    }),
    client.announcement.count({ where: whereClause }),
  ]);

  return { announcements, announcementsCount };
};
