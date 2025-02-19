import { Router } from "express";

import * as resultControllers from "@/controllers/result.controllers";
import { isAuthenticated } from "@/middlewares/isAuthenicated";

const resultRouter = Router();

resultRouter.get("/", isAuthenticated, resultControllers.getAllResults);
resultRouter.post("/", isAuthenticated, resultControllers.createResult);
resultRouter.patch("/:resultId", isAuthenticated, resultControllers.updateResult);
resultRouter.delete("/:resultId", isAuthenticated, resultControllers.deleteResult);

resultRouter.get("/students-list", isAuthenticated, resultControllers.getStudentsList);
resultRouter.get("/exams-list", isAuthenticated, resultControllers.getExamsList);
resultRouter.get("/assignments-list", isAuthenticated, resultControllers.getAssignmentsList);

export { resultRouter };
