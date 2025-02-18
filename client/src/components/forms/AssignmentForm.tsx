import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { Dispatch, SetStateAction } from "react";
import { z } from "zod";
import { useCreateAssignment, useUpdateAssignment } from "@/hooks/useAssignments";

export const assignmentSchema = z.object({
    id: z.coerce.number().optional(),
    title: z.string().min(1, { message: "Assignment name is required!" }),
    startDate: z.coerce.date({ message: "Start date is required!" }),
    dueDate: z.coerce.date({ message: "Due date is required!" }),
    lessonId: z.coerce.string({ message: "Lesson is required!" }),
  });
  
export type AssignmentSchema = z.infer<typeof assignmentSchema>;

const AssignmentForm = ({
  type,
  data,
  setOpen,
  relatedData,
}: {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AssignmentSchema>({
    resolver: zodResolver(assignmentSchema),
  });

  const createAssignment = useCreateAssignment();
  const updateAssignment = useUpdateAssignment();
  
  const onSubmit = handleSubmit((values: AssignmentSchema) => {
    if (type === "create") {
      createAssignment.mutate(values, {
        onSuccess: () => {
          reset();
          setOpen(false);
        },
      });
    } else if (type === "update") {
      updateAssignment.mutate(
        { id: data?.id || "", data: values },
        {
          onSuccess: () => {
            reset();
            setOpen(false);
          },
        },
      );
    }
  });

  const { lessons } = relatedData;

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new assignment" : "Update the assignment"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Assignment title"
          name="title"
          defaultValue={data?.title}
          register={register}
          error={errors?.title}
        />
        <InputField
          label="Start Date"
          name="startDate"
          defaultValue={
            data?.startDate &&
            new Date(data?.startDate)?.toISOString().split("T")[0]
          }
          register={register}
          error={errors?.startDate}
          type="date"
        />
        <InputField
          label="Due Date"
          name="dueDate"
          defaultValue={
            data?.dueDate &&
            new Date(data?.dueDate)?.toISOString().split("T")[0]
          }
          register={register}
          error={errors?.dueDate}
          type="date"
        />

        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Lesson</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("lessonId")}
            defaultValue={data?.lessonId}
          >
            {lessons?.map((lesson: { id: number; name: string }) => (
              <option value={lesson.id} key={lesson.id}>
                {lesson.name}
              </option>
            ))}
          </select>
          
          {errors.lessonId?.message && (
            <p className="text-xs text-red-400">
              {errors.lessonId.message.toString()}
            </p>
          )}
        </div>
      </div>
     
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default AssignmentForm;