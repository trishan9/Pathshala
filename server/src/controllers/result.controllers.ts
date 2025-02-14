import { asyncHandler } from "@/utils/asyncHandler";
import { Request, Response } from "express";
import * as resultServices from "@/services/result.services";
import { apiResponse } from "@/utils/apiResponse";
import { StatusCodes } from "http-status-codes";
import { responseMessage } from "@/utils/responseMessage";

export const getAllResults = asyncHandler(
  async (req: Request, res: Response) => {
    const query = req.query;

    const { results, resultsCount } = await resultServices.getAllResults(
      query as resultServices.GetResultParams,
    );

    return apiResponse(res, StatusCodes.OK, {
      resultsCount,
      results,
      message: responseMessage.RESULT.RETRIEVED_ALL,
    });
  },
);
