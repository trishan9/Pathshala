import { Router } from "express";

import * as authController from "@/controllers/auth.controllers";
import { isAuthenticated } from "@/middlewares/isAuthenicated";

const authRouter = Router();

authRouter.post("/register", authController.registerAdmin);
authRouter.post("/login", authController.login);
authRouter.get("/me", isAuthenticated, authController.getMe);
authRouter.post("/refresh", authController.refresh);
authRouter.post("/logout", authController.logout);

export { authRouter };
