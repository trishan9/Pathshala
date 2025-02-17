import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import { Dispatch, SetStateAction } from "react";
import { useCreateSubject, useUpdateSubject } from "@/hooks/useSubjects";

const schema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Subject name is required!" }),
});
export type CreateSubjectInputs = z.infer<typeof schema>;

const SubjectForm = ({
  type,
  data,
  setOpen,
}: {
  type: "create" | "update";
  data?: z.infer<typeof schema>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateSubjectInputs>({
    resolver: zodResolver(schema),
  });

  const createSubject = useCreateSubject();
  const updateSubject = useUpdateSubject();

  const onSubmit = handleSubmit((values: z.infer<typeof schema>) => {
    if (type === "create") {
      createSubject.mutate(values.name, {
        onSuccess: () => {
          reset();
          setOpen(false);
        },
      });
    } else if (type === "update") {
      updateSubject.mutate(
        { id: data?.id || "", name: values.name },
        {
          onSuccess: () => {
            reset();
            setOpen(false);
          },
        },
      );
    }
  });

  return (
    <form className="flex flex-col gap-2" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold mb-2">
        {type === "create" ? "Create a new subject" : "Edit subject"}
      </h1>

      <div className="flex justify-between mb-2 flex-wrap gap-4">
        <InputField
          label="Subject Name"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
        />
      </div>

      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default SubjectForm;
