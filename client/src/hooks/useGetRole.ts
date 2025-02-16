import { useAuthStore } from "@/stores/authStore";

export const useGetRole = () => {
  return useAuthStore((state) => state.user)?.role;
};
