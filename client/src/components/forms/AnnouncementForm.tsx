import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { Dispatch, SetStateAction } from "react";
import { z } from "zod";
import {
  useCreateAnnouncement,
  useUpdateAnnouncement,
} from "@/hooks/useAnnouncements";
import { Form } from "../ui/form";

export interface FormProps {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}

const announcementSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, { message: "Title is required!" }),
  description: z.string().min(1, { message: "Description is required!" }),
  date: z.coerce.date({ message: "Date is required!" }),
  classId: z.coerce.number().optional(),
});
export type AnnouncementSchema = z.infer<typeof announcementSchema>;

const AnnouncementForm: React.FC<FormProps> = ({
  type,
  data,
  setOpen,
  relatedData,
}) => {
  const form = useForm<AnnouncementSchema>({
    resolver: zodResolver(announcementSchema),
  });

  const createAnnouncement = useCreateAnnouncement();
  const updateAnnoucement = useUpdateAnnouncement();

  const onSubmit = form.handleSubmit((values: AnnouncementSchema) => {
    if (type === "create") {
      createAnnouncement.mutate(values, {
        onSuccess: () => {
          form.reset();
          setOpen(false);
        },
      });
    } else if (type === "update") {
      updateAnnoucement.mutate(
        { id: data?.id || "", data: values },
        {
          onSuccess: () => {
            form.reset();
            setOpen(false);
          },
        },
      );
    }
  });

  const { classes } = relatedData;

  return (
    <Form {...form}>
      <form className="flex flex-col gap-8" onSubmit={onSubmit}>
        <h1 className="text-xl font-semibold">
          {type === "create"
            ? "Create a new announcement"
            : "Update announcement"}
        </h1>
        <div className="flex justify-between flex-wrap gap-4">
          <InputField
            label="Title"
            name="title"
            defaultValue={data?.title}
            register={form.register}
            error={form.formState.errors?.title}
          />
          <InputField
            label="Description"
            name="description"
            defaultValue={data?.description}
            register={form.register}
            error={form.formState.errors?.description}
          />
          <InputField
            label="Date"
            name="date"
            defaultValue={
              data?.date
            }
            register={form.register}
            error={form.formState.errors?.date}
            type="date"
            form={form}
          />

          <div className="flex flex-col gap-2 w-full md:w-1/4">
            <label className="text-xs text-gray-500">Class</label>
            <select
              className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
              {...form.register("classId")}
              defaultValue={data?.classId}
            >
              <option selected value={0}>
                Select Class
              </option>

              {classes?.map((classItem: { id: number; name: string }) => (
                <option value={classItem?.id} key={classItem?.id}>
                  {classItem?.name}
                </option>
              ))}
            </select>
            {form.formState.errors.classId?.message && (
              <p className="text-xs text-red-400">
                {form.formState.errors.classId.message.toString()}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className={`bg-blue-400 text-white p-2 rounded-md `}
        >
          {type === "create" ? "Create" : "Update"}
        </button>
      </form>
    </Form>
  );
};

export default AnnouncementForm;
