import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/instructor/_instructor")({
  component: RouteComponent,
});

function RouteComponent() {
  console.log("Teacher logged in");

  return (
    <div>
      <Outlet />
    </div>
  );
}
