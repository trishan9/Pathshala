import * as userServices from "@/services/user.services";
import * as teacherServices from "@/services/teacher.services";
import * as studentServices from "@/services/student.services";
import { apiResponse } from "@/utils/apiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const getAdminsCount = asyncHandler(
  async (_: Request, res: Response) => {
    const currUser = res.locals.user;

    const adminsCount = await userServices.getAdminsCount(currUser);

    return apiResponse(res, StatusCodes.OK, {
      count: adminsCount,
    });
  },
);

export const getTeachersCount = asyncHandler(
  async (_: Request, res: Response) => {
    const currUser = res.locals.user;

    const teachersCount = await userServices.getTeachersCount(currUser);

    return apiResponse(res, StatusCodes.OK, {
      count: teachersCount,
    });
  },
);

export const getStudentsCount = asyncHandler(
  async (_: Request, res: Response) => {
    const currUser = res.locals.user;

    const studentsCount = await userServices.getStudentsCount(currUser);

    return apiResponse(res, StatusCodes.OK, {
      count: studentsCount,
    });
  },
);

export const getStudentsCountBySex = asyncHandler(
  async (_: Request, res: Response) => {
    const currUser = res.locals.user;

    const { boys, girls } = await userServices.getStudentsCountBySex(currUser);

    return apiResponse(res, StatusCodes.OK, {
      boys,
      girls,
    });
  },
);
