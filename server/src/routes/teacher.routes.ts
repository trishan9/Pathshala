import { Router } from "express";

import * as teacherControllers from "@/controllers/teacher.controllers";
import { isAuthenticated } from "@/middlewares/isAuthenicated";

const teacherRouter = Router();

teacherRouter.get("/", isAuthenticated, teacherControllers.getAllTeachers);

export { teacherRouter };
