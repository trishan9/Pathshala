import { Router } from "express";

import { authRouter } from "@/routes/auth.routes";
import { teacherRouter } from "./teacher.routes";
import { studentRouter } from "./student.routes";
import { subjectRouter } from "./subject.routes";
import { classRouter } from "./class.routes";
import { lessonRouter } from "./lesson.routes";
import { examRouter } from "./exam.routes";
import { assignmentRouter } from "./assignment.routes";
import { resultRouter } from "./result.routes";
import { eventRouter } from "./event.routes";

const rootRouter = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/teacher", teacherRouter);
rootRouter.use("/student", studentRouter);
rootRouter.use("/subject", subjectRouter);
rootRouter.use("/class", classRouter);
rootRouter.use("/lesson", lessonRouter);
rootRouter.use("/exam", examRouter);
rootRouter.use("/assignment", assignmentRouter);
rootRouter.use("/result", resultRouter);
rootRouter.use("/event", eventRouter);

export { rootRouter };
