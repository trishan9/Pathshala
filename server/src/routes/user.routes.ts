import { Router } from "express";

import * as userControllers from "@/controllers/user.controllers";
import { isAuthenticated } from "@/middlewares/isAuthenicated";

const userRouter = Router();

userRouter.get("/count/admin", isAuthenticated, userControllers.getAdminsCount);
userRouter.get(
  "/count/teacher",
  isAuthenticated,
  userControllers.getTeachersCount,
);
userRouter.get(
  "/count/student",
  isAuthenticated,
  userControllers.getStudentsCount,
);

export { userRouter };
