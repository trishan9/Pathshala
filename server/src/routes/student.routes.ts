import { Router } from "express";

import * as studentControllers from "@/controllers/student.controllers";
import { isAuthenticated } from "@/middlewares/isAuthenicated";
import upload from "@/middlewares/upload";

const studentRouter = Router();

studentRouter.get("/", isAuthenticated, studentControllers.getAllStudents);
studentRouter.get(
  "/:studentId",
  isAuthenticated,
  studentControllers.getStudentById,
);
studentRouter.post(
  "/",
  upload.single("image"),
  isAuthenticated,
  studentControllers.createStudent,
);
studentRouter.patch(
  "/:studentId",
  upload.single("image"),
  isAuthenticated,
  studentControllers.updateStudent,
);
studentRouter.delete(
  "/:studentId",
  isAuthenticated,
  studentControllers.deleteStudent,
);

export { studentRouter };
