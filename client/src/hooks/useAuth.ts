import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "react-toastify";
import { useAuthStore } from "@/stores/authStore";
import { apiActions } from "@/api";
import { CustomAxiosError } from "@/api/axiosInstance";

export const useLogin = () => {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: apiActions.auth.login,
    onSuccess: (response) => {
      const { accessToken, user } = response.data;
      console.log(response.data);
      setAccessToken(accessToken, user);
      toast.success(response.data.message);
      navigate({ to: "/" });
    },
    onError: (error: CustomAxiosError) => {
      console.log(error);
      toast.error(error?.response?.data?.message);
    },
  });
};

export const useSignup = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: apiActions.auth.register,
    onSuccess: (response) => {
      console.log(response);
      toast.dismiss();
      toast.success(response?.data?.message);
      navigate({ to: "/login" });
    },
    onError: (error: CustomAxiosError) => {
      console.log(error);
      toast.error(error?.response?.data?.message ?? "");
    },
  });
};

export const useLogout = () => {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);

  return useMutation({
    mutationFn: apiActions.auth.logout,
    onSuccess: () => {
      setAccessToken(null, null);
      setIsAuthenticated(false);
    },
  });
};

export const useGetMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: apiActions.auth.getMe,
    retry: false,
  });
};
