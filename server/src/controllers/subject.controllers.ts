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

export const createSubject = asyncHandler(
  async (req: Request, res: Response) => {
    const { name } = req.body;
    const subject = await subjectServices.createSubject(name);

    return apiResponse(res, StatusCodes.OK, {
      subject,
      message: "Subject created successfully",
    });
  },
);

export const updateSubject = asyncHandler(
  async (req: Request, res: Response) => {
    const { name } = req.body;
    const { subjectId } = req.params;

    const subject = await subjectServices.updateSubject(subjectId, name);

    return apiResponse(res, StatusCodes.OK, {
      subject,
      message: "Subject updated successfully",
    });
  },
);

export const deleteSubject = asyncHandler(
  async (req: Request, res: Response) => {
    const { subjectId } = req.params;
    const subject = await subjectServices.deleteSubject(subjectId);

    return apiResponse(res, StatusCodes.OK, {
      subject,
      message: "Subject deleted successfully",
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
