import { apiActions } from "@/api";
import { useQuery } from "@tanstack/react-query";

export interface useGetStudentProps {
  page?: number | null;
  teacherId?: string | null;
  search?: string | null;
}

export const useGetStudents = ({
  page,
  teacherId,
  search,
}: useGetStudentProps) => {
  const query = useQuery({
    queryKey: ["students", page, teacherId, search],
    queryFn: async () => {
      const response = await apiActions.student.getAll({
        page: page ?? undefined,
        teacherId: teacherId ?? undefined,
        search: search ?? undefined,
      });

      if (!response.data) {
        throw new Error("Failed to get students");
      }

      return response.data;
    },
  });

  return query;
};
