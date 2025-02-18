import { Router } from "express";

import * as examControllers from "@/controllers/exam.controllers";
import { isAuthenticated } from "@/middlewares/isAuthenicated";

const examRouter = Router();

examRouter.get("/", isAuthenticated, examControllers.getAllExams);
examRouter.post("/", isAuthenticated, examControllers.createExam);
examRouter.patch("/:examId", isAuthenticated, examControllers.updateExam);
examRouter.delete("/:examId", isAuthenticated, examControllers.deleteExam);

export { examRouter };
