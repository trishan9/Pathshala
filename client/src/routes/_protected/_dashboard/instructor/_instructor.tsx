import { useAuthStore } from "@/stores/authStore";
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_protected/_dashboard/instructor/_instructor",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const currUser = useAuthStore((state) => state.user);

  if (currUser) {
    if (currUser?.role === "student") {
      return <Navigate to="/student" replace />;
    } else if (currUser?.role === "admin") {
      return <Navigate to="/admin" replace />;
    }
  }

  return (
    <div className="h-[120svh]">
      <Outlet />
    </div>
  );
}
