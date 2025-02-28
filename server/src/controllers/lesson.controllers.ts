import { asyncHandler } from "@/utils/asyncHandler";
import { Request, Response } from "express";
import * as lessonServices from "@/services/lesson.services";
import { apiResponse } from "@/utils/apiResponse";
import { StatusCodes } from "http-status-codes";
import { responseMessage } from "@/utils/responseMessage";

export const getAllLessons = asyncHandler(
  async (req: Request, res: Response) => {
    const query = req.query;

    const { lessons, lessonsCount } = await lessonServices.getAllLessons(
      query as lessonServices.GetLessonParams,
    );

    return apiResponse(res, StatusCodes.OK, {
      lessonsCount,
      lessons,
      message: responseMessage.LESSON.RETRIEVED_ALL,
    });
  },
);

export const getSchedule = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query;

  const data = await lessonServices.getAllLessons(
    query as lessonServices.GetLessonParams,
  );

  return apiResponse(res, StatusCodes.OK, {
    data,
    message: "Schedule fetched successfully!",
  });
});

export const getExamLessons = asyncHandler(
  async (req: Request, res: Response) => {
    const role = res.locals.user.role;
    const currUserId = res.locals.user.id;

    const examLessons = await lessonServices.getExamLessons(role, currUserId);

    return apiResponse(res, StatusCodes.OK, {
      examLessons,
      message: "Exam lessons fetched successfully",
    });
  },
);

export const createLesson = asyncHandler(
  async (req: Request, res: Response) => {
    const body = req.body;
    const lesson  = await lessonServices.createLesson(body);

    return apiResponse(res, StatusCodes.CREATED, {
      lesson,
      message: "Lesson created successfully",
    });
  },
);

export const updateLesson = asyncHandler(
  async (req: Request, res: Response) => {
    const body = req.body;
    const { lessonId } = req.params;

    const lesson = await lessonServices.updateLesson(
      lessonId,
      body,
    );

    return apiResponse(res, StatusCodes.OK, {
      lesson,
      message: "Lesson updated successfully",
    });
  },
);

export const deleteLesson = asyncHandler(
  async (req: Request, res: Response) => {
    const { lessonId } = req.params;
    await lessonServices.deleteLesson(lessonId);

    return apiResponse(res, StatusCodes.OK, {
      message: "Lesson deleted successfully",
    });
  },
);
