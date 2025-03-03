import { apiActions } from "@/api";
import { AssignmentSchema } from "@/components/forms/AssignmentForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export interface useGetAssignmentsProps {
  page?: number | null;
  classId?: number | null;
  teacherId?: string | null;
  search?: string | null;
}

export const useGetAssignments = ({
  page,
  classId,
  teacherId,
  search,
}: useGetAssignmentsProps) => {
  const query = useQuery({
    queryKey: ["assignments", page, classId, teacherId, search],
    queryFn: async () => {
      const response = await apiActions.assignment.getAll({
        page: page ?? undefined,
        classId: classId ?? undefined,
        teacherId: teacherId ?? undefined,
        search: search ?? undefined,
      });

      if (!response.data) {
        throw new Error("Failed to get assignments");
      }

      return response.data;
    },
  });

  return query;
};

export const useCreateAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AssignmentSchema) => {
      const response = await apiActions.assignment.create(data);
      if (!response.data) {
        throw new Error("Failed to create assignment");
      }
      return response.data;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
      toast.success(response.message);
    },
  });
};

export const useUpdateAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<AssignmentSchema>;
    }) => {
      const response = await apiActions.assignment.update(id, data);
      if (!response.data) {
        throw new Error("Failed to update assignment");
      }
      return response.data;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
      toast.success(response.message);
    },
  });
};

export const useDeleteAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiActions.assignment.delete(id);
      if (!response.data) {
        throw new Error("Failed to delete assignment");
      }
      return response.data;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
      toast.success(response.message);
    },
  });
};

