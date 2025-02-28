import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import { useCreateStudent, useUpdateStudent } from "@/hooks/useStudents";
import { Dispatch, SetStateAction, useState } from "react";
import { Form } from "../ui/form";

const schema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long!" })
    .max(20, { message: "Username must be at most 20 characters long!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long!" })
    .optional()
    .or(z.literal("")),
  name: z.string().min(1, { message: "First name is required!" }),
  surname: z.string().min(1, { message: "Last name is required!" }),
  email: z
    .string()
    .email({ message: "Invalid email address!" })
    .optional()
    .or(z.literal("")),
  phone: z.string().optional(),
  address: z.string(),
  image: z.any().optional(),
  bloodType: z.string().min(1, { message: "Blood Type is required!" }),
  birthday: z.coerce.date({ message: "Birthday is required!" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),
  gradeId: z.coerce.string().min(1, { message: "Grade is required!" }),
  classId: z.coerce.number().min(1, { message: "Class is required!" }),
});

type CreateStudentInputs = z.infer<typeof schema>;

const StudentForm = ({
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
  const form = useForm<CreateStudentInputs>({
    resolver: zodResolver(schema),
  });

  const createStudent = useCreateStudent();
  const updateStudent = useUpdateStudent();
  const [file, setFile] = useState<File | null>(null);

  const onSubmit = form.handleSubmit((values: z.infer<typeof schema>) => {
    const finalData = {
      username: values.username,
      password: values.password,
      name: values.name + " " + values.surname,
      email: values.email,
      phone: values.phone,
      address: values.address,
      bloodType: values.bloodType,
      birthday: values.birthday.toISOString(),
      sex: values.sex,
      class: +values.classId,
      grade: values.gradeId,
      image: values.image,
    };

    if (type === "create") {
      createStudent.mutate(finalData, {
        onSuccess: () => {
          form.reset();
          setOpen(false);
        },
      });
    } else if (type === "update") {
      updateStudent.mutate(
        { id: data?.id || "", data: finalData },
        {
          onSuccess: () => {
            form.reset();
            setOpen(false);
          },
        },
      );
    }
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
      setFile(file);
    }
  };

  const { grades, classes } = relatedData;

  return (
    <Form {...form}>
      <form className="flex flex-col gap-2" onSubmit={onSubmit}>
        <h1 className="text-xl font-semibold mb-2">
          {type === "create" ? "Create a new student" : "Edit student"}
        </h1>

        <span className="text-xs text-gray-400 font-medium">
          Authentication Information
        </span>

        <div className="flex justify-between flex-wrap gap-4 mb-2">
          <InputField
            label="Username"
            name="username"
            defaultValue={data?.username}
            register={form.register}
            error={form.formState.errors?.username}
          />
          <InputField
            label="Email"
            name="email"
            defaultValue={data?.email}
            register={form.register}
            error={form.formState.errors?.email}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            defaultValue={data?.password}
            register={form.register}
            error={form.formState.errors?.password}
          />
        </div>

        <span className="text-xs text-gray-400 font-medium">
          Personal Information
        </span>

        <div className="flex justify-between flex-wrap gap-4 mb-4">
          <InputField
            label="First Name"
            name="name"
            defaultValue={data?.name?.split(" ")[0]}
            register={form.register}
            error={form.formState.errors.name}
          />

          <InputField
            label="Last Name"
            name="surname"
            defaultValue={data?.name?.split(" ")[1]}
            register={form.register}
            error={form.formState.errors.name}
          />

          <InputField
            label="Phone"
            name="phone"
            defaultValue={data?.phone}
            register={form.register}
            error={form.formState.errors.phone}
          />

          <InputField
            label="Address"
            name="address"
            defaultValue={data?.address}
            register={form.register}
            error={form.formState.errors.address}
          />

          <InputField
            label="Blood Type"
            name="bloodType"
            defaultValue={data?.bloodType}
            register={form.register}
            error={form.formState.errors.bloodType}
          />

          <InputField
            label="Birthday"
            name="birthday"
            defaultValue={data?.birthday}
            register={form.register}
            error={form.formState.errors.birthday}
            type="date"
            form={form}
          />

          <div className="flex flex-col gap-2 w-full md:w-1/4">
            <label className="text-xs text-gray-500">Sex</label>

            <select
              className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
              {...form.register("sex")}
              defaultValue={data?.sex}
            >
              <option value="MALE">Male</option>

              <option value="FEMALE">Female</option>
            </select>

            {form.formState.errors.sex?.message && (
              <p className="text-xs text-red-400">
                {form.formState.errors.sex.message.toString()}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2 w-full md:w-1/4">
            <label className="text-xs text-gray-500">Grade</label>
            <select
              className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
              {...form.register("gradeId")}
              defaultValue={data?.gradeId}
            >
              {grades?.map((grade: { id: number; level: number }) => (
                <option value={grade?.id} key={grade.id}>
                  {grade.level}
                </option>
              ))}
            </select>
            {form.formState.errors.gradeId?.message && (
              <p className="text-xs text-red-400">
                {form.formState.errors.gradeId.message.toString()}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2 w-full md:w-1/4">
            <label className="text-xs text-gray-500">Class</label>
            <select
              className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
              {...form.register("classId")}
              defaultValue={data?.classId}
            >
              {classes?.map(
                (classItem: {
                  id: number;
                  name: string;
                  capacity: number;
                  _count: { students: number };
                }) => (
                  <option value={classItem?.id} key={classItem?.id}>
                    ({classItem?.name} -{" "}
                    {classItem?._count?.students + "/" + classItem?.capacity}{" "}
                    Capacity)
                  </option>
                ),
              )}
            </select>
            {form.formState.errors.classId?.message && (
              <p className="text-xs text-red-400">
                {form.formState.errors.classId.message.toString()}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
            <div className="flex gap-4 items-center">
              {data?.img && !file && (
                <div className="size-[42px] relative border rounded-md overflow-hidden">
                  <img
                    src={data.img}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              )}
              {file && (
                <div className="size-[42px] relative border rounded-md overflow-hidden">
                  <img
                    src={URL.createObjectURL(file)}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              )}

              <label
                className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
                htmlFor="img"
              >
                <img src="/upload.png" alt="" width={28} height={28} />
                <span>Upload a photo</span>
              </label>
            </div>
            <input
              type="file"
              id="img"
              onChange={handleImageChange}
              className="hidden"
            />
            {form.formState.errors.image?.message && (
              <p className="text-xs text-red-400">
                {form.formState.errors.image.message.toString()}
              </p>
            )}
          </div>
        </div>

        <button className="bg-blue-400 text-white p-2 rounded-md">
          {type === "create" ? "Create" : "Update"}
        </button>
      </form>
    </Form>
  );
};

export default StudentForm;
