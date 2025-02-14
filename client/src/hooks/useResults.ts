import { apiActions } from "@/api";
import { useQuery } from "@tanstack/react-query";

export interface useGetResultsProps {
  page?: number | null;
  studentId?: string | null;
  search?: string | null;
}

export const useGetResults = ({
  page,
  studentId,
  search,
}: useGetResultsProps) => {
  const query = useQuery({
    queryKey: ["results", page, studentId, search],
    queryFn: async () => {
      const response = await apiActions.result.getAll({
        page: page ?? undefined,
        studentId: studentId ?? undefined,
        search: search ?? undefined,
      });

      if (!response.data) {
        throw new Error("Failed to get results");
      }

      return response.data;
    },
  });

  return query;
};
