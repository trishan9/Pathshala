import { Router } from "express";

import * as assignmentControllers from "@/controllers/assignment.controllers";
import { isAuthenticated } from "@/middlewares/isAuthenicated";

const assignmentRouter = Router();

assignmentRouter.get(
  "/",
  isAuthenticated,
  assignmentControllers.getAllAssignments,
);

export { assignmentRouter };
