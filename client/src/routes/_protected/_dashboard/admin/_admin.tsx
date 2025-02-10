import { useAuthStore } from "@/stores/authStore";
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/_dashboard/admin/_admin")({
  component: RouteComponent,
});

function RouteComponent() {
  const currUser = useAuthStore((state) => state.user);

  if (currUser) {
    if (currUser?.role === "student") {
      return <Navigate to="/student" replace />;
    } else if (currUser?.role === "teacher") {
      return <Navigate to="/instructor" replace />;
    }
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
