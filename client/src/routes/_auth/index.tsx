import { createFileRoute } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { DemoPie } from "@/components/charts/DemoPie";

export const Route = createFileRoute("/_auth/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-8">
      <h1>Hello World</h1>
      <Button onClick={() => toast.success("Clicked!")}>Click Me</Button>

      <div className="h-[500px] flex">
        <DemoPie />
      </div>
    </div>
  );
}
