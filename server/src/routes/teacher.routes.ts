import { Router } from "express";

import * as teacherControllers from "@/controllers/teacher.controllers";
import { isAuthenticated } from "@/middlewares/isAuthenicated";
import upload from "@/middlewares/upload";

const teacherRouter = Router();

teacherRouter.get("/", isAuthenticated, teacherControllers.getAllTeachers);
teacherRouter.get(
  "/:teacherId",
  isAuthenticated,
  teacherControllers.getTeacherById,
);
teacherRouter.post(
  "/",
  upload.single("image"),
  isAuthenticated,
  teacherControllers.createTeacher,
);
teacherRouter.patch(
  "/:teacherId",
  upload.single("image"),
  isAuthenticated,
  teacherControllers.updateTeacher,
);
teacherRouter.delete(
  "/:teacherId",
  isAuthenticated,
  teacherControllers.deleteTeacher,
);

export { teacherRouter };
