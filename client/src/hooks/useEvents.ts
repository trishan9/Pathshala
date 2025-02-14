import { apiActions } from "@/api";
import { useQuery } from "@tanstack/react-query";

export interface useGetEventsProps {
  page?: number | null;
  search?: string | null;
}

export const useGetEvents = ({ page, search }: useGetEventsProps) => {
  const query = useQuery({
    queryKey: ["events", page, search],
    queryFn: async () => {
      const response = await apiActions.event.getAll({
        page: page ?? undefined,
        search: search ?? undefined,
      });

      if (!response.data) {
        throw new Error("Failed to get events");
      }

      return response.data;
    },
  });

  return query;
};
