import { Router } from "express";

import * as subjectControllers from "@/controllers/subject.controllers";
import { isAuthenticated } from "@/middlewares/isAuthenicated";

const subjectRouter = Router();

subjectRouter.get("/", isAuthenticated, subjectControllers.getAllSubjects);
subjectRouter.get(
  "/teachers",
  isAuthenticated,
  subjectControllers.getTeacherSubjects,
);
subjectRouter.post("/", isAuthenticated, subjectControllers.createSubject);
subjectRouter.patch(
  "/:subjectId",
  isAuthenticated,
  subjectControllers.updateSubject,
);
subjectRouter.delete(
  "/:subjectId",
  isAuthenticated,
  subjectControllers.deleteSubject,
);

export { subjectRouter };
