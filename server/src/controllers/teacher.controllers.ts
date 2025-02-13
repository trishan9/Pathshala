import { z } from "zod";
import { asyncHandler } from "@/utils/asyncHandler";
import { Request, Response } from "express";
import * as teacherServices from "@/services/teacher.services";
import { apiResponse } from "@/utils/apiResponse";
import { StatusCodes } from "http-status-codes";
import { responseMessage } from "@/utils/responseMessage";

const getAllTeachersQuerySchema = z.object({
  page: z.string().optional().default("1"),
});

export const getAllTeachers = asyncHandler(
  async (req: Request, res: Response) => {
    const query = req.query;
    const result = getAllTeachersQuerySchema.parse(query);

    const { teachers, teachersCount } = await teacherServices.getAllTeachers(
      +result.page || 1,
    );

    return apiResponse(res, StatusCodes.OK, {
      teachersCount,
      teachers,
      message: responseMessage.TEACHER.RETRIEVED,
    });
  },
);
