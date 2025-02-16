import { asyncHandler } from "@/utils/asyncHandler";
import { Request, Response } from "express";
import * as assignmentServices from "@/services/assignment.services";
import { apiResponse } from "@/utils/apiResponse";
import { StatusCodes } from "http-status-codes";
import { responseMessage } from "@/utils/responseMessage";

export const getAllAssignments = asyncHandler(
  async (req: Request, res: Response) => {
    const query = req.query;
    const currUser = res.locals.user;

    const { assignments, assignmentsCount } =
      await assignmentServices.getAllAssignments(
        query as assignmentServices.GetAssignmentParams,
        currUser,
      );

    return apiResponse(res, StatusCodes.OK, {
      assignmentsCount,
      assignments,
      message: responseMessage.ASSIGNMENT.RETRIEVED_ALL,
    });
  },
);
