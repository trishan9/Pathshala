import { apiActions } from "@/api";
import { EventSchema } from "@/components/forms/EventForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: EventSchema) => {
      const response = await apiActions.event.create(data);
      if (!response.data) {
        throw new Error("Failed to create event");
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<EventSchema>;
    }) => {
      const response = await apiActions.event.update(id, data);
      if (!response.data) {
        throw new Error("Failed to update event");
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiActions.event.delete(id);
      if (!response.data) {
        throw new Error("Failed to delete event");
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};
