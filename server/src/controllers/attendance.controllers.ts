import * as attendanceServices from "@/services/attendance.services";
import { apiResponse } from "@/utils/apiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const getAttendanceAnalytics = asyncHandler(
  async (_: Request, res: Response) => {
    const data = await attendanceServices.getAttendanceAnalytics();

    return apiResponse(res, StatusCodes.OK, {
      data,
      message: "Attendance analytics data fetched succesfully",
    });
  },
);

export const getLessons = asyncHandler(async (req: Request, res: Response) => {
  const { teacherId } = req.params;
  const data = await attendanceServices.getLessons(teacherId);

  return apiResponse(res, StatusCodes.OK, {
    data,
    message: "Lessons data fetched succesfully",
  });
});

export const getAttendanceDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const params = req.query;
    const data = await attendanceServices.getAttendanceDetails(params);

    return apiResponse(res, StatusCodes.OK, {
      data,
      message: "Lessons data fetched succesfully",
    });
  },
);

export const getClassStudents = asyncHandler(
  async (req: Request, res: Response) => {
    const { lessonId } = req.params;
    const data = await attendanceServices.getClassStudents(lessonId);

    return apiResponse(res, StatusCodes.OK, {
      data,
      message: "Class students data fetched succesfully",
    });
  },
);

export const recordAttendance = asyncHandler(
  async (req: Request, res: Response) => {
    const { lessonId } = req.params;
    const body = req.body;
    const data = await attendanceServices.recordAttendance(lessonId, body);

    return apiResponse(res, StatusCodes.OK, {
      data,
      message: "Attendance recorded succesfully",
    });
  },
);

