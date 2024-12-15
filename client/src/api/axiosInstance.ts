import axios from "axios";
import { API_URLS } from "./apiUrls";
import { useAuthStore } from "@/stores/authStore";
import { apiActions } from "./apiActions";

export const api = axios.create({
  baseURL: API_URLS.BASE,
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
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
