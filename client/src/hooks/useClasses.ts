import { apiActions } from "@/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

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

export const classSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Class name is required!" }),
  capacity: z.coerce.number().min(1, { message: "Capacity name is required!" }),
  gradeId: z.coerce.string().min(1, { message: "Grade name is required!" }),
  supervisorId: z.coerce.string().optional(),
});

export type ClassSchema = z.infer<typeof classSchema>;

export const useCreateClass = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ClassSchema) => {
      const response = await apiActions.class.create(data);
      if (!response.data) {
        throw new Error("Failed to create class");
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });
};

export const useUpdateClass = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: Partial<ClassSchema>;
    }) => {
      const response = await apiActions.class.update(id, data);
      if (!response.data) {
        throw new Error("Failed to update class");
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });
};

export const useDeleteClass = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await apiActions.class.delete(id);
      if (!response.data) {
        throw new Error("Failed to delete class");
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });
};
