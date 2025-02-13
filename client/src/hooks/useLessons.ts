import { apiActions } from "@/api";
import { useQuery } from "@tanstack/react-query";

export interface useGetLessonsProps {
  page?: number | null;
  teacherId?: string | null;
  classId?: number | null;
  search?: string | null;
}

export const useGetLessons = ({
  page,
  teacherId,
  classId,
  search,
}: useGetLessonsProps) => {
  const query = useQuery({
    queryKey: ["lessons", page, teacherId, classId, search],
    queryFn: async () => {
      const response = await apiActions.lesson.getAll({
        page: page ?? undefined,
        teacherId: teacherId ?? undefined,
        classId: classId ?? undefined,
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
