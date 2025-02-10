import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import token from "@/lib/token";
import { ApiError } from "@/utils/apiError";
import { errorResponse } from "@/utils/errorMessage";
import client from "@/db";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        errorResponse.AUTH_HEADER.REQUIRED,
      );
    }

    const headerParts = authHeader.split(" ");

    if (headerParts.length !== 2 || headerParts[0] !== "Bearer") {
      throw new ApiError(
        StatusCodes.UNAUTHORIZED,
        errorResponse.AUTH_HEADER.INVALID,
      );
    }

    const accessToken = headerParts[1];

    const decoded = token.verify({ token: accessToken, tokenType: "access" });

    let user: any;
    if (decoded) {
      user = await client.user.findUnique({ where: { id: decoded.id } });
    }

    if (!user)
      next(new ApiError(StatusCodes.UNAUTHORIZED, errorResponse.TOKEN.EXPIRED));

    res.locals.user = user;

    return next();
  } catch (error) {
    return next(error);
  }
};
