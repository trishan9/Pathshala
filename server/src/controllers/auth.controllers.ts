import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import {
  createAdminType,
  createAdminValidator,
  loginUserType,
  loginUserValidator,
} from "@/validators/user.validators";
import * as authService from "@/services/auth.services";
import { ApiError } from "@/utils/apiError";
import { apiResponse } from "@/utils/apiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { responseMessage } from "@/utils/responseMessage";
import { errorResponse } from "@/utils/errorMessage";

export const registerAdmin = asyncHandler(
  async (req: Request, res: Response) => {
    const body = req.body;

    const result = createAdminValidator.safeParse(body);
    if (!result.success) {
      throw new ApiError(StatusCodes.FORBIDDEN, result.error.issues);
    }

    const { username, email, name, password } = body as createAdminType;

    const newAdminObj = {
      username: `PS-${username}`,
      email,
      name,
      password,
    };

    const newAdmin = await authService.registerAdmin(newAdminObj);

    return apiResponse(res, StatusCodes.CREATED, {
      data: newAdmin,
      message: responseMessage.USER.CREATED,
    });
  },
);

export const login = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body;

  const result = loginUserValidator.safeParse(body);
  if (!result.success) {
    throw new ApiError(StatusCodes.FORBIDDEN, result.error.issues);
  }

  const { username, password } = body as loginUserType;

  const { accessToken, refreshToken } = await authService.login({
    username,
    password,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  return apiResponse(res, StatusCodes.OK, {
    accessToken,
    message: responseMessage.USER.LOGGED_IN,
  });
});

export const getMe = asyncHandler(async (_: Request, res: Response) => {
  const user = await authService.getMe(res.locals.user.id);

  return apiResponse(res, StatusCodes.OK, {
    data: user,
    message: responseMessage.USER.RETRIEVED,
  });
});

export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken)
    throw new ApiError(StatusCodes.UNAUTHORIZED, errorResponse.TOKEN.EXPIRED);

  const accessToken = await authService.refresh(refreshToken);

  return apiResponse(res, StatusCodes.OK, {
    accessToken,
    message: responseMessage.USER.REFRESH,
  });
});
