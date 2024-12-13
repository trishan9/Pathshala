import { Router } from "express";

import { authRouter } from "@/routes/auth.routes";

const rootRouter = Router();

rootRouter.use("/auth", authRouter);

export { rootRouter };
