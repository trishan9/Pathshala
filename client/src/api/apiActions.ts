import z from "zod";
import toast from "react-hot-toast";
import { api } from "./axiosInstance";
import { API_URLS } from "./apiUrls";
import { loginFormSchema, signupFormSchema } from "@/schemas";

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
      return await api.get(API_URLS.AUTH.ME);
    },
  },
  getEmojis: async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await api.get("/emojis");
      toast.success("Emojis fetched successfuly!");
      return response;
    } catch (error) {
      console.log(error);
      toast.error("Emojis failed to fetch!");
    } finally {
      console.log("Cleanups");
    }
  },
};
