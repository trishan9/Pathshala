import { apiActions } from "@/api";
import { useQuery } from "@tanstack/react-query";

export interface useGetLessonsProps {
  page?: number | null;
  teacherId?: string | null;
  search?: string | null;
}

export const useGetLessons = ({
  page,
  teacherId,
  search,
}: useGetLessonsProps) => {
  const query = useQuery({
    queryKey: ["lessons", page, teacherId, search],
    queryFn: async () => {
      const response = await apiActions.lesson.getAll({
        page: page ?? undefined,
        teacherId: teacherId ?? undefined,
        search: search ?? undefined,
      });

      if (!response.data) {
        throw new Error("Failed to get lessons");
      }

      return response.data;
    },
  });

  return query;
};
