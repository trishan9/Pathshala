import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { Dispatch, SetStateAction, useState } from "react";
import { z } from "zod";
import { useCreateAssignment, useUpdateAssignment } from "@/hooks/useAssignments";
import { Editor } from "../Editor";
import { Pencil, X } from "lucide-react";
import { Button } from "../ui/button";
import { Preview } from "../Preview";
import { Form } from "../ui/form";

export const assignmentSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, { message: "Assignment name is required!" }),
  startDate: z.coerce.date({ message: "Start date is required!" }),
  dueDate: z.coerce.date({ message: "Due date is required!" }),
  lessonId: z.coerce.string({ message: "Lesson is required!" }),
  question: z.coerce.string().optional(),
});

export type AssignmentSchema = z.infer<typeof assignmentSchema>;

const AssignmentForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update" | "view";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  if (type === "view") {
    return (
      <div>
        <p className="text-lg font-semibold">Question</p>

        {data?.question ? (
          <Preview value={data?.question} />
        ) : (
          <span className="text-muted-foreground mt-2">No question yet</span>
        )}
      </div>
    )
  }

  const form = useForm<AssignmentSchema>({
    resolver: zodResolver(assignmentSchema),
  });

  const createAssignment = useCreateAssignment();
  const updateAssignment = useUpdateAssignment();

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(data?.question);

  const onSubmit = form.handleSubmit((values: AssignmentSchema) => {
    const finalValues: AssignmentSchema = {
      ...values,
      question: value
    }
    if (type === "create") {
      createAssignment.mutate(finalValues, {
        onSuccess: () => {
          form.reset();
          setOpen(false);
        },
      });
    } else if (type === "update") {
      updateAssignment.mutate(
        { id: data?.id || "", data: finalValues },
        {
          onSuccess: () => {
            form.reset();
            setOpen(false);
          },
        },
      );
    }
  });

  const { lessons } = relatedData;

  return (
    <Form {...form}>
      <form className="flex flex-col gap-8" onSubmit={onSubmit}>
        <h1 className="text-xl font-semibold">
          {type === "create" ? "Create a new assignment" : "Update the assignment"}
        </h1>

        <div className="flex justify-between flex-wrap gap-4">
          <InputField
            label="Assignment title"
            name="title"
            defaultValue={data?.title}
            register={form.register}
            error={form.formState.errors?.title}
          />
          <InputField
            label="Start Date"
            name="startDate"
            defaultValue={
              data?.startDate
            }
            register={form.register}
            error={form.formState.errors?.startDate}
            type="date"
            form={form}
          />
          <InputField
            label="Due Date"
            name="dueDate"
            defaultValue={
              data?.dueDate
            }
            register={form.register}
            error={form.formState.errors?.dueDate}
            type="date"
            form={form}
          />

          <div className="flex flex-col gap-2 w-full md:w-1/4">
            <label className="text-xs text-gray-500">Lesson</label>
            <select
              className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
              {...form.register("lessonId")}
              defaultValue={data?.lessonId}
            >
              {lessons?.map((lesson: { id: number; name: string }) => (
                <option value={lesson.id} key={lesson.id}>
                  {lesson.name}
                </option>
              ))}
            </select>

            {form.formState.errors.lessonId?.message && (
              <p className="text-xs text-red-400">
                {form.formState.errors.lessonId.message.toString()}
              </p>
            )}
          </div>
        </div>

        <div className="p-4 border rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <p className="text-lg font-semibold">Question</p>

            <Button
              onClick={() => setIsEditing((prev) => !prev)}
              size="sm"
              variant="outline"
              type="button"
            >
              {isEditing ? (
                <X className="size-4 mr-2" />
              ) : (
                <Pencil className="size-4 mr-2" />
              )}
              {isEditing ? "Cancel" : "Edit"}
            </Button>
          </div>

          {isEditing ? (
            <div className="flex flex-col gap-y-4">
              <Editor
                value={
                  value
                }
                onChange={setValue}
              />
            </div>
          ) : (
            <div>
              {data?.question ? (
                <Preview value={data?.question} />
              ) : value ? (<Preview value={value} />) : (
                <span className="text-muted-foreground">No question set</span>
              )}
            </div>
          )}
        </div>

        <button className="bg-blue-400 text-white p-2 rounded-md">
          {type === "create" ? "Create" : "Update"}
        </button>
      </form>
    </Form>
  );
};

export default AssignmentForm;