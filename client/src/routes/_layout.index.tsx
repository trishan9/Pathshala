import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { DemoPie } from "@/components/charts/DemoPie";

export const Route = createFileRoute("/_layout/")({
  component: HomePage,
});

function HomePage() {
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
