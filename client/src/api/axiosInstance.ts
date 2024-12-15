import axios, { AxiosError } from "axios";
import { API_URLS } from "./apiUrls";
import { useAuthStore } from "@/stores/authStore";
import { apiActions } from "./apiActions";

// @ts-expect-error "ssss"
export interface CustomAxiosError extends AxiosError {
  response?: {
    data: {
      message: string;
    };
  };
}

export const api = axios.create({
  baseURL: API_URLS.BASE,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await apiActions.auth.refresh();
        const { accessToken } = response.data;
        useAuthStore.getState().setAccessToken(accessToken, null);
        return api(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().setAccessToken(null, null);
        useAuthStore.getState().setIsAuthenticated(false);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
