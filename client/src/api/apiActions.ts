import z from "zod";
import { api } from "./axiosInstance";
import { API_URLS } from "./apiUrls";
import { loginFormSchema, signupFormSchema } from "@/schemas";
import { useGetTeachersProps } from "@/hooks/useTeachers";
import { useGetStudentProps } from "@/hooks/useStudents";

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
    getAll: async (query: useGetStudentProps) => {
      return await api.get(API_URLS.STUDENT, { params: query });
    },
  },
};
