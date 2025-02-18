import { Router } from "express";

import * as assignmentControllers from "@/controllers/assignment.controllers";
import { isAuthenticated } from "@/middlewares/isAuthenicated";

const assignmentRouter = Router();

assignmentRouter.get(
  "/",
  isAuthenticated,
  assignmentControllers.getAllAssignments,
);
assignmentRouter.post(
  "/",
  isAuthenticated,
  assignmentControllers.createAssignment,
);
assignmentRouter.patch(
  "/:assignmentId",
  isAuthenticated,
  assignmentControllers.updateAssignment,
);
assignmentRouter.delete(
  "/:assignmentId",
  isAuthenticated,
  assignmentControllers.deleteAssignment,
);

export { assignmentRouter };
