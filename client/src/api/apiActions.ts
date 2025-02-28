import z from "zod";
import { api } from "./axiosInstance";
import { API_URLS } from "./apiUrls";
import { loginFormSchema, signupFormSchema } from "@/schemas";
import { TeacherFormData, useGetTeachersProps } from "@/hooks/useTeachers";
import { useGetStudentsProps } from "@/hooks/useStudents";
import { useGetSubjectsProps } from "@/hooks/useSubjects";
import { ClassSchema, useGetClassesProps } from "@/hooks/useClasses";
import { LessonSchema, useGetLessonsProps } from "@/hooks/useLessons";
import { useGetExamsProps } from "@/hooks/useExams";
import { useGetAssignmentsProps } from "@/hooks/useAssignments";
import { useGetResultsProps } from "@/hooks/useResults";
import { CreateTeacherInputs } from "@/components/forms/TeacherForm";
import { EventSchema } from "@/components/forms/EventForm";
import { AnnouncementSchema } from "@/components/forms/AnnouncementForm";
import { ExamSchema } from "@/components/forms/ExamForm";
import { AssignmentSchema } from "@/components/forms/AssignmentForm";
import { GetAttendanceParams } from "@/routes/_protected/_dashboard/_admin/list/attendance";
import { ResultSchema } from "@/components/forms/ResultForm";

