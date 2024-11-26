import { getEmojis } from "@/actions/emojis";
import { Button } from "@/components/ui/button";
import { useCounterStore } from "@/stores/counter";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";

export const Route = createLazyFileRoute("/_layout/search")({
  component: RouteComponent,
});

function RouteComponent() {
  const { count, inc, dec } = useCounterStore();

  const {
    isPending,
    error,
    data: emojis,
  } = useQuery({
    queryKey: ["emojis"],
    queryFn: getEmojis,
    staleTime: 60 * 1000,
  });

  return (
    <div className="p-8 flex flex-col gap-6">
      <p>Hello search! </p>

      <div className="flex items-center gap-3">
        <Button variant="outline" onClick={inc}>
          +
        </Button>
        <p>{count}</p>
        <Button variant="outline" onClick={dec}>
          -
        </Button>
      </div>

      <div>
        {isPending && <Loader2 className="animate-spin w-16 h-16" />}
        {emojis &&
          emojis.data.map((emoji: string) => <p key={emoji}>{emoji}</p>)}
        {error && <p className="text-red-500">{error.message}</p>}
      </div>
    </div>
  );
}
