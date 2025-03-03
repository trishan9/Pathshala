import { apiActions } from "@/api";
import { CreateTeacherInputs } from "@/components/forms/TeacherForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export interface useGetStudentsProps {
  page?: number | null;
  teacherId?: string | null;
  search?: string | null;
}

export const useGetStudents = ({
  page,
  teacherId,
  search,
}: useGetStudentsProps) => {
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

export const useCreateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateTeacherInputs) => {
      const response = await apiActions.student.create(data);
      if (!response.data) {
        throw new Error("Failed to create student");
      }

      return response.data;
    },
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
};

export const useUpdateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreateTeacherInputs>;
    }) => {
      const response = await apiActions.student.update(id, data);
      if (!response.data) {
        throw new Error("Failed to update student");
      }
      return response.data;
    },
    onSuccess: (response, variables) => {
      toast.success(response.message);
      queryClient.invalidateQueries({ queryKey: ["students"] });
      queryClient.invalidateQueries({
        queryKey: ["student", variables.id],
      });
    },
  });
};

export const useDeleteStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiActions.student.delete(id);
      if (!response.data) {
        throw new Error("Failed to delete student");
      }
      return response.data;
    },
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
};
