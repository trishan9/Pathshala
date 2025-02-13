import { asyncHandler } from "@/utils/asyncHandler";
import { Request, Response } from "express";
import * as examServices from "@/services/exam.services";
import { apiResponse } from "@/utils/apiResponse";
import { StatusCodes } from "http-status-codes";
import { responseMessage } from "@/utils/responseMessage";

export const getAllExams = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query;

  const { exams, examsCount } = await examServices.getAllExams(
    query as examServices.GetExamParams,
  );

  return apiResponse(res, StatusCodes.OK, {
    examsCount,
    exams,
    message: responseMessage.EXAM.RETRIEVED_ALL,
  });
});
