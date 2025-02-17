export const API_URLS = {
  BASE: "http://localhost:8080/api/v1",
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    ME: "/auth/me",
  },
  TEACHER: "/teacher",
  STUDENT: "/student",
  SUBJECT: "/subject",
  TEACHER_SUBJECTS: "/subject/teachers",
  CLASS: {
    "/": "/class",
    STUDENT: "/class/student",
    STUDENT_CLASSES: "/class/students",
    STUDENT_GRADES: "/class/grades/students",
  },
  LESSON: {
    "/": "/lesson",
    SCHEDULE: "/lesson/schedule",
  },
  EXAM: "/exam",
  ASSIGNMENT: "/assignment",
  RESULT: "/result",
  EVENT: {
    "/": "/event",
    CALENDAR: "/event/calendar",
  },
  ANNOUNCEMENT: "/announcement",
  USER: {
    COUNT: {
      ADMIN: "/user/count/admin",
      TEACHER: "/user/count/teacher",
      STUDENT: "/user/count/student",
    },
    ANALYTICS: {
      STUDENT: "/user/analytics/student",
    },
  },
  ATTENDANCE: {
    ANALYTICS: "/attendance/analytics",
  },
};
