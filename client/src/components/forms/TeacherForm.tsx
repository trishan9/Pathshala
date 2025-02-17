import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import { useCreateTeacher, useUpdateTeacher } from "@/hooks/useTeachers";

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
  subjects: z.array(z.string()).optional(), // subject ids
});
export type CreateTeacherInputs = z.infer<typeof schema>;

const TeacherForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: z.infer<typeof schema>;
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateTeacherInputs>({
    resolver: zodResolver(schema),
  });

  const createTeacher = useCreateTeacher();
  const updateTeacher = useUpdateTeacher();

  const onSubmit = handleSubmit((values: z.infer<typeof schema>) => {
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
      subjects: values.subjects,
      image: values.image,
    };

    if (type === "create") {
      createTeacher.mutate(finalData);
    } else if (type === "update") {
      updateTeacher.mutate({ id: data?.id || "", data: finalData });
    }
    reset();
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("urghhhh");
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file);
    }
    console.log(file);
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold mb-2">
        {type === "create" ? "Create a new teacher" : "Edit teacher"}
      </h1>

      <span className="text-xs text-gray-400 font-medium">
        Authentication Information
      </span>
      <div className="flex justify-between mb-2 flex-wrap gap-4">
        <InputField
          label="Username"
          name="username"
          defaultValue={data?.username}
          register={register}
          error={errors?.username}
        />
        <InputField
          label="Email"
          name="email"
          defaultValue={data?.email}
          register={register}
          error={errors?.email}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          defaultValue={data?.password}
          register={register}
          error={errors?.password}
        />
      </div>

      <span className="text-xs text-gray-400 font-medium">
        Personal Information
      </span>

      <div className="flex justify-between mb-4 flex-wrap gap-4">
        <InputField
          label="First Name"
          name="name"
          defaultValue={data?.name?.split(" ")[0]}
          register={register}
          error={errors.name}
        />
        <InputField
          label="Last Name"
          name="surname"
          defaultValue={data?.name?.split(" ")[1]}
          register={register}
          error={errors.surname}
        />
        <InputField
          label="Phone"
          name="phone"
          defaultValue={data?.phone}
          register={register}
          error={errors.phone}
        />
        <InputField
          label="Address"
          name="address"
          defaultValue={data?.address}
          register={register}
          error={errors.address}
        />
        <InputField
          label="Blood Type"
          name="bloodType"
          defaultValue={data?.bloodType}
          register={register}
          error={errors.bloodType}
        />
        <InputField
          label="Birthday"
          name="birthday"
          defaultValue={
            data?.birthday &&
            new Date(data?.birthday)?.toISOString().split("T")[0]
          }
          register={register}
          error={errors.birthday}
          type="date"
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Sex</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("sex")}
            defaultValue={data?.sex}
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
          {errors.sex?.message && (
            <p className="text-xs text-red-400">
              {errors.sex.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
          <label
            className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer"
            htmlFor="img"
          >
            <img src="/upload.png" alt="" width={28} height={28} />
            <span>Upload a photo</span>
          </label>
          <input
            type="file"
            id="img"
            onChange={handleImageChange}
            className="hidden"
          />
          {errors.image?.message && (
            <p className="text-xs text-red-400">
              {errors.image.message.toString()}
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

export default TeacherForm;
