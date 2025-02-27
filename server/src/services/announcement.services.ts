import client from "@/db";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { ApiError } from "@/utils/apiError";
import { Prisma, User } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";

export interface GetAnnouncementParams {
  page?: number;
  search?: string;
}

export const getAllAnnouncements = async (
  params: GetAnnouncementParams,
  currUser: Partial<User>,
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
      orderBy: { date: "desc" },
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

const announcementSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, { message: "Title is required!" }),
  description: z.string().min(1, { message: "Description is required!" }),
  date: z.coerce.date({ message: "Date is required!" }),
  classId: z.coerce.number().min(1, { message: "Class is required!" }),
});
export type AnnouncementSchema = z.infer<typeof announcementSchema>;

export const createAnnouncement = async (params: AnnouncementSchema) => {
  return await client.announcement.create({
    data: {
      title: params.title,
      description: params.description,
      date: params.date,
      ...(params.classId != 0 && { classId: params.classId }),
    },
  });
};

export const updateAnnouncement = async (
  id: string,
  params: Partial<AnnouncementSchema>,
) => {
  const existingAnnouncement = await client.announcement.findFirst({
    where: {
      id,
    },
  });

  if (!existingAnnouncement) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "This announcement doesn't exist!",
    );
  }

  return await client.announcement.update({
    where: {
      id,
    },
    data: {
      title: params.title,
      description: params.description,
      date: params.date,
      ...(params.classId != 0 && { classId: params.classId }),
    },
  });
};

export const deleteAnnouncement = async (id: string) => {
  const existingAnnouncement = await client.announcement.findFirst({
    where: {
      id,
    },
  });

  if (!existingAnnouncement) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "This announcement doesn't exist!",
    );
  }

  return await client.announcement.delete({
    where: {
      id,
    },
  });
};
