import { Response } from "express";
import { StatusCodes } from "http-status-codes";

function apiResponse(res: Response, statusCode: StatusCodes, data: any) {
  return res.status(statusCode).json(data);
}
export { apiResponse };
