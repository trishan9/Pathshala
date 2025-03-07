import { Router } from "express";

import * as classControllers from "@/controllers/class.controllers";
import { isAuthenticated } from "@/middlewares/isAuthenicated";

const classRouter = Router();

classRouter.get("/", isAuthenticated, classControllers.getAllClasses);
classRouter.get(
  "/student",
  isAuthenticated,
  classControllers.getClassByStudentId,
);
classRouter.get(
  "/students",
  isAuthenticated,
  classControllers.getStudentClasses,
);
classRouter.get(
  "/grades/students",
  isAuthenticated,
  classControllers.getStudentGrades,
);
classRouter.get("/grades", isAuthenticated, classControllers.getClassGrades);
classRouter.post("/", isAuthenticated, classControllers.createClass);
classRouter.patch("/:classId", isAuthenticated, classControllers.updateClass);
classRouter.delete("/:classId", isAuthenticated, classControllers.deleteClass);

export { classRouter };
