import { createRootRoute, Outlet } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { useGetMe } from "@/hooks/useAuth";
import NotFound from "@/components/NotFound";
import { PageLoader } from "@/components/PageLoader";

const queryClient = new QueryClient();

const AuthWrapper = () => {
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const setUser = useAuthStore((state) => state.setUser);
  const { data: user, isLoading } = useGetMe();

  if (user) {
    setUser(user?.data?.data);
    setIsAuthenticated(true);
  }

  if (isLoading) return <PageLoader />;

  return <Outlet />;
};

export const Route = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <AuthWrapper />
    </QueryClientProvider>
  ),
  notFoundComponent: NotFound,
});
