import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_protected/_dashboard/_student/learning/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <CoursesPage />;
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiActions } from "@/api";

interface Subject {
  id: string;
  name: string;
}

export default function CoursesPage() {
  const { data: classData } = useQuery({
    queryKey: ["class"],
    queryFn: async () => {
      const response = await apiActions.class.getByStudentId();

      if (!response.data) {
        throw new Error("Failed to get class");
      }

      return response.data?.data;
    },
  });

  const {
    data: subjects,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["subjects-teacher"],
    queryFn: async () => {
      const response = await apiActions.subject.learningMaterial.getSubjects({
        classId: classData.id,
      });

      if (!response.data) {
        throw new Error("Failed to get subjects");
      }

      return response.data.subjects;
    },
  });

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
        <p className="text-destructive">{error.message}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="mb-8 text-xl font-bold">Available Courses</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subjects?.map((subject: Subject) => (
          <Card key={subject.id} className="overflow-hidden">
            <CardHeader className="bg-muted/50">
              <CardTitle>{subject.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Course ID: {subject.id}
                </p>
                <Link href={`/learning/materials/${subject.id}`}>
                  <Button>Access Materials</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {subjects.length === 0 && (
        <div className="mt-8 rounded-lg border border-dashed p-8 text-center">
          <p className="text-muted-foreground">
            No courses available at the moment.
          </p>
        </div>
      )}
    </div>
  );
}
