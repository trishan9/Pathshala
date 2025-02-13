import { Router } from "express";

import * as classControllers from "@/controllers/class.controllers";
import { isAuthenticated } from "@/middlewares/isAuthenicated";

const classRouter = Router();

classRouter.get("/", isAuthenticated, classControllers.getAllClasses);

export { classRouter };
