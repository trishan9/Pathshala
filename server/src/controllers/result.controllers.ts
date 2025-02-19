import { asyncHandler } from "@/utils/asyncHandler";
import { Request, Response } from "express";
import * as resultServices from "@/services/result.services";
import { apiResponse } from "@/utils/apiResponse";
import { StatusCodes } from "http-status-codes";
import { responseMessage } from "@/utils/responseMessage";

export const getAllResults = asyncHandler(
  async (req: Request, res: Response) => {
    const query = req.query;
    const currUser = res.locals.user;

    const { results, resultsCount } = await resultServices.getAllResults(
      query as resultServices.GetResultParams,
      currUser,
    );

    return apiResponse(res, StatusCodes.OK, {
      resultsCount,
      results,
      message: responseMessage.RESULT.RETRIEVED_ALL,
    });
  },
);

export const createResult = asyncHandler(
  async (req: Request, res: Response) => {
    const body = req.body

    const result = await resultServices.createResult(body);

    return apiResponse(res, StatusCodes.OK, {
      result,
      message: "Result created successfully!",
    });
  },
);

export const updateResult = asyncHandler(
  async (req: Request, res: Response) => {
    const body = req.body
    const { resultId } = req.params

    const result = await resultServices.updateResult(resultId, body);

    return apiResponse(res, StatusCodes.OK, {
      result,
      message: "Result updated successfully!",
    });
  },
);

export const deleteResult = asyncHandler(
  async (req: Request, res: Response) => {
    const { resultId } = req.params

    await resultServices.deleteResult(resultId);

    return apiResponse(res, StatusCodes.OK, {
      message: "Result deleted successfully!",
    });
  },
);

export const getStudentsList = asyncHandler(
  async (req: Request, res: Response) => {
    const studentsList = await resultServices.getStudentsList();

    return apiResponse(res, StatusCodes.OK, {
      studentsList,
      message: "Students fetched successfully",
    });
  },
);

export const getExamsList = asyncHandler(
  async (req: Request, res: Response) => {
    const examsList = await resultServices.getExamsList();

    return apiResponse(res, StatusCodes.OK, {
      examsList,
      message: "Exams fetched successfully",
    });
  },
);

export const getAssignmentsList = asyncHandler(
  async (req: Request, res: Response) => {
    const assignmentsList = await resultServices.getAssignmentsList();

    return apiResponse(res, StatusCodes.OK, {
      assignmentsList,
      message: "Assignments fetched successfully",
    });
  },
);