import NavBar from "@/components/layouts/Navbar";
import Sidebar from "@/components/layouts/Sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout")({
  component: LayoutComponent,
});

function LayoutComponent() {
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
