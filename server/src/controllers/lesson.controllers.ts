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
