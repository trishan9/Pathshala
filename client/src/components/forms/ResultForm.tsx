import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { Dispatch, SetStateAction } from "react";
import { z } from "zod";
import { useCreateResult, useUpdateResult } from "@/hooks/useResults";

export interface FormProps {
    type: "create" | "update";
    data?: any;
    setOpen: Dispatch<SetStateAction<boolean>>;
    relatedData?: any;
}

export const resultSchema = z.object({
    id: z.coerce.string(),
    score: z.coerce.number(),
    examId: z.coerce.string().optional(),
    assignmentId: z.coerce.string().optional(),
    studentId: z.coerce.string({ message: "Student is required!" }),
});
export type ResultSchema = z.infer<typeof resultSchema>;

const ResultForm: React.FC<FormProps> = ({
    type,
    data,
    setOpen,
    relatedData,
}) => {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<ResultSchema>({
        resolver: zodResolver(resultSchema),
    });

    const createResult = useCreateResult();
    const updateResult = useUpdateResult();

    const onSubmit = handleSubmit((values: ResultSchema) => {
        if (type === "create") {
            createResult.mutate(values, {
                onSuccess: () => {
                    reset();
                    setOpen(false);
                },
            });
        } else if (type === "update") {
            updateResult.mutate(
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

    const { students, exams, assignments } = relatedData;
    console.log(data)

    return (
        <form className="flex flex-col gap-8" onSubmit={onSubmit}>
            <h1 className="text-xl font-semibold">
                {type === "create"
                    ? "Add a new result"
                    : "Update result"}
            </h1>
            <div className="flex justify-between flex-wrap gap-4">
                <InputField
                    label="Score"
                    name="score"
                    defaultValue={data?.score}
                    register={register}
                    error={errors?.score}
                />

                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <label className="text-xs text-gray-500">Student</label>
                    <select
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                        {...register("studentId")}
                        defaultValue={data?.studentId}
                    >
                        {students?.map((std: { id: number; name: string }) => (
                            <option value={std?.id} key={std?.id}>
                                {std?.name}
                            </option>
                        ))}
                    </select>
                    {errors.studentId?.message && (
                        <p className="text-xs text-red-400">
                            {errors.studentId.message.toString()}
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <label className="text-xs text-gray-500">Exam</label>
                    <select
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                        {...register("examId")}
                        defaultValue={data?.examId}
                    >
                        <option selected value="">
                            Select Exam
                        </option>

                        {exams?.map((std: { id: number; title: string }) => (
                            <option value={std?.id} key={std?.id}>
                                {std?.title}
                            </option>
                        ))}
                    </select>
                    {errors.examId?.message && (
                        <p className="text-xs text-red-400">
                            {errors.examId.message.toString()}
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-2 w-full md:w-1/4">
                    <label className="text-xs text-gray-500">Assignment</label>
                    <select
                        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
                        {...register("assignmentId")}
                        defaultValue={data?.assignmentId}
                    >
                        <option selected value="">
                            Select Assignment
                        </option>

                        {assignments?.map((std: { id: number; title: string }) => (
                            <option value={std?.id} key={std?.id}>
                                {std?.title}
                            </option>
                        ))}
                    </select>
                    {errors.assignmentId?.message && (
                        <p className="text-xs text-red-400">
                            {errors.assignmentId.message.toString()}
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

export default ResultForm;
