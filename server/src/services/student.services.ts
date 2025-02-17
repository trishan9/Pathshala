import client from "@/db";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { ApiError } from "@/utils/apiError";
import { Prisma, UserSex } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import * as authServices from "@/services/auth.services";
import uploadToCloudinary from "@/lib/cloudinary";
import hash from "@/lib/hash";

export interface GetStudentParams {
  page?: number;
  teacherId?: string;
  search?: string;
}

export const getAllStudents = async (params: GetStudentParams) => {
  const { page = 1, teacherId, search } = params;

  const whereClause: Prisma.StudentWhereInput = {
    ...(teacherId && { class: { lessons: { some: { teacherId } } } }),
    ...(search && {
      name: {
        contains: search,
        mode: "insensitive",
      },
    }),
  };

  const [students, studentsCount] = await client.$transaction([
    client.student.findMany({
      where: whereClause,
      include: {
        class: true,
        grade: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (page - 1),
    }),
    client.student.count({ where: whereClause }),
  ]);

  return { students, studentsCount };
};

export const getStudentById = async (id: string) => {
  return await client.student.findUnique({
    where: { id },
    include: {
      class: {
        include: {
          _count: { select: { lessons: true } },
        },
      },
    },
  });
};

export interface createStudentParams {
  username: string;
  name: string;
  email: string;
  password: string;

  phone?: string;
  address: string;
  img?: any;
  bloodType: string;
  sex: UserSex;
  grade: string;
  class: number;
  birthday: Date;
}

export const createStudent = async (image, params: createStudentParams) => {
  console.log(params);
  const {
    username,
    name,
    email,
    password,
    address,
    sex,
    birthday,
    bloodType,
    phone,
    ...rest
  } = params;

  const existingStudent = await client.student.findFirst({
    where: {
      OR: [{ username }, { email }],
    },
  });

  if (existingStudent) {
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
    role: "student",
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

  const student = await client.student.create({
    data: {
      id: user.id,
      username,
      name,
      img: imageUrl,
      email,
      address,
      sex,
      birthday,
      bloodType,
      phone,
      classId: +rest.class,
      gradeId: rest.grade,
    },
  });

  return { user, student };
};

export const updateStudent = async (id, image, params: createStudentParams) => {
  const {
    username,
    name,
    email,
    password,
    address,
    sex,
    birthday,
    bloodType,
    phone,
    ...rest
  } = params;

  const existingStudent = await client.student.findFirst({
    where: {
      id,
    },
  });

  if (!existingStudent) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "This student doesn't exist");
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

  let imageUrl: string = existingStudent.img as string;

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

  return await client.student.update({
    where: {
      id,
    },
    data: {
      username,
      name,
      img: imageUrl,
      email,
      address,
      sex,
      birthday,
      bloodType,
      phone,
      classId: +rest.class,
      gradeId: rest.grade,
    },
  });
};

export const deleteStudent = async (id: string) => {
  const student = await client.student.findUnique({
    where: { id },
  });

  if (!student) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "This student doesn't exist");
  }

  await client.$transaction([
    client.student.delete({ where: { id } }),
    client.user.delete({ where: { id } }),
  ]);
};
