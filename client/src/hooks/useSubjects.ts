import { apiActions } from "@/api";
import { useQuery } from "@tanstack/react-query";

export interface useGetSubjectsProps {
  page?: number | null;
  search?: string | null;
}

export const useGetSubjects = ({ page, search }: useGetSubjectsProps) => {
  const query = useQuery({
    queryKey: ["subjects", page, search],
    queryFn: async () => {
      const response = await apiActions.subject.getAll({
        page: page ?? undefined,
        search: search ?? undefined,
      });

      if (!response.data) {
        throw new Error("Failed to get subjects");
      }

      return response.data;
    },
  });

  return query;
};
