import { Router } from "express";

import * as resultControllers from "@/controllers/result.controllers";
import { isAuthenticated } from "@/middlewares/isAuthenicated";

const resultRouter = Router();

resultRouter.get("/", isAuthenticated, resultControllers.getAllResults);

export { resultRouter };
