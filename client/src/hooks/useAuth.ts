import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { apiActions } from "@/api";

export const useLogin = () => {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  return useMutation({
    mutationFn: apiActions.auth.login,
    onSuccess: (response) => {
      const { accessToken, user } = response.data;
      setAccessToken(accessToken, user);
    },
  });
};

export const useSignup = () => {
  return useMutation({
    mutationFn: apiActions.auth.register,
    onSuccess: (response) => {
      console.log(response);
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
