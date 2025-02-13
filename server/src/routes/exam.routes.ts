import { Router } from "express";

import * as examControllers from "@/controllers/exam.controllers";
import { isAuthenticated } from "@/middlewares/isAuthenicated";

const examRouter = Router();

examRouter.get("/", isAuthenticated, examControllers.getAllExams);

export { examRouter };
