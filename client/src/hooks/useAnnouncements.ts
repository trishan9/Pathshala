import { apiActions } from "@/api";
import { AnnouncementSchema } from "@/components/forms/AnnouncementForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface useGetAnnouncementsProps {
  page?: number | null;
  search?: string | null;
}

export const useGetAnnouncements = ({
  page,
  search,
}: useGetAnnouncementsProps) => {
  const query = useQuery({
    queryKey: ["announcements", page, search],
    queryFn: async () => {
      const response = await apiActions.announcement.getAll({
        page: page ?? undefined,
        search: search ?? undefined,
      });

      if (!response.data) {
        throw new Error("Failed to get announcements");
      }

      return response.data;
    },
  });

  return query;
};

export const useCreateAnnouncement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AnnouncementSchema) => {
      const response = await apiActions.announcement.create(data);
      if (!response.data) {
        throw new Error("Failed to create announcement");
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
  });
};

export const useUpdateAnnouncement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<AnnouncementSchema>;
    }) => {
      const response = await apiActions.announcement.update(id, data);
      if (!response.data) {
        throw new Error("Failed to update announcement");
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
  });
};

export const useDeleteAnnouncement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiActions.announcement.delete(id);
      if (!response.data) {
        throw new Error("Failed to delete announcement");
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
  });
};
