import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { Dispatch, SetStateAction } from "react";
import { Form } from "../ui/form";
import { lessonSchema, LessonSchema, useCreateLesson, useUpdateLesson } from "@/hooks/useLessons";

export interface FormProps {
    type: "create" | "update";
    data?: any;
    setOpen: Dispatch<SetStateAction<boolean>>;
    relatedData?: any;
}

const LessonForm: React.FC<FormProps> = ({
    type,
    data,
    setOpen,
    relatedData,
}) => {
    const form = useForm<LessonSchema>({
        resolver: zodResolver(lessonSchema),
    });

    const createLesson = useCreateLesson();
    const updateLesson = useUpdateLesson();

    const onSubmit = form.handleSubmit((values: LessonSchema) => {
        if (type === "create") {
            createLesson.mutate(values, {
                onSuccess: () => {
                    form.reset();
                    setOpen(false);
                },
            });
        } else if (type === "update") {
            updateLesson.mutate(
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

    const { classes, teachers, subjects } = relatedData;

    return (
        <Form {...form}>
            <form className="flex flex-col gap-8" onSubmit={onSubmit}>
                <h1 className="text-xl font-semibold">
                    {type === "create" ? "Create a new lesson" : "Update lesson"}
                </h1>
                <div className="flex justify-between flex-wrap gap-4">
                    <InputField
                        label="Name"
                        name="name"
                        defaultValue={data?.name}
                        register={form.register}
                        error={form.formState.errors?.name}
                    />

                    <InputField
                        label="Start Time"
                        name="startTime"
                        defaultValue={data?.startTime}
                        register={form.register}
                        error={form.formState.errors?.startTime}
                        type="datetime-local"
                        form={form}
                    />

                    <InputField
                        label="End Time"
                        name="endTime"
                        defaultValue={data?.endTime}
                        register={form.register}
                        error={form.formState.errors?.endTime}
                        type="datetime-local"
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

                    <div className="flex flex-col gap-2 w-full md:w-1/4">
                        <label className="text-xs text-gray-500">Subject</label>
                        <select
                            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                            {...form.register("subjectId")}
                            defaultValue={data?.subjectId}
                        >
                            <option selected value={0}>
                                Select Subject
                            </option>

                            {subjects?.map((subjectItem: { id: string; name: string }) => (
                                <option value={subjectItem?.id} key={subjectItem?.id}>
                                    {subjectItem?.name}
                                </option>
                            ))}
                        </select>

                        {form.formState.errors.subjectId?.message && (
                            <p className="text-xs text-red-400">
                                {form.formState.errors.subjectId.message.toString()}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 w-full md:w-1/4">
                        <label className="text-xs text-gray-500">Teacher</label>
                        <select
                            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                            {...form.register("teacherId")}
                            defaultValue={data?.teacherId}
                        >
                            <option selected value={0}>
                                Select Teacher
                            </option>

                            {teachers?.map((item: { id: string; name: string }) => (
                                <option value={item?.id} key={item?.id}>
                                    {item?.name}
                                </option>
                            ))}
                        </select>

                        {form.formState.errors.teacherId?.message && (
                            <p className="text-xs text-red-400">
                                {form.formState.errors.teacherId.message.toString()}
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

export default LessonForm;
