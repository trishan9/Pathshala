import { apiActions } from "@/api";
import { useQuery } from "@tanstack/react-query";

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
