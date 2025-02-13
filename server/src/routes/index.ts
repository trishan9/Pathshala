import { Router } from "express";

import { authRouter } from "@/routes/auth.routes";
import { teacherRouter } from "./teacher.routes";
import { studentRouter } from "./student.routes";
import { subjectRouter } from "./subject.routes";

const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/teacher", teacherRouter);
rootRouter.use("/student", studentRouter);
rootRouter.use("/subject", subjectRouter);

export { rootRouter };
