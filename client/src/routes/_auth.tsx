import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import NavBar from "@/components/layouts/Navbar";
import Sidebar from "@/components/layouts/Sidebar";
import { useAuthStore } from "@/stores/authStore";

export const Route = createFileRoute("/_auth")({
  component: LayoutComponent,
});

function LayoutComponent() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    console.log("User is not authenicated!");
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="h-full">
      <div className="fixed inset-y-0 md:pl-56 h-[80px] w-full z-10">
        <NavBar />
      </div>

      <div className="fixed inset-y-0 z-10 flex-col hidden w-56 h-full md:flex">
        <Sidebar />
      </div>

      <main className="h-full md:pl-56 pt-[80px]">
        <Outlet />
      </main>
    </div>
  );
}
