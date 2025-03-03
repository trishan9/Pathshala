import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_protected/_dashboard/_teacher/courses/materials/$id",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <MaterialsPage />;
}

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus, ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiActions } from "@/api";
import {
  useAddLearningMaterial,
  useDeleteLearningMaterial,
  useUpdateLearningMaterial,
} from "@/hooks/useSubjects";
import { Editor } from "@/components/Editor";
import { Preview } from "@/components/Preview";
import { toast } from "react-toastify";

interface LearningMaterial {
  id: string;
  title: string;
  content: string;
}

export default function MaterialsPage() {
  const params = Route.useParams();
  const subjectId = params.id as string;

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentMaterial, setCurrentMaterial] =
    useState<LearningMaterial | null>(null);
  const [formData, setFormData] = useState({ title: "" });
  const [value, setValue] = useState("");
  const [submitting, setSubmitting] = useState(false);

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

  const addMaterial = useAddLearningMaterial();
  const updateMaterial = useUpdateLearningMaterial();
  const deleteMaterial = useDeleteLearningMaterial();

  const handleAddMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      addMaterial.mutate(
        {
          title: formData.title,
          content: value || "",
          subjectId,
        },
        {
          onSuccess: (response) => {
            setIsAddDialogOpen(false);
            setFormData({ title: "" });
            setValue("");
            toast.success(response.message);
          },
        },
      );
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMaterial) return;

    setSubmitting(true);

    try {
      updateMaterial.mutate(
        {
          id: currentMaterial.id,
          data: {
            title: formData.title,
            content: value || "",
            subjectId,
          },
        },
        {
          onSuccess: (response) => {
            setIsEditDialogOpen(false);
            setCurrentMaterial(null);
            setFormData({ title: "" });
            setValue("");
            toast.success(response.message);
          },
        },
      );
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteMaterial = async () => {
    if (!currentMaterial) return;

    setSubmitting(true);

    try {
      deleteMaterial.mutate(currentMaterial.id, {
        onSuccess: (response) => {
          setIsDeleteDialogOpen(false);
          setCurrentMaterial(null);
          toast.success(response.message);
        },
      });
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

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
          <Link href="/courses">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Course Materials</h1>
        </div>
        <Button
          onClick={() => {
            setFormData({ title: "" });
            setValue("");
            setIsAddDialogOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Material
        </Button>
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

                    <div className="flex gap-2 pr-4">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentMaterial(material);
                          setFormData({
                            title: material.title,
                          });
                          setValue(material.content);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="outline"
                        size="icon"
                        className="text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentMaterial(material);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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
                No learning materials available for this course.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setFormData({ title: "" });
                  setValue("");
                  setIsAddDialogOpen(true);
                }}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Your First Material
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Material Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Add New Learning Material</DialogTitle>
            <DialogDescription>
              Create a new learning material for this course.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={handleAddMaterial}
            className="flex flex-col flex-1 overflow-hidden"
          >
            <div className="grid gap-4 py-4 overflow-y-auto pr-2">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Enter material title"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Content</Label>

                <Editor value={value || ""} onChange={setValue} />
                <p className="text-xs text-muted-foreground">
                  You can use HTML tags for formatting.
                </p>
              </div>
            </div>
            <DialogFooter className="mt-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Add Material
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Material Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Edit Learning Material</DialogTitle>
            <DialogDescription>
              Update the learning material details.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={handleEditMaterial}
            className="flex flex-col flex-1 overflow-hidden"
          >
            <div className="grid gap-4 py-4 overflow-y-auto pr-2">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Enter material title"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-content">Content</Label>
                <Editor value={value || ""} onChange={setValue} />
                <p className="text-xs text-muted-foreground">
                  You can use HTML tags for formatting.
                </p>
              </div>
            </div>
            <DialogFooter className="mt-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Update Material
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this learning material? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDeleteMaterial}
              disabled={submitting}
            >
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
