import { asyncHandler } from "@/utils/asyncHandler";
import { Request, Response } from "express";
import * as examServices from "@/services/exam.services";
import { apiResponse } from "@/utils/apiResponse";
import { StatusCodes } from "http-status-codes";
import { responseMessage } from "@/utils/responseMessage";

export const getAllExams = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query;
  const currUser = res.locals.user;

  const { exams, examsCount } = await examServices.getAllExams(
    query as examServices.GetExamParams,
    currUser,
  );

  return apiResponse(res, StatusCodes.OK, {
    examsCount,
    exams,
    message: responseMessage.EXAM.RETRIEVED_ALL,
  });
});

export const createExam = asyncHandler(
  async (req: Request, res: Response) => {
    const body = req.body;
    const exam = await examServices.createExam(body);

    return apiResponse(res, StatusCodes.CREATED, {
      exam,
      message: "Exam created successfully",
    });
  },
);

export const updateExam = asyncHandler(
  async (req: Request, res: Response) => {
    const body = req.body;
    const { examId } = req.params;

    const exam = await examServices.updateExam(
      examId,
      body,
    );

    return apiResponse(res, StatusCodes.OK, {
      exam,
      message: "Exam updated successfully",
    });
  },
);

export const deleteExam = asyncHandler(
  async (req: Request, res: Response) => {
    const { examId } = req.params;
    await examServices.deleteExam(examId);

    return apiResponse(res, StatusCodes.OK, {
      message: "Exam deleted successfully",
    });
  },
);
