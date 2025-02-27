import { asyncHandler } from "@/utils/asyncHandler";
import { Request, Response } from "express";
import * as subjectServices from "@/services/subject.services";
import { apiResponse } from "@/utils/apiResponse";
import { StatusCodes } from "http-status-codes";
import { responseMessage } from "@/utils/responseMessage";

export const getAllSubjects = asyncHandler(
  async (req: Request, res: Response) => {
    const query = req.query;

    const { subjects, subjectsCount } = await subjectServices.getAllSubjects(
      query as subjectServices.GetSubjectParams,
    );

    return apiResponse(res, StatusCodes.OK, {
      subjectsCount,
      subjects,
      message: responseMessage.SUBJECT.RETRIEVED_ALL,
    });
  },
);

export const createSubject = asyncHandler(
  async (req: Request, res: Response) => {
    const { name } = req.body;
    const subject = await subjectServices.createSubject(name);

    return apiResponse(res, StatusCodes.OK, {
      subject,
      message: "Subject created successfully",
    });
  },
);

export const updateSubject = asyncHandler(
  async (req: Request, res: Response) => {
    const { name } = req.body;
    const { subjectId } = req.params;

    const subject = await subjectServices.updateSubject(subjectId, name);

    return apiResponse(res, StatusCodes.OK, {
      subject,
      message: "Subject updated successfully",
    });
  },
);

export const deleteSubject = asyncHandler(
  async (req: Request, res: Response) => {
    const { subjectId } = req.params;
    const subject = await subjectServices.deleteSubject(subjectId);

    return apiResponse(res, StatusCodes.OK, {
      subject,
      message: "Subject deleted successfully",
    });
  },
);

export const getTeacherSubjects = asyncHandler(
  async (req: Request, res: Response) => {
    const teacherSubjects = await subjectServices.getTeacherSubjects();

    return apiResponse(res, StatusCodes.OK, {
      teacherSubjects,
      message: "Teacher subjects fetched successfully",
    });
  },
);

export const getAllSubjectsForLearningMaterials = asyncHandler(
  async (req: Request, res: Response) => {
    const query = req.query;
    const subjects = await subjectServices.getAllSubjectsForLearningMaterials(query);

    return apiResponse(res, StatusCodes.OK, {
      subjects,
      message: "Subjects fetched successfully",
    });
  },
);

export const getAllLearningMaterialsBySubject = asyncHandler(
  async (req: Request, res: Response) => {
    const { subjectId } = req.params;
    const learningMaterials = await subjectServices.getAllLearningMaterialsBySubject(subjectId);

    return apiResponse(res, StatusCodes.OK, {
      learningMaterials,
      message: "Learning materials fetched successfully",
    });
  },
);

export const addLearningMaterials = asyncHandler(
  async (req: Request, res: Response) => {
    const body = req.body;
    const material = await subjectServices.addLearningMaterials(body);

    return apiResponse(res, StatusCodes.OK, {
      material,
      message: "Material created successfully",
    });
  },
);

export const updateLearningMaterial = asyncHandler(
  async (req: Request, res: Response) => {
    const body = req.body;
    const { materialId } = req.params;

    const material = await subjectServices.updateLearningMaterial(materialId, body);

    return apiResponse(res, StatusCodes.OK, {
      material,
      message: "Learning material updated successfully",
    });
  },
);

export const deleteLearningMaterial = asyncHandler(
  async (req: Request, res: Response) => {
    const { materialId } = req.params;
    const material = await subjectServices.deleteLearningMaterial(materialId);

    return apiResponse(res, StatusCodes.OK, {
      material,
      message: "Learning material deleted successfully",
    });
  },
);
