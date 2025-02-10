import { useAuthStore } from "@/stores/authStore";
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/_dashboard/student/_student")(
  {
    component: RouteComponent,
  },
);

function RouteComponent() {
  const currUser = useAuthStore((state) => state.user);

  if (currUser) {
    if (currUser?.role === "teacher") {
      return <Navigate to="/instructor" replace />;
    } else if (currUser?.role === "admin") {
      return <Navigate to="/admin" replace />;
    }
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
