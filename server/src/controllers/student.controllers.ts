import { asyncHandler } from "@/utils/asyncHandler";
import { Request, Response } from "express";
import * as studentServices from "@/services/student.services";
import { apiResponse } from "@/utils/apiResponse";
import { StatusCodes } from "http-status-codes";
import { responseMessage } from "@/utils/responseMessage";
import { ApiError } from "@/utils/apiError";
import modelData from "@/ml-models/random_forest_model.json";
import { RandomForestClassifier } from "@/lib/randomForest";

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

const gradeMapping = {
  0: "A (GPA >= 3.5)",
  1: "B (3.0 <= GPA < 3.5)",
  2: "C (2.5 <= GPA < 3.0)",
  3: "D (2.0 <= GPA < 2.5)",
  4: "F (GPA < 2.0)",
};

export const evaluateStudentPerformance = asyncHandler(
  async (req: Request, res: Response) => {
    const { features } = req.body;
    if (!features) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Please provide the necessary features for evaluation!",
      );
    }

    const model = new RandomForestClassifier(modelData);

    const prediction = model.predict(features);

    const probabilities = model.predictProba(features);
    const formattedProbabilities = Object.fromEntries(
      Object.entries(probabilities).map(([key, value]) => [
        gradeMapping[Number(key)],
        `${(Number(value) * 100000).toFixed(4)}%`,
      ]),
    );

    return apiResponse(res, StatusCodes.OK, {
      prediction: gradeMapping[prediction],
      probabilities: formattedProbabilities,
      message: "Evaluation data fetched succesfully",
    });
  },
);
