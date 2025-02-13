import { apiActions } from "@/api";
import { useQuery } from "@tanstack/react-query";

export interface useGetClassesProps {
  page?: number | null;
  supervisorId?: string | null;
  search?: string | null;
}

export const useGetClasses = ({
  page,
  supervisorId,
  search,
}: useGetClassesProps) => {
  const query = useQuery({
    queryKey: ["classes", page, supervisorId, search],
    queryFn: async () => {
      const response = await apiActions.class.getAll({
        page: page ?? undefined,
        supervisorId: supervisorId ?? undefined,
        search: search ?? undefined,
      });

      if (!response.data) {
        throw new Error("Failed to get classes");
      }

      return response.data;
    },
  });

  return query;
};
