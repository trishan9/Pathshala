import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { signupFormSchema } from "@/schemas";
import { useSignup } from "@/hooks/useAuth";

const SignupForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
  });
  const signup = useSignup();

  const handleRegister = async (values: z.infer<typeof signupFormSchema>) => {
    console.log(values);
    signup.mutate(values);
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
            {...register("name")}
            type="text"
            placeholder="Trishan Wagle"
          />

          <p className="text-sm font-semibold text-red-500">
            {errors?.name?.message}
          </p>
        </div>

        <div className="flex flex-col gap-2 items-start w-full">
          <Label htmlFor="username">Username</Label>

          <Input
            id="username"
            {...register("username")}
            type="text"
            placeholder="trishan9"
          />

          <p className="text-sm font-semibold text-red-500">
            {errors?.username?.message}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 items-start">
        <Label htmlFor="email">Email Address</Label>

        <Input id="email" {...register("email")} type="email" />

        <p className="text-sm font-semibold text-red-500">
          {errors?.email?.message}
        </p>
      </div>

      <div className="flex flex-col gap-2 items-start">
        <Label htmlFor="password">Password</Label>

        <Input id="password" {...register("password")} type="password" />

        <p className="text-sm font-semibold text-red-500">
          {errors?.password?.message}
        </p>
      </div>

      <Button
        disabled={signup.isPending}
        size="lg"
        className="w-full"
        type="submit"
      >
        {signup.isPending ? "Creating account..." : "Create an account"}
        {signup.isPending && <Loader2 className="w-14 h-14 animate-spin" />}
      </Button>
    </form>
  );
};

export default SignupForm;
