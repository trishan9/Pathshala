import { asyncHandler } from "@/utils/asyncHandler";
import { Request, Response } from "express";
import * as subjectServices from "@/services/subject.services";
import { apiResponse } from "@/utils/apiResponse";
import { StatusCodes } from "http-status-codes";
import { responseMessage } from "@/utils/responseMessage";

export const getAllSubjects = asyncHandler(
  async (req: Request, res: Response) => {
    const query = req.query;

    const { subjects, subjectsCount } = await subjectServices.getAllSubjects(
      query as subjectServices.GetSubjectParams,
    );

    return apiResponse(res, StatusCodes.OK, {
      subjectsCount,
      subjects,
      message: responseMessage.SUBJECT.RETRIEVED_ALL,
    });
  },
);

export const getTeacherSubjects = asyncHandler(
  async (req: Request, res: Response) => {
    const teacherSubjects = await subjectServices.getTeacherSubjects();

    return apiResponse(res, StatusCodes.OK, {
      teacherSubjects,
      message: "Teacher subjects fetched successfully",
    });
  },
);
