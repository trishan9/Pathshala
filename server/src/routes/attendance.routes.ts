import { Router } from "express";

import * as attendanceControllers from "@/controllers/attendance.controllers";
import { isAuthenticated } from "@/middlewares/isAuthenicated";

const attendanceRouter = Router();

attendanceRouter.get(
  "/analytics",
  isAuthenticated,
  attendanceControllers.getAttendanceAnalytics,
);

export { attendanceRouter };
