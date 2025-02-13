import z from "zod";
import { api } from "./axiosInstance";
import { API_URLS } from "./apiUrls";
import { loginFormSchema, signupFormSchema } from "@/schemas";
import { useGetTeachersProps } from "@/hooks/useTeachers";
import { useGetStudentsProps } from "@/hooks/useStudents";
import { useGetSubjectsProps } from "@/hooks/useSubjects";
import { useGetClassesProps } from "@/hooks/useClasses";
import { useGetLessonsProps } from "@/hooks/useLessons";
import { useGetExamsProps } from "@/hooks/useExams";

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
  },
  student: {
    getAll: async (query: useGetStudentsProps) => {
      return await api.get(API_URLS.STUDENT, { params: query });
    },
  },
  subject: {
    getAll: async (query: useGetSubjectsProps) => {
      return await api.get(API_URLS.SUBJECT, { params: query });
    },
  },
  class: {
    getAll: async (query: useGetClassesProps) => {
      return await api.get(API_URLS.CLASS, { params: query });
    },
  },
  lesson: {
    getAll: async (query: useGetLessonsProps) => {
      return await api.get(API_URLS.LESSON, { params: query });
    },
  },
  exam: {
    getAll: async (query: useGetExamsProps) => {
      return await api.get(API_URLS.EXAM, { params: query });
    },
  },
};
