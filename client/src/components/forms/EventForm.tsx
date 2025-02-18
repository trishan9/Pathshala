import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { Dispatch, SetStateAction } from "react";
import { z } from "zod";
import { useCreateEvent, useUpdateEvent } from "@/hooks/useEvents";

export interface FormProps {
  type: "create" | "update";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  relatedData?: any;
}

const eventSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, { message: "Title is required!" }),
  description: z.string().min(1, { message: "Description is required!" }),
  startTime: z.coerce.date({ message: "Start date is required!" }),
  endTime: z.coerce.date({ message: "End date is required!" }),
  classId: z.coerce.number().min(1, { message: "Class is required!" }),
});
export type EventSchema = z.infer<typeof eventSchema>;

function formatDateTime(startTime: string, timeZone = "Asia/Kathmandu") {
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const dateParts = formatter.format(new Date(startTime)).split("/");
  const dateString =
    dateParts[2].split(", ")[0] +
    "-" +
    dateParts[1] +
    "-" +
    dateParts[0] +
    "T" +
    dateParts[2].split(", ")[1];

  return dateString;
}

const EventForm: React.FC<FormProps> = ({
  type,
  data,
  setOpen,
  relatedData,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EventSchema>({
    resolver: zodResolver(eventSchema),
  });

  const createEvent = useCreateEvent();
  const updateEvent = useUpdateEvent();

  const onSubmit = handleSubmit((values: EventSchema) => {
    if (type === "create") {
      createEvent.mutate(values, {
        onSuccess: () => {
          reset();
          setOpen(false);
        },
      });
    } else if (type === "update") {
      updateEvent.mutate(
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

  const { classes } = relatedData;

  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new event" : "Update event"}
      </h1>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Title"
          name="title"
          defaultValue={data?.title}
          register={register}
          error={errors?.title}
        />
        <InputField
          label="Description"
          name="description"
          defaultValue={data?.description}
          register={register}
          error={errors?.description}
        />
        <InputField
          label="Start Time"
          name="startTime"
          defaultValue={data?.startTime && formatDateTime(data?.startTime)}
          register={register}
          error={errors?.startTime}
          type="datetime-local"
        />

        <InputField
          label="End Time"
          name="endTime"
          defaultValue={data?.endTime && formatDateTime(data?.endTime)}
          register={register}
          error={errors?.endTime}
          type="datetime-local"
        />

        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Class</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("classId")}
            defaultValue={data?.classId}
          >
            <option selected value="">
              Select Class
            </option>

            {classes?.map((classItem: { id: number; name: string }) => (
              <option value={classItem?.id} key={classItem?.id}>
                {classItem?.name}
              </option>
            ))}
          </select>

          {errors.classId?.message && (
            <p className="text-xs text-red-400">
              {errors.classId.message.toString()}
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
  );
};

export default EventForm;
