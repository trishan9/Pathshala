import { Router } from "express";

import * as lessonControllers from "@/controllers/lesson.controllers";
import { isAuthenticated } from "@/middlewares/isAuthenicated";

const lessonRouter = Router();

lessonRouter.get("/", isAuthenticated, lessonControllers.getAllLessons);
lessonRouter.get("/schedule", isAuthenticated, lessonControllers.getSchedule);

export { lessonRouter };
