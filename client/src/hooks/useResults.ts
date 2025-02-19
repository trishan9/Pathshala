import { apiActions } from "@/api";
import { ResultSchema } from "@/components/forms/ResultForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export const useCreateResult = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ResultSchema) => {
      const response = await apiActions.result.create(data);
      if (!response.data) {
        throw new Error("Failed to create result");
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["results"] });
    },
  });
};

export const useUpdateResult = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<ResultSchema>;
    }) => {
      const response = await apiActions.result.update(id, data);
      if (!response.data) {
        throw new Error("Failed to update result");
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["results"] });
    },
  });
};

export const useDeleteResult = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiActions.result.delete(id);
      if (!response.data) {
        throw new Error("Failed to delete result");
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["results"] });
    },
  });
};