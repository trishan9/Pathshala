import { createFileRoute, Outlet } from "@tanstack/react-router";
import NavBar from "@/components/layouts/Navbar";
import Sidebar from "@/components/layouts/Sidebar";

export const Route = createFileRoute("/_protected/_dashboard")({
  component: DashboardLayoutComponent,
});

function DashboardLayoutComponent() {
  return (
    <div className="h-full">
      <div className="fixed inset-y-0 md:pl-56 h-[80px] w-full z-10">
        <NavBar />
      </div>

      <div className="fixed inset-y-0 z-10 flex-col hidden w-56 h-full md:flex">
        <Sidebar />
      </div>

      <main className="min-h-screen md:pl-56 pt-[80px] bg-neutral-50">
        <Outlet />
      </main>
    </div>
  );
}
