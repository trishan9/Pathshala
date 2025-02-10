import { errorResponse } from "@/utils/errorMessage";
import { z } from "zod";

export const registerUserValidator = z.object({
  email: z
    .string()
    .min(1, { message: errorResponse.EMAIL.REQUIRED })
    .email({ message: errorResponse.EMAIL.INVALID }),
  name: z.string().min(1, { message: errorResponse.NAME.REQUIRED }),
  username: z.string().min(1, { message: errorResponse.USERNAME.REQUIRED }),
  password: z
    .string()
    .min(1, { message: errorResponse.PASSWORD.REQUIRED })
    .min(8, { message: errorResponse.PASSWORD.LENGTH })
    .max(10, { message: errorResponse.PASSWORD.LENGTH }),
});

export const loginUserValidator = z.object({
  username: z.string().min(1, { message: errorResponse.USERNAME.REQUIRED }),
  password: z
    .string()
    .min(1, { message: errorResponse.PASSWORD.REQUIRED })
    .min(8, { message: errorResponse.PASSWORD.LENGTH })
    .max(10, { message: errorResponse.PASSWORD.LENGTH }),
});

export const updateUserValidator = z.object({
  name: z.string().min(1),
});

export type loginUserType = z.infer<typeof loginUserValidator>;
export type registerUserType = z.infer<typeof registerUserValidator>;
export type updateUserType = z.infer<typeof updateUserValidator>;
