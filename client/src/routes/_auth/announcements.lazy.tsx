import { createLazyFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useCounterStore } from "@/stores/counter";

export const Route = createLazyFileRoute("/_auth/announcements")({
  component: RouteComponent,
});

function RouteComponent() {
  const { count, inc, dec } = useCounterStore();

  return (
    <div className="p-8 flex flex-col gap-6">
      <p>Hello announcements! </p>

      <div className="flex items-center gap-3">
        <Button variant="outline" onClick={inc}>
          +
        </Button>
        <p>{count}</p>
        <Button variant="outline" onClick={dec}>
          -
        </Button>
      </div>
    </div>
  );
}
