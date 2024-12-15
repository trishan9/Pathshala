import { useEffect } from "react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { useGetMe } from "@/hooks/useAuth";
import loadingSpinner from "@/assets/loader.gif";

const queryClient = new QueryClient();

const AuthWrapper = () => {
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const { data: user, isLoading } = useGetMe();

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    }
  }, [user, setIsAuthenticated]);

  if (isLoading)
    return (
      <div className="w-full h-screen flex justify-center items-center bg-[#F5F7F6]">
        <img
          src={loadingSpinner}
          className="w-96 h-96 object-cover aspect-square"
          alt="Loading..."
        />
      </div>
    );

  return <Outlet />;
};

export const Route = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <AuthWrapper />
    </QueryClientProvider>
  ),
});
