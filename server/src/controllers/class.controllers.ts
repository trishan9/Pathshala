import { asyncHandler } from "@/utils/asyncHandler";
import { Request, Response } from "express";
import * as classServices from "@/services/class.services";
import { apiResponse } from "@/utils/apiResponse";
import { StatusCodes } from "http-status-codes";
import { responseMessage } from "@/utils/responseMessage";

export const getAllClasses = asyncHandler(
  async (req: Request, res: Response) => {
    const query = req.query;

    const { classes, classesCount } = await classServices.getAllClasses(
      query as classServices.GetClassParams,
    );

    return apiResponse(res, StatusCodes.OK, {
      classesCount,
      classes,
      message: responseMessage.CLASS.RETRIEVED_ALL,
    });
  },
);
