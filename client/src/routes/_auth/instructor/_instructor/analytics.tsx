import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/instructor/_instructor/analytics')(
  {
    component: RouteComponent,
  },
)

function RouteComponent() {
  return (
    <div className="p-8">
      <h1>Analytics of Courses</h1>
    </div>
  )
}
