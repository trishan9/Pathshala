import { Router } from "express";

import * as eventControllers from "@/controllers/event.controllers";
import { isAuthenticated } from "@/middlewares/isAuthenicated";

const eventRouter = Router();

eventRouter.get("/", isAuthenticated, eventControllers.getAllEvents);

export { eventRouter };
