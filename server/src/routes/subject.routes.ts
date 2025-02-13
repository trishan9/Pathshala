import { Router } from "express";

import * as subjectControllers from "@/controllers/subject.controllers";
import { isAuthenticated } from "@/middlewares/isAuthenicated";

const subjectRouter = Router();

subjectRouter.get("/", isAuthenticated, subjectControllers.getAllSubjects);

export { subjectRouter };
