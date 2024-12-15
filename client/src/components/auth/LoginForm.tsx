import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { loginFormSchema } from "@/schemas";

const LoginForm = () => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async (values: z.infer<typeof loginFormSchema>) => {
    try {
      setIsLoading(true);
      console.log(values);
    } catch (error) {
      console.log(error);
      toast.error("Failed to login!");
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        toast.success("Logged in succesfully!");
        reset();
        navigate({ to: "/" });
      }, 2000);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
      <div className="flex flex-col gap-2 items-start">
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

      <div className="flex flex-col gap-2 items-start">
        <Label htmlFor="password">Password</Label>

        <Input id="password" {...register("password")} type="password" />

        <p className="text-sm font-semibold text-red-500">
          {errors?.password?.message}
        </p>
      </div>

      <Button disabled={isLoading} size="lg" className="w-full" type="submit">
        {isLoading ? "Signing in..." : "Sign in"}
        {isLoading && <Loader2 className="w-14 h-14 animate-spin" />}
      </Button>
    </form>
  );
};

export default LoginForm;
