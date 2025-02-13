import { asyncHandler } from "@/utils/asyncHandler";
import { Request, Response } from "express";
import * as teacherServices from "@/services/teacher.services";
import { apiResponse } from "@/utils/apiResponse";
import { StatusCodes } from "http-status-codes";
import { responseMessage } from "@/utils/responseMessage";

export const getAllTeachers = asyncHandler(
  async (req: Request, res: Response) => {
    const { page } = req.body;
    const { teachers, teachersCount } =
      await teacherServices.getAllTeachers(page);

    return apiResponse(res, StatusCodes.OK, {
      teachersCount,
      teachers,
      message: responseMessage.TEACHER.RETRIEVED,
    });
  },
);
