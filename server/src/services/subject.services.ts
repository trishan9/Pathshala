import client from "@/db";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { ApiError } from "@/utils/apiError";
import { Prisma, User } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";

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

export const learningMaterialsSchema = z.object({
  id: z.coerce.string().optional(),
  title: z.coerce.string(),
  content: z.coerce.string(),
  subjectId: z.coerce.string({ message: "Subject is required!" }),
});

export type LearningMaterialsSchema = z.infer<typeof learningMaterialsSchema>;

export const addLearningMaterials = async (params: LearningMaterialsSchema) => {
  return await client.learningMaterial.create({
    data: {
      title: params.title,
      content: params.content,
      subjectId: params.subjectId
    }
  })
}

export const updateLearningMaterial = async (id: string, params: Partial<LearningMaterialsSchema>) => {
  const existingMaterial = await client.learningMaterial.findFirst({
    where: {
      id,
    },
  });

  if (!existingMaterial) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "This learning material doesn't exist!",
    );
  }

  return await client.learningMaterial.update({
    where: {
      id
    },
    data: {
      title: params.title,
      content: params.content,
      subjectId: params.subjectId
    }
  })
}

export const deleteLearningMaterial = async (id: string) => {
  const existingMaterial = await client.learningMaterial.findFirst({
    where: {
      id,
    },
  });

  if (!existingMaterial) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "This learning material doesn't exist!",
    );
  }

  return await client.learningMaterial.delete({
    where: {
      id
    }
  })
}

export const getAllSubjectsForLearningMaterials = async (params: { teacherId?: string, classId?: number }) => {
  const { teacherId, classId } = params;

  const whereClause: Prisma.SubjectWhereInput = {
    ...(classId && { lessons: { some: { classId: +classId } } }),
    ...(teacherId && { teachers: { some: { id: teacherId } } }),
  };

  return await client.subject.findMany({
    where: whereClause,
  })
}

export const getAllLearningMaterialsBySubject = async (subjectId: string) => {
   return await client.learningMaterial.findMany({
    where: {
      subjectId: subjectId
    },
  })
}

export const createSubject = async (name: string) => {
  const existingSubject = await client.subject.findFirst({
    where: {
      name,
    },
  });

  if (existingSubject) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Subject with this name already exists",
    );
  }

  return await client.subject.create({
    data: {
      name,
    },
  });
};

export const updateSubject = async (id: string, name: string) => {
  const existingSubject = await client.subject.findFirst({
    where: {
      id,
    },
  });

  if (!existingSubject) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Subject doesn't exists");
  }

  return await client.subject.update({
    data: {
      name,
    },
    where: {
      id,
    },
  });
};

export const deleteSubject = async (id: string) => {
  const existingSubject = await client.subject.findFirst({
    where: {
      id,
    },
  });

  if (!existingSubject) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Subject doesn't exists");
  }

  return await client.subject.delete({
    where: {
      id,
    },
  });
};

export const getTeacherSubjects = async () => {
  return await client.subject.findMany({
    select: { id: true, name: true },
  });
};
