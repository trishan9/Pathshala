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
