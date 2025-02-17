import { asyncHandler } from "@/utils/asyncHandler";
import { Request, Response } from "express";
import * as studentServices from "@/services/student.services";
import { apiResponse } from "@/utils/apiResponse";
import { StatusCodes } from "http-status-codes";
import { responseMessage } from "@/utils/responseMessage";

export const getAllStudents = asyncHandler(
  async (req: Request, res: Response) => {
    const query = req.query;

    const { students, studentsCount } = await studentServices.getAllStudents(
      query as studentServices.GetStudentParams,
    );

    return apiResponse(res, StatusCodes.OK, {
      studentsCount,
      students,
      message: responseMessage.STUDENT.RETRIEVED_ALL,
    });
  },
);

export const getStudentById = asyncHandler(
  async (req: Request, res: Response) => {
    const { studentId } = req.params;

    const student = await studentServices.getStudentById(studentId);

    return apiResponse(res, StatusCodes.OK, {
      student,
      message: responseMessage.STUDENT.RETRIEVED,
    });
  },
);

export const createStudent = asyncHandler(
  async (req: Request, res: Response) => {
    const body = req.body;
    const image = req.file?.path;

    const { student, user } = await studentServices.createStudent(image, body);

    return apiResponse(res, StatusCodes.CREATED, {
      data: { ...student, ...user },
      message: responseMessage.STUDENT.CREATED,
    });
  },
);

export const updateStudent = asyncHandler(
  async (req: Request, res: Response) => {
    const body = req.body;
    const studentId = req.params.studentId;
    const image = req?.file?.path;

    const student = await studentServices.updateStudent(studentId, image, body);

    return apiResponse(res, StatusCodes.OK, {
      student,
      message: responseMessage.STUDENT.UPDATED,
    });
  },
);

export const deleteStudent = asyncHandler(
  async (req: Request, res: Response) => {
    const studentId = req.params.studentId;

    await studentServices.deleteStudent(studentId);

    return apiResponse(res, StatusCodes.OK, {
      message: responseMessage.STUDENT.DELETED,
    });
  },
);
