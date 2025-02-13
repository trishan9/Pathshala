import { apiActions } from "@/api";
import { useQuery } from "@tanstack/react-query";

export interface useGetExamsProps {
  page?: number | null;
  classId?: number | null;
  teacherId?: string | null;
  search?: string | null;
}

export const useGetExams = ({
  page,
  classId,
  teacherId,
  search,
}: useGetExamsProps) => {
  const query = useQuery({
    queryKey: ["exams", page, classId, teacherId, search],
    queryFn: async () => {
      const response = await apiActions.exam.getAll({
        page: page ?? undefined,
        classId: classId ?? undefined,
        teacherId: teacherId ?? undefined,
        search: search ?? undefined,
      });

      if (!response.data) {
        throw new Error("Failed to get exams");
      }

      return response.data;
    },
  });

  return query;
};
