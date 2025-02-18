import client from "@/db";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Prisma, UserSex } from "@prisma/client";
import * as authServices from "@/services/auth.services";
import uploadToCloudinary from "@/lib/cloudinary";
import { ApiError } from "@/utils/apiError";
import { StatusCodes } from "http-status-codes";
import hash from "@/lib/hash";

export interface GetTeacherParams {
  page?: number;
  classId?: number;
  search?: string;
}

export const getAllTeachers = async (params: GetTeacherParams) => {
  const { page = 1, classId, search } = params;

  const whereClause: Prisma.TeacherWhereInput = {
    ...(classId && { lessons: { some: { classId: +classId } } }),
    ...(search && {
      name: {
        contains: search,
        mode: "insensitive",
      },
    }),
  };

  const [teachers, teachersCount] = await client.$transaction([
    client.teacher.findMany({
      where: whereClause,
      include: {
        subjects: true,
        classes: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (page - 1),
    }),
    client.teacher.count({ where: whereClause }),
  ]);

  return { teachers, teachersCount };
};

export const getTeacherById = async (id: string) => {
  return await client.teacher.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          subjects: true,
          lessons: true,
          classes: true,
        },
      },
    },
  });
};

export const getClassTeachers = async () => {
  return await client.teacher.findMany({
    select: { id: true, name: true },
  });
};

export interface CreateTeacherParams {
  username: string;
  name: string;
  email: string;
  password: string;

  phone?: string;
  address: string;
  img?: any;
  bloodType: string;
  sex: UserSex;
  subjects?: string[];
  birthday: Date;
}

export const createTeacher = async (image, params: CreateTeacherParams) => {
  const {
    username,
    name,
    email,
    password,
    subjects = [],
    ...teacherData
  } = params;

  const existingTeacher = await client.teacher.findFirst({
    where: {
      OR: [{ username }, { email }],
    },
  });

  if (existingTeacher) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Username or email already exists",
    );
  }

  const user = await authServices.register({
    username: `PS-${username}`,
    name,
    email,
    password,
    role: "teacher",
  });

  let imageUrl: string | null = null;

  if (image) {
    const cloudinaryResponse = await uploadToCloudinary(image as string);
    if (cloudinaryResponse instanceof Error) {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Image upload failed",
      );
    }
    imageUrl = cloudinaryResponse?.secure_url;
  }

  const teacher = await client.teacher.create({
    data: {
      id: user.id,
      username,
      name,
      img: imageUrl,
      email,
      ...teacherData,
      subjects: {
        connect: subjects.map((id) => ({ id })),
      },
    },
    include: {
      subjects: true,
    },
  });

  return { user, teacher };
};

export const updateTeacher = async (id, image, params: CreateTeacherParams) => {
  const {
    username,
    name,
    email,
    password,
    subjects = [],
    ...teacherData
  } = params;

  const existingTeacher = await client.teacher.findFirst({
    where: {
      id,
    },
  });

  if (!existingTeacher) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "This teacher doesn't exist");
  }

  let hashedPassword = "";
  if (password && password != "") {
    hashedPassword = await hash.generate(password);
  }

  await client.user.update({
    where: {
      id,
    },
    data: {
      username,
      name,
      email,
      ...(password !== "" && { password: hashedPassword }),
    },
  });

  let imageUrl: string = existingTeacher.img as string;

  if (image) {
    const cloudinaryResponse = await uploadToCloudinary(image as string);
    if (cloudinaryResponse instanceof Error) {
      throw new ApiError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Image upload failed",
      );
    }
    imageUrl = cloudinaryResponse?.secure_url;
  }

  const teacher = await client.teacher.update({
    where: {
      id,
    },
    data: {
      username,
      name,
      img: imageUrl,
      email,
      ...teacherData,
      subjects: {
        set: subjects?.map((id) => ({ id })),
      },
    },
    include: {
      subjects: true,
    },
  });

  return teacher;
};

export const deleteTeacher = async (id: string) => {
  const teacher = await client.teacher.findUnique({
    where: { id },
  });

  if (!teacher) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "This teacher doesn't exist");
  }

  await client.$transaction([
    client.teacher.delete({ where: { id } }),
    client.user.delete({ where: { id } }),
  ]);
};
