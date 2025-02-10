import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_protected/_dashboard/instructor/_instructor/courses",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-8">
      <h1>Teacher Courses</h1>
    </div>
  );
}
