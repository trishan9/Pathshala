import { Router } from "express";

import * as attendanceControllers from "@/controllers/attendance.controllers";
import { isAuthenticated } from "@/middlewares/isAuthenicated";

const attendanceRouter = Router();

attendanceRouter.get(
  "/analytics",
  isAuthenticated,
  attendanceControllers.getAttendanceAnalytics,
);
attendanceRouter.get(
  "/analytics/daily",
  isAuthenticated,
  attendanceControllers.getAttendanceAnalyticsDaily,
);
attendanceRouter.get(
  "/",
  isAuthenticated,
  attendanceControllers.getAttendanceDetails,
);

attendanceRouter.get(
  "/teacher/:teacherId/lessons",
  isAuthenticated,
  attendanceControllers.getLessons,
);
attendanceRouter.get(
  "/lesson/:lessonId/students",
  isAuthenticated,
  attendanceControllers.getClassStudents,
);
attendanceRouter.post(
  "/lesson/:lessonId",
  isAuthenticated,
  attendanceControllers.recordAttendance,
);

export { attendanceRouter };
