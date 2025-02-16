import { PageError } from "@/components/PageError";
import { useAuthStore } from "@/stores/authStore";
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/_dashboard/_student")({
  component: RouteComponent,
});

function RouteComponent() {
  const currUser = useAuthStore((state) => state.user);

  if (currUser) {
    if (currUser?.role === "teacher") {
      return <Navigate to="/teacher" replace />;
    } else if (currUser?.role === "admin") {
      return <Navigate to="/admin" replace />;
    } else if (currUser?.role === "student") {
      return (
        <div>
          <Outlet />
        </div>
      );
    }
  }

  return <PageError message="You are not allowed to access this page!" />;
}
