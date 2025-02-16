import { Router } from "express";

import * as studentControllers from "@/controllers/student.controllers";
import { isAuthenticated } from "@/middlewares/isAuthenicated";

const studentRouter = Router();

studentRouter.get("/", isAuthenticated, studentControllers.getAllStudents);
studentRouter.get(
  "/:studentId",
  isAuthenticated,
  studentControllers.getStudentById,
);

export { studentRouter };
