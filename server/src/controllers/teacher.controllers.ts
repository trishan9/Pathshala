import { asyncHandler } from "@/utils/asyncHandler";
import { Request, Response } from "express";
import * as teacherServices from "@/services/teacher.services";
import { apiResponse } from "@/utils/apiResponse";
import { StatusCodes } from "http-status-codes";
import { responseMessage } from "@/utils/responseMessage";

export const getAllTeachers = asyncHandler(
  async (req: Request, res: Response) => {
    const query = req.query;

    const { teachers, teachersCount } = await teacherServices.getAllTeachers(
      query as teacherServices.GetTeacherParams,
    );

    return apiResponse(res, StatusCodes.OK, {
      teachersCount,
      teachers,
      message: responseMessage.TEACHER.RETRIEVED_ALL,
    });
  },
);

export const getTeacherById = asyncHandler(
  async (req: Request, res: Response) => {
    const { teacherId } = req.params;

    const teacher = await teacherServices.getTeacherById(teacherId);

    return apiResponse(res, StatusCodes.OK, {
      teacher,
      message: responseMessage.TEACHER.RETRIEVED,
    });
  },
);

export const createTeacher = asyncHandler(
  async (req: Request, res: Response) => {
    const body = req.body;
    const image = req.file?.path;

    const { teacher, user } = await teacherServices.createTeacher(image, body);

    return apiResponse(res, StatusCodes.CREATED, {
      data: { ...teacher, ...user },
      message: responseMessage.TEACHER.CREATED,
    });
  },
);

export const updateTeacher = asyncHandler(
  async (req: Request, res: Response) => {
    const body = req.body;
    const teacherId = req.params.teacherId;
    const image = req?.file?.path;

    const teacher = await teacherServices.updateTeacher(teacherId, image, body);

    return apiResponse(res, StatusCodes.OK, {
      teacher,
      message: responseMessage.TEACHER.UPDATED,
    });
  },
);

export const deleteTeacher = asyncHandler(
  async (req: Request, res: Response) => {
    const teacherId = req.params.teacherId;

    await teacherServices.deleteTeacher(teacherId);

    return apiResponse(res, StatusCodes.OK, {
      message: responseMessage.TEACHER.DELETED,
    });
  },
);
