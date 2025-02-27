import { apiActions } from "@/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export const useCreateSubject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (name: string) => {
      const response = await apiActions.subject.create(name);
      if (!response.data) {
        throw new Error("Failed to create subject");
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
  });
};

export const useUpdateSubject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, name }: { id: string; name: string }) => {
      const response = await apiActions.subject.update(id, name);
      if (!response.data) {
        throw new Error("Failed to update subject");
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
  });
};

export const useDeleteSubject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiActions.subject.delete(id);
      if (!response.data) {
        throw new Error("Failed to delete subject");
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
  });
};

export const useAddLearningMaterial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      title: string;
      content: string;
      subjectId: string;
    }) => {
      const response = await apiActions.subject.learningMaterial.add(data);
      if (!response.data) {
        throw new Error("Failed to add materials");
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materials"] });
    },
  });
};

export const useUpdateLearningMaterial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: {
        title: string;
        content: string;
        subjectId: string;
      };
    }) => {
      const response = await apiActions.subject.learningMaterial.update(
        id,
        data,
      );
      if (!response.data) {
        throw new Error("Failed to update materials");
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materials"] });
    },
  });
};

export const useDeleteLearningMaterial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiActions.subject.learningMaterial.delete(id);
      if (!response.data) {
        throw new Error("Failed to delete material");
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materials"] });
    },
  });
};
