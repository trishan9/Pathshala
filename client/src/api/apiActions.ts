import z from "zod";
import { api } from "./axiosInstance";
import { API_URLS } from "./apiUrls";
import { loginFormSchema, signupFormSchema } from "@/schemas";
import { TeacherFormData, useGetTeachersProps } from "@/hooks/useTeachers";
import { useGetStudentsProps } from "@/hooks/useStudents";
import { useGetSubjectsProps } from "@/hooks/useSubjects";
import { useGetClassesProps } from "@/hooks/useClasses";
import { useGetLessonsProps } from "@/hooks/useLessons";
import { useGetExamsProps } from "@/hooks/useExams";
import { useGetAssignmentsProps } from "@/hooks/useAssignments";
import { useGetResultsProps } from "@/hooks/useResults";
import { CreateTeacherInputs } from "@/components/forms/TeacherForm";

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
  },
  student: {
    getAll: async (query: useGetStudentsProps) => {
      return await api.get(API_URLS.STUDENT, { params: query });
    },
    getById: async (id: string) => {
      return await api.get(`${API_URLS.STUDENT}/${id}`);
    },
  },
  subject: {
    getAll: async (query: useGetSubjectsProps) => {
      return await api.get(API_URLS.SUBJECT, { params: query });
    },
    getTeacherSubjects: async () => {
      return await api.get(API_URLS.TEACHER_SUBJECTS);
    },
  },
  class: {
    getAll: async (query: useGetClassesProps) => {
      return await api.get(API_URLS.CLASS["/"], { params: query });
    },
    getByStudentId: async () => {
      return await api.get(API_URLS.CLASS.STUDENT);
    },
  },
  lesson: {
    getAll: async (query: useGetLessonsProps) => {
      return await api.get(API_URLS.LESSON["/"], { params: query });
    },
    getSchedule: async (query: useGetLessonsProps) => {
      return await api.get(API_URLS.LESSON.SCHEDULE, { params: query });
    },
  },
  exam: {
    getAll: async (query: useGetExamsProps) => {
      return await api.get(API_URLS.EXAM, { params: query });
    },
  },
  assignment: {
    getAll: async (query: useGetAssignmentsProps) => {
      return await api.get(API_URLS.ASSIGNMENT, { params: query });
    },
  },
  result: {
    getAll: async (query: useGetResultsProps) => {
      return await api.get(API_URLS.RESULT, { params: query });
    },
  },
  event: {
    getAll: async (query: useGetExamsProps) => {
      return await api.get(API_URLS.EVENT["/"], { params: query });
    },
    getCalendar: async (query: { dateParam: string }) => {
      return await api.get(API_URLS.EVENT.CALENDAR, { params: query });
    },
  },
  announcement: {
    getAll: async (query: useGetAssignmentsProps) => {
      return await api.get(API_URLS.ANNOUNCEMENT, { params: query });
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
      get: async () => {
        return await api.get(API_URLS.ATTENDANCE.ANALYTICS);
      },
    },
  },
};

const MULTIPART_FORM_DATA_CONFIG = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};
