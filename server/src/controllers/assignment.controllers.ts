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

export const createAssignment = asyncHandler(
  async (req: Request, res: Response) => {
    const body = req.body;
    const assignment = await assignmentServices.createAssignment(body);

    return apiResponse(res, StatusCodes.CREATED, {
      assignment,
      message: "Assignment created successfully",
    });
  },
);

export const updateAssignment = asyncHandler(
  async (req: Request, res: Response) => {
    const body = req.body;
    const { assignmentId } = req.params;

    const assignment = await assignmentServices.updateAssignment(
      assignmentId,
      body,
    );

    return apiResponse(res, StatusCodes.OK, {
      assignment,
      message: "Assignment updated successfully",
    });
  },
);

export const deleteAssignment = asyncHandler(
  async (req: Request, res: Response) => {
    const { assignmentId } = req.params;
    await assignmentServices.deleteAssignment(assignmentId);

    return apiResponse(res, StatusCodes.OK, {
      message: "Assignment deleted successfully",
    });
  },
);