export const apiActions = {
  auth: {
    register: async (data: z.infer<typeof signupFormSchema>) => {
      return await api.post(API_URLS.AUTH.REGISTER, data);
    },
    login: async (credentials: z.infer<typeof loginFormSchema>) => {
      return await api.post(API_URLS.AUTH.LOGIN, credentials);
    },
    logout: async () => {
      return await api.post(API_URLS.AUTH.LOGOUT);
    },
    refresh: async () => {
      return await api.post(API_URLS.AUTH.REFRESH);
    },
    getMe: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return await api.get(API_URLS.AUTH.ME);
    },
  },
  teacher: {
    getAll: async (query: useGetTeachersProps) => {
      return await api.get(API_URLS.TEACHER, { params: query });
    },
    create: async (data: CreateTeacherInputs) => {
      return await api.post(API_URLS.TEACHER, data, MULTIPART_FORM_DATA_CONFIG);
    },
    update: async (id: string, data: Partial<TeacherFormData>) => {
      return await api.patch(
        `${API_URLS.TEACHER}/${id}`,
        data,
        MULTIPART_FORM_DATA_CONFIG,
      );
    },
    delete: async (id: string) => {
      return await api.delete(`${API_URLS.TEACHER}/${id}`);
    },
    getById: async (id: string) => {
      return await api.get(`${API_URLS.TEACHER}/${id}`);
    },
    getClassTeachers: async () => {
      return await api.get(API_URLS.CLASS_TEACHERS);
    },
  },
  student: {
    getAll: async (query: useGetStudentsProps) => {
      return await api.get(API_URLS.STUDENT, { params: query });
    },
    getById: async (id: string) => {
      return await api.get(`${API_URLS.STUDENT}/${id}`);
    },
    create: async (data: CreateTeacherInputs) => {
      return await api.post(API_URLS.STUDENT, data, MULTIPART_FORM_DATA_CONFIG);
    },
    update: async (id: string, data: Partial<TeacherFormData>) => {
      return await api.patch(
        `${API_URLS.STUDENT}/${id}`,
        data,
        MULTIPART_FORM_DATA_CONFIG,
      );
    },
    delete: async (id: string) => {
      return await api.delete(`${API_URLS.STUDENT}/${id}`);
    },
    evaluatePerformance: async (features: number[]) => {
      return await api.post(`${API_URLS.STUDENT}/evaluate`, { features });
    },
  },
  subject: {
    getAll: async (query: useGetSubjectsProps) => {
      return await api.get(API_URLS.SUBJECT, { params: query });
    },
    getTeacherSubjects: async () => {
      return await api.get(API_URLS.TEACHER_SUBJECTS);
    },
    create: async (name: string) => {
      return await api.post(API_URLS.SUBJECT, { name });
    },
    update: async (id: string, name: string) => {
      return await api.patch(`${API_URLS.SUBJECT}/${id}`, { name });
    },
    delete: async (id: string) => {
      return await api.delete(`${API_URLS.SUBJECT}/${id}`);
    },
    learningMaterial: {
      getSubjects: async (query: { teacherId?: string; classId?: string }) => {
        return await api.get(API_URLS.LEARNING_MATERIALS, { params: query });
      },
      getBySubject: async (subjectId: string) => {
        return await api.get(
          `${API_URLS.LEARNING_MATERIALS}/subject/${subjectId}`,
        );
      },
      add: async (data: {
        title: string;
        content: string;
        subjectId: string;
      }) => {
        return await api.post(API_URLS.LEARNING_MATERIALS, data);
      },
      update: async (
        id: string,
        data: {
          title: string;
          content: string;
          subjectId: string;
        },
      ) => {
        return await api.patch(`${API_URLS.LEARNING_MATERIALS}/${id}`, data);
      },
      delete: async (id: string) => {
        return await api.delete(`${API_URLS.LEARNING_MATERIALS}/${id}`);
      },
    },
  },
  class: {
    getAll: async (query: useGetClassesProps) => {
      return await api.get(API_URLS.CLASS["/"], { params: query });
    },
    getByStudentId: async () => {
      return await api.get(API_URLS.CLASS.STUDENT);
    },
    getStudentClasses: async () => {
      return await api.get(API_URLS.CLASS.STUDENT_CLASSES);
    },
    getStudentGrades: async () => {
      return await api.get(API_URLS.CLASS.STUDENT_GRADES);
    },
    getClassGrades: async () => {
      return await api.get(API_URLS.CLASS.CLASS_GRADES);
    },
    create: async (data: ClassSchema) => {
      return await api.post(API_URLS.CLASS["/"], data);
    },
    update: async (id: number, data: Partial<ClassSchema>) => {
      return await api.patch(`${API_URLS.CLASS["/"]}/${id}`, data);
    },
    delete: async (id: number) => {
      return await api.delete(`${API_URLS.CLASS["/"]}/${id}`);
    },
  },
  lesson: {
    getAll: async (query: useGetLessonsProps) => {
      return await api.get(API_URLS.LESSON["/"], { params: query });
    },
    getSchedule: async (query: useGetLessonsProps) => {
      return await api.get(API_URLS.LESSON.SCHEDULE, { params: query });
    },
    getExamLessons: async () => {
      return await api.get(API_URLS.LESSON.CLASS_LESSONS);
    },
    create: async (data: LessonSchema) => {
      return await api.post(API_URLS.LESSON["/"], data);
    },
    update: async (id: string, data: Partial<LessonSchema>) => {
      return await api.patch(`${API_URLS.LESSON["/"]}/${id}`, data);
    },
    delete: async (id: string) => {
      return await api.delete(`${API_URLS.LESSON["/"]}/${id}`);
    },
  },
  exam: {
    getAll: async (query: useGetExamsProps) => {
      return await api.get(API_URLS.EXAM, { params: query });
    },
    create: async (data: ExamSchema) => {
      return await api.post(API_URLS.EXAM, data);
    },
    update: async (id: string, data: Partial<ExamSchema>) => {
      return await api.patch(`${API_URLS.EXAM}/${id}`, data);
    },
    delete: async (id: string) => {
      return await api.delete(`${API_URLS.EXAM}/${id}`);
    },
  },
  assignment: {
    getAll: async (query: useGetAssignmentsProps) => {
      return await api.get(API_URLS.ASSIGNMENT, { params: query });
    },
    create: async (data: AssignmentSchema) => {
      return await api.post(API_URLS.ASSIGNMENT, data);
    },
    update: async (id: string, data: Partial<AssignmentSchema>) => {
      return await api.patch(`${API_URLS.ASSIGNMENT}/${id}`, data);
    },
    delete: async (id: string) => {
      return await api.delete(`${API_URLS.ASSIGNMENT}/${id}`);
    },
  },
  result: {
    getAll: async (query: useGetResultsProps) => {
      return await api.get(API_URLS.RESULT, { params: query });
    },
    create: async (data: ResultSchema) => {
      return await api.post(API_URLS.RESULT, data);
    },
    update: async (id: string, data: Partial<ResultSchema>) => {
      return await api.patch(`${API_URLS.RESULT}/${id}`, data);
    },
    delete: async (id: string) => {
      return await api.delete(`${API_URLS.RESULT}/${id}`);
    },
    getStudentsList: async () => {
      return await api.get(API_URLS.RESULT_STUDENTS_LIST);
    },
    getExamsList: async () => {
      return await api.get(API_URLS.RESULT_EXAMS_LIST);
    },
    getAssignmentsList: async () => {
      return await api.get(API_URLS.RESULT_ASSIGNMENTS_LIST);
    },
  },
  event: {
    getAll: async (query: useGetExamsProps) => {
      return await api.get(API_URLS.EVENT["/"], { params: query });
    },
    getCalendar: async (query: { dateParam: string }) => {
      return await api.get(API_URLS.EVENT.CALENDAR, { params: query });
    },
    create: async (data: EventSchema) => {
      return await api.post(API_URLS.EVENT["/"], data);
    },
    update: async (id: string, data: Partial<EventSchema>) => {
      return await api.patch(`${API_URLS.EVENT["/"]}/${id}`, data);
    },
    delete: async (id: string) => {
      return await api.delete(`${API_URLS.EVENT["/"]}/${id}`);
    },
  },
  announcement: {
    getAll: async (query: useGetAssignmentsProps) => {
      return await api.get(API_URLS.ANNOUNCEMENT, { params: query });
    },
    create: async (data: AnnouncementSchema) => {
      return await api.post(API_URLS.ANNOUNCEMENT, data);
    },
    update: async (id: string, data: Partial<AnnouncementSchema>) => {
      return await api.patch(`${API_URLS.ANNOUNCEMENT}/${id}`, data);
    },
    delete: async (id: string) => {
      return await api.delete(`${API_URLS.ANNOUNCEMENT}/${id}`);
    },
  },
  user: {
    count: {
      admin: {
        get: async () => {
          return await api.get(API_URLS.USER.COUNT.ADMIN);
        },
      },
      teacher: {
        get: async () => {
          return await api.get(API_URLS.USER.COUNT.TEACHER);
        },
      },
      student: {
        get: async () => {
          return await api.get(API_URLS.USER.COUNT.STUDENT);
        },
      },
    },
    analytics: {
      student: {
        get: async () => {
          return await api.get(API_URLS.USER.ANALYTICS.STUDENT);
        },
      },
    },
  },
  attendance: {
    analytics: {
      get: async (isWeekly?: boolean) => {
        return await api.get(API_URLS.ATTENDANCE.ANALYTICS, { params: isWeekly });
      },
    },
    getAttendanceDetails: (params: GetAttendanceParams) => {
      return api.get(API_URLS.ATTENDANCE["/"], { params });
    },
    getLessons: async (teacherId: string) => {
      return await api.get(
        `${API_URLS.ATTENDANCE.TEACHER}/${teacherId}/lessons`,
      );
    },
    getClassStudents: async (lessonId: string) => {
      return await api.get(
        `${API_URLS.ATTENDANCE.LESSON}/${lessonId}/students`,
      );
    },
    recordAttendance: async (lessonId: string, data: any) => {
      return await api.post(
        `${API_URLS.ATTENDANCE.RECORD_ATTENDANCE}/${lessonId}`,
        data.attendanceRecords,
      );
    },
  },
};

const MULTIPART_FORM_DATA_CONFIG = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};
