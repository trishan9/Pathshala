import { asyncHandler } from "@/utils/asyncHandler";
import { Request, Response } from "express";
import * as classServices from "@/services/class.services";
import { apiResponse } from "@/utils/apiResponse";
import { StatusCodes } from "http-status-codes";
import { responseMessage } from "@/utils/responseMessage";

export const getAllClasses = asyncHandler(
  async (req: Request, res: Response) => {
    const query = req.query;

    const { classes, classesCount } = await classServices.getAllClasses(
      query as classServices.GetClassParams,
    );

    return apiResponse(res, StatusCodes.OK, {
      classesCount,
      classes,
      message: responseMessage.CLASS.RETRIEVED_ALL,
    });
  },
);

export const getClassByStudentId = asyncHandler(
  async (_: Request, res: Response) => {
    const currUser = res.locals.user;

    const data = await classServices.getClassByStudentId(currUser?.id);

    return apiResponse(res, StatusCodes.OK, {
      data,
      message: responseMessage.CLASS.RETRIEVED_ALL,
    });
  },
);

export const getStudentClasses = asyncHandler(
  async (req: Request, res: Response) => {
    const studentClasses = await classServices.getStudentClasses();

    return apiResponse(res, StatusCodes.OK, {
      studentClasses,
      message: "Student classes fetched successfully",
    });
  },
);

export const getStudentGrades = asyncHandler(
  async (req: Request, res: Response) => {
    const studentGrades = await classServices.getStudentGrades();

    return apiResponse(res, StatusCodes.OK, {
      studentGrades,
      message: "Student grades fetched successfully",
    });
  },
);

export const createClass = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body;
  const classData = await classServices.createClass(body);

  return apiResponse(res, StatusCodes.CREATED, {
    class: classData,
    message: "Class created successfully",
  });
});

export const updateClass = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body;
  const { classId } = req.params;

  const classData = await classServices.updateClass(+classId, body);

  return apiResponse(res, StatusCodes.OK, {
    class: classData,
    message: "Class updated successfully",
  });
});

export const deleteClass = asyncHandler(async (req: Request, res: Response) => {
  const { classId } = req.params;
  await classServices.deleteClass(+classId);

  return apiResponse(res, StatusCodes.OK, {
    message: "Class deleted successfully",
  });
});
