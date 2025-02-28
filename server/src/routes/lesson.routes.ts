import { Router } from "express";

import * as lessonControllers from "@/controllers/lesson.controllers";
import { isAuthenticated } from "@/middlewares/isAuthenicated";

const lessonRouter = Router();

lessonRouter.get("/", isAuthenticated, lessonControllers.getAllLessons);
lessonRouter.post("/", isAuthenticated, lessonControllers.createLesson);
lessonRouter.patch("/:lessonId", isAuthenticated, lessonControllers.updateLesson);
lessonRouter.delete("/:lessonId", isAuthenticated, lessonControllers.deleteLesson);
lessonRouter.get("/schedule", isAuthenticated, lessonControllers.getSchedule);
lessonRouter.get("/class", isAuthenticated, lessonControllers.getExamLessons);

export { lessonRouter };
