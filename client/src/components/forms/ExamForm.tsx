import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { Dispatch, SetStateAction, useState } from "react";
import { z } from "zod";
import { useCreateExam, useUpdateExam } from "@/hooks/useExams";
import { Preview } from "../Preview";
import { Button } from "../ui/button";
import { Pencil, X } from "lucide-react";
import { Editor } from "../Editor";
import { Form } from "../ui/form";

export const examSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, { message: "Title name is required!" }),
  startTime: z.coerce.date({ message: "Start time is required!" }),
  endTime: z.coerce.date({ message: "End time is required!" }),
  lessonId: z.coerce.string({ message: "Lesson is required!" }),
  instruction: z.coerce.string().optional(),
});

export type ExamSchema = z.infer<typeof examSchema>;

const ExamForm = ({
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
        <p className="text-lg font-semibold">Instructions</p>

        {data?.instruction ? (
          <Preview value={data?.instruction} />
        ) : (
          <span className="text-muted-foreground mt-2">No instructions yet</span>
        )}
      </div>
    )
  }

  const form = useForm<ExamSchema>({
    resolver: zodResolver(examSchema),
  });

  const createExam = useCreateExam();
  const updateExam = useUpdateExam();

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(data?.instruction);

  const onSubmit = form.handleSubmit((values: ExamSchema) => {
    const finalValues: ExamSchema = {
      ...values,
      instruction: value
    }
    if (type === "create") {
      createExam.mutate(finalValues, {
        onSuccess: () => {
          form.reset();
          setOpen(false);
        },
      });
    } else if (type === "update") {
      updateExam.mutate(
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
          {type === "create" ? "Create a new exam" : "Update the exam"}
        </h1>

        <div className="flex justify-between flex-wrap gap-4">
          <InputField
            label="Exam title"
            name="title"
            defaultValue={data?.title}
            register={form.register}
            error={form.formState.errors?.title}
          />
          
          <InputField
            label="Start Date"
            name="startTime"
            defaultValue={data?.startTime}
            register={form.register}
            error={form.formState.errors?.startTime}
            type="date"
            form={form}
          />

          <InputField
            label="End Date"
            name="endTime"
            defaultValue={data?.endTime}
            register={form.register}
            error={form.formState.errors?.endTime}
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
            <p className="text-lg font-semibold">Instruction</p>

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
              {data?.instruction ? (
                <Preview value={data?.instruction} />
              ) : value ? (<Preview value={value} />) : (
                <span className="text-muted-foreground">No instruction set</span>
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

export default ExamForm;