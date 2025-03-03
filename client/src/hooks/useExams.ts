import { apiActions } from "@/api";
import { ExamSchema } from "@/components/forms/ExamForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

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

export const useCreateExam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ExamSchema) => {
      const response = await apiActions.exam.create(data);
      if (!response.data) {
        throw new Error("Failed to create exam");
      }
      return response.data;
    },
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
  });
};

export const useUpdateExam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<ExamSchema>;
    }) => {
      const response = await apiActions.exam.update(id, data);
      if (!response.data) {
        throw new Error("Failed to update exam");
      }
      return response.data;
    },
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
  });
};

export const useDeleteExam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiActions.exam.delete(id);
      if (!response.data) {
        throw new Error("Failed to delete exam");
      }
      return response.data;
    },

    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
  });
};
