import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useAuthStore } from "@/stores/authStore";
import { PageLoader } from "@/components/PageLoader";

export const Route = createFileRoute("/_protected/")({
  component: RouteComponent,
});

function RouteComponent() {
  const currUser = useAuthStore((state) => state.user);

  if (currUser?.role === "admin") {
    return <Navigate to="/admin" replace />;
  } else if (currUser?.role === "student") {
    return <Navigate to="/student" replace />;
  } else if (currUser?.role === "teacer") {
    return <Navigate to="/instructor" replace />;
  }

  return <PageLoader />;
}
