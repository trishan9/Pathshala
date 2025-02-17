import { apiActions } from "@/api";
import { CreateTeacherInputs } from "@/components/forms/TeacherForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface useGetTeachersProps {
  page?: number | null;
  classId?: number | null;
  search?: string | null;
}

export const useGetTeachers = ({
  page,
  classId,
  search,
}: useGetTeachersProps) => {
  const query = useQuery({
    queryKey: ["teachers", page, classId, search],
    queryFn: async () => {
      const response = await apiActions.teacher.getAll({
        page: page ?? undefined,
        classId: classId ?? undefined,
        search: search ?? undefined,
      });

      if (!response.data) {
        throw new Error("Failed to get teachers");
      }

      return response.data;
    },
  });

  return query;
};

export interface TeacherFormData {
  name: string;
  username: string;
  email: string;
  password?: string; // Optional for updates
  phone?: string;
  address: string;
  bloodType: string;
  sex: "MALE" | "FEMALE";
  subjectIds?: string[];
  classIds?: number[];
  birthday: Date;
  image?: File;
}

export const useCreateTeacher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateTeacherInputs) => {
      const response = await apiActions.teacher.create(data);
      if (!response.data) {
        throw new Error("Failed to create teacher");
      }

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
    },
  });
};

export const useUpdateTeacher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreateTeacherInputs>;
    }) => {
      const response = await apiActions.teacher.update(id, data);
      if (!response.data) {
        throw new Error("Failed to update teacher");
      }
      console.log(response.data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
      queryClient.invalidateQueries({
        queryKey: ["teacher", variables.id],
      });
    },
  });
};

export const useDeleteTeacher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiActions.teacher.delete(id);
      if (!response.data) {
        throw new Error("Failed to delete teacher");
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
    },
  });
};
