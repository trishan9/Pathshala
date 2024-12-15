import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { loginFormSchema } from "@/schemas";
import { useLogin } from "@/hooks/useAuth";

const LoginForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  });

  const login = useLogin();

  const handleLogin = async (values: z.infer<typeof loginFormSchema>) => {
    console.log(values);
    login.mutate(values);
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
      <div className="flex flex-col gap-2 items-start">
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

      <div className="flex flex-col gap-2 items-start">
        <Label htmlFor="password">Password</Label>

        <Input id="password" {...register("password")} type="password" />

        <p className="text-sm font-semibold text-red-500">
          {errors?.password?.message}
        </p>
      </div>

      <Button
        disabled={login.isPending}
        size="lg"
        className="w-full"
        type="submit"
      >
        {login.isPending ? "Signing in..." : "Sign in"}
        {login.isPending && <Loader2 className="w-14 h-14 animate-spin" />}
      </Button>
    </form>
  );
};

export default LoginForm;
