import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_protected/_dashboard/_student/learning/materials/$id",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <MaterialsPage />;
}

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiActions } from "@/api";
import { Preview } from "@/components/Preview";

interface LearningMaterial {
  id: string;
  title: string;
  content: string;
}

export default function MaterialsPage() {
  const params = Route.useParams();
  const subjectId = params.id as string;

  const {
    data: materials,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["materials"],
    queryFn: async () => {
      const response =
        await apiActions.subject.learningMaterial.getBySubject(subjectId);

      if (!response.data) {
        throw new Error("Failed to get classes");
      }

      return response.data.learningMaterials;
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
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/learning">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Course Materials</h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Learning Materials for: {subjectId}</CardTitle>
        </CardHeader>
        <CardContent>
          {materials.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {materials.map((material: LearningMaterial) => (
                <AccordionItem key={material.id} value={material.id}>
                  <div className="flex items-center justify-between">
                    <AccordionTrigger className="flex-1 text-left">
                      {material.title}
                    </AccordionTrigger>
                  </div>
                  <AccordionContent>
                    <Preview value={material.content} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="rounded-lg border border-dashed p-8 text-center">
              <p className="text-muted-foreground">
                No learning materials available for this course. Conact your
                module leader.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
