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
  CLASS_TEACHERS: "/teacher/class",
  STUDENT: "/student",
  SUBJECT: "/subject",
  TEACHER_SUBJECTS: "/subject/teachers",
  CLASS: {
    "/": "/class",
    STUDENT: "/class/student",
    STUDENT_CLASSES: "/class/students",
    STUDENT_GRADES: "/class/grades/students",
    CLASS_GRADES: "/class/grades",
  },
  LESSON: {
    "/": "/lesson",
    SCHEDULE: "/lesson/schedule",
    CLASS_LESSONS: "/lesson/class"
  },
  EXAM: "/exam",
  ASSIGNMENT: "/assignment",
  RESULT: "/result",
  RESULT_STUDENTS_LIST: "/result/students-list",
  RESULT_EXAMS_LIST: "/result/exams-list",
  RESULT_ASSIGNMENTS_LIST: "/result/assignments-list",
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
    "/" : "/attendance",
    ANALYTICS: "/attendance/analytics",
    TEACHER: "/attendance/teacher",
    LESSON: "/attendance/lesson",
    RECORD_ATTENDANCE: "/attendance/lesson",
  },
};
