import { Link, Navigate } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import googleLogo from "@/assets/google-logo.png";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import LoginForm from "@/components/auth/LoginForm";
import Logo from "@/components/layouts/Logo";
import { Carousel } from "@/components/auth/Carousel";
import { useAuthStore } from "@/stores/authStore";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="h-screen flex flex-col justify-between items-center overflow-hidden">
      <nav className="w-full bg-white p-3.5 flex justify-between border-b border-gray-300 items-center">
        <Logo />
      </nav>

      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2">
        <div className="bg-main w-full h-full hidden lg:flex justify-center items-center px-16 py-24">
          <Carousel />
        </div>

        <div className="relative w-full bg-neutral-100/30  text-sm flex flex-col items-center justify-center gap-6 px-6 sm:px-14 lg:px-8 xl:px-16 2xl:px-40">
          <div className="bg-[#fbe2e3] absolute top-[10rem] -z-10 left-[20rem] h-[15.25rem] rounded-full blur-[10rem] w-[32.75rem] dark:bg-[#946263]"></div>

          <div className="bg-[#dbd7fb] absolute top-[15rem] -z-10 left-[20rem] h-[15.25rem] rounded-full blur-[10rem] w-[32.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#676394]"></div>

          <div className="space-y-8 min-w-full">
            <div className="flex flex-col gap-4 justify-center items-center">
              <img
                src="/logo.png"
                className="w-24 hidden sm:block"
                alt="Pathshala Logo"
              />

              <p className="text-main font-semibold text-2xl sm:text-3xl">
                Hi, Welcome Back!
              </p>
            </div>

            <LoginForm />
          </div>

          <p className="font-medium">
            Not registered yet?{" "}
            <Link
              to="/register"
              className="font-semibold text-main hover:underline"
            >
              Create an account
            </Link>
          </p>

          <div className="flex justify-center items-center gap-3 w-full">
            <Separator className="bg-gray-300 w-1/3" />
            <p className="font-bold">OR</p>
            <Separator className="bg-gray-300 w-1/3" />
          </div>

          <Button
            variant="secondary"
            size="lg"
            className="w-full flex justify-center items-center gap-2.5"
          >
            <img src={googleLogo} alt="Google Logo" className="w-5 h-5" />
            Sign in with Google
          </Button>
        </div>
      </div>
    </div>
  );
}
