import { Router } from "express";

import { authRouter } from "@/routes/auth.routes";
import { teacherRouter } from "./teacher.routes";

const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/teacher", teacherRouter);

export { rootRouter };
