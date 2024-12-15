import { createFileRoute } from "@tanstack/react-router";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { DemoPie } from "@/components/charts/DemoPie";
import { useAuthStore } from "@/stores/authStore";

export const Route = createFileRoute("/_auth/")({
  component: RouteComponent,
});

function RouteComponent() {
  const user = useAuthStore((state) => state.user);
  return (
    <div className="p-8">
      <h1>Hello {user?.name}</h1>
      <Button onClick={() => toast.info("Clicked!")}>Click Me</Button>

      <div className="h-[500px] flex">
        <DemoPie />
      </div>
    </div>
  );
}
