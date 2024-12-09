import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  fullName: z
    .string()
    .min(1, "Name can't be empty.")
    .min(7, "Name can't be less than 7 characters."),
  userName: z
    .string()
    .min(1, "Username can't be empty.")
    .min(3, "Username can't be less than 3 characters."),
  emailAddress: z
    .string()
    .min(1, "Email address can't be empty.")
    .email("Email address must be valid."),
  password: z
    .string()
    .min(1, "Password can't be empty.")
    .min(8, "Password can't be less than 8 characters."),
});

const SignupForm = () => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleRegister = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      console.log(values);
    } catch (error) {
      console.log(error);
      toast.error("Failed to create your account!");
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        toast.success("Account created succesfully!");
        reset();
        navigate({ to: "/login" });
      }, 2000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleRegister)}
      noValidate
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row items-center justify-center gap-x-5 gap-y-6 w-full">
        <div className="flex flex-col gap-2 items-start w-full">
          <Label htmlFor="fullName">Full Name</Label>

          <Input
            id="fullName"
            {...register("fullName")}
            type="text"
            placeholder="Trishan Wagle"
          />

          <p className="text-sm font-semibold text-red-500">
            {errors?.fullName?.message}
          </p>
        </div>

        <div className="flex flex-col gap-2 items-start w-full">
          <Label htmlFor="username">Username</Label>

          <Input
            id="username"
            {...register("userName")}
            type="text"
            placeholder="trishan9"
          />

          <p className="text-sm font-semibold text-red-500">
            {errors?.userName?.message}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 items-start">
        <Label htmlFor="email">Email Address</Label>

        <Input id="email" {...register("emailAddress")} type="email" />

        <p className="text-sm font-semibold text-red-500">
          {errors?.emailAddress?.message}
        </p>
      </div>

      <div className="flex flex-col gap-2 items-start">
        <Label htmlFor="password">Password</Label>

        <Input id="password" {...register("password")} type="password" />

        <p className="text-sm font-semibold text-red-500">
          {errors?.password?.message}
        </p>
      </div>

      <Button disabled={isLoading} size="lg" className="w-full" type="submit">
        {isLoading ? "Creating account..." : "Create an account"}
        {isLoading && <Loader2 className="w-14 h-14 animate-spin" />}
      </Button>
    </form>
  );
};

export default SignupForm;
