import { PageError } from "@/components/PageError";
import { useAuthStore } from "@/stores/authStore";
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/_dashboard/_staff")({
  component: RouteComponent,
});

function RouteComponent() {
  const currUser = useAuthStore((state) => state.user);

  if (currUser) {
    if (currUser?.role === "student") {
      return <Navigate to="/student" replace />;
    } else if (currUser?.role === "teacher" || currUser?.role === "admin") {
      return (
        <div>
          <Outlet />
        </div>
      );
    }
  }

  return <PageError message="You are not allowed to access this page!" />;
}
